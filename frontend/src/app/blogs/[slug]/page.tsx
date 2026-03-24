import React from "react";
import Blog from "@/ui/blog/Blog";
import { db } from "@/db";
import { blog } from "@/db/schema";

export default async function Page() {
  const [found] = await db.select().from(blog).limit(1);
  return <Blog blog={found ?? null} />;
}
