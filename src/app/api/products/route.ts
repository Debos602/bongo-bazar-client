import { NextResponse } from "next/server";

export const products = [
    // keep same mock objects for now; fields can be adapted later
    ...(
        (() => {
            return [
                {
                    "id": 5,
                    "title": "This is post title",
                    "content": "this post content",
                    "thumbnail": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*paa_fE-5pH-DlR0_uA6QyQ.jpeg",
                    "isFeatured": true,
                    "tags": [
                        "blog",
                        "ph",
                        "next",
                        "web"
                    ],
                    "views": 14,
                    "authorId": 4,
                    "createdAt": "2026-02-14T07:38:33.201Z",
                    "updatedAt": "2026-02-23T11:54:53.365Z",
                    "author": {
                        "id": 4,
                        "name": "Nisan  das",
                        "email": "Isha@gmail.com",
                        "phone": "01834491602"
                    }
                }
            ];
        })()
    )
];

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
