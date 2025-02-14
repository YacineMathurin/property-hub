import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CheckIt() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Certificate Verification
          </h1>
          <p className="text-gray-600 mt-2">
            Department of Property Authentication
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            {/* <i className="fas fa-check text-5xl text-green-500"></i> */}
            <FontAwesomeIcon
              icon={faCheck}
              className="fas fa-check text-5xl text-green-500"
            />
          </div>
          <h2 className="text-2xl font-semibold text-green-600">Verified</h2>
          <p className="text-gray-600 mt-2">
            Certificate Authenticated Successfully
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Property Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm">Owner Name</p>
              <p className="font-semibold text-gray-800">John Smith</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Authentication ID</p>
              <p className="font-semibold text-gray-800">AUTH-2025-0213</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-600 text-sm">Property Address</p>
              <p className="font-semibold text-gray-800">
                123 Example Street, City, State 12345
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm">Verification Date</p>
              <p className="font-semibold text-gray-800">February 14, 2025</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Valid Until</p>
              <p className="font-semibold text-gray-800">February 14, 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600 text-sm">
        <p>
          Official verification page of the Department of Property
          Authentication
        </p>
        <p className="mt-2">For any inquiries, please contact (555) 123-4567</p>
      </div>
    </div>
  );
}
