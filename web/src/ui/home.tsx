import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { ROUTING } from "@/lib/constants";
import { setting } from "@/settings";
import Image from "next/image";
import HomeCarousel from "@/ui/home-carousel";

export default function Home({
  products,
  productCategories,
}: {
  products: any[];
  productCategories: any[];
}) {
  return (
    <>
      <Header />
      <main>
        {/* Hero Banner Carousel */}
        <HomeCarousel />

        {/* Key Features Bar */}
        <section className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
              {setting.features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-3 py-6 px-4">
                  <Image src={feature.image} alt={feature.title} width={40} height={40} className="flex-shrink-0 object-contain" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{feature.title}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Danh Mục Sản Phẩm
              </h2>
              <p className="mt-2 text-gray-500">
                Khám phá bộ sưu tập kính mắt đa dạng tại {setting.title}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productCategories.map((cat: any) => (
                <a
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]"
                >
                  <Image
                    src={cat.image?.url || "/placeholder.svg"}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                    <span className="mt-3 inline-flex items-center text-sm font-medium text-secondary">
                      Xem thêm
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Sản Phẩm Nổi Bật
                </h2>
                <p className="mt-2 text-gray-500">
                  Những mẫu kính được yêu thích nhất
                </p>
              </div>
              <a
                href={ROUTING.COLLECTIONS}
                className="hidden sm:inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-white transition-colors"
              >
                Xem tất cả
                <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <a
                href={ROUTING.COLLECTIONS}
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80"
              >
                Xem tất cả sản phẩm
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Collections Showcase */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Bộ Sưu Tập
              </h2>
              <p className="mt-2 text-gray-500">
                Phong cách riêng biệt trong từng bộ sưu tập
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {setting.collections.map((collection) => (
                <a
                  key={collection.name}
                  href={collection.href}
                  className="group relative overflow-hidden rounded-xl aspect-square"
                >
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {collection.name}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story / About Section */}
        <section className="relative overflow-hidden bg-primary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
                  Câu Chuyện {setting.title}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {setting.description.split(",")[0]},{" "}
                  <span className="text-secondary">{setting.description.split(",").slice(1).join(",").trim()}</span>
                </h2>
                <p className="mt-6 text-white/70 leading-relaxed">
                  {setting.title} mang đến trải nghiệm mua sắm kính mắt hoàn hảo với hệ thống {setting.features[0].title.toLowerCase()} trên toàn quốc.
                  Chúng tôi cam kết cung cấp sản phẩm chất lượng cao, thiết kế thời thượng cùng dịch vụ chăm sóc khách hàng tận tâm.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-secondary">50+</p>
                    <p className="text-sm text-white/60">Cửa hàng</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">1000+</p>
                    <p className="text-sm text-white/60">Mẫu kính</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">100K+</p>
                    <p className="text-sm text-white/60">Khách hàng</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="btn-secondary mt-8"
                >
                  Tìm hiểu thêm
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/Tinh-than-The-Rock1-1024x682.webp"
                      alt="Store"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/cua-hang-mat-kinh-quan-tan-binh-1024x576.jpg"
                      alt="Products"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/Group-10-15-800x800.jpg"
                      alt="Collection"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/resize-trong-doi-mau-tet-1024x1024.jpg"
                      alt="Lenses"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Ambassadors */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Đại Sứ Thương Hiệu
              </h2>
              <p className="mt-2 text-gray-500">
                Những gương mặt đồng hành cùng {setting.title}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {setting.ambassadors.map((ambassador) => (
                <div key={ambassador.name} className="group text-center">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                    <Image
                      src={ambassador.image}
                      alt={ambassador.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {ambassador.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Khách Hàng Nói Gì
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {setting.testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-2xl bg-gray-50 p-8"
                >
                  <div className="flex gap-1 text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-gray-600 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm font-medium text-gray-900">
                    — {testimonial.attribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-secondary/10 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Nhận ưu đãi độc quyền
            </h2>
            <p className="mt-2 text-gray-500">
              Đăng ký nhận tin để không bỏ lỡ các chương trình khuyến mãi hấp dẫn
            </p>
            <form className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm focus:border-primary focus:ring-primary"
              />
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto whitespace-nowrap"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-white">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {setting.gallery.map((img) => (
              <div key={img.alt} className="relative overflow-hidden aspect-square">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
