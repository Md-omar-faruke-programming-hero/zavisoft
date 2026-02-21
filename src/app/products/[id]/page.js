import SafeImage from "../../../components/SafeImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "../../../lib/platzi";
import ProductOptions from "../../../components/ProductOptions";
import RelatedProductsCarousel from "../../../components/RelatedProductsCarousel";

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
  try {
    let imgArray = images;
    if (typeof images === "string") {
      try { imgArray = JSON.parse(images); } catch (_) { imgArray = [images]; }
    } else if (Array.isArray(images) && typeof images[0] === "string" && images[0].startsWith("[")) {
      try { imgArray = JSON.parse(images[0]); } catch (_) { }
    }

    const value = Array.isArray(imgArray) ? imgArray[index] || imgArray[0] : imgArray;
    if (typeof value !== "string" || !value.trim()) return "/file.svg";

    let cleaned = value.trim().replace(/^["\[\]]+|["\[\]]+$/g, "");
    if (!cleaned) return "/file.svg";

    if (cleaned.startsWith("http")) {
      const url = new URL(cleaned);
      const allowedHosts = [
        "placeimg.com", "i.imgur.com", "picsum.photos", "api.lorem.space",
        "cdn2.thecatapi.com", "loremflickr.com", "placehold.co", "pravatar.cc", "cloudflare-ipfs.com", "avatars.githubusercontent.com"
      ];
      if (!allowedHosts.includes(url.hostname)) return "/file.svg";
      return cleaned;
    }
    if (cleaned.startsWith("/")) return cleaned;
    return "/file.svg";
  } catch {
    return "/file.svg";
  }
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
    allProducts = await getProducts({ offset: 0, limit: 30 });
  } catch (err) {
    allProducts = [];
  }

  // Filter out the current product and grab 16
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 16);

  return (
    <main className="pt-10 md:pt-12">
      <div className="grid grid-cols-1  md:grid-cols-2">
        <section className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={`img-${idx}`}
              className="relative  overflow-hidden rounded-[26px] bg-[#f1f2f3]"
            >
              <div className="absolute inset-8">
                <SafeImage
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

          <ProductOptions product={product} />

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

      <RelatedProductsCarousel products={relatedProducts} />
    </main>
  );
}
