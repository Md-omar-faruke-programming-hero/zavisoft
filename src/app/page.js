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
    <div className="min-h-screen bg-zinc-100 text-zinc-950">
      <div className="mx-auto w-full max-w-[430px] bg-white shadow-sm md:max-w-6xl md:rounded-3xl md:shadow-md">
        <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-5">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
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

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-[0.3em] md:text-base">
              KICKS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <form className="hidden items-center md:flex">
              <input type="hidden" name="category" value={categoryId} />
              <div className="relative">
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Search"
                  className="h-10 w-56 rounded-xl bg-zinc-100 px-4 pr-10 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-blue-500/40"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-200"
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
              </div>
            </form>

            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
              aria-label="Cart"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 7h15l-1.5 9h-12L6 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 7 5 4H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  fill="currentColor"
                />
              </svg>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
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
          </div>
        </header>

        <main className="px-4 pb-8 md:px-8 md:pb-12">
          <section className="pt-1 md:pt-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="leading-none">
                <div className="text-[46px] font-black tracking-tight md:text-[72px]">
                  <span className="text-zinc-950">DO IT </span>
                  <span className="text-blue-600">RIGHT</span>
                </div>
              </div>

              <form className="flex gap-2 md:hidden">
                <input type="hidden" name="category" value={categoryId} />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Search"
                  className="h-11 flex-1 rounded-2xl bg-zinc-100 px-4 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-blue-500/40"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white hover:bg-zinc-900"
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
              </form>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
              <div className="relative overflow-hidden rounded-[28px] bg-[#f3b13a] p-4 md:p-6">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-white [writing-mode:vertical-rl] md:left-5 md:text-xs">
                  New Arrivals
                </div>

                <div className="grid grid-cols-[1fr_74px] gap-3 md:grid-cols-[1fr_96px] md:gap-4">
                  <Link
                    href={featuredProduct ? `/products/${featuredProduct.id}` : "/"}
                    className="relative aspect-[5/4] w-full overflow-hidden rounded-[22px] bg-black/10"
                  >
                    {featuredProduct ? (
                      <Image
                        src={getSafeImageUrl(featuredProduct.images)}
                        alt={featuredProduct.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 45vw"
                        className="object-contain"
                        priority
                      />
                    ) : null}
                  </Link>

                  <div className="flex flex-col gap-2">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square overflow-hidden rounded-2xl bg-white/50 ring-1 ring-black/10"
                      >
                        {featuredProduct ? (
                          <Image
                            src={getSafeImageUrl(featuredProduct.images.slice(idx))}
                            alt={`${featuredProduct.title} ${idx + 1}`}
                            fill
                            sizes="96px"
                            className="object-contain"
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                {featuredProduct ? (
                  <div className="mt-4 flex items-end justify-between gap-4 md:mt-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-black/70">
                        {featuredProduct.category?.name ?? "Featured"}
                      </div>
                      <div className="mt-1 max-w-[18rem] text-lg font-extrabold leading-6 text-zinc-950 md:text-xl">
                        {featuredProduct.title}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-zinc-950">
                        {formatPrice(featuredProduct.price)}
                      </div>
                    </div>
                    <Link
                      href={`/products/${featuredProduct.id}`}
                      className="inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-900"
                    >
                      Shop now
                    </Link>
                  </div>
                ) : null}
              </div>

              <div className="rounded-[28px] bg-white p-4 ring-1 ring-zinc-200 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="text-base font-extrabold leading-tight md:text-lg">
                    DON&apos;T MISS OUT
                    <br />
                    <span className="text-zinc-700">NEW DROPS</span>
                  </div>
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    NEW ARRIVALS
                  </span>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <Link
                    href={{ pathname: "/", query: { q: query } }}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                      !categoryId
                        ? "bg-zinc-950 text-white ring-zinc-950"
                        : "bg-white text-zinc-700 ring-zinc-200"
                    }`}
                  >
                    Shop All
                  </Link>
                  {categoriesPreview.map((c) => (
                    <Link
                      key={c.id}
                      href={{ pathname: "/", query: { category: c.id, q: query } }}
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                        String(c.id) === String(categoryId)
                          ? "bg-zinc-950 text-white ring-zinc-950"
                          : "bg-white text-zinc-700 ring-zinc-200"
                      }`}
                    >
                      {c.name}
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800 ring-1 ring-zinc-200"
                  >
                    More
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-4">
                  {newDrops.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className="group rounded-2xl bg-zinc-100 p-2 ring-1 ring-zinc-200 hover:bg-zinc-50"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
                        <Image
                          src={getSafeImageUrl(p.images)}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 45vw, 20vw"
                          className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="mt-2">
                        <div className="line-clamp-1 text-xs font-semibold text-zinc-950">
                          {p.title}
                        </div>
                        <div className="mt-1 text-xs font-semibold text-zinc-700">
                          {formatPrice(p.price)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-[28px] bg-zinc-950 px-4 py-5 text-white md:mt-10 md:px-6 md:py-7">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight md:text-xl">
                CATEGORIES
              </h2>
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-xl bg-white/10" />
                <span className="h-8 w-8 rounded-xl bg-white/10" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:mt-6 md:grid-cols-4 md:gap-4">
              {categoriesPreview.map((c) => (
                <Link
                  key={c.id}
                  href={{ pathname: "/", query: { category: c.id } }}
                  className="group overflow-hidden rounded-2xl bg-white text-zinc-950"
                >
                  <div className="relative aspect-[4/3] bg-zinc-200">
                    <Image
                      src={getSafeImageUrl([c.image])}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 45vw, 20vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-3">
                    <div className="text-xs font-extrabold uppercase tracking-wide">
                      {c.name}
                    </div>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18 15 12 9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
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
