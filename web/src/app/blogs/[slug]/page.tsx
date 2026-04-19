import React from "react";
import Blog from "@/ui/blog/Blog";
import { loadBlog } from "@/lib/loaders";

export default async function Page({ params }: any) {
  const { slug } = await params;
  const { blog } = await loadBlog(slug);
  return <Blog blog={blog} />;
}
