import React from "react";

interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

const cancellationRefundData: PolicySection[] = [
  {
    id: "cancellation",
    title: "CANCELLATION",
    content: [
      "In case we receive a cancellation notice and the order has not been processed / approved by us, we shall cancel the order and refund the entire amount within 7 days.",
      "We will not be able to cancel orders that have already been processed and shipped out by us. saree-ghar.com has the full right to decide whether an order has been processed or not.",
      "The customer agrees not to dispute the decision made by saree-ghar.com and accept saree-ghar.com decisions regarding the cancellation.",
    ],
  },
  {
    id: "debit-credit-card",
    title: "DEBIT/CREDIT CARD DETAILS",
    content: [
      "You agree, understand and confirm that the debit/credit card details provided by you for availing of services on saree-ghar.com will be correct and accurate and you shall use the debit/credit card which is lawfully owned by you, i.e., in a debit/credit card transaction, you must use your own debit/credit card.",
      "You further agree and undertake to provide the correct and valid debit/credit card details to saree-ghar.com. Further the said information will not be utilised and shared by saree-ghar.com with any of the third parties unless required for fraud verifications or by law, regulation or court order.",
      "saree-ghar.com will not be liable for any debit/credit card fraud. The liability for use of a card fraudulently will be on you and the onus to 'prove otherwise' shall be exclusively on you.",
    ],
  },
  {
    id: "user-agreement",
    title: "YOU AGREE AND CONFIRM",
    content: [
      "That in the event that a non–delivery occurs on account of a mistake by you (i.e. wrong name or address or any other wrong information) any extra cost incurred by saree-ghar.com for redelivery shall be claimed from you.",
      "That you will use the services provided by saree-ghar.com, its affiliates, consultants and contracted companies, for lawful purposes only and comply with all applicable laws and regulations while using the Site and transacting on the Site.",
      "You will provide authentic and true information in all instances where such information is requested of you. saree-ghar.com reserves the right to confirm and validate the information and other details provided by you at any point of time. If upon confirmation your details are found not to be true (wholly or partly), saree-ghar.com has the right in its sole discretion to reject the registration and debar you from using the Services of saree-ghar.com and / or other affiliated websites without prior intimation whatsoever.",
      "That the address at which delivery of the product ordered by you is to be made will be correct and proper in all respects.",
      "That before placing an order you will check the product description carefully. By placing an order for a product you agree to be bound by the conditions of sale included in the item's description.",
    ],
  },
];

export default function CancellationRefundContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-secondary border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-secondary-foreground">
            CANCELLATION & REFUND POLICY
          </h1>
          <p className="text-secondary-foreground text-lg mb-4">
            Last updated: November 1, 2025
          </p>
          <p className="text-secondary-foreground/80 text-base max-w-3xl mx-auto">
            Please read our cancellation and refund policy carefully to
            understand your rights and obligations when placing orders on
            saree-ghar.com
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {cancellationRefundData.map((section, index) => (
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
                    <p className="text-base text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Footer Notice */}
        <div className="mt-20 pt-12 border-t-2 border-gray-200">
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Questions About Cancellation or Refunds?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              If you have any questions about our cancellation and refund policy
              or need assistance with an order, please contact our customer
              support team. We're here to help!
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
