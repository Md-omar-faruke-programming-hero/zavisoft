import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "../../../lib/platzi";

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
    notFound();
  }

  if (!product?.id) notFound();

  const images = Array.isArray(product.images) ? product.images : [];

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
              Z
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              Zavisoft Store
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium text-zinc-700">
            <Link href="/categories" className="hover:text-zinc-950">
              Categories
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-zinc-950">
              Products
            </Link>
            <span className="text-zinc-400">/</span>
            <span className="line-clamp-1">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="flex flex-col gap-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
                <Image
                  src={getSafeImageUrl(images, 0)}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img, idx) => (
                    <div
                      key={`${product.id}-${idx}`}
                      className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100"
                    >
                      <Image
                        src={getSafeImageUrl(images, idx)}
                        alt={`${product.title} ${idx + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {product.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-xl font-semibold text-zinc-950">
                    {formatPrice(product.price)}
                  </div>
                  {product.category?.name ? (
                    <Link
                      href={{ pathname: "/", query: { category: product.category.id } }}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 hover:bg-zinc-200"
                    >
                      {product.category.name}
                    </Link>
                  ) : null}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 p-4 sm:p-5">
                <h2 className="text-sm font-semibold text-zinc-950">
                  Description
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-900"
                >
                  Back to products
                </Link>
                <a
                  href="https://fakeapi.platzi.com/en/rest/products/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  API reference
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

