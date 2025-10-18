import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const HomePageBanner = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(bannerTimer);
  }, [banners.length]);

  return (
    <>
      <section className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-gray-900">
        {banners.map((bannerItem, index) => (
          <div
            className={`absolute inset-0 transition-all duration-1000 ${
              currentSlide === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            key={bannerItem.id}
          >
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0">
              <img
                src={bannerItem.imageUrl}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 md:px-8 flex items-center">
              <div className="max-w-2xl text-white space-y-6 animate-fade-in">
                {/* Subtitle/Tag */}
                <div className="inline-block">
                  <span className="text-xs md:text-sm  uppercase tracking-[0.2em] font-semibold px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                    {bannerItem.subtitle || "NEW COLLECTION"}
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
                  {bannerItem.title ? (
                    bannerItem.title
                  ) : (
                    <>
                      ELEVATE YOUR
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                        STYLE
                      </span>
                    </>
                  )}
                </h1>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-xl leading-relaxed">
                  {bannerItem.description ||
                    "Discover our exclusive collection of premium sarees, crafted with elegance and tradition for every special moment."}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    onClick={() => (window.location.href = "/listing")}
                    className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base md:text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    SHOP NOW
                  </Button>
                  <Button
                    onClick={() => (window.location.href = `/listing`)}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-base md:text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    EXPLORE COLLECTION
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`group relative transition-all duration-300 ${
                currentSlide === index ? "w-12" : "w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white shadow-lg shadow-white/50"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? banners.length - 1 : prev - 1
                )
              }
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % banners.length)
              }
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}
      </section>
    </>
  );
};
