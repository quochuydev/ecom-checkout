/* eslint-disable @next/next/no-img-element */
"use client";
import { setting } from "@/settings";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <img src={setting.logo} alt={setting.title} className="h-10 w-auto brightness-0 invert" />
            <p className="text-sm text-white/70 leading-relaxed">
              {setting.description}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href={setting.marketplaces.shopee.url}>
                <img src={setting.marketplaces.shopee.icon} alt="Shopee" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              </a>
              <a href={setting.marketplaces.lazada.url}>
                <img src={setting.marketplaces.lazada.icon} alt="Lazada" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Danh Mục
            </h3>
            <ul className="mt-4 space-y-3">
              {setting.pages.map((page) => (
                <li key={page.name}>
                  <a
                    href={page.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Hỗ Trợ
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Liên Hệ
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center">
                <EnvelopeIcon className="mr-2 h-4 w-4 flex-shrink-0 text-secondary" />
                <a href={`mailto:${setting.contact.email}`} className="text-sm text-white/60 hover:text-white">
                  {setting.contact.email}
                </a>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                <span className="text-sm text-white/60">
                  {setting.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} {setting.title}. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              {setting.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
