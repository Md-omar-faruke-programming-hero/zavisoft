import SafeImage from "../../components/SafeImage";
import Link from "next/link";
import { getProducts } from "../../lib/platzi";
import CartOverview from "../../components/CartOverview";
// Formats a numeric value into a US Dollar currency string
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

// Safely extracts a valid image URL from various potential input formats
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

// Main Cart Page component responsible for displaying cart items and related products
export default async function CartPage() {
    let allProducts = [];
    try {
        allProducts = await getProducts({ offset: 0, limit: 24 });
    } catch (err) {
        allProducts = [];
    }

    const relatedProducts = allProducts.slice(0, 4);

    return (
        <main className="pt-10 md:pt-12">
            {/* Promo Banner Section: Displays current sales or general information */}
            <section className="mb-10">
                <h1 className="text-[32px] font-black leading-tight text-zinc-900 md:text-[40px]">
                    Saving to celebrate
                </h1>
                <p className="mt-2 text-sm font-medium text-zinc-700 md:text-base">
                    Enjoy up to 60% off thousands of styles during the End of Year sale
                    - while supplies last. No code needed.
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-700 md:text-base">
                    Join us or Sign-in
                </p>
            </section>

            {/* Cart Overview: Client component rendering the actual cart items */}
            <CartOverview />

            {/* Related Products Section: Suggestions for items the user might also like */}
            <div className="mt-16 mb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black text-zinc-900">
                        You may also like
                    </h2>
                    <div className="flex items-center gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-300 text-zinc-500 transition-all hover:bg-zinc-400 hover:scale-105 active:scale-95">
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
                        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95">
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
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {relatedProducts.map((p) => (
                        <Link key={p.id} href={`/products/${p.id}`} className="group">
                            <div className="rounded-[24px] bg-white p-[6px] shadow-sm">
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
                            <div className="mt-4 text-sm font-black uppercase leading-5 tracking-tight text-zinc-900">
                                {p.title}
                            </div>
                            <div className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl bg-zinc-900 px-4 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-zinc-800">
                                <span>View product -</span>
                                <span className="ml-2 text-amber-400">
                                    {formatPrice(p.price)}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-6 flex justify-center">
                    <div className="flex gap-1">
                        <div className="h-1 w-8 rounded-full bg-blue-600"></div>
                        <div className="h-1 w-8 rounded-full bg-zinc-300"></div>
                        <div className="h-1 w-8 rounded-full bg-zinc-300"></div>
                        <div className="h-1 w-8 rounded-full bg-zinc-300"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}
