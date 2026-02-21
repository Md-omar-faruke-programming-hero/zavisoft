"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import SafeImage from "./SafeImage";
import Link from "next/link";
import { useRouter } from "next/navigation";

function formatPrice(value) {
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        }).format(value);
    } catch {
        return `$${value}`;
    }
}

function getSafeImageUrl(images, index = 0) {
    try {
        let imgArray = images;
        if (typeof images === "string") {
            try { imgArray = JSON.parse(images); } catch (_) { imgArray = [images]; }
        } else if (Array.isArray(images) && typeof images[0] === "string" && images[0].startsWith("[")) {
            try { imgArray = JSON.parse(images[0]); } catch (_) { }
        }

        const value = Array.isArray(imgArray) ? imgArray[index] || imgArray[0] : imgArray;
        if (typeof value !== "string" || !value.trim()) return "/file.svg";

        let cleaned = value.trim().replace(/^["\[\]]+|["\[\]]+$/g, "");
        if (!cleaned) return "/file.svg";

        if (cleaned.startsWith("http")) {
            const url = new URL(cleaned);
            const allowedHosts = [
                "placeimg.com", "i.imgur.com", "picsum.photos", "api.lorem.space",
                "cdn2.thecatapi.com", "loremflickr.com", "placehold.co", "pravatar.cc", "cloudflare-ipfs.com", "avatars.githubusercontent.com"
            ];
            if (!allowedHosts.includes(url.hostname)) return "/file.svg";
            return cleaned;
        }
        if (cleaned.startsWith("/")) return cleaned;
        return "/file.svg";
    } catch {
        return "/file.svg";
    }
}

export default function HeaderCartCount() {
    const { getCartCount, isLoaded, cartItems, getCartTotal, removeFromCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleOpenCart() {
            setIsOpen(true);
        }

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("open-cart", handleOpenCart);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("open-cart", handleOpenCart);
        };
    }, []);

    if (!isLoaded) {
        return (
            <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-sm font-extrabold text-zinc-950 ring-1 ring-orange-300 opacity-50 transition-all hover:scale-105 active:scale-95"
                aria-label="Cart count loading"
            >
                -
            </button>
        );
    }

    return (
        <div className="relative" ref={popoverRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-sm font-extrabold text-zinc-950 ring-1 ring-orange-300 transition-all hover:scale-105 active:scale-95 hover:bg-orange-300 relative"
            >
                {getCartCount()}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-zinc-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-black text-lg text-zinc-900">Your Cart</h3>
                        <span className="text-sm text-zinc-500 font-semibold">{getCartCount()} items</span>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-6 text-zinc-500 font-medium">
                            Your bag is empty.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}-${item.color || 'black'}`} className="flex gap-4 border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f1f2f3]">
                                        <SafeImage
                                            src={getSafeImageUrl(item.images)}
                                            alt={item.title}
                                            fill
                                            sizes="64px"
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col py-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="text-sm font-black uppercase tracking-tight text-zinc-900 line-clamp-1">
                                                {item.title}
                                            </h4>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size, item.color)}
                                                className="text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                                                aria-label="Remove item"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18"></path>
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="text-xs text-zinc-500 font-semibold mt-1 flex gap-2 items-center">
                                            <span>Size {item.size}</span>
                                            <span className="h-1 w-1 rounded-full bg-zinc-300"></span>
                                            <span className="capitalize">{item.color || 'black'}</span>
                                            <span className="h-1 w-1 rounded-full bg-zinc-300"></span>
                                            <span>Qty {item.quantity}</span>
                                        </div>
                                        <div className="text-sm font-bold text-blue-600 mt-1">
                                            {formatPrice((item.price || 130) * item.quantity)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {cartItems.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-zinc-100">
                            <div className="flex justify-between items-center mb-4 font-black">
                                <span className="text-zinc-900">Total:</span>
                                <span className="text-zinc-900">{formatPrice(getCartTotal())}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/cart");
                                }}
                                className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                View Cart & Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
