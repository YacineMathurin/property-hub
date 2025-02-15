"use client";
import React, { useState } from "react";
import { Check, X, Search } from "lucide-react";

interface CertificateData {
  ownerName: string;
  authId: string;
  address: string;
  verificationDate: string;
  validUntil: string;
}

type VerificationStatus = "verified" | "failed" | null;

const CertificateVerification: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>(null);
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);

  const handleSearch = (): void => {
    if (searchQuery.trim() === "AUTH-2025-0213") {
      setCertificateData({
        ownerName: "John Smith",
        authId: "AUTH-2025-0213",
        address: "123 Example Street, City, State 12345",
        verificationDate: "February 14, 2025",
        validUntil: "February 14, 2026",
      });
      setVerificationStatus("verified");
    } else if (searchQuery.trim()) {
      setVerificationStatus("failed");
      setCertificateData(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 transition-all duration-300">
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Department of Property Authentication
            </p>
          </div>

          {verificationStatus && (
            <>
              <div className="flex flex-col items-center justify-center mb-8">
                <div
                  className={`w-24 h-24 ${
                    verificationStatus === "verified"
                      ? "bg-green-100"
                      : "bg-red-100"
                  } rounded-full flex items-center justify-center mb-4 transition-all duration-300`}
                >
                  {verificationStatus === "verified" ? (
                    <Check className="w-12 h-12 text-green-500" />
                  ) : (
                    <X className="w-12 h-12 text-red-500" />
                  )}
                </div>
                <h2
                  className={`text-2xl font-semibold ${
                    verificationStatus === "verified"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {verificationStatus === "verified"
                    ? "Verified"
                    : "Verification Failed"}
                </h2>
                <p className="text-gray-600 mt-2">
                  {verificationStatus === "verified"
                    ? "Certificate Authenticated Successfully"
                    : "No matching certificate found"}
                </p>
              </div>

              {certificateData && (
                <>
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Property Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-600 text-sm">Owner Name</p>
                        <p className="font-semibold text-gray-800">
                          {certificateData.ownerName}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm">
                          Authentication ID
                        </p>
                        <p className="font-semibold text-gray-800">
                          {certificateData.authId}
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-gray-600 text-sm">
                          Property Address
                        </p>
                        <p className="font-semibold text-gray-800">
                          {certificateData.address}
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
                          {certificateData.verificationDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm">Valid Until</p>
                        <p className="font-semibold text-gray-800">
                          {certificateData.validUntil}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
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
  );
};

export default CertificateVerification;
