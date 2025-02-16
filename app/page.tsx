"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Add this import at the top
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample location data
const cityData = {
  Paris: {
    zones: ["Le Marais", "Montmartre", "Champs-Élysées", "Latin Quarter"],
    referencePoints: {
      "Le Marais": { lat: 48.8566, lng: 2.3522 },
      Montmartre: { lat: 48.8867, lng: 2.3431 },
      "Champs-Élysées": { lat: 48.8738, lng: 2.295 },
      "Latin Quarter": { lat: 48.8489, lng: 2.3469 },
    },
  },
  Lyon: {
    zones: ["Presqu'île", "Vieux Lyon", "Croix-Rousse", "Confluence"],
    referencePoints: {
      "Presqu'île": { lat: 45.7579, lng: 4.832 },
      "Vieux Lyon": { lat: 45.762, lng: 4.827 },
      "Croix-Rousse": { lat: 45.7746, lng: 4.8316 },
      Confluence: { lat: 45.7435, lng: 4.8157 },
    },
  },
  Marseille: {
    zones: ["Vieux-Port", "Le Panier", "Notre-Dame", "Prado"],
    referencePoints: {
      "Vieux-Port": { lat: 43.2965, lng: 5.3698 },
      "Le Panier": { lat: 43.2988, lng: 5.3688 },
      "Notre-Dame": { lat: 43.2843, lng: 5.3715 },
      Prado: { lat: 43.2715, lng: 5.3781 },
    },
  },
};

const items = [
  {
    id: 1,
    title: "Charming Studio in Le Marais",
    price: 500,
    city: "Paris",
    zone: "Le Marais",
    dimension: 45,
    location: { lat: 48.857, lng: 2.3525 }, // ~0.1km from Le Marais center
    image: "https://placehold.co/300x200",
  },
  {
    id: 2,
    title: "Modern Loft Near Museums",
    price: 750,
    city: "Paris",
    zone: "Le Marais",
    dimension: 60,
    location: { lat: 48.859, lng: 2.354 }, // ~0.3km from Le Marais center
    image: "https://placehold.co/300x200",
  },
  {
    id: 3,
    title: "Cozy Apartment with Balcony",
    price: 650,
    city: "Paris",
    zone: "Le Marais",
    dimension: 55,
    location: { lat: 48.86, lng: 2.355 }, // ~0.5km from Le Marais center
    image: "https://placehold.co/300x200",
  },
  {
    id: 4,
    title: "Historic Building Studio",
    price: 550,
    city: "Paris",
    zone: "Le Marais",
    dimension: 40,
    location: { lat: 48.862, lng: 2.358 }, // ~0.8km from Le Marais center
    image: "https://placehold.co/300x200",
  },
  {
    id: 5,
    title: "Luxury Penthouse",
    price: 1200,
    city: "Paris",
    zone: "Le Marais",
    dimension: 85,
    location: { lat: 48.865, lng: 2.36 }, // ~1.2km from Le Marais center
    image: "https://placehold.co/300x200",
  },
  {
    id: 6,
    title: "Artist Studio with Garden",
    price: 800,
    city: "Paris",
    zone: "Montmartre",
    dimension: 65,
    location: { lat: 48.888, lng: 2.344 }, // ~0.2km from Montmartre center
    image: "https://placehold.co/300x200",
  },
  {
    id: 7,
    title: "Modern Duplex",
    price: 900,
    city: "Paris",
    zone: "Champs-Élysées",
    dimension: 75,
    location: { lat: 48.8745, lng: 2.296 }, // ~0.1km from Champs-Élysées center
    image: "https://placehold.co/300x200",
  },
  {
    id: 8,
    title: "Student Friendly Apartment",
    price: 600,
    city: "Paris",
    zone: "Latin Quarter",
    dimension: 50,
    location: { lat: 48.8495, lng: 2.3475 }, // ~0.1km from Latin Quarter center
    image: "https://placehold.co/300x200",
  },
  {
    id: 9,
    title: "Renovated Classic Apartment",
    price: 850,
    city: "Paris",
    zone: "Le Marais",
    dimension: 70,
    location: { lat: 48.87, lng: 2.365 }, // ~2km from Le Marais center
    image: "https://placehold.co/300x200",
  },
  {
    id: 10,
    title: "Boutique Living Space",
    price: 950,
    city: "Paris",
    zone: "Le Marais",
    dimension: 80,
    location: { lat: 48.875, lng: 2.37 }, // ~3km from Le Marais center
    image: "https://placehold.co/300x200",
  },
];

