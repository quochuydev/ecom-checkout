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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ApiService } from "@/lib/api-caller";
import { APIGetProducts, APIUpdateProduct } from "@ecom/types/api.product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Product({ appUrl, productId }: any) {
  const apiService = ApiService(appUrl);

  const schema = z.object({
    name: z.string().trim(),
    description: z.string().trim(),
    price: z.string(),
    regularPrice: z.string(),
    category: z.string().trim(),
    sku: z.string().trim(),
    status: z.string().trim(),
    imageIds: z.array(z.string().trim()).optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const data = await apiService.request<APIGetProducts>({
        url: "/api/products",
        method: "get",
        query: {
          productIds: productId,
        },
      });

      const product = data?.items?.[0];

      if (product) {
        reset({
          name: product?.name,
          description: product?.description,
          price: String(product?.price),
          regularPrice: product?.regularPrice,
          sku: product?.sku,
          status: product?.status || "publish",
        });
      }

      return product;
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await apiService.request<APIUpdateProduct>({
      url: "/api/products/{id}",
      method: "put",
      params: {
        id: productId,
      },
      data: {
        ...data,
        price: parseInt(data.price),
        regularPrice: parseInt(data.regularPrice),
      },
    });
  });

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <main className="flex flex-col gap-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Edit Product</h1>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm" type="submit">
                Save Product
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
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        defaultValue="Gamer Gear Pro Controller"
                        {...register("name")}
                      />
                    </div>
                    <p className="text-xs text-red-500">
                      {errors.name?.message}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="name">Sku</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        defaultValue="Gamer Gear Pro Controller"
                        {...register("sku")}
                      />
                    </div>
                    <p className="text-xs text-red-500">
                      {errors.sku?.message}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="grid gap-3">
                        <Label htmlFor="name">price</Label>
                        <Input
                          id="name"
                          type="number"
                          className="w-full"
                          {...register("price")}
                        />
                        <p className="text-xs text-red-500">
                          {errors.price?.message}
                        </p>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Regular price</Label>
                        <Input
                          id="name"
                          type="number"
                          className="w-full"
                          {...register("regularPrice")}
                        />
                        <p className="text-xs text-red-500">
                          {errors.regularPrice?.message}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          {...register("category")}
                          defaultValue="clothing"
                        >
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
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

              <Card className="hidden">
                <CardHeader>
                  <CardTitle>Stock</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table style={{ textWrap: "nowrap" }}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Size</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          sku: "GGPC-001",
                          stock: 100,
                          price: 99.99,
                          size: ["S", "M", "L"],
                        },
                      ].map((variant) => (
                        <TableRow key={variant.sku}>
                          <TableCell>
                            <Label htmlFor="sku" className="sr-only">
                              sku
                            </Label>
                            <Input id="sku" />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-1" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-1"
                              type="number"
                              defaultValue={variant.stock}
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price"
                              type="number"
                              {...register("price")}
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="regularPrice" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="regularPrice"
                              type="number"
                              {...register("regularPrice")}
                            />
                          </TableCell>
                          <TableCell className="flex gap-2">
                            <Toggle defaultValue="s" variant="outline">
                              S
                            </Toggle>
                            <Toggle defaultValue="s" variant="outline">
                              M
                            </Toggle>
                            <Toggle defaultValue="s" variant="outline">
                              L
                            </Toggle>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Button size="sm" variant="ghost" className="gap-1">
                    <CirclePlusIcon className="h-3.5 w-3.5" />
                    Add Variant
                  </Button>
                </CardFooter>
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
    </Layout>
  );
}

function CirclePlusIcon(props) {
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

function UploadIcon(props) {
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
