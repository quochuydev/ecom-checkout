"use client";
import { classNames } from "@/lib/style";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCategory } from "@/hooks/useCategory";

export default function CollectionFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: any) {
  const { productCategories } = useCategory();

  return (
    <Transition show={mobileFiltersOpen}>
      <Dialog
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 flex">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <form className="mt-4">
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 pb-4 pt-4"
                >
                  {({ open }) => (
                    <fieldset>
                      <legend className="w-full px-2">
                        <DisclosureButton className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            Categories
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-5 w-5 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel className="px-4 pb-2 pt-4">
                        <div className="space-y-6">
                          {productCategories?.map((productCategory, index) => (
                            <div
                              key={productCategory.id}
                              className="flex items-center"
                            >
                              <input
                                id={`${index}-mobile`}
                                name={`categories[]`}
                                defaultValue={productCategory.title}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`${index}-mobile`}
                                className="ml-3 text-sm text-gray-500"
                              >
                                {productCategory.title}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  )}
                </Disclosure>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
