import { NextResponse } from "next/server";

export const blogs = [
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
    },
    {
        "id": 27,
        "title": "this  test blog",
        "content": "this  test blogthis  test blogthis  test blogthis  test blog",
        "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
        "isFeatured": true,
        "tags": [
            "dfsdf"
        ],
        "views": 1,
        "authorId": 4,
        "createdAt": "2026-02-23T17:34:06.888Z",
        "updatedAt": "2026-02-23T18:19:06.084Z",
        "author": {
            "id": 4,
            "name": "Nisan  das",
            "email": "Isha@gmail.com",
            "phone": "01834491602"
        }
    },
    {
        "id": 28,
        "title": "test blog",
        "content": "test blog",
        "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
        "isFeatured": true,
        "tags": [
            "Care"
        ],
        "views": 0,
        "authorId": 4,
        "createdAt": "2026-02-23T17:35:03.163Z",
        "updatedAt": "2026-02-23T17:35:03.163Z",
        "author": {
            "id": 4,
            "name": "Nisan  das",
            "email": "Isha@gmail.com",
            "phone": "01834491602"
        }
    },
    {
        "id": 4,
        "title": "POST-4",
        "content": "this post content",
        "thumbnail": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*paa_fE-5pH-DlR0_uA6QyQ.jpeg",
        "isFeatured": true,
        "tags": [
            "blog",
            "ph",
            "next",
            "web"
        ],
        "views": 28,
        "authorId": 5,
        "createdAt": "2026-02-13T18:57:20.843Z",
        "updatedAt": "2026-02-23T11:54:59.063Z",
        "author": {
            "id": 5,
            "name": "Debos das",
            "email": "Ishan@gmail.com",
            "phone": "01834491602"
        }
    },
    {
        "id": 1,
        "title": "POST-1",
        "content": "this post content",
        "thumbnail": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*paa_fE-5pH-DlR0_uA6QyQ.jpeg",
        "isFeatured": true,
        "tags": [
            "blog",
            "ph",
            "next",
            "web"
        ],
        "views": 18,
        "authorId": 5,
        "createdAt": "2026-02-13T18:55:15.032Z",
        "updatedAt": "2026-02-23T11:56:21.614Z",
        "author": {
            "id": 5,
            "name": "Debos das",
            "email": "Ishan@gmail.com",
            "phone": "01834491602"
        }
    },
    {
        "id": 33,
        "title": "nishan",
        "content": "nishan",
        "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
        "isFeatured": true,
        "tags": [
            "dfsdf"
        ],
        "views": 0,
        "authorId": 4,
        "createdAt": "2026-02-23T18:26:18.829Z",
        "updatedAt": "2026-02-23T18:26:18.829Z",
        "author": {
            "id": 4,
            "name": "Nisan  das",
            "email": "Isha@gmail.com",
            "phone": "01834491602"
        }
    },
    {
        "id": 32,
        "title": "new One",
        "content": "new One",
        "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
        "isFeatured": true,
        "tags": [
            "demo",
            "care",
            "react",
            "next js"
        ],
        "views": 0,
        "authorId": 4,
        "createdAt": "2026-02-23T18:22:15.058Z",
        "updatedAt": "2026-02-23T18:22:15.058Z",
        "author": {
            "id": 4,
            "name": "Nisan  das",
            "email": "Isha@gmail.com",
            "phone": "01834491602"
        }
    }
];

export async function GET() {
    return Response.json(blogs);
}

export const POST = async (request: Request) => {
    const blog = await request.json();
    const newBlog = {
        ...blog,
        id: blogs.length + 1
    };
    blogs.push(newBlog);
    return new NextResponse(JSON.stringify(newBlog), {
        status: 201,
        headers: {
            "Content-type": "application/json"
        }
    });
};