"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, X, Search } from "lucide-react";

const VerificationFailed = () => {
  return (
    <>
      <div className="bg-red-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-red-800 mb-4">
          Error Details
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <i className="fas fa-exclamation-triangle text-red-500 mt-1 mr-3"></i>
            <div>
              <p className="font-semibold text-red-800">
                Invalid Certificate Number
              </p>
              <p className="text-gray-700">
                The certificate number provided does not exist in our records.
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-sm mt-4">
              Attempted verification for:
            </p>
            <p className="font-semibold text-gray-800">
              Certificate ID: AUTH-2025-XXXX
            </p>
            <p className="font-semibold text-gray-800">
              Verification Date: February 14, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          What to Do Next
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <i className="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
            <span>
              Double-check the certificate number for any typing errors
            </span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
            <span>Ensure you're using the most recent certificate version</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
            <span>Contact our support office for assistance</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            Need assistance? Contact our support team:
          </p>
          <div className="space-y-2 text-gray-600">
            <p>
              <i className="fas fa-phone mr-2"></i>(+227) 20-XX-XX-XX
            </p>
            <p>
              <i className="fas fa-envelope mr-2"></i>
              support@propertyauth.gov.ne
            </p>
            <p>
              <i className="fas fa-clock mr-2"></i>Monday - Friday, 8:00 AM -
              4:00 PM
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const VerificationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const searchParams = useSearchParams();

  // Function to perform the search
  const performSearch = async (id: string) => {
    if (!id) return;

    try {
      // Replace this with your actual API call
      const response = await fetch(`http://localhost:1337/api/articles/${id}`);
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
                <VerificationFailed />
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Certificate Details</h2>
                {/* Replace with your actual certificate data display */}
                <div className="flex-1 flex flex-col items-center py-8 px-4">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 transition-all duration-300">
                    <div className="text-center mb-8">
                      <p className="text-gray-600">
                        Department of Property Authentication
                      </p>
                    </div>

                    <>
                      <div className="flex flex-col items-center justify-center mb-8">
                        <div
                          className={`w-24 h-24 ${
                            !searchResult?.error ? "bg-green-100" : "bg-red-100"
                          } rounded-full flex items-center justify-center mb-4 transition-all duration-300`}
                        >
                          {!searchResult?.error ? (
                            <Check className="w-12 h-12 text-green-500" />
                          ) : (
                            <X className="w-12 h-12 text-red-500" />
                          )}
                        </div>
                        <h2
                          className={`text-2xl font-semibold ${
                            !searchResult?.error
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {!searchResult?.error
                            ? "Verified"
                            : "Verification Failed"}
                        </h2>
                        <p className="text-gray-600 mt-2">
                          {!searchResult?.error
                            ? "Certificate Authenticated Successfully"
                            : "No matching certificate found"}
                        </p>
                      </div>

                      {searchResult && (
                        <>
                          <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                              Property Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-gray-600 text-sm">
                                  Owner Name
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {searchResult?.ownerName}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-600 text-sm">
                                  Authentication ID
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {searchResult?.authId}
                                </p>
                              </div>

                              <div className="md:col-span-2">
                                <p className="text-gray-600 text-sm">
                                  Property Address
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {searchResult?.address}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-gray-600 text-sm">
                                  Verification Date
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {searchResult?.verificationDate}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-600 text-sm">
                                  Valid Until
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {searchResult?.validUntil}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  </div>

                  <div className="mt-8 text-center text-gray-600 text-sm">
                    <p>
                      Official verification page of the Department of Property
                      Authentication
                    </p>
                    <p className="mt-2">
                      For any inquiries, please contact (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
    </div>
  );
};

export default VerificationPage;
