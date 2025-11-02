import React from "react";

interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

const returnExchangePolicyData: PolicySection[] = [
  {
    id: "policy-overview",
    title: "NO RETURN & NO EXCHANGE POLICY",
    content: [
      "At Saree Ghar, every outfit is crafted with utmost care and attention to detail. As part of our commitment to maintaining high standards of quality and hygiene, we follow a strict \"No Return & No Exchange\" policy on all our products.",
    ],
  },
  {
    id: "no-returns-exchanges",
    title: "NO RETURNS OR EXCHANGES",
    content: [
      "Once an order has been placed and successfully delivered, we do not accept any return or exchange requests for reasons including (but not limited to):",
      "• Change of mind or personal preference",
      "• Incorrect size selection",
      "• Color variation (please note that color may slightly vary due to lighting or device display settings)",
      "• Fabric or texture not meeting personal expectations",
    ],
  },
  {
    id: "made-to-order",
    title: "MADE-TO-ORDER & CUSTOM PRODUCTS",
    content: [
      "Many of our garments are made to order or customized as per individual measurements and preferences. As these are specially tailored, returns, cancellations, or exchanges are not applicable.",
    ],
  },
  {
    id: "defective-wrong-product",
    title: "DEFECTIVE OR WRONG PRODUCT",
    content: [
      "We take extreme care in quality checking before dispatch. However, in the rare case you receive a defective or incorrect item, please notify us within 24 hours of delivery by emailing us at sareeghar1969@gmail.com with:",
      "• Order number",
      "• Clear photos of the product and packaging",
      "• Description of the issue",
      "Our team will review the case, and if found valid, a replacement or credit note may be issued at our discretion.",
    ],
  },
  {
    id: "color-fabric-disclaimer",
    title: "COLOR & FABRIC DISCLAIMER",
    content: [
      "• Slight color variations may occur due to photographic lighting or display settings.",
      "• Handcrafted products, embroidery, prints, or dye work may have natural irregularities that are not considered defects but add to the garment's uniqueness.",
      "Please read our Return & Exchange Policy carefully before making a purchase. By placing an order with Saree Ghar, you agree to the terms stated above.",
    ],
  },
];

export default function ReturnExchangePolicyContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-secondary border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-secondary-foreground">
            RETURN & EXCHANGE POLICY
          </h1>
          <p className="text-secondary-foreground text-lg mb-4">
            Last updated: November 2, 2025
          </p>
          <p className="text-secondary-foreground/80 text-base max-w-3xl mx-auto">
            Please read our return and exchange policy carefully to understand 
            our commitment to quality and the terms that apply to all Saree Ghar purchases
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {returnExchangePolicyData.map((section, index) => (
          <div key={section.id} className="mb-16 last:mb-0">
            <div className="grid lg:grid-cols-[300px,1fr] gap-8">
              {/* Left Side - Section Number and Title */}
              <div className="lg:sticky lg:top-8 h-fit">
                <div className="pb-4 border-b-2 border-gray-900">
                  <div className="text-sm font-bold text-gray-500 mb-2">
                    SECTION {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-4">
                {section.content.map((paragraph, idx) => (
                  <div key={idx} className="bg-gray-50 px-6 py-5">
                    <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Important Notice */}
        <div className="mt-20 pt-12 border-t-2 border-gray-200">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center mb-8">
            <h3 className="text-xl font-semibold text-red-900 mb-3">
              Important Notice
            </h3>
            <p className="text-red-800 mb-4 max-w-2xl mx-auto">
              By placing an order with Saree Ghar, you acknowledge that you have 
              read, understood, and agree to our No Return & No Exchange Policy.
            </p>
            <div className="text-sm text-red-700">
              <p className="mb-2">For defective products, contact us within <strong>24 hours</strong> of delivery:</p>
              <a 
                href="mailto:sareeghar1969@gmail.com"
                className="font-semibold text-red-900 hover:underline"
              >
                sareeghar1969@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Questions About Our Return Policy?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              If you have any questions about our return and exchange policy or 
              need to report a defective product, please contact our customer 
              support team immediately.
            </p>
            <a
              href="/contact-us"
              className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}