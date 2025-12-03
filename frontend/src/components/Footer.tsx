/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';

export default function Page() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-gray-200 bg-white"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4">
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {/* Image section */}
            <div className="col-span-2">
              <img src="/logo.png" alt="" className="h-8 w-auto" />
            </div>

            {/* Newsletter section */}
            <div className="mt-4 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <form className="flex sm:max-w-md">
                <label htmlFor="newsletter-email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email-address"
                  type="text"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Sign up for our newsletter"
                />
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="pb-4 text-center text-sm text-gray-500">
          &copy; 2024 Workflow, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
