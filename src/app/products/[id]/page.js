import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "../../../lib/platzi";

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
  const value = Array.isArray(images) ? images[index] : null;
  if (typeof value !== "string" || !value.trim()) return "/file.svg";
  const cleaned = value.trim().replace(/^"+|"+$/g, "");
  if (!cleaned) return "/file.svg";
  return cleaned;
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();

  let product;
  try {
    product = await getProductById(productId);
  } catch {
    try {
      const list = await getProducts({ offset: 0, limit: 100 });
      product = list.find((p) => p.id === productId);
    } catch {
      product = null;
    }
  }

  if (!product?.id) notFound();

  const images = Array.isArray(product.images) ? product.images : [];
  const imageAt = (idx) =>
    getSafeImageUrl(images, images.length ? idx % images.length : 0);

  return (
    <div className="min-h-screen bg-[#e9e6df] text-zinc-950">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8">
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
                <button type="button" className="inline-flex items-center gap-1">
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
                <button type="button" className="inline-flex items-center gap-1">
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

            <Link href="/" className="relative h-8 w-[140px] md:h-9 md:w-[170px]">
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

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-sm font-extrabold text-zinc-950 ring-1 ring-orange-300"
                aria-label="Cart count"
              >
                0
              </button>
            </div>
          </div>
        </header>

        <main className="pt-10 md:pt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
            <section className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={`img-${idx}`}
                  className="relative aspect-square overflow-hidden rounded-[26px] bg-[#f1f2f3]"
                >
                  <div className="absolute inset-8">
                    <Image
                      src={imageAt(idx)}
                      alt={product.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-contain"
                      priority={idx === 0}
                    />
                  </div>
                </div>
              ))}

              <div className="col-span-2 flex items-center justify-center">
                <div className="mt-1 inline-flex items-center gap-3 rounded-full bg-zinc-900/25 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/20">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18 9 12l6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>3/6</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/20">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m9 18 6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-[26px] bg-[#e9e6df] px-6 py-6 md:px-8 md:py-8">
              <div className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                New Release
              </div>

              <h1 className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight text-zinc-900 md:text-3xl">
                {product.title}
              </h1>
              <div className="mt-2 text-lg font-black text-blue-600">
                {formatPrice(product.price)}
              </div>

              <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                Color
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="h-6 w-6 rounded-full border-2 border-zinc-900 bg-zinc-900" />
                <span className="h-6 w-6 rounded-full bg-emerald-700" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  Size
                </div>
                <button
                  type="button"
                  className="text-xs font-semibold uppercase tracking-widest text-zinc-600 underline decoration-zinc-400 underline-offset-4"
                >
                  Size chart
                </button>
              </div>

              <div className="mt-3 grid grid-cols-7 gap-2">
                {["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"].map(
                  (size) => (
                    <button
                      key={size}
                      type="button"
                      className={`h-9 rounded-xl text-xs font-bold ${
                        size === "41"
                          ? "bg-zinc-900 text-white"
                          : "bg-white/60 text-zinc-900 ring-1 ring-zinc-300"
                      }`}
                    >
                      {size}
                    </button>
                  ),
                )}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  className="flex h-11 flex-1 items-center justify-center rounded-xl bg-zinc-900 text-xs font-semibold uppercase tracking-widest text-white"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 ring-1 ring-zinc-300"
                  aria-label="Wishlist"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21s-7-4.6-9.5-9C.8 8.7 2.3 6 5.4 6c1.8 0 3 .9 3.6 1.8C9.6 6.9 10.8 6 12.6 6c3.1 0 4.6 2.7 2.9 6-2.5 4.4-9.5 9-9.5 9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                className="mt-3 h-11 w-full rounded-xl bg-blue-600 text-xs font-semibold uppercase tracking-widest text-white"
              >
                Buy it now
              </button>

              <div className="mt-7">
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  About the product
                </div>
                <div className="mt-2 text-sm font-semibold text-zinc-900">
                  Shadow Navy / Army Green
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  {product.description}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  This product is excluded from all promotional discounts and
                  offers.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Back to products
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
