import Link from "next/link";
import { getUserOrder } from "@/actions/order";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage() {
    const orders = await getUserOrder();
    const order = Array.isArray(orders) ? orders[0] : null;

    if (!order) {
        return (
            <div className="mx-auto max-w-md px-4 py-24 text-center">
                <h1 className="text-xl font-bold text-slate-900">Nothing to check out</h1>
                <p className="mt-2 text-sm text-slate-500">Your cart becomes an order here when you check out.</p>
                <Link href="/products" className="mt-4 inline-block font-medium text-emerald-800 hover:underline">Browse products</Link>
            </div>
        );
    }

    return <CheckoutClient order={order} />;
}
