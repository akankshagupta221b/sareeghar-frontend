import React, { useState } from "react";
import { Search, Plus, X, MessageCircle } from "lucide-react";

export default function PrivacyPolicy() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [showChat, setShowChat] = useState(true);

  const faqData = {
    "DEFINITIONSOF CONCEPTS": [
      {
        id: "cs1",
        answer:
          "You can contact our customer service center through multiple channels: phone, email, or live chat. Our support team is available to help you with any questions or concerns.",
      },
      {
        id: "cs2",
        answer:
          "Our customer service center is available Monday through Friday from 9:00 AM to 6:00 PM, and on weekends from 10:00 AM to 4:00 PM.",
      },
      {
        id: "cs3",
        answer:
          "Yes, our customer service representatives can assist you in placing an order. They can guide you through the entire ordering process and help you select the right products.",
      },
    ],
    PAYMENT: [
      {
        id: "pm1",
        answer:
          "We accept various payment methods including credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cash on delivery in select locations.",
      },
      {
        id: "pm2",
        answer:
          "If you have chosen a product whose value exceeds 100 euros, according to the law of Ukraine, you must pay value added tax (VAT), which is calculated by the State Customs. As a result of the purchase, you pay the full price of the goods, which already includes customs duty and value added tax (VAT and customs duty, which is calculated by the State Customs Service of Ukraine on the day of importation into the country in UAH at the NBU rate according to this formula - VAT = (cost of goods - 100 euros + customs duty (cost of goods - 150 euros)) * 10%) + 20%. On the day of importing the parcel to Ukraine, you will receive an SMS to the phone number you specified when placing the order, from the State Customs Service of Ukraine with the amount of tax and details for payment. After paying the tax (at the bank, terminal or online) your parcel will be handed over to the Meest Courier for delivery or sent to the Nova Poshta branch specified by you.",
      },
    ],
    "TECHNICAL PROBLEMS": [
      {
        id: "tp1",
        answer:
          "To subscribe to our newsletter, scroll to the bottom of any page and enter your email address in the newsletter signup form. You can also manage your subscription preferences in your account settings.",
      },
      {
        id: "tp2",
        answer:
          "Your account may be temporarily blocked if we detect suspicious activity or violations of our terms of service. If you believe your account was blocked in error, please contact customer support.",
      },
      {
        id: "tp3",
        answer:
          "To delete your account, go to Account Settings > Privacy > Delete Account. Please note that this action is permanent and cannot be undone. All your data will be permanently removed.",
      },
      {
        id: "tp4",
        answer:
          'If you\'re having trouble logging in, try resetting your password using the "Forgot Password" link. If the issue persists, please contact our customer support team for assistance.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-secondary border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-secondary-foreground">
            PRIVACY POLICY
          </h1>
          <p className="text-secondary-foreground text-lg mb-10">
            This Privacy Policy establishes the Rules for storing and accessing
            informationon the User’s devices using cookies, to provide
            electronic services requested by the User
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {Object.entries(faqData).map(([category, items]) => (
          <div key={category} className="mb-16 last:mb-0">
            <div className="grid lg:grid-cols-[300px,1fr] gap-8">
              {/* Left Side - Category Title */}
              <div className="lg:sticky lg:top-8 h-fit">
                <div className="pb-4 border-b-2 border-gray-900">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {category}
                  </h2>
                </div>
              </div>

              {/* Right Side - FAQ Items */}
              <div className="">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`overflow-hidden transition-all`}
                  >
                    {/* Answer */}
                    <div className="px-6 pb-6 pt-1 bg-gray-50 ">
                      <p className="text-base text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
