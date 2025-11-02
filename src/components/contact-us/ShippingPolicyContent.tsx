import React from "react";

interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

const shippingPolicyData: PolicySection[] = [
  {
    id: "shipping-process",
    title: "SHIPPING PROCESS",
    content: [
      "Once Saree Ghar verifies the address of the User for shipment purposes through the Company's Database along with Area Pin Code, the Website shall then Process the transaction before any Purchase.",
      "In case Saree Ghar cannot deliver the Purchase order to the User's given address or the Delivery Company cannot ship it, then Saree Ghar will ask for another shipping address to deliver the same.",
      "The User must ensure the payment and shipping address is within India. It will be the responsibility of the User to collect the order and pay the amount of the order from the alternate given address, once the said alternative address has been submitted by the User.",
      "Confirmation from the logistics service provider of successful delivery to the alternative shipping address is deemed as acceptance of delivery by the User and Saree Ghar will have no liability in this regard.",
    ],
  },
  {
    id: "delivery-timeframe",
    title: "DELIVERY TIMEFRAME",
    content: [
      "The Saree Ghar will endeavor to send the order consisting of the product(s) listed in each Delivery Confirmation prior to the date indicated in the Delivery Confirmation in question or, if no delivery date is specified, in the estimated timeframe indicated when selecting the delivery method and, in any case, within a maximum period of 30 days from the date of the Order Confirmation.",
      "Nonetheless, there may be delays for reasons such as the occurrence of unforeseen circumstances or the delivery zone. If, for any reason, Saree Ghar is unable to comply with the delivery date, then Saree Ghar will inform the User of that situation and will give the User the option to continue with the purchase, establishing a new delivery date, or cancel the order with full reimbursement of the amount paid.",
    ],
  },
  {
    id: "delivery-attempts",
    title: "DELIVERY ATTEMPTS",
    content: [
      "Saree Ghar may choose to deliver the ordered products to the User through the logistics service providers. For the purpose of effecting the delivery, the delivery person may connect with the user before the delivery.",
      "Deliveries cannot be rescheduled after the order has been placed. The said logistics service provider will make a maximum of three [3] attempts to deliver the User's order.",
      "In case, the User is not reachable, available or does not accept delivery of products in these attempts, Saree Ghar reserves the right to cancel the order at its discretion. The User may be informed of such cancellation by email or SMS at the email address or mobile number provided to us.",
      "The User agrees not to hold Saree Ghar liable for any cancellation. Title and risk of loss for all products ordered by the User shall pass on to the User upon delivery of the products at the shipping address provided by the User.",
    ],
  },
  {
    id: "delayed-delivery",
    title: "DELAYED DELIVERY",
    content: [
      "Sometimes, delivery may take longer due to climatic issues, natural calamities, disruption in the supply chains, orders / notifications etc. issued by statutory authorities / competent authorities, political disruptions, logistics service provider related challenges, product lost in transit, other unforeseen circumstances or event beyond the control of Saree Ghar or logistics service provider etc.",
      "If the estimated delivery date has passed and the User has still not received their order, please contact us and we will take steps to track the User's package. We request the Users to check their emails and SMS regularly for such updates.",
      "Saree Ghar will not compensate for any mental agony or inconvenience or loss caused due to delay in delivery for any reason. The User may be informed by email or SMS at the email address or mobile number provided to us if any product in the order is unavailable or is delayed or lost in transit.",
    ],
  },
  {
    id: "pricing-taxes",
    title: "PRICING & TAXES",
    content: [
      "For customers within India, all prices specified on the website are inclusive of Indian taxes and VAT.",
    ],
  },
  {
    id: "customs-clearance",
    title: "CUSTOMS CLEARANCE & DELIVERY PARTNERSHIP",
    content: [
      "To streamline your shopping experience, we have partnered with reputable courier service Shiprocket to handle customs clearance and facilitate delivery to your doorstep.",
      "Payment for any applicable customs duties is required prior to delivery, upon the arrival of your shipment at the customs checkpoint. Once these duties are settled, your shipment will be promptly released and delivered to its designated destination.",
    ],
  },
];

export default function ShippingPolicyContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-secondary border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-secondary-foreground">
            SHIPPING POLICY
          </h1>
          <p className="text-secondary-foreground text-lg mb-4">
            Last updated: November 2, 2025
          </p>
          <p className="text-secondary-foreground/80 text-base max-w-3xl mx-auto">
            Learn about our shipping process, delivery timeframes, and policies 
            to ensure a smooth delivery experience for your Saree Ghar orders
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {shippingPolicyData.map((section, index) => (
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
              Questions About Shipping or Delivery?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              If you have any questions about our shipping policy, delivery 
              tracking, or need assistance with your order, please contact our 
              customer support team. We're here to help!
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