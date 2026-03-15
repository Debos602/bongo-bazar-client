"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/types";

export default function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`);
                if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
                const json = await res.json();
                if (!mounted) return;
                setCategories(json?.data || []);
            } catch (err) {
                if (!mounted) return;
                console.error("useCategories error:", err);
                setError(err);
            } finally {
                if (!mounted) return;
                setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    return { categories, loading, error };
}
