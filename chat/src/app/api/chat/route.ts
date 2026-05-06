import { NextResponse } from "next/server";

import { fetchAllProducts, searchProducts } from "@/lib/products";
import type { ChatMessage, Product } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

const SYSTEM_PROMPT = `You are a friendly shopping assistant for an online store.
When the user asks about products, call the search_products tool with relevant keywords from their request.
After receiving tool results, recommend up to 3 products in a short, helpful reply.
If no products match, say so and suggest the user try other keywords.
Do not invent products. Only mention products returned by the tool.`;

type OpenAiToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

type OpenAiMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_calls?: OpenAiToolCall[];
  tool_call_id?: string;
};

type OpenAiResponse = {
  choices: Array<{
    message: OpenAiMessage;
    finish_reason: string;
  }>;
  error?: { message: string };
};

const tools = [
  {
    type: "function" as const,
    function: {
      name: "search_products",
      description: "Search the store catalog for products matching keywords from the user.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Keywords describing the product the user is looking for.",
          },
        },
        required: ["query"],
      },
    },
  },
];

async function callOpenAi(messages: OpenAiMessage[]): Promise<OpenAiMessage> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      tools,
      tool_choice: "auto",
      temperature: 0.4,
    }),
  });

  const data = (await res.json()) as OpenAiResponse;
  if (!res.ok) {
    throw new Error(data.error?.message ?? `OpenAI responded ${res.status}`);
  }
  const choice = data.choices?.[0]?.message;
  if (!choice) throw new Error("OpenAI returned no message");
  return choice;
}

function summarizeForModel(products: Product[]): string {
  if (products.length === 0) return JSON.stringify({ items: [] });
  const items = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: p.price,
    description: (p.description ?? "").slice(0, 240),
  }));
  return JSON.stringify({ items });
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          message: "Chat is unavailable: OPENAI_API_KEY is not configured on the server.",
          products: [],
        },
        { status: 503 },
      );
    }

    const body = (await req.json()) as { messages?: ChatMessage[] };
    const history = body.messages ?? [];

    if (history.length === 0) {
      return NextResponse.json({ message: "No messages provided.", products: [] });
    }

    const conversation: OpenAiMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ];

    const collected: Product[] = [];
    const seen = new Set<string>();

    for (let step = 0; step < 3; step++) {
      const reply = await callOpenAi(conversation);
      conversation.push(reply);

      if (!reply.tool_calls || reply.tool_calls.length === 0) {
        return NextResponse.json({
          message: reply.content ?? "",
          products: collected,
        });
      }

      const allProducts = await fetchAllProducts();

      for (const call of reply.tool_calls) {
        if (call.function.name !== "search_products") {
          conversation.push({
            role: "tool",
            tool_call_id: call.id,
            content: JSON.stringify({ error: "unknown tool" }),
          });
          continue;
        }

        let query = "";
        try {
          const args = JSON.parse(call.function.arguments) as { query?: string };
          query = args.query ?? "";
        } catch {
          query = "";
        }

        const matches = searchProducts(allProducts, query);
        for (const p of matches) {
          if (!seen.has(p.id)) {
            seen.add(p.id);
            collected.push(p);
          }
        }

        conversation.push({
          role: "tool",
          tool_call_id: call.id,
          content: summarizeForModel(matches),
        });
      }
    }

    return NextResponse.json({
      message: "I've gathered some product matches above.",
      products: collected,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message, products: [] }, { status: 500 });
  }
}
