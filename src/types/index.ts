export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
// তোমার enum অনুযায়ী adjust করবে

export type Role = "USER" | "ADMIN";
// তোমার enum অনুযায়ী adjust করবে

export interface User {
    id: number;
    createdAt: Date;
    email: string;
    isVerified: boolean;
    name: string;
    password?: string | null;
    phone: string;
    picture?: string | null;
    status: UserStatus;
    updatedAt: Date;
    role: Role;
    posts: Post[]; // Post interface আলাদা করে define করতে হবে
}


export interface Post {
    id: number;
    // Blog-style fields
    title?: string;
    content?: string;
    thumbnail?: string;
    isFeatured?: boolean;
    tags?: string[];
    views?: number;
    authorId?: number;
    createdAt?: string;   // চাইলে Date ব্যবহার করতে পারো
    updatedAt?: string;   // চাইলে Date ব্যবহার করতে পারো
    author?: User;

    // Product-style fields
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    oldPrice?: number;
    discount?: number;
    stock?: number;
    sku?: string;
    rating?: number;
    reviewCount?: number;
    isPublished?: boolean;
    vendorId?: number;
}

export interface Blog {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    products?: Array<{ productId: number; categoryId: number; product: Post; }>;
}

export type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    product: { id: number; name: string; image: string; price: number; };
};
export type Order = {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    payment?: { status: string; method: string; } | null;
    address: { fullName: string; phone: string; city: string; area: string; address: string; tag?: string; };
    items: OrderItem[];
};