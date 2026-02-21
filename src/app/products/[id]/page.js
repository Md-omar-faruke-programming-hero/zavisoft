import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "../../../lib/platzi";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AddToCartButton from "../../../components/AddToCartButton";

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

  // Fetch all products for "You may also like" section
  let allProducts = [];
  try {
    allProducts = await getProducts({ offset: 0, limit: 24 });
  } catch (err) {
    allProducts = [];
  }

  // Filter out the current product and grab 4
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#e9e6df] text-zinc-950">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8">
        <Header />

        <main className="pt-10 md:pt-12">
          <div className="grid grid-cols-1  md:grid-cols-2">
            <section className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={`img-${idx}`}
                  className="relative  overflow-hidden rounded-[26px] bg-[#f1f2f3]"
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
                      className={`h-9 rounded-xl text-xs font-bold ${size === "41"
                        ? "bg-zinc-900 text-white"
                        : "bg-white/60 text-zinc-900 ring-1 ring-zinc-300"
                        }`}
                    >
                      {size}
                    </button>
                  ),
                )}
              </div>

              <AddToCartButton product={product} />

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

          <div className="mt-16 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-zinc-900">
                You may also like
              </h2>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-300 text-zinc-500 hover:bg-zinc-400">
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
                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white hover:bg-zinc-800">
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
                          <Image
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
                  <div className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl bg-zinc-900 px-4 text-[10px] font-semibold uppercase tracking-widest text-white">
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

        <Footer />
      </div>
    </div>
  );
}
