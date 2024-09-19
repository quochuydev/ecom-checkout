/* eslint-disable @next/next/no-img-element */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import useTranslations from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import z from "zod";
import { array, number, object, string } from "zod";

const cart = {
  items: [
    {
      id: "id",
      image:
        "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
      title: "title title title title title",
      href: "#",
      price: 20,
      quantity: 3,
      itemTotal: 60,
    },
  ],
  subtotal: 60,
  total: 60,
};

export default function Page() {
  const { t } = useTranslations("common");

  const schema = object({
    contact: object({
      email: string().trim(),
    }),
    shipping: object({
      firstName: string().trim(),
      lastName: string().trim(),
      phoneNumber: string().trim(),
      address: string().trim(),
      city: string().trim(),
      country: string().trim(),
      province: string().trim(),
      postalCode: string().trim(),
    }),
    items: array(
      object({
        id: string().trim(),
        image: string().trim(),
        title: string().trim(),
        href: string().trim(),
        price: z.coerce.number(),
        quantity: z.coerce.number(),
        itemTotal: z.coerce.number(),
      })
    ),
    subtotal: z.coerce.number(),
    total: z.coerce.number(),
  });

  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      items: [],
      subtotal: 0,
      total: 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    //
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>
        <form
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          onSubmit={onSubmit}
        >
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {"Contact information"}
            </h2>

            <div className="mt-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register("contact.email")}
                  name="contact.email"
                  type="email"
                  id="email-address"
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("shipping.firstName")}
                      name="shipping.firstName"
                      type="text"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("shipping.lastName")}
                      name="shipping.lastName"
                      type="text"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("shipping.phoneNumber")}
                      name="shipping.phoneNumber"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("shipping.address")}
                      name="shipping.address"
                      id="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("shipping.city")}
                      name="shipping.city"
                      id="city"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      {...register("shipping.country")}
                      name="shipping.country"
                      autoComplete="country"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>United States</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("shipping.province")}
                      name="shipping.province"
                      id="province"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("shipping.postalCode")}
                      name="shipping.postalCode"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 ">
                <ul>
                  <li className="rounded-sm border border-gray-200 p-4">
                    <input type="radio" name="paymentMethod" id="paypal" />
                    <label htmlFor="paypal" className="cursor-pointer pl-2">
                      paypal
                    </label>
                  </li>
                  <li className="rounded-sm border border-t-0 border-gray-200 p-4 ">
                    <input type="radio" name="paymentMethod" id="credit" />
                    <label htmlFor="credit" className="cursor-pointer pl-2">
                      credit card
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>

              <ul role="list" className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={item.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {item.title}
                            </a>
                          </h4>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            {/* TODO */}
                            {/* <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              /> */}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${item.price} X <span>{item.quantity}</span>
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <p>${item.itemTotal}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${cart.subtotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$0</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$0</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${cart.total}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 border-t border-gray-200">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Complete order
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
