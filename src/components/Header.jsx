"use client";

import Link from "next/link";
import Image from "next/image";
import HeaderCartCount from "./HeaderCartCount";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <header className="pt-6 md:pt-8">
            <div className="flex items-center justify-between gap-4 rounded-[26px] bg-white px-5 py-4 shadow-sm ring-1 ring-zinc-200 md:px-8">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95 md:hidden"
                        aria-label="Menu"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 7H20M4 12H20M4 17H20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    <nav className="hidden items-center gap-8 text-sm font-semibold text-zinc-900 md:flex">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <span>New Drops</span>
                            <span aria-hidden="true">🔥</span>
                        </Link>
                        <Link
                            href="/?category=1"
                            className="inline-flex items-center gap-1 transition-all hover:text-[#4A69E2] hover:scale-105 active:scale-95"
                        >
                            <span>Men</span>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-zinc-700"
                            >
                                <path
                                    d="M6 9l6 6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="/?category=2"
                            className="inline-flex items-center gap-1 transition-all hover:text-[#4A69E2] hover:scale-105 active:scale-95"
                        >
                            <span>Women</span>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-zinc-700"
                            >
                                <path
                                    d="M6 9l6 6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </nav>
                </div>

                <Link
                    href="/"
                    className="relative h-7 w-[100px] sm:h-8 sm:w-[140px] md:h-9 md:w-[170px] shrink-0"
                >
                    <Image
                        src="/asset/Logo.png"
                        alt="KICKS"
                        fill
                        sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, 170px"
                        className="object-contain"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 transition-all hover:bg-zinc-100 hover:scale-105 active:scale-95"
                            aria-label="Search"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M16.5 16.5 21 21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>

                        {isSearchOpen && (
                            <div className="absolute right-0 top-12 z-50 w-64 sm:w-80 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-zinc-200">
                                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for products..."
                                        className="w-full rounded-xl bg-zinc-100 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-blue-600 px-4 text-xs font-bold text-white transition-all hover:bg-blue-500 hover:scale-105 active:scale-95"
                                    >
                                        GO
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 transition-all hover:bg-zinc-100 hover:scale-105 active:scale-95"
                        aria-label="Profile"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                d="M20 21a8 8 0 1 0-16 0"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    <HeaderCartCount />
                </div>
            </div>
        </header>
    );
}
