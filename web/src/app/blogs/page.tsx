import React from "react";
import BlogList from "@/ui/blog/BlogList";
import { db } from "@/db";
import { blog } from "@/db/schema";

export default async function Page() {
  const blogs = await db.select().from(blog);
  return <BlogList blogs={blogs} />;
}
