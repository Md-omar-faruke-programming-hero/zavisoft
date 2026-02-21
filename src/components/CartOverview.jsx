"use client";

import React from "react";
import SafeImage from "./SafeImage";
import Link from "next/link";
import { useCart } from "../context/CartContext";

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

export default function CartOverview() {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount, isLoaded } = useCart();

    if (!isLoaded) {
        return (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.8fr_1fr]">
                <section className="rounded-[26px] bg-white p-6 md:p-8 shadow-sm">
                    <h2 className="text-2xl font-black text-zinc-900">Your Bag</h2>
                    <p className="mt-2 text-sm text-zinc-500">Loading cart...</p>
                </section>
            </div>
        );
    }

    const deliveryPrice = cartItems.length > 0 ? 6.99 : 0;
    const total = getCartTotal() + deliveryPrice;

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.8fr_1fr]">
            {/* Bag Section */}
            <section className="rounded-[26px] bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-black text-zinc-900">Your Bag</h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Items in your bag are not reserved - check out now to make them yours.
                </p>

                {cartItems.length === 0 ? (
                    <div className="mt-8 text-center text-zinc-600">
                        <p>Your bag is empty.</p>
                        <Link href="/" className="mt-4 inline-block text-blue-600 font-semibold underline hover:text-blue-500">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 flex flex-col gap-8">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}-${item.color || 'black'}`} className="flex flex-col gap-6 sm:flex-row border-b border-zinc-100 pb-8 last:border-0 last:pb-0">
                                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[16px] bg-[#f1f2f3]">
                                    <SafeImage
                                        src={getSafeImageUrl(item.images)}
                                        alt={item.title}
                                        fill
                                        sizes="128px"
                                        className="object-contain p-2"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-base font-black uppercase tracking-tight text-zinc-900">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1 text-sm font-semibold text-zinc-600">
                                                Men&apos;s Road Running Shoes
                                            </p>
                                            <p className="text-sm font-semibold text-zinc-600">
                                                Enamel Blue / University White
                                            </p>
                                        </div>
                                        <div className="text-lg font-black text-blue-600">
                                            {formatPrice(item.price || 130)}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-zinc-800">
                                                Size {item.size}
                                            </span>
                                            <span className="h-1 w-1 rounded-full bg-zinc-300"></span>
                                            <span className="text-sm font-semibold capitalize text-zinc-800">
                                                {item.color || 'black'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor={`quantity-${item.id}`} className="text-sm font-semibold text-zinc-800">
                                                Quantity
                                            </label>
                                            <select
                                                id={`quantity-${item.id}`}
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, item.size, item.color, parseInt(e.target.value))}
                                                className="bg-transparent text-sm font-semibold text-zinc-800 outline-none cursor-pointer"
                                            >
                                                {Array.from({ length: Math.max(10, item.quantity) }, (_, i) => i + 1).map((num) => (
                                                    <option key={num} value={num}>
                                                        {num}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 flex items-center gap-4 text-zinc-900">
                                        <button type="button" aria-label="Move to Wishlist" className="transition-all hover:text-blue-600 hover:scale-110 active:scale-95">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 21s-7-4.6-9.5-9C.8 8.7 2.3 6 5.4 6c1.8 0 3 .9 3.6 1.8C9.6 6.9 10.8 6 12.6 6c3.1 0 4.6 2.7 2.9 6-2.5 4.4-9.5 9-9.5 9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                                            aria-label="Remove item"
                                            className="transition-all hover:text-red-500 hover:scale-110 active:scale-95"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Request Order Summary */}
            <section>
                <h2 className="text-2xl font-black text-zinc-900">Order Summary</h2>
                <div className="mt-8 flex flex-col gap-4 text-sm font-semibold">
                    <div className="flex justify-between text-zinc-600">
                        <span>{getCartCount()} {getCartCount() === 1 ? 'ITEM' : 'ITEMS'}</span>
                        <span>{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                        <span>Delivery</span>
                        <span>{formatPrice(deliveryPrice)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                        <span>Sales Tax</span>
                        <span>-</span>
                    </div>
                    <div className="mt-2 flex justify-between text-lg font-black text-zinc-900">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>
                <button
                    type="button"
                    disabled={cartItems.length === 0}
                    className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-zinc-900 text-xs font-semibold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] disabled:bg-zinc-400 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    Checkout
                </button>
                <button type="button" className="mt-4 text-sm font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 transition-all hover:text-blue-600 hover:scale-105 active:scale-95">
                    Use a promo code
                </button>
            </section>
        </div>
    );
}
