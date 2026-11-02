import type { Field } from "./ApiForm";
import type { Category } from "@/types/dashboard";

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
  { name: "image", label: "Main photo", type: "file", help: imageRequired ? "Upload a photo, or paste a link below" : "Leave empty to keep the current photo" },
  { name: "imageUrl", label: "Or main photo link", type: "url", placeholder: "https://" },
  { name: "tags", label: "Tags", help: "Separate with commas", full: true },
  { name: "categories", label: "Categories", type: "checkboxes", options: categories.map((c) => ({ value: String(c.id), label: c.name })) },
  { name: "isPublished", label: "Show in the store", type: "checkbox" },
];
