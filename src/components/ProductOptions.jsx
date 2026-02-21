"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function ProductOptions({ product }) {
    const { addToCart, cartItems } = useCart();
    const router = useRouter();

    // Default mock colors and sizes since API doesn't provide them
    const colors = [
        { id: "black", class: "bg-zinc-900" },
        { id: "green", class: "bg-emerald-700" }
    ];

    const sizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"];

    const [selectedColor, setSelectedColor] = useState(colors[0].id);
    const [selectedSize, setSelectedSize] = useState("41");

    const itemInCart = cartItems.some(
        (item) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );

    const handleAddToCart = () => {
        if (!itemInCart) {
            addToCart(product, selectedSize, selectedColor, 1);
            window.dispatchEvent(new CustomEvent("open-cart"));
        }
    };

    const handleBuyNow = () => {
        if (cartItems.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Cart is empty',
                text: 'Please add some products to your cart first before proceeding to checkout.',
                confirmButtonColor: '#2563eb',
            });
            return;
        }

        router.push("/cart");
    };

    return (
        <>
            <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                Color
            </div>
            <div className="mt-3 flex items-center gap-3">
                {colors.map((c) => (
                    <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColor(c.id)}
                        className={`h-6 w-6 rounded-full transition-all hover:scale-110 active:scale-95 ${c.class} ${selectedColor === c.id ? "ring-2 ring-zinc-900 ring-offset-2" : ""}`}
                        aria-label={`Select ${c.id}`}
                    />
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                    Size
                </div>
                <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-widest text-zinc-600 underline decoration-zinc-400 underline-offset-4 transition-all hover:text-blue-600 hover:scale-105 active:scale-95"
                >
                    Size chart
                </button>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2">
                {sizes.map((size) => (
                    <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`h-9 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 ${selectedSize === size
                            ? "bg-zinc-900 text-white hover:bg-zinc-800"
                            : "bg-white/60 text-zinc-900 ring-1 ring-zinc-300 hover:bg-white"
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={itemInCart}
                    className={`flex h-11 flex-1 items-center justify-center rounded-xl text-xs font-semibold uppercase tracking-widest text-white transition-all ${itemInCart
                            ? "bg-emerald-600 cursor-not-allowed"
                            : "bg-zinc-900 hover:bg-zinc-800 hover:scale-105 active:scale-95"
                        }`}
                >
                    {itemInCart ? "Added to cart ✓" : "Add to cart"}
                </button>
                <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95"
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
                className="mt-3 h-11 w-full rounded-xl bg-blue-600 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]"
            >
                Buy it now
            </button>
        </>
    );
}
