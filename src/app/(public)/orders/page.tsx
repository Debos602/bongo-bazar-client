import { getUserOrder } from "@/actions/order";
import CheckoutClient from "./CheckoutClient";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
    const orders = await getUserOrder();
    const order = orders[0];

    if (!order) redirect("/orders");

    return <CheckoutClient order={order} />;
}