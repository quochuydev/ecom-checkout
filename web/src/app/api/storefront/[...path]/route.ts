import { NextRequest, NextResponse } from "next/server";
import {
  loadBlog,
  loadBlogs,
  loadCategoriesIndex,
  loadCategory,
  loadHome,
  loadPage,
  loadProduct,
} from "@/lib/loaders";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const segments = path ?? [];

  try {
    if (segments.length === 1 && segments[0] === "index") {
      return NextResponse.json(await loadHome());
    }
    if (segments.length === 1 && segments[0] === "categories") {
      return NextResponse.json(await loadCategoriesIndex());
    }
    if (segments.length === 2 && segments[0] === "categories") {
      return NextResponse.json(await loadCategory(segments[1]));
    }
    if (segments.length === 2 && segments[0] === "products") {
      const data = await loadProduct(segments[1]);
      if (!data) return NextResponse.json({ message: "Not found" }, { status: 404 });
      return NextResponse.json(data);
    }
    if (segments.length === 1 && segments[0] === "blogs") {
      return NextResponse.json(await loadBlogs());
    }
    if (segments.length === 2 && segments[0] === "blogs") {
      return NextResponse.json(await loadBlog(segments[1]));
    }
    if (segments.length === 2 && segments[0] === "pages") {
      return NextResponse.json(await loadPage(segments[1]));
    }
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
