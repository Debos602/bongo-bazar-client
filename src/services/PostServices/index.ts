import { Post } from "@/types";

export const getBlogById = async (blogId: string): Promise<Post | null> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${blogId}`);
    const json = await res.json();
    // API might return wrapper { success, message, data } or the product object directly
    if (json?.data) {
        // if data is array, try to find by id, otherwise return data
        if (Array.isArray(json.data)) {
            return json.data.find((p: Post) => String(p.id) === String(blogId)) || json.data[0];
        }
        return json.data;
    }
    return json;
};