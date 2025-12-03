import configuration from "@/configuration";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(configuration);
}
