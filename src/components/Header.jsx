import Link from "next/link";
import Image from "next/image";
import HeaderCartCount from "./HeaderCartCount";

export default function Header() {
    return (
        <header className="pt-6 md:pt-8">
            <div className="flex items-center justify-between gap-4 rounded-[26px] bg-white px-5 py-4 shadow-sm ring-1 ring-zinc-200 md:px-8">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200 md:hidden"
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
                        <button
                            type="button"
                            className="inline-flex items-center gap-1"
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
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center gap-1"
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
                        </button>
                    </nav>
                </div>

                <Link
                    href="/"
                    className="relative h-8 w-[140px] md:h-9 md:w-[170px]"
                >
                    <Image
                        src="/asset/Logo.png"
                        alt="KICKS"
                        fill
                        sizes="170px"
                        className="object-contain"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 hover:bg-zinc-100"
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

                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 hover:bg-zinc-100"
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
