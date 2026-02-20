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

function KicksLogo({ className }) {
  return (
    <svg
      viewBox="0 0 350 88"
      className={className}
      role="img"
      aria-label="KICKS"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="kicksLogoGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#111111" />
          <stop offset="1" stopColor="#3a3a3a" />
        </linearGradient>
      </defs>
      <g fill="url(#kicksLogoGradient)">
        <rect x="0" y="10" width="22" height="70" rx="11" />
        <path d="M22 45 64 10h26L46 48h-24Z" />
        <path d="M22 43h24l44 37H64L22 45v-2Z" />

        <rect x="96" y="10" width="24" height="70" rx="11" />

        <rect x="132" y="10" width="22" height="70" rx="11" />
        <rect x="140" y="10" width="78" height="20" rx="10" />
        <rect x="140" y="60" width="78" height="20" rx="10" />

        <rect x="230" y="10" width="22" height="70" rx="11" />
        <path d="M252 45 294 10h26l-44 38h-24Z" />
        <path d="M252 43h24l44 37h-26l-42-35v-2Z" />

        <rect x="318" y="10" width="78" height="20" rx="10" />
        <rect x="318" y="34" width="64" height="20" rx="10" />
        <rect x="318" y="60" width="78" height="20" rx="10" />
        <rect x="318" y="10" width="22" height="44" rx="11" />
        <rect x="374" y="34" width="22" height="46" rx="11" />
      </g>
    </svg>
  );
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

            <Link
              href="/"
              className="flex items-center justify-center text-zinc-950"
            >
              <KicksLogo className="h-7 w-auto md:h-8" />
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
              <span className="text-blue-600">RIGHT</span>
            </h1>
          </section>

          <section className="mt-8 md:mt-10">
            <div className="relative overflow-hidden rounded-[42px] bg-[#f3b13a] p-5 md:p-8">
              <div className="relative overflow-hidden rounded-[34px] bg-black/10">
                <Link
                  href={featuredProduct ? `/products/${featuredProduct.id}` : "/"}
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
                              src={getSafeImageUrl(featuredProduct.images.slice(idx))}
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
                  <div className="relative overflow-hidden rounded-[26px] border-[6px] border-white bg-zinc-100">
                    <span className="absolute left-3 top-3 z-10 rounded-xl bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
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

                  <div className="mt-4 text-sm font-extrabold uppercase leading-5 tracking-tight text-zinc-900 md:text-base">
                    {p.title}
                  </div>

                  <div className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white md:text-xs">
                    <span>View product -</span>
                    <span className="ml-2 text-amber-400">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10 md:mt-14">
            <div className="rounded-[28px] bg-zinc-950 px-6 py-8 text-white md:px-10 md:py-10">
              <div className="flex items-start justify-between gap-6">
                <h2 className="text-[40px] font-black leading-none tracking-tight md:text-[56px]">
                  CATEGORIES
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/15"
                    aria-label="Previous"
                  >
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
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-950 hover:bg-zinc-100"
                    aria-label="Next"
                  >
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
                  </button>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-[28px] bg-white ring-1 ring-black/5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
                  {categoriesPreview.slice(1, 3).map((c, idx) => (
                    <Link
                      key={c.id}
                      href={{ pathname: "/", query: { category: c.id } }}
                      className={`group relative block text-zinc-950 ${
                        idx === 0 ? "bg-[#f1f2f3]" : "bg-white"
                      }`}
                    >
                      <div className="relative h-[240px] sm:h-[300px] md:h-[360px]">
                        <div className="absolute inset-8 md:inset-10">
                          <Image
                            src={getSafeImageUrl([c.image])}
                            alt={c.name}
                            fill
                            sizes="(max-width: 768px) 92vw, 520px"
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="absolute bottom-7 left-7 md:bottom-10 md:left-10">
                        <div className="text-2xl font-black uppercase leading-7 tracking-tight md:text-3xl md:leading-9">
                          {String(c.name ?? "Category").toUpperCase()}
                          <br />
                      
                        </div>
                      </div>

                      <span className="absolute bottom-7 right-7 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white md:bottom-10 md:right-10">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17 17 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10 7h7v7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 md:mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight md:text-xl">
                REVIEWS
              </h2>
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                View all
              </span>
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {reviews.map((r, idx) => (
                <div
                  key={`${r.name}-${idx}`}
                  className="min-w-[260px] rounded-2xl bg-white p-4 ring-1 ring-zinc-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                        {r.name
                          .split(" ")
                          .slice(0, 2)
                          .map((x) => x[0])
                          .join("")}
                      </span>
                      <div className="leading-tight">
                        <div className="text-sm font-semibold">{r.name}</div>
                        <div className="text-xs text-zinc-500">{r.handle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={i < r.rating ? "#f59e0b" : "none"}
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0"
                        >
                          <path
                            d="M12 17.3 5.8 21l1.6-7.1L2 9.3l7.2-.6L12 2l2.8 6.7 7.2.6-5.4 4.6 1.6 7.1L12 17.3Z"
                            stroke={i < r.rating ? "#f59e0b" : "#d4d4d8"}
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-700">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 md:mt-6 md:grid-cols-6">
              {products.slice(0, 6).map((p) => (
                <div
                  key={`review-img-${p.id}`}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-200"
                >
                  <Image
                    src={getSafeImageUrl(p.images)}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 30vw, 15vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 overflow-hidden rounded-[28px] bg-blue-600 text-white md:mt-10">
            <div className="grid grid-cols-1 gap-4 px-5 py-6 md:grid-cols-2 md:items-center md:px-8 md:py-10">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  JOIN OUR KICKSPLUS CLUB
                </div>
                <div className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                  &amp; Get 15% Off
                </div>
                <div className="mt-2 text-sm leading-6 text-white/85">
                  Sign up for exclusive drops, early access, and members-only
                  deals.
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="h-11 rounded-2xl bg-white px-5 text-sm font-semibold text-blue-700 hover:bg-white/90"
                  >
                    Join now
                  </button>
                  <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-white/10 px-5 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="rounded-2xl bg-white/15 px-6 py-4 text-3xl font-black tracking-[0.2em] md:text-4xl">
                  KICKS
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-zinc-950 px-5 py-8 text-white md:px-8 md:py-12">
          <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="text-sm font-semibold tracking-[0.3em]">KICKS</div>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
                Premium sneakers and essentials. Built for comfort, designed to
                stand out.
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Categories
              </div>
              <div className="mt-3 flex flex-col gap-2 text-white/80">
                {categoriesPreview.slice(0, 3).map((c) => (
                  <Link
                    key={`footer-cat-${c.id}`}
                    href={{ pathname: "/", query: { category: c.id } }}
                    className="hover:text-white"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Support
              </div>
              <div className="mt-3 flex flex-col gap-2 text-white/80">
                <a href="#" className="hover:text-white">
                  Shipping &amp; Returns
                </a>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Follow us
              </div>
              <div className="mt-3 flex flex-col gap-2 text-white/80">
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
                <a href="#" className="hover:text-white">
                  X
                </a>
                <a href="#" className="hover:text-white">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
            © {new Date().getFullYear()} KICKS
          </div>

          <div className="mt-6 text-[56px] font-black leading-none tracking-tight text-white md:text-[92px]">
            KICKS
          </div>
        </footer>
      </div>
    </div>
  );
}
