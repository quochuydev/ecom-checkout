"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function BlogList({ blogs }: { blogs: any[] }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b pb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tin Tức</h1>
          <p className="mt-2 text-gray-500">
            Cập nhật tin tức mới nhất
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <a
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group"
            >
              <div className="overflow-hidden rounded-xl bg-gray-100 aspect-[16/9]">
                <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-4xl text-primary/30 font-bold">Blog</span>
                </div>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(blog.createdDate).toLocaleDateString("vi-VN")}
              </p>
            </a>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500">Chưa có bài viết nào</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
