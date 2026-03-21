import { useState, useEffect } from "react";
import { Category } from "@/types";

// ✅ typed cache
let cachedCategories: Category[] = [];

export default function useCategories() {
    const [categories, setCategories] = useState<Category[]>(cachedCategories);
    const [loading, setLoading] = useState<boolean>(
        cachedCategories.length === 0
    );

    useEffect(() => {
        if (cachedCategories.length > 0) return;

        let mounted = true;

        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_API}/category`
                );

                if (!res.ok) {
                    throw new Error(`Failed to fetch categories: ${res.status}`);
                }

                const json: { data: Category[]; } = await res.json();

                if (!mounted) return;

                cachedCategories = json?.data || [];
                setCategories(cachedCategories);
            } catch (err) {
                console.error("Category fetch error:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchCategories();

        return () => {
            mounted = false;
        };
    }, []);

    return { categories, loading };
}