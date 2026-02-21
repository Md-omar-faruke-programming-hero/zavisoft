import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "../lib/platzi";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        <Header />

        <main className="pb-12">
          <section className="pt-8 md:pt-10">
            <h1 className="text-center text-[48px] sm:text-[72px] font-black leading-none tracking-tight text-zinc-950 md:text-[160.5px]">
              <span>DO IT </span>
              <span className="text-[#4A69E2]">RIGHT</span>
            </h1>
          </section>

          <section className="mt-8 md:mt-10">
            <div className="relative overflow-hidden rounded-[32px] sm:rounded-[42px] bg-[#f3b13a] p-3 sm:p-5 md:p-8">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[34px] bg-black/10">
                <Link
                  href={
                    featuredProduct ? `/products/${featuredProduct.id}` : "/"
                  }
                  className="relative block aspect-[4/5] sm:aspect-[16/10] w-full md:aspect-[2/1]"
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute left-0 top-6 sm:top-10 rounded-r-2xl bg-zinc-950 px-2 sm:px-3 py-2 sm:py-3 text-[10px] font-semibold uppercase tracking-widest text-white [writing-mode:vertical-rl] md:top-12 md:px-4 md:py-4 md:text-xs">
                    Nike product of the year
                  </div>

                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between gap-4 sm:gap-6">
                    <div className="max-w-[520px]">
                      <div className="text-3xl sm:text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl">
                        NIKE AIR MAX
                      </div>
                      <p className="mt-2 sm:mt-3 max-w-md text-xs sm:text-sm font-medium leading-5 sm:leading-6 text-white/80 md:text-base">
                        Nike introducing the new air max for everyone&apos;s
                        comfort
                      </p>
                      <div className="mt-4">
                        <span className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 sm:px-5 text-xs font-semibold uppercase tracking-widest text-white">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
              <h2 className="text-[32px] sm:text-[40px] font-black leading-none tracking-tight text-zinc-950 md:text-[56px]">
                DON&apos;T MISS OUT
                <br />
                NEW DROPS
              </h2>
              <Link
                href={{ pathname: "/", query: { q: query } }}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-blue-500"
              >
                Shop new drops
              </Link>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-6 lg:grid-cols-4">
              {newDrops.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group flex flex-col h-full">
                  <div className="rounded-[20px] sm:rounded-[30px] bg-white p-[4px] sm:p-[6px] shadow-[0_18px_30px_rgba(0,0,0,0.06)] flex flex-col flex-1">
                    <div className="relative overflow-hidden rounded-[16px] sm:rounded-[24px] bg-[#f1f2f3]">
                      <span className="absolute rounded-br-2xl left-0 top-0 z-10 bg-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold text-white">
                        New
                      </span>
                      <div className="relative aspect-square">
                        <div className="absolute inset-4 sm:inset-10">
                          <Image
                            src={getSafeImageUrl(p.images)}
                            alt={p.title}
                            fill
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 22vw"
                            className="object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-4 text-[14px] sm:text-[18px] font-black uppercase leading-4 sm:leading-6 tracking-tight text-zinc-900 line-clamp-2">
                    {p.title}
                  </div>

                  <div className="mt-4 sm:mt-3 mt-auto inline-flex h-10 w-full sm:h-12 items-center justify-center rounded-xl bg-zinc-900 px-2 sm:px-4 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white">
                    <span className="hidden sm:inline">View product -</span>
                    <span className="sm:hidden">View</span>
                    <span className="ml-1 sm:ml-2 text-amber-400">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <div className="bg-zinc-950 rounded-[32px] pt-8 pl-6 pr-6 md:pt-12 md:pl-12 md:pr-12 text-white pb-6 md:pb-0">

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
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


              <div className="mt-6 sm:mt-8 overflow-hidden rounded-2xl md:rounded-tl-[28px] md:rounded-tr-none md:rounded-b-none bg-white -mx-6 sm:-mx-0 md:mr-0">
                <div className="grid md:grid-cols-2">
                  {categoriesPreview.slice(1, 3).map((c, idx) => (
                    <Link
                      key={c.id}
                      href={{ pathname: "/", query: { category: c.id } }}
                      className="group relative block"
                    >
                      <div
                        className={`relative h-[220px] sm:h-[260px] md:h-[360px] ${idx === 0 ? "bg-[#e9eaec]" : "bg-[#f7f7f7]"
                          }`}
                      >
                        <div className="absolute inset-6 sm:inset-10">
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

                      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-900 uppercase">
                          {c.name}
                        </h3>
                      </div>

                      <span className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-black text-white flex items-center justify-center">
                        ↗
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 md:mt-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
              <h2 className="text-[36px] sm:text-[44px] font-black leading-none tracking-tight text-zinc-950 md:text-[64px]">
                REVIEWS
              </h2>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-blue-500"
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

        <Footer />
      </div>
    </div>
  );
}
