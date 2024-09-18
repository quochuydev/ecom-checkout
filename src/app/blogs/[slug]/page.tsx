import React from "react";
import Blog from "@/ui/blog/Blog";
import { prisma } from "@/lib/prisma";

export default async function Page({ params: { slug } }: any) {
  const blog = await prisma.blog.findFirst({
    where: {},
  });

  return <Blog blog={blog} />;
}
