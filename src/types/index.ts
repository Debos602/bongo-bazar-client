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
    title: string;
    content: string;
    thumbnail: string;
    isFeatured: boolean;
    tags: string[];
    views: number;
    authorId: number;
    createdAt: string;   // চাইলে Date ব্যবহার করতে পারো
    updatedAt: string;   // চাইলে Date ব্যবহার করতে পারো
    author: User;
}

export interface Blog {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;

}
