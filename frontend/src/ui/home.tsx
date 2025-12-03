/* eslint-disable @next/next/no-img-element */
"use client";
import CollectionCard from "@/components/CollectionCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ROUTING } from "@/lib/constants";
import { setting } from "@/settings";
import { Product, ProductCategory } from "@ecom/types";

export default function Home({
  products,
  productCategories,
}: {
  products: Product[];
  productCategories: ProductCategory[];
}) {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative">
          <Carousel>
            <CarouselContent>
              {setting.banners.map((banner, index) => (
                <CarouselItem key={index}>
                  <img
                    src={banner.src}
                    alt={banner.alt}
                    className="object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary hover:text-primary/80 absolute left-4 top-1/2 z-10 -translate-y-1/2">
              <ChevronLeftIcon className="h-8 w-8" />
            </CarouselPrevious>
            <CarouselNext className="text-primary hover:text-primary/80 absolute right-4 top-1/2 z-10 -translate-y-1/2">
              <ChevronRightIcon className="h-8 w-8" />
            </CarouselNext>
          </Carousel>
        </section>

        <section aria-labelledby="trending-heading" className="bg-white">
          <div className="py-16 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-24">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
              <h2
                id="trending-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Trending products
              </h2>
              <a
                href={ROUTING.COLLECTIONS}
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                See everything
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="relative mt-8">
              <div className="relative w-full overflow-x-auto">
                <div
                  role="list"
                  className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 px-4 sm:hidden">
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                See everything
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="collections-heading" className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none ">
              <h2
                id="collections-heading"
                className="text-2xl font-bold text-gray-900"
              >
                Collections
              </h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {productCategories?.map((productCategory) => (
                  <CollectionCard
                    key={productCategory.id}
                    productCategory={productCategory}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-white bg-opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
