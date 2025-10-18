import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* About Us Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Us
            </h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to our store! We are a passionate team dedicated to
                bringing you the finest selection of fashion and lifestyle
                products. Since our founding, we've been committed to offering
                exceptional quality, style, and value to our customers.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                Our journey began with a simple vision: to create a shopping
                experience that combines convenience, quality, and affordability.
                Today, we serve thousands of satisfied customers worldwide,
                offering carefully curated collections that reflect the latest
                trends and timeless classics.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                We believe in sustainable practices, ethical sourcing, and
                building lasting relationships with our customers. Every product
                we offer is selected with care, ensuring it meets our high
                standards for quality and craftsmanship.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Why Choose Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Quality Assurance
                    </h4>
                    <p className="text-sm text-gray-600">
                      Every product is carefully inspected to ensure it meets our
                      strict quality standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Fast Shipping
                    </h4>
                    <p className="text-sm text-gray-600">
                      We partner with reliable carriers to ensure your orders
                      arrive quickly and safely.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Customer Support
                    </h4>
                    <p className="text-sm text-gray-600">
                      Our dedicated team is always ready to assist you with any
                      questions or concerns.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Secure Shopping
                    </h4>
                    <p className="text-sm text-gray-600">
                      Your privacy and security are our top priorities with
                      encrypted transactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To provide our customers with exceptional products and an
              outstanding shopping experience that exceeds expectations. We
              strive to make quality fashion accessible to everyone while
              maintaining our commitment to sustainability and ethical business
              practices.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To become a leading destination for fashion-conscious shoppers
              worldwide, known for our curated collections, exceptional service,
              and commitment to sustainability. We envision a future where style
              and responsibility go hand in hand.
            </p>
          </div>
        </div>

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
              <p className="text-sm text-gray-600">support@example.com</p>
              <p className="text-sm text-gray-600">sales@example.com</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
              <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-600">+1 (555) 765-4321</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-sm text-gray-600">123 Fashion Street</p>
              <p className="text-sm text-gray-600">New York, NY 10001</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                <Clock className="w-7 h-7" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Business Hours
              </h4>
              <p className="text-sm text-gray-600">Mon - Fri: 9AM - 6PM</p>
              <p className="text-sm text-gray-600">Sat - Sun: 10AM - 4PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