const Home = () => {
  const router = useRouter();
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [filters, setFilters] = useState({
    city: "",
    zone: "",
    distance: 5, // Default 5km radius
    minPrice: 0,
    maxPrice: 2000,
    minDimension: 0,
    maxDimension: 200,
  });

  useEffect(() => {
    setPreviewCount(filteredItems.length);
  }, [filters]);

  // Updated distance calculation function
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  const filteredItems = items.filter((item) => {
    const priceMatch =
      item.price >= filters.minPrice && item.price <= filters.maxPrice;
    const dimensionMatch =
      item.dimension >= filters.minDimension &&
      item.dimension <= filters.maxDimension;
    const cityMatch = !filters.city || item.city === filters.city;
    const zoneMatch = !filters.zone || item.zone === filters.zone;

    let distanceMatch = true;
    if (filters.city && filters.zone && typeof filters.distance === "number") {
      const referencePoint =
        cityData[filters.city]?.referencePoints[filters.zone];
      if (referencePoint && item.location) {
        const distance = calculateDistance(
          referencePoint.lat,
          referencePoint.lng,
          item.location.lat,
          item.location.lng
        );
        distanceMatch = distance <= filters.distance;
      }
    }

    return (
      priceMatch && dimensionMatch && cityMatch && zoneMatch && distanceMatch
    );
  });

  const handleFavorite = (itemId: number) => {
    console.log("Favorited item:", itemId);
  };

  const [previewCount, setPreviewCount] = useState(0);

  const CyclingText = () => {
    const words = ["beautiful", "stunning", "peaceful"];
    const widths = [200, 200, 200];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);

      return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    useEffect(() => {
      if (isMobile) return;
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 2000);
      return () => clearInterval(interval);
    }, [isMobile]);

    if (isMobile) {
      return <span className="text-cyan-600 font-bold">perfect</span>;
    }

    return (
      <span
        className={`inline-block  h-[50px] relative top-2 overflow-hidden `}
        style={{ width: widths[currentIndex] }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={words[currentIndex]}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 text-cyan-600 font-bold whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4">
      {/* Animated Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="my-16 text-center"
      >
        <div className="space-y-6 ">
          <h1 className="inline-flex flex-wrap items-baseline gap-x-3 text-4xl lg:text-5xl font-bold transition-all duration-500 ease-in-out max-w-max">
            <span>Find your</span>
            <CyclingText />
            <span>space</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Thousands of curated properties waiting for you
          </p>
        </div>
      </motion.div>
      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Location Filters - Always visible */}
          <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={filters.city}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, city: value, zone: "" }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(cityData).map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.zone}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, zone: value }))
              }
              disabled={!filters.city}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    filters.city ? "Select a zone" : "Select a city first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {filters.city &&
                  cityData[filters.city].zones.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview Counter */}
          <div className="text-sm text-gray-600">
            Found {previewCount} properties matching your criteria
          </div>

          {/* Show More Filters Button */}
          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="text-cyan-600 hover:text-violet-700 font-medium transition-colors"
          >
            {showMoreFilters ? "Show Less Filters" : "Show More Filters"}
          </button>

          {/* Extended Filters */}
          <div
            style={{
              height: showMoreFilters ? "160px" : 0,
              overflow: "hidden",
            }}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl shadow-sm transition-all duration-500 ease-in-out"
          >
            {/* Distance Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Distance from {filters.zone || "selected zone"}
              </label>
              <Slider
                defaultValue={[filters.distance]}
                max={20}
                step={1}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    distance: value[0],
                  }))
                }
                disabled={!filters.zone}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0 km</span>
                <span>{filters.distance} km</span>
              </div>
            </div>
            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Price Range
              </label>
              <Slider
                defaultValue={[filters.minPrice, filters.maxPrice]}
                max={2000}
                step={50}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: value[0],
                    maxPrice: value[1],
                  }))
                }
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${filters.minPrice}</span>
                <span>${filters.maxPrice}</span>
              </div>
            </div>

            {/* Dimension Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Dimension Range
              </label>
              <Slider
                defaultValue={[filters.minDimension, filters.maxDimension]}
                max={200}
                step={5}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    minDimension: value[0],
                    maxDimension: value[1],
                  }))
                }
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{filters.minDimension}m²</span>
                <span>{filters.maxDimension}m²</span>
              </div>
            </div>

            {/* Price and Dimension filters remain the same */}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-lg mb-4">
        {filteredItems.length} properties found
      </p>
      {/* Grid Section */}
      {/* Updated Grid Section with Distance Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {filteredItems.map((item) => {
          // Calculate distance if zone is selected
          let distance = null;
          if (filters.zone && filters.city) {
            const referencePoint =
              cityData[filters.city].referencePoints[filters.zone];
            distance = calculateDistance(
              referencePoint.lat,
              referencePoint.lng,
              item.location.lat,
              item.location.lng
            );
          }

          return (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(`/products`)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(item.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
              </div>
              <CardHeader className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-cyan-600">
                      ${item.price}
                    </span>
                    <span className="text-gray-600">{item.dimension}m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-600">{item.zone}</span>
                    {distance !== null && (
                      <span className="text-gray-600">
                        {distance.toFixed(1)}km away
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
