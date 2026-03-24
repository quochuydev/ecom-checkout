"use client";
import { setting } from "@/settings";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function HeaderMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <Transition show={mobileMenuOpen}>
      <Dialog className="relative z-[60] lg:hidden" onClose={setMobileMenuOpen}>
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 flex">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <img src={setting.logo} alt={setting.title} className="h-8 w-auto brightness-0" />
                <button
                  type="button"
                  className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 px-4 py-6 space-y-1">
                {setting.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {page.name}
                  </a>
                ))}
              </div>

              <div className="border-t px-4 py-4 space-y-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bộ Sưu Tập</h3>
                <div className="grid grid-cols-2 gap-2">
                  {setting.collections.slice(0, 4).map((col) => (
                    <a
                      key={col.name}
                      href={col.href}
                      className="text-sm text-gray-600 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {col.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t px-4 py-4">
                <a href={`mailto:${setting.contact.email}`} className="flex items-center text-sm text-gray-600">
                  {setting.contact.email}
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
