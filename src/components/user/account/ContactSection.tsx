"use client";

import type { FC } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export const ContactSection: FC = () => {
  const { storeSettings } = useSettingsStore();

  const fullAddress = [
    storeSettings?.address,
    storeSettings?.city,
    storeSettings?.state,
    storeSettings?.postalCode,
    storeSettings?.country,
  ]
    .filter(Boolean)
    .join(", ");

  // Default coordinates (you can update these or make them dynamic)
  const defaultCenter: [number, number] = [26.0619745, 83.180105]; // Default to Delhi, India
  const defaultZoom = 15;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Store Information Section */}
      <div className="bg-white border-b border-gray-200 pb-6 sm:pb-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            STORE INFORMATION
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Store Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <Input
              value={storeSettings?.name || "Not available"}
              placeholder="Store Name"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              disabled
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <Input
              value={storeSettings?.email || "Not available"}
              placeholder="Email Address"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              disabled
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-gray-600" />
            </div>
            <Input
              value={storeSettings?.phone || "Not available"}
              placeholder="Phone Number"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              disabled
            />
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-md p-3">
              <p className="text-sm text-gray-700">
                {fullAddress || "Address not available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="bg-white">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            STORE LOCATION
          </h2>
        </div>

        <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden border border-gray-200">
          {fullAddress ? (
            <MapContainer
              center={defaultCenter}
              zoom={defaultZoom}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={defaultCenter}>
                <Popup>
                  <div className="text-center">
                    <p className="font-semibold">{storeSettings?.name}</p>
                    <p className="text-sm text-gray-600">{fullAddress}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Map not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
