import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getCategories } from "../../lib/platzi";

function getSafeImageUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "/file.svg";
  const cleaned = value.trim().replace(/^"+|"+$/g, "");
  if (!cleaned) return "/file.svg";
  return cleaned;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Header />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Categories
            </h1>
            <p className="text-sm text-zinc-600">
              Select a category to filter the products list.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={{ pathname: "/", query: { category: c.id } }}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full bg-zinc-100">
                  <Image
                    src={getSafeImageUrl(c.image)}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <div className="line-clamp-1 text-sm font-semibold text-zinc-950">
                    {c.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <div className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8">
        <Footer />
      </div>
    </div>
  );
}

