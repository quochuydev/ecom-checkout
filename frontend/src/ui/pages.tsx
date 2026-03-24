"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Page({ title, content }: { title?: string; content?: string }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
        {title && <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>}
        {content ? (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-gray-500">Trang này đang được cập nhật.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
