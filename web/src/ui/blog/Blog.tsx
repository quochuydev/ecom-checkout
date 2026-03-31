"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Blog({ blog }: { blog: any }) {
  if (!blog) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-gray-500">Bài viết không tồn tại</p>
          <a href="/blogs" className="mt-4 inline-block text-sm text-primary hover:text-primary/80">
            Quay lại danh sách
          </a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <a href="/blogs" className="text-sm text-gray-500 hover:text-primary">
            &larr; Quay lại Tin Tức
          </a>
        </nav>

        <article>
          <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {new Date(blog.createdDate).toLocaleDateString("vi-VN")}
          </p>
          <div
            className="mt-8 prose prose-lg max-w-none blog-content"
            dangerouslySetInnerHTML={{ __html: blog.body || "" }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
