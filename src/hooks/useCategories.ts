// src/hooks/useCategories.ts
import { useState, useEffect } from "react";

// ✅ module-level cache — page reload না হলে আর fetch হবে না
let cachedCategories: any[] = [];

export default function useCategories() {
    const [categories, setCategories] = useState<any[]>(cachedCategories);
    const [loading, setLoading] = useState(cachedCategories.length === 0);

    useEffect(() => {
        // ✅ cache থাকলে আর fetch করবে না
        if (cachedCategories.length > 0) return;

        let mounted = true;
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`);
                if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
                const json = await res.json();
                if (!mounted) return;
                cachedCategories = json?.data || [];
                setCategories(cachedCategories);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchCategories();
        return () => { mounted = false; };
    }, []);

    return { categories, loading };
}