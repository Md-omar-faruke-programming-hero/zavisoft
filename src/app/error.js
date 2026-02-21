"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service securely
        console.error("Application Render Error:", error);
    }, [error]);

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 rounded-full bg-red-100 p-4">
                <svg
                    className="h-10 w-10 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>

            <h2 className="text-2xl font-black text-zinc-900 md:text-3xl">
                Something went wrong!
            </h2>
            <p className="mt-2 max-w-md text-zinc-500">
                We encountered an error while trying to load this page. This could be due to a network issue or a temporary problem with our servers.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                    onClick={() => reset()}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-95"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-95"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}
