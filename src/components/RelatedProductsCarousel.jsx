"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SafeImage from "./SafeImage";

function formatPrice(value) {
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
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

export default function RelatedProductsCarousel({ products }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(4);
        };
        handleResize(); // Set initial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!products || products.length === 0) return null;

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const visibleProducts = products.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    return (
        <div className="mt-16 mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-3xl font-black text-zinc-900">
                    You may also like
                </h2>

                {totalPages > 1 && (
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                            onClick={handlePrev}
                            aria-label="Previous page"
                            className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-300 text-zinc-500 transition-all hover:bg-zinc-400 hover:scale-105 active:scale-95"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M15 18 9 12l6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            aria-label="Next page"
                            className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="m9 18 6-6-6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 min-h-[380px]">
                {visibleProducts.map((p) => (
                    <Link key={p.id} href={`/products/${p.id}`} className="group flex flex-col h-full">
                        <div className="rounded-[24px] bg-white p-[6px] shadow-sm flex-1 flex flex-col">
                            <div className="relative overflow-hidden rounded-[20px] bg-[#f1f2f3]">
                                <span className="absolute left-0 top-0 z-10 rounded-br-xl bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">
                                    New
                                </span>
                                <div className="relative aspect-square">
                                    <div className="absolute inset-6">
                                        <SafeImage
                                            src={getSafeImageUrl(p.images)}
                                            alt={p.title}
                                            fill
                                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                                            className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-sm font-black uppercase leading-5 tracking-tight text-zinc-900 line-clamp-2">
                            {p.title}
                        </div>
                        <div className="mt-auto pt-3">
                            <div className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-zinc-900 px-4 text-[10px] font-semibold uppercase tracking-widest text-white transition-colors group-hover:bg-zinc-800">
                                <span>View product -</span>
                                <span className="ml-2 text-amber-400">
                                    {formatPrice(p.price)}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx)}
                                aria-label={`Go to page ${idx + 1}`}
                                className={`h-1 w-8 rounded-full transition-colors ${currentPage === idx ? "bg-blue-600" : "bg-zinc-300 hover:bg-zinc-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
