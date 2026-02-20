import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "../lib/platzi";

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

function getSafeImageUrl(images) {
  const first = Array.isArray(images) ? images[0] : null;
  if (typeof first !== "string" || !first.trim()) return "/file.svg";
  const cleaned = first.trim().replace(/^"+|"+$/g, "");
  if (!cleaned) return "/file.svg";
  return cleaned;
}

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export default async function Home({ searchParams }) {
  const categoryId =
    typeof searchParams?.category === "string" ? searchParams.category : "";
  const query = typeof searchParams?.q === "string" ? searchParams.q : "";

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      offset: 0,
      limit: 24,
      categoryId: categoryId ? Number(categoryId) : undefined,
    }),
  ]);

  const q = normalizeText(query);
  const filteredProducts = q
    ? products.filter((p) => {
        const title = normalizeText(p.title);
        const description = normalizeText(p.description);
        return title.includes(q) || description.includes(q);
      })
    : products;

  const featuredProduct = filteredProducts[0] ?? products[0];
  const newDrops = filteredProducts.slice(0, 8);
  const categoriesPreview = categories.slice(0, 4);

  const reviews = [
    {
      name: "David Bailey",
      handle: "@davidbailey",
      rating: 5,
      text: "So comfy and the quality is insane. Shipping was fast too.",
    },
    {
      name: "Gauri Gupta",
      handle: "@gaurigupta",
      rating: 5,
      text: "Perfect fit and looks even better in person. Love the design.",
    },
    {
      name: "Gauri Gupta",
      handle: "@gaurigupta",
      rating: 5,
      text: "Got these for daily wear and they’re holding up great.",
    },
  ];

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

        <main className="pb-12">
          <section className="pt-8 md:pt-10">
            <h1 className="text-center text-[56px] font-black leading-none tracking-tight text-zinc-950 md:text-[160.5px]">
              <span>DO IT </span>
              <span className="text-[#4A69E2]">RIGHT</span>
            </h1>
          </section>

          <section className="mt-8 md:mt-10">
            <div className="relative overflow-hidden rounded-[42px] bg-[#f3b13a] p-5 md:p-8">
              <div className="relative overflow-hidden rounded-[34px] bg-black/10">
                <Link
                  href={
                    featuredProduct ? `/products/${featuredProduct.id}` : "/"
                  }
                  className="relative block aspect-[16/10] w-full md:aspect-[2/1]"
                >
                  {featuredProduct ? (
                    <Image
                      src={getSafeImageUrl(featuredProduct.images)}
                      alt={featuredProduct.title}
                      fill
                      sizes="(max-width: 768px) 92vw, 1000px"
                      className="object-cover"
                      priority
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute left-0 top-10 rounded-r-2xl bg-zinc-950 px-3 py-3 text-[10px] font-semibold uppercase tracking-widest text-white [writing-mode:vertical-rl] md:top-12 md:px-4 md:py-4 md:text-xs">
                    Nike product of the year
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                    <div className="max-w-[520px]">
                      <div className="text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl">
                        NIKE AIR MAX
                      </div>
                      <p className="mt-3 max-w-md text-sm font-medium leading-6 text-white/80 md:text-base">
                        Nike introducing the new air max for everyone&apos;s
                        comfort
                      </p>
                      <div className="mt-4">
                        <span className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-xs font-semibold uppercase tracking-widest text-white">
                          Shop now
                        </span>
                      </div>
                    </div>

                    <div className="hidden flex-col gap-3 md:flex">
                      {[1, 2].map((idx) => (
                        <div
                          key={`thumb-${idx}`}
                          className="relative h-[92px] w-[92px] overflow-hidden rounded-2xl ring-2 ring-white/80"
                        >
                          {featuredProduct ? (
                            <Image
                              src={getSafeImageUrl(
                                featuredProduct.images.slice(idx),
                              )}
                              alt={`${featuredProduct.title} ${idx + 1}`}
                              fill
                              sizes="92px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-10 md:mt-12">
            <div className="flex items-start justify-between gap-6">
              <h2 className="text-[40px] font-black leading-none tracking-tight text-zinc-950 md:text-[56px]">
                DON&apos;T MISS OUT
                <br />
                NEW DROPS
              </h2>
              <Link
                href={{ pathname: "/", query: { q: query } }}
                className="mt-1 inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-blue-500"
              >
                Shop new drops
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {newDrops.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group">
                  <div className="rounded-[30px] bg-white p-[6px] shadow-[0_18px_30px_rgba(0,0,0,0.06)]">
                    <div className="relative overflow-hidden rounded-[24px] bg-[#f1f2f3]">
                      <span className="absolute  rounded-br-2xl left-0 top-0 z-10 bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
                        New
                      </span>
                      <div className="relative aspect-square">
                        <div className="absolute inset-10">
                          <Image
                            src={getSafeImageUrl(p.images)}
                            alt={p.title}
                            fill
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                            className="object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-[18px] font-black uppercase leading-6 tracking-tight text-zinc-900">
                    {p.title}
                  </div>

                  <div className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-xl bg-zinc-900 px-4 text-xs font-semibold uppercase tracking-widest text-white">
                    <span>View product -</span>
                    <span className="ml-2 text-amber-400">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <div className="bg-zinc-950 rounded-[32px] pt-10 pl-8 md:pt-12 md:pl-12 text-white">
           
              <div className="flex items-center justify-between pr-8 md:pr-12">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  CATEGORIES
                </h2>

                <div className="flex items-center gap-2">
                  <button className="h-9 w-9 rounded-md bg-white/20 flex items-center justify-center">
                    ‹
                  </button>
                  <button className="h-9 w-9 rounded-md bg-white text-black flex items-center justify-center">
                    ›
                  </button>
                </div>
              </div>

              
              <div className="mt-8 overflow-hidden rounded-tl-[28px]  bg-white">
                <div className="grid md:grid-cols-2">
                  {categoriesPreview.slice(1, 3).map((c, idx) => (
                    <Link
                      key={c.id}
                      href={{ pathname: "/", query: { category: c.id } }}
                      className="group relative block"
                    >
                      <div
                        className={`relative h-[260px] md:h-[360px] ${
                          idx === 0 ? "bg-[#e9eaec]" : "bg-[#f7f7f7]"
                        }`}
                      >
                        <div className="absolute inset-10">
                          <Image
                            src={getSafeImageUrl([c.image])}
                            alt={c.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {idx === 0 && (
                        <div className="hidden md:block absolute top-0 right-0 h-full w-px bg-zinc-200" />
                      )}

                      <div className="absolute bottom-8 left-8">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 uppercase">
                          {c.name}
                        </h3>
                      </div>

                      <span className="absolute bottom-8 right-8 h-10 w-10 rounded-lg bg-black text-white flex items-center justify-center">
                        ↗
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 md:mt-14">
            <div className="flex items-start justify-between gap-6">
              <h2 className="text-[44px] font-black leading-none tracking-tight text-zinc-950 md:text-[64px]">
                REVIEWS
              </h2>
              <button
                type="button"
                className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-blue-500"
              >
                See all
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {products.slice(0, 3).map((p, idx) => (
                <div
                  key={`review-card-${p.id}`}
                  className="overflow-hidden rounded-[26px] bg-white ring-1 ring-zinc-200"
                >
                  <div className="relative px-6 py-5">
                    <div className="text-base font-extrabold text-zinc-950">
                      Good Quality
                    </div>
                    <div className="mt-1 max-w-xs text-sm leading-5 text-zinc-500">
                      I highly recommend shopping from kicks
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="#f59e0b"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 17.3 5.8 21l1.6-7.1L2 9.3l7.2-.6L12 2l2.8 6.7 7.2.6-5.4 4.6 1.6 7.1L12 17.3Z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm font-semibold text-zinc-700">
                        5.0
                      </div>
                    </div>

                    <div className="absolute right-5 top-5 h-12 w-12 overflow-hidden rounded-full bg-zinc-200 ring-2 ring-white">
                      <Image
                        src={getSafeImageUrl(p.images)}
                        alt={p.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] bg-zinc-200">
                    <Image
                      src={getSafeImageUrl(p.images)}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 92vw, 33vw"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
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
                <div className="mt-4 text-sm text-white/85 md:text-base">
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
