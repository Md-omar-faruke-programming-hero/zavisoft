/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placeimg.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "api.lorem.space" },
      { protocol: "https", hostname: "cdn2.thecatapi.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "pravatar.cc" },
    ],
  },
};

export default nextConfig;
