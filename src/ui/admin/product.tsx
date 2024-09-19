"use client";
import FileUpload from "@/components/FileUpload";
import Layout from "@/components/admin/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ApiService } from "@/lib/api-caller";
import {
  API,
  ApiV1AdminProductUpdate,
  ApiV1AdminProductGetList,
  ApiV1AdminProductCategoryGetList,
} from "@ecom/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Product({
  apiUrl,
  productId,
}: {
  apiUrl: string;
  productId: string;
}) {
  const apiService = ApiService(apiUrl);

  const { data: productCategories } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const data = await apiService.request<
        API<ApiV1AdminProductCategoryGetList>
      >({
        url: "/api/api.v1.admin.productCategory.getList",
      });

      return data?.items || [];
    },
  });

  const schema = z.object({
    title: z.string().trim(),
    description: z.string().trim().optional(),
    price: z.coerce.number(),
    regularPrice: z.coerce.number(),
    categoryId: z.string().trim().optional(),
    imageIds: z.array(z.string().trim()).optional(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      regularPrice: 0,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = form;

  useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const data = await apiService.request<API<ApiV1AdminProductGetList>>({
        url: "/api/api.v1.admin.product.getList",
      });

      const product = data?.items.find((e) => e.id === productId);

      if (product) {
        reset({
          title: product.title,
          description: product.description || "",
          price: product.price,
          regularPrice: product.regularPrice,
        });
      }

      return product;
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await apiService.request<API<ApiV1AdminProductUpdate>>({
      url: "/api/api.v1.admin.product.update",
      data: {
        id: productId,
        title: data.title,
        description: data.description,
        price: data.price,
        regularPrice: data.regularPrice,
      },
    });
  });

  return (
    <Layout>
      <Form {...form}>
        <form onSubmit={onSubmit} className="w-full space-y-8">
          <main className="flex flex-col gap-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                Edit Product
              </h1>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm" type="submit">
                  {"Save Product"}
                </Button>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <div className="grid gap-3">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          type="text"
                          className="w-full"
                          defaultValue="Gamer Gear Pro Controller"
                          {...register("title")}
                        />
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.title?.message}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="regularPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Regular price</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-3">
                        <div className="grid gap-3">
                          <Label htmlFor="categoryId">Category</Label>
                          <Select {...register("categoryId")}>
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {productCategories?.map((productCategory) => (
                                <SelectItem
                                  key={productCategory.id}
                                  value={productCategory.id}
                                >
                                  {productCategory.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32"
                          {...register("description")}
                        />
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.description?.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="published">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          className="bg-muted flex h-20 items-center justify-center rounded-md"
                        >
                          <FileUpload
                            onUpload={(fileId) => {
                              console.log("fileId", fileId);
                              setValue("imageIds", [fileId]);
                            }}
                          >
                            <UploadIcon
                              className="text-muted-foreground h-6 w-6"
                              aria-hidden="true"
                            />
                          </FileUpload>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </form>
      </Form>
    </Layout>
  );
}

function CirclePlusIcon(props: any) {
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
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

function UploadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
