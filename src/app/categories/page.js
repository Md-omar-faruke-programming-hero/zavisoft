import SafeImage from "../../components/SafeImage";
import Link from "next/link";
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
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Container Background explicitly here for white background scope since Layout gives default bg */}
      <div className="bg-white text-zinc-950 rounded-[40px] px-4 md:px-8 py-6 md:py-10 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Categories
          </h1>
          <p className="text-sm text-zinc-600">
            Select a category to filter the products list.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-[32px] bg-white py-16 text-center ring-1 ring-zinc-200">
            <h3 className="text-xl font-bold text-zinc-900">No categories found</h3>
            <p className="mt-2 text-sm text-zinc-500 max-w-[280px]">
              We currently don't have any categories available to display.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={{ pathname: "/", query: { category: c.id } }}
                className="group overflow-hidden rounded-[20px] bg-white transition-all hover:-translate-y-1 hover:shadow-lg ring-1 ring-zinc-200"
              >
                <div className="relative aspect-[4/3] w-full bg-[#f1f2f3]">
                  <SafeImage
                    src={getSafeImageUrl(c.image)}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="line-clamp-2 text-sm font-black uppercase text-zinc-900">
                    {c.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
