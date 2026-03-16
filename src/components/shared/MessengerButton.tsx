"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MessageCircle, X } from "lucide-react";

export default function MessengerButton() {
    const { data: session } = useSession();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleClick = () => {
        if (!session) return router.push("/login");
        setOpen(true);
    };

    return (
        <>
            {open && (
                <div className="fixed bottom-20 right-4 z-50 w-80 max-w-[92vw] bg-white rounded-lg shadow-2xl border">
                    <div className="flex items-center justify-between p-3 border-b">
                        <div className="font-semibold">Messenger</div>
                        <button
                            aria-label="Close messenger"
                            onClick={() => setOpen(false)}
                            className="p-1 rounded-md text-gray-600 hover:bg-gray-100"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-3 h-44 overflow-y-auto text-sm text-gray-700">Start a conversation with the seller or support.</div>
                    <div className="p-3 border-t flex items-center gap-2">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
                        />
                        <button
                            onClick={() => { setText(""); }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-sm"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={handleClick}
                aria-label="Open messenger"
                title="Messenger"
                className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
            >
                <MessageCircle className="w-5 h-5" />
            </button>
        </>
    );
}
