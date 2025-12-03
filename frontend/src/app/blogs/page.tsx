import React from "react";
import BlogList from "@/ui/blog/BlogList";
import { prisma } from "@/lib/prisma";

export default async function Page({ params: { slug } }: any) {
  const blogs = await prisma.blog.findMany({
    where: {},
  });

  return <BlogList blogs={blogs} />;
}
