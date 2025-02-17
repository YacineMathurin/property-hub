"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, FileText, Download } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Types
interface Property {
  id: number;
  title: string;
  price: number;
  zone: string;
  dimension: number;
  image: string;
}

interface Favorite extends Property {
  savedAt: string;
}

interface Discussion {
  id: number;
  propertyTitle: string;
  lastMessage: string;
  date: string;
  image: string;
}

interface Document {
  id: number;
  title: string;
  size: string;
  uploadDate: string;
  url: string;
}

const UserProfile: React.FC = () => {
  const { user, error, isLoading } = useUser();
  
  // Get user initials for avatar fallback
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Simulated data - replace with actual API calls
  const favorites: Favorite[] = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      price: 500,
      zone: "North",
      dimension: 45,
      image: "https://placehold.co/300x200",
      savedAt: "2024-02-15",
    },
  ];

  const discussions: Discussion[] = [
    {
      id: 1,
      propertyTitle: "Park View Apartment",
      lastMessage: "Is this still available?",
      date: "2024-02-16",
      image: "https://placehold.co/300x200",
    },
  ];

  const documents: Document[] = [
    {
      id: 1,
      title: "Lease Agreement.pdf",
      size: "2.4 MB",
      uploadDate: "2024-02-10",
      url: "#",
    },
    {
      id: 2,
      title: "Property Inspection Report.pdf",
      size: "1.8 MB",
      uploadDate: "2024-02-12",
      url: "#",
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* User Profile Header */}
      <div className="mb-8 flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.picture || ""} alt={user?.name || ""} />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {user?.name}
          </h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      
      <Tabs defaultValue="historic" className="space-y-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="historic" className="text-base">
            Historic
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-base">
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="historic" className="space-y-8">
          {/* Favorites Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="text-red-500" />
              Favorites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">Saved on {item.savedAt}</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-cyan-600">${item.price}</span>
                      <span className="text-gray-600">{item.dimension}m²</span>
                      <span className="text-cyan-600">{item.zone}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Discussions Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="text-cyan-600" />
              Discussions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={discussion.image}
                      alt={discussion.propertyTitle}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{discussion.propertyTitle}</h3>
                    <p className="text-sm text-gray-600 mb-2">{discussion.lastMessage}</p>
                    <p className="text-sm text-gray-500">Last activity: {discussion.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="text-cyan-600 w-8 h-8" />
                    <div>
                      <h3 className="font-semibold">{doc.title}</h3>
                      <p className="text-sm text-gray-500">
                        {doc.size} • Uploaded on {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="default" className="bg-cyan-600 hover:bg-cyan-700">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
