"use client";

import Image from "next/image";

interface ListingBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function ListingBanner({
  title,
  subtitle,
  imageUrl,
}: ListingBannerProps) {
  return (
    <div className="relative h-[300px] overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full object-cover h-full"
        width={400}
        height={300}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-lg">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
