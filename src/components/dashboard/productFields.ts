import type { Field } from "./ApiForm";
import type { Category, ManagedProduct, Vendor } from "@/types/dashboard";

export const shopField = (shops: Vendor[]): Field => ({
  name: "vendorId", label: "Shop", type: "select", required: true, full: true,
  options: shops.map((s) => ({ value: String(s.id), label: s.shopName })),
});

export const productFields = (categories: Category[], imageRequired: boolean): Field[] => [
  { name: "name", label: "Product name", required: true, full: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "price", label: "Price (৳)", type: "number", required: true, min: 0.01, step: "0.01" },
  { name: "oldPrice", label: "Old price (৳)", type: "number", min: 0.01, step: "0.01", help: "Shown struck through" },
  { name: "discount", label: "Discount label %", type: "number", min: 0, max: 100 },
  { name: "stock", label: "Stock", type: "number", required: true, min: 0 },
  { name: "sku", label: "SKU" },
  {
    name: "badgeType", label: "Badge", type: "select",
    options: ["NEW", "HOT", "SALE", "BESTSELLER", "LIMITED"].map((v) => ({ value: v, label: v })),
  },
  { name: "image", label: "Main photo", type: "file", help: imageRequired ? "Upload a photo, or paste a link instead" : "Leave empty to keep the current photo" },
  { name: "imageUrl", label: "Or main photo link", placeholder: "https://" },
  { name: "tags", label: "Tags", help: "Separate with commas", full: true },
  { name: "categories", label: "Categories", type: "checkboxes", options: categories.map((c) => ({ value: String(c.id), label: c.name })) },
  { name: "isPublished", label: "Show in the store", type: "checkbox" },
];

export const productInitial = (p: ManagedProduct) => ({
  name: p.name,
  description: p.description ?? "",
  price: String(p.price),
  oldPrice: p.oldPrice?.toString() ?? "",
  discount: p.discount?.toString() ?? "",
  stock: String(p.stock),
  sku: p.sku ?? "",
  badgeType: p.badgeType ?? "",
  tags: p.tags.join(", "),
  imageUrl: p.image,
  isPublished: p.isPublished,
  categories: p.categories.map((c) => String(c.category.id)),
});
