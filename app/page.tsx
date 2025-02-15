"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Add this import at the top
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Heart } from "lucide-react";

const Home = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000,
    zone: "",
    minDimension: 0,
    maxDimension: 200,
  });

  // Extended sample data with more variety
  const items = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      price: 500,
      zone: "North",
      dimension: 45,
      image: "https://placehold.co/300x200",
    },
    // ... (previous items 2-11 remain the same)
    {
      id: 12,
      title: "Park View Apartment",
      price: 1100,
      zone: "North",
      dimension: 95,
      image: "https://placehold.co/300x200",
    },
    {
      id: 13,
      title: "Riverside Condo",
      price: 1300,
      zone: "East",
      dimension: 110,
      image: "https://placehold.co/300x200",
    },
    {
      id: 14,
      title: "Garden House",
      price: 1700,
      zone: "South",
      dimension: 140,
      image: "https://placehold.co/300x200",
    },
    {
      id: 15,
      title: "City View Loft",
      price: 900,
      zone: "Downtown",
      dimension: 70,
      image: "https://placehold.co/300x200",
    },
    {
      id: 16,
      title: "City View Loft",
      price: 900,
      zone: "Downtown",
      dimension: 70,
      image: "https://placehold.co/300x200",
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.price >= filters.minPrice &&
      item.price <= filters.maxPrice &&
      item.dimension >= filters.minDimension &&
      item.dimension <= filters.maxDimension &&
      (filters.zone === "" ||
        item.zone.toLowerCase().includes(filters.zone.toLowerCase()))
  );

  const handleFavorite = (itemId: any) => {
    console.log("Favorited item:", itemId);
  };

  return (
    <div>
      <div>
        {/* Filters Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium">Zone</label>
            <Input
              type="text"
              placeholder="Search by zone..."
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  zone: e.target.value,
                }))
              }
              className="bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Dimension Range</label>
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
          <div className="text-sm text-gray-600 flex items-end pb-4"></div>
          {filteredItems.length} properties found
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking heart
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
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-green-600">
                    ${item.price}
                  </span>
                  <span className="text-gray-600">{item.dimension}m²</span>
                  <span className="text-blue-600">{item.zone}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
