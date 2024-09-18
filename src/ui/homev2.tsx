/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { setting } from '@/settings';

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="bg-primary text-primary-foreground px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="text-2xl font-bold" prefetch={false}>
            {setting.title}
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="#" className="hover:underline" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Services
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Products
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Gallery
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
          <Button variant="outline" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <Carousel>
            <CarouselContent>
              {setting.banners.map((banner, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[70vh] sm:h-[80vh]">
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="text-primary-foreground absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                      <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                        {banner.title}
                      </h1>
                      <p className="mt-4 max-w-xl text-lg sm:text-xl">
                        {banner.description}
                      </p>
                      <div className="mt-8">
                        <Button>Book Now</Button>
                      </div>
                    </div>
                  </div>
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
        <section id="services" className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Our Services</h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
                Discover our wide range of spa services to rejuvenate your mind,
                body, and soul.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Massage Therapy</h3>
                  <GiftIcon className="text-primary h-8 w-8" />
                </div>
                <p className="text-muted-foreground mt-4">
                  Experience the ultimate in relaxation with our expert massage
                  therapists.
                </p>
                <Button variant="link" className="mt-4">
                  Learn More
                </Button>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Facial Treatments</h3>
                  <SmileIcon className="text-primary h-8 w-8" />
                </div>
                <p className="text-muted-foreground mt-4">
                  Rejuvenate your skin with our luxurious facial treatments.
                </p>
                <Button variant="link" className="mt-4">
                  Learn More
                </Button>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Body Treatments</h3>
                  <BoneIcon className="text-primary h-8 w-8" />
                </div>
                <p className="text-muted-foreground mt-4">
                  Indulge in our body treatments for a truly holistic
                  experience.
                </p>
                <Button variant="link" className="mt-4">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="products" className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Featured Products
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
                Explore our selection of premium spa products to continue your
                self-care journey at home.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {setting.products.map((product, index) => (
                <div className="bg-card rounded-lg p-6 shadow-md" key={index}>
                  <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <h3 className="mt-4 text-xl font-bold">{product.name}</h3>
                  <p className="text-muted-foreground mt-2">
                    {product.description}
                  </p>
                  <div className="mt-4">
                    <Button>Shop Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="gallery" className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Explore Our Spa
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
                Take a peek inside our luxurious spa and see why our guests love
                it.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {setting.gallery.map((gallery, index) => (
                <img
                  src={gallery.src}
                  alt={gallery.alt}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                  key={index}
                />
              ))}
            </div>
          </div>
        </section>
        <section id="blogs" className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Blogs</h2>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {setting.blogs.map((blog, index) => (
                <div className="bg-card rounded-lg p-6 shadow-md" key={index}>
                  <img
                    src={blog.src}
                    alt={blog.alt}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  <h3 className="mt-4 text-xl font-bold">{blog.title}</h3>
                  <p className="text-muted-foreground mt-2">
                    {blog.description}
                  </p>
                  <div className="mt-4">
                    <Button>Read More</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row md:px-6">
          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
              <LocateIcon className="h-6 w-6" />
              <span>{setting.contact.address}</span>
            </div>
            <div className="flex gap-4 ">
              <PhoneIcon className="h-6 w-6" />
              <span>{setting.contact.phone}</span>
            </div>
            <div className="flex gap-4">
              <Link
                href={setting.contact.facebook}
                className="text-primary-foreground hover:text-primary-foreground/80"
                prefetch={false}
              >
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link
                href={setting.contact.instagram}
                className="text-primary-foreground hover:text-primary-foreground/80"
                prefetch={false}
              >
                <InstagramIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BoneIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
    </svg>
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

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LocateIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
