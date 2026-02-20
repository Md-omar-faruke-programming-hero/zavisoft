"use client";

import React from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product, "41", 1);
    };

    const handleBuyNow = () => {
        addToCart(product, "41", 1);
        // Redirect to cart page
        window.location.href = "/cart";
    };

    return (
        <>
            <div className="mt-5 flex items-center gap-3">
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex h-11 flex-1 items-center justify-center rounded-xl bg-zinc-900 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-zinc-800"
                >
                    Add to cart
                </button>
                <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white transition hover:bg-zinc-800"
                    aria-label="Wishlist"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21s-7-4.6-9.5-9C.8 8.7 2.3 6 5.4 6c1.8 0 3 .9 3.6 1.8C9.6 6.9 10.8 6 12.6 6c3.1 0 4.6 2.7 2.9 6-2.5 4.4-9.5 9-9.5 9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <button
                type="button"
                onClick={handleBuyNow}
                className="mt-3 h-11 w-full rounded-xl bg-blue-600 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-blue-500"
            >
                Buy it now
            </button>
        </>
    );
}
