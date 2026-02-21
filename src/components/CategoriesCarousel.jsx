"use client";

import { useState } from "react";
import SafeImage from "./SafeImage";
import Link from "next/link";

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

export default function CategoriesCarousel({ categories }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // We show 2 categories at a time based on the grid layout
    const itemsPerPage = 2;
    const totalCategories = categories.length;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + itemsPerPage) % totalCategories);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - itemsPerPage + totalCategories) % totalCategories);
    };

    const visibleCategories = Array.from({ length: itemsPerPage }, (_, i) => {
        return categories[(currentIndex + i) % totalCategories];
    });

    return (
        <div className="bg-zinc-950 rounded-[32px] pt-8 pl-6 md:pt-12 md:pl-12 text-white overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-6 md:pr-12">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
                    CATEGORIES
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrev}
                        className="h-9 w-9 rounded-md flex items-center justify-center transition-all bg-white text-black hover:bg-zinc-200 hover:scale-105 active:scale-95"
                        aria-label="Previous categories"
                    >
                        ‹
                    </button>
                    <button
                        onClick={handleNext}
                        className="h-9 w-9 rounded-md flex items-center justify-center transition-all bg-white text-black hover:bg-zinc-200 hover:scale-105 active:scale-95"
                        aria-label="Next categories"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div className="mt-6 sm:mt-8 overflow-hidden rounded-tl-2xl md:rounded-tl-[28px] bg-white">
                <div className="grid md:grid-cols-2">
                    {visibleCategories.map((c, idx) => (
                        <Link
                            key={`${c.id}-${idx}`}
                            href={{ pathname: "/", query: { category: c.id } }}
                            className="group relative block"
                        >
                            <div
                                className={`relative h-[220px] sm:h-[260px] md:h-[360px] ${idx === 0 ? "bg-[#e9eaec]" : "bg-[#f7f7f7]"
                                    }`}
                            >
                                <div className="absolute inset-6 sm:inset-10">
                                    <SafeImage
                                        src={getSafeImageUrl([c.image])}
                                        alt={c.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {idx === 0 && visibleCategories.length > 1 && (
                                <div className="hidden md:block absolute top-0 right-0 h-full w-px bg-zinc-200 z-10" />
                            )}

                            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-20">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-900 uppercase">
                                    {c.name}
                                </h3>
                            </div>

                            <span className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-black text-white flex items-center justify-center z-20 transition-transform group-hover:scale-110">
                                ↗
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
