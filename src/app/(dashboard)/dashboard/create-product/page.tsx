import { redirect } from "next/navigation";

export default function CreateProduct() {
  redirect("/dashboard/vendor/products/new");
}
