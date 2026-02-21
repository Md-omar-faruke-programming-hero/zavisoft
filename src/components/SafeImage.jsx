"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SafeImage({ src, fallbackSrc = "/file.svg", alt, ...props }) {
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

    useEffect(() => {
        setImgSrc(src || fallbackSrc);
    }, [src, fallbackSrc]);

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt || "Image"}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
}
