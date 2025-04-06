// src/components/home/FeaturedCarousel.jsx
import { useState, useEffect } from "react";
import products from "@/data/products";

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featured = products.slice(0, 4); // pick first 4 for now

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featured.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-lg shadow-md">
      {featured.map((product, index) => (
        <div
          key={product.id}
          className={`absolute top-0 left-0 w-full transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text p-4 w-full">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCarousel;
