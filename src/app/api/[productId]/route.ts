import { NextResponse } from "next/server";
import { products } from "../products/route";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ productId: string; }>; }
) {
    const { productId } = await params;
    const product = products.find((p) => p.id === parseInt(productId));
    return NextResponse.json(product);
}
