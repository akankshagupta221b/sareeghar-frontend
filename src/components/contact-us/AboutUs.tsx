import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";

const AboutUs = () => {
  const { storeSettings } = useSettingsStore();

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Get In Touch
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
              <p className="text-sm text-gray-600">{storeSettings?.email}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
              <p className="text-sm text-gray-600">
                +91 {storeSettings?.phone}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-sm text-gray-600">{storeSettings?.address}</p>
              <p className="text-sm text-gray-600">
                {storeSettings?.city}, {storeSettings?.state}{" "}
                {storeSettings?.postalCode}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <Clock className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Business Hours
              </h4>
              <p className="text-sm text-gray-600">Mon - Fri: 10AM - 9PM</p>
              <p className="text-sm text-gray-600">Sat - Sun: 10AM - 7PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
