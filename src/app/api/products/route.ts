import { NextResponse } from "next/server";
import { products } from "./store";

export async function GET() {
    return Response.json(products);
}

export const POST = async (request: Request) => {
    const product = await request.json();
    const newProduct = {
        ...product,
        id: products.length + 1
    };
    products.push(newProduct);
    return new NextResponse(JSON.stringify(newProduct), {
        status: 201,
        headers: {
            "Content-type": "application/json"
        }
    });
};
