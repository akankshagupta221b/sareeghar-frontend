import Image from "next/image";
import React from "react";

export default function BrandAutoScroll() {
  const brands = [
    {
      name: "Fabindia",
      logo: "https://img.favpng.com/11/3/1/logo-brand-fabindia-font-image-png-favpng-rfv9FfZE3F61YbNbGKHnjBzRh.jpg",
    },
    {
      name: "Kanchipuram Silk",
      logo: "https://cdn.sellerapp.in/Logos/ALL_KANCHI%20PURAM_SAREES.png",
    },
    {
      name: "Banaras Silk",
      logo: "https://logopond.com/logos/4d39f9e4014e52a54d8da58b2d1c7dfa.png",
    },
    {
      name: "Chanderi",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR61JrP0wee6JFxevqBu4IRqXsiEdDfrM8tOA&s",
    },
    {
      name: "Tant Sarees",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7YHLzGH-J0x0Pq5LqQVJZLYqKQFqLxYqvHw&s",
    },
    {
      name: "Paithani",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqNzYdYxLfCJqL5gHJTWqKvLQqHqF5YzQJJw&s",
    },
    {
      name: "Mysore Silk",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Karnataka_Silk_Industries_Corporation_logo.png/220px-Karnataka_Silk_Industries_Corporation_logo.png",
    },
    {
      name: "Sambalpuri",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNzYdYxLfCJqL5gHJTWqKvLQqHqF5YzQJJw&s",
    },
    {
      name: "Patola",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxLfCJqL5gHJTWqKvLQqHqF5YzQJJw&s",
    },
    {
      name: "Bandhani",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLfCJqL5gHJTWqKvLQqHqF5YzQJJw&s",
    },
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="w-full bg-white py-12 overflow-hidden">
      <div className="relative">
        {/* Scrolling container */}
        <div className="flex animate-scroll hover:pause-animation">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 px-8 md:px-12 lg:px-16 flex items-center justify-center"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                className="h-8 md:h-10 lg:h-12 w-auto object-contain  hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
