"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Share2,
  MapPin,
  BedDouble,
  Bath,
  Square,
  ArrowLeft,
  Phone,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PropertyDetail = () => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);

  // Sample property data matching the collection grid format
  const property = {
    id: 1,
    title: "Modern Studio Apartment",
    price: 500,
    zone: "North",
    dimension: 45,
    type: "Studio",
    description:
      "Experience modern living in this beautifully designed studio apartment. Featuring contemporary finishes, efficient layout, and abundant natural light. Perfect for young professionals or students seeking a stylish urban lifestyle.",
    images: [
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
      "https://placehold.co/800x600",
    ],
    features: {
      bedrooms: 1,
      bathrooms: 1,
      parking: true,
      furnished: true,
      petFriendly: true,
      airConditioning: true,
    },
    address: "123 Modern Living St, North District",
    agent: {
      name: "Jane Smith",
      phone: "(555) 123-4567",
      email: "jane.smith@realestate.com",
      image: "/api/placeholder/100/100",
    },
  };

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        onClick={() => router.push(`/`)}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-4/3 relative rounded-xl overflow-hidden bg-gray-100">
            <img
              src={property.images[selectedImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-4/3 rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full ${
                    isLiked ? "bg-red-50" : "hover:bg-gray-100"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? "text-red-500 fill-current" : "text-gray-600"
                    }`}
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{property.address}</span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold text-green-600">
                ${property.price}
              </span>
              <span className="text-gray-600 ml-2">per month</span>
            </div>
          </div>

          {/* Key Features */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BedDouble className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <span className="block text-sm text-gray-600">Bedrooms</span>
                  <span className="block font-semibold">
                    {property.features.bedrooms}
                  </span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <span className="block text-sm text-gray-600">Bathrooms</span>
                  <span className="block font-semibold">
                    {property.features.bathrooms}
                  </span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <span className="block text-sm text-gray-600">Area</span>
                  <span className="block font-semibold">
                    {property.dimension}m²
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                About this property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </CardContent>
          </Card>

          {/* Contact Agent */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{property.agent.name}</h3>
                  <p className="text-sm text-gray-600">Property Agent</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
