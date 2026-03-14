"use client";
import { create } from "@/actions/create";
import Form from "next/form";

import { useState } from "react";

export default function CreateProductForm() {
    const [isFeatured, setIsFeatured] = useState("false");

    return (
        <Form
            action={create}
            className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
        >
            <h2 className="text-xl font-semibold mb-4">Create Product</h2>

            {/* Name */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Image */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="image">
                    Image URL
                </label>
                <input
                    type="url"
                    id="image"
                    name="image"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Price / Stock / SKU */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
                    <input type="number" id="price" name="price" className="w-full rounded-md border px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="oldPrice">Old Price</label>
                    <input type="number" id="oldPrice" name="oldPrice" className="w-full rounded-md border px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="stock">Stock</label>
                    <input type="number" id="stock" name="stock" className="w-full rounded-md border px-3 py-2" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="sku">SKU</label>
                <input type="text" id="sku" name="sku" className="w-full rounded-md border px-3 py-2" />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </Form>
    );
}