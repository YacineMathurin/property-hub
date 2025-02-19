import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductCard() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sample item data for preview
  const item = {
    id: 1,
    image: "/api/placeholder/400/300",
    title: "Modern Apartment",
    price: "250,000",
    dimension: 120,
    zone: "Downtown",
    distance: 2.5
  };

  const handleFavorite = (id: number) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      // Handle favorite logic
      console.log('Added to favorites:', id);
    }
  };

  return (
    <>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer max-w-sm"
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
              <span className="text-gray-600">
                {item.distance.toFixed(1)}km away
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Login Required</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="relative w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-center text-gray-600">
              Please login to add properties to your favorites
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setShowAuthModal(false);
                }}
                className="flex items-center px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Login
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="flex items-center px-6 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
