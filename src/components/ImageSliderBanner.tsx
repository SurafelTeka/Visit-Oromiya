import React, { useState, useEffect } from "react";

// Sample images for the slider. You can replace these with your actual image URLs.
const sliderImages: string[] = [
  "https://c.files.bbci.co.uk/060D/production/_114994510_indexirr.jpg", // Purple
  "https://i.pinimg.com/originals/d4/90/28/d49028cf6a4b62fd9238183902212623.jpg", // Pink
  "https://www.thereporterethiopia.com/wp-content/uploads/2023/09/TRADITION-GETS-A-TWIST.jpg", // Green
  "https://c8.alamy.com/comp/D38WPD/souvenir-shop-gondar-ethiopia-D38WPD.jpg", // Blue
];

interface ImageSliderBannerProps {
  title: string;
  subtitle: string;
  images?: string[]; // Optional prop to override default images
}

const ImageSliderBanner: React.FC<ImageSliderBannerProps> = ({
  title,
  subtitle,
  images = sliderImages,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to change the image every 5 seconds (5000ms)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [images.length]); // Re-run effect if number of images changes

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-lg mb-10 group">
      {/* Current Image */}
      <img
        src={images[currentImageIndex]}
        alt={`Slider Image ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in-up">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl max-w-2xl drop-shadow-md animate-fade-in-up delay-200">
          {subtitle}
        </p>
      </div>

      {/* Navigation Buttons (visible on hover or focus) */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        aria-label="Previous image"
      >
        &#10094; {/* Left arrow */}
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        aria-label="Next image"
      >
        &#10095; {/* Right arrow */}
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentImageIndex === idx
                ? "bg-white"
                : "bg-gray-400 bg-opacity-70"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSliderBanner;
