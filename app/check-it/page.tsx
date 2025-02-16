"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const VerificationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const searchParams = useSearchParams();

  // Function to perform the search
  const performSearch = async (id: string) => {
    if (!id) return;

    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/certificates/${id}`);
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResult({ error: "Certificate not found" });
    }
  };

  // Handle manual search button click
  const handleSearch = () => {
    performSearch(searchQuery);
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Effect to handle URL parameter search
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setSearchQuery(id);
      performSearch(id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center py-8 gap-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Certificate Verification
            </h1>
            <div className="w-full max-w-2xl flex gap-3">
              <input
                type="text"
                placeholder="Enter Certificate ID"
                className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md active:scale-95"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchResult && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            {searchResult.error ? (
              <div className="text-red-600 text-center">
                {searchResult.error}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Certificate Details</h2>
                {/* Replace with your actual certificate data display */}
                <pre className="bg-gray-50 p-4 rounded-lg">
                  {JSON.stringify(searchResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
