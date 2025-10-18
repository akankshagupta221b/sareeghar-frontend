"use client";

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
      <img src={imageUrl} alt={title} className="w-full object-cover h-full" />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-lg">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
