export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ProductImage = {
  id: string;
  url?: string | null;
  src?: string | null;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  regularPrice: number;
  images?: ProductImage[];
};

export type ChatResponse = {
  message: string;
  products: Product[];
};

export type DisplayMessage = ChatMessage & {
  products?: Product[];
};

export type Conversation = {
  id: string;
  title: string;
  messages: DisplayMessage[];
  updatedAt: number;
};
