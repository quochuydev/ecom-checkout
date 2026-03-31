"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setting } from "@/settings";
import Image from "next/image";

export default function HomeCarousel() {
  return (
    <section className="relative">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {setting.banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  width={1024}
                  height={500}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-lg">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {banner.title}
                      </h2>
                      <p className="mt-3 text-base sm:text-lg text-white/80">
                        {banner.description}
                      </p>
                      <a
                        href={banner.buttonUrl}
                        className="btn-secondary mt-6"
                      >
                        {banner.button}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white border-0 h-10 w-10" />
        <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white border-0 h-10 w-10" />
      </Carousel>
    </section>
  );
}
