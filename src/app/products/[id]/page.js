import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "../../../lib/platzi";
import HeaderCartCount from "../../../components/HeaderCartCount";
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

              <HeaderCartCount />
            </div>
          </div>
        </header>

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

        <footer className="mt-12 overflow-hidden rounded-[40px] md:mt-16">
          <div className="bg-[#4A69E2] px-6 py-10 text-white md:px-12 md:pt-20">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div>
                <div className="text-[34px] font-black leading-tight tracking-tight md:text-[40px]">
                  JOIN OUR KICKSPLUS
                  <br />
                  CLUB &amp; GET 15% OFF
                </div>
                <div className="mt-2 text-sm text-white/85 md:text-base">
                  Sign up for free! Join the community.
                </div>
                <form className="mt-6 flex w-full max-w-md items-center gap-3 mb-[20px]">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="h-11 flex-1 rounded-xl bg-white/10 px-4 text-sm text-white placeholder:text-white/70 outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-white/40"
                  />
                  <button
                    type="button"
                    className="h-11 rounded-xl bg-zinc-950 px-6 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-900"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="flex items-center justify-start md:justify-end">
                <div className="relative h-12 w-[200px] md:h-16 md:w-[280px]">
                  <Image
                    src="/asset/Logo1.png"
                    alt="KICKS"
                    fill
                    sizes="280px"
                    className="object-contain"
                    priority
                  />
                  <span className="absolute -right-2 top-1 md:-right-3 md:top-2">
                    <Image
                      src="/asset/Add_circle.png"
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 px-6 pt-10 text-white md:px-12 md:pt-12 rounded-t-[40px] -mt-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="text-2xl font-black text-[#FFA52F]">
                  About us
                </div>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/80 md:text-base">
                  We are the biggest hyperstore in the universe. We got you all
                  cover with our exclusive collections and latest drops.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10 md:col-span-2 md:grid-cols-3">
                <div>
                  <div className="text-lg font-black text-[#FFA52F]">
                    Categories
                  </div>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-white/85">
                    {[
                      "Runners",
                      "Sneakers",
                      "Basketball",
                      "Outdoor",
                      "Golf",
                      "Hiking",
                    ].map((name) => (
                      <a key={name} href="#" className="hover:text-white">
                        {name}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-lg font-black text-[#FFA52F]">
                    Company
                  </div>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-white/85">
                    {["About", "Contact", "Blogs"].map((name) => (
                      <a key={name} href="#" className="hover:text-white">
                        {name}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-lg font-black text-[#FFA52F]">
                    Follow us
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-white/85">
                    {[
                      {
                        label: "Facebook",
                        path: "M14 9h2V6h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13v-2c0-.6.4-1 1-1Z",
                      },
                      {
                        label: "Instagram",
                        path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5Zm6.2-1.7a.9.9 0 1 0-.9.9.9.9 0 0 0 .9-.9Z",
                      },
                      {
                        label: "X",
                        path: "M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l5 6 5-6Z",
                      },
                      {
                        label: "TikTok",
                        path: "M14 2v12.2a3.8 3.8 0 1 1-3-3.7V7.5c1.4 1.7 3.5 2.7 6 2.7V7.2c-1.6 0-2.8-.6-3-2.4V2h0Z",
                      },
                    ].map((icon) => (
                      <a
                        key={icon.label}
                        href="#"
                        aria-label={icon.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl  hover:bg-white/10"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d={icon.path} fill="currentColor" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-[28px] ">
              <div className="relative h-[150px] md:h-[240px] top-[80px]">
                <Image
                  src="/asset/Logo1.png"
                  alt="KICKS"
                  fill
                  sizes="1000px"
                  className="object-contain opacity-30"
                />
              </div>
            </div>
          </div>
        </footer>
        <div className="mt-6 text-center text-sm text-[#232321]/80">
          <p>© All rights reserved </p>
        </div>
      </div>
    </div>
  );
}
