/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export default async function ProductDetailsCard({ blog }: { blog: any; }) {
  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">Product not found.</div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-30 px-4">
      <h1 className="text-5xl font-bold mb-6">{blog?.name}</h1>

      <div className="flex items-center gap-4 mb-4">
        <div>
          <p className="font-semibold">SKU: {blog?.sku || "—"}</p>
          <p className="text-gray-500 text-sm">Vendor ID: {blog?.vendorId ?? "—"}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold">৳ {blog?.price ?? "—"}</p>
          {blog?.oldPrice && (
            <p className="text-sm line-through text-gray-500">৳ {blog.oldPrice}</p>
          )}
          {blog?.discount && (
            <p className="text-sm text-green-600">{blog.discount}% off</p>
          )}
        </div>
      </div>

      {blog.image && (
        <div className="relative h-80 w-full overflow-hidden mb-6">
          <Image
            src={blog.image}
            alt={blog.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      )}

      <article className="prose prose-lg max-w-none">
        <p>{blog.description}</p>
        <div className="mt-6">
          <p><strong>Stock:</strong> {blog.stock ?? "—"}</p>
          <p><strong>Rating:</strong> {blog.rating ?? 0} ({blog.reviewCount ?? 0} reviews)</p>
        </div>
      </article>
    </main>
  );
}
