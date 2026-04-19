import React from "react";
import BlogList from "@/ui/blog/BlogList";
import { loadBlogs } from "@/lib/loaders";

export default async function Page() {
  const { blogs } = await loadBlogs();
  return <BlogList blogs={blogs} />;
}
