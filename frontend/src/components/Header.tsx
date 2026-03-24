/* eslint-disable @next/next/no-img-element */
"use client";
import HeaderMobile from "@/components/HeaderMobile";
import { useCart } from "@/hooks/useCart";
import { setting } from "@/settings";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Cart from "./Cart";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart?.lineItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm">
      <HeaderMobile
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <header className="relative">
        <nav aria-label="Top">
          {/* Top bar */}
          <div className="bg-primary">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-4">
                <a href={`mailto:${setting.contact.email}`} className="flex items-center text-sm text-white/80 hover:text-white">
                  {setting.contact.email}
                </a>
              </div>
              <div className="hidden lg:flex lg:items-center lg:space-x-6">
                {setting.offers.map((offer) => (
                  <span key={offer.name} className="text-xs text-white/70">
                    {offer.name} - {offer.description}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <a href={setting.marketplaces.shopee.url}>
                    <img src={setting.marketplaces.shopee.icon} alt="Shopee" className="h-5 w-auto brightness-0 invert" />
                  </a>
                  <a href={setting.marketplaces.lazada.url}>
                    <img src={setting.marketplaces.lazada.icon} alt="Lazada" className="h-5 w-auto brightness-0 invert" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main navigation */}
          <div className="bg-white border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Mobile menu button */}
                <div className="flex items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 rounded-md p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Logo */}
                <a href="/" className="flex items-center">
                  <img
                    className="h-10 w-auto brightness-0"
                    src={setting.logo}
                    alt={setting.title}
                  />
                </a>

                {/* Desktop nav links */}
                <div className="hidden lg:flex lg:items-center lg:space-x-1">
                  {setting.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-50"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>

                {/* Right actions */}
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-500 hidden sm:block"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    className="group relative p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setCartOpen(true)}
                  >
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                    {totalItems > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Cart open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
}
