import Image from "next/image";

export default function Footer() {
    return (
        <footer>
            <div className="mt-12 overflow-hidden rounded-[40px] md:mt-16">
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
                                    className="h-11 rounded-xl bg-zinc-950 px-6 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-blue-600 hover:scale-105 active:scale-95"
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
            </div>
            <p className="mt-6 text-center text-sm text-[#232321]/80">© All rights reserved</p>
        </footer>
    );
}
