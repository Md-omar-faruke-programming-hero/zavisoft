"use client";

import React from "react";
import { useCart } from "../context/CartContext";

export default function HeaderCartCount() {
    const { getCartCount, isLoaded } = useCart();

    if (!isLoaded) {
        return (
            <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-sm font-extrabold text-zinc-950 ring-1 ring-orange-300 opacity-50 transition"
                aria-label="Cart count loading"
            >
                -
            </button>
        );
    }

    return (
        <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-sm font-extrabold text-zinc-950 ring-1 ring-orange-300 transition hover:bg-orange-300"
            aria-label="Cart count"
        >
            {getCartCount()}
        </button>
    );
}
