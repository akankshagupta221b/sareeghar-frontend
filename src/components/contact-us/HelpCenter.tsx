import React, { useState } from "react";
import { Search, Plus, X, MessageCircle } from "lucide-react";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [showChat, setShowChat] = useState(true);

  const faqData = {
    "CUSTOMER SERVICE CENTER": [
      {
        id: "cs1",
        question: "HOW CAN I CONTACT THE CUSTOMER SERVICE CENTER?",
        answer:
          "You can contact our customer service center through multiple channels: phone, email, or live chat. Our support team is available to help you with any questions or concerns.",
      },
      {
        id: "cs2",
        question: "AT WHAT DAY CAN I CONTACT THE CUSTOMER SERVICE CENTER?",
        answer:
          "Our customer service center is available Monday through Friday from 9:00 AM to 6:00 PM, and on weekends from 10:00 AM to 4:00 PM.",
      },
      {
        id: "cs3",
        question: "CAN A CUSTOMER SERVICE CENTER EMPLOYEE MAKE AN ORDER OF ME?",
        answer:
          "Yes, our customer service representatives can assist you in placing an order. They can guide you through the entire ordering process and help you select the right products.",
      },
    ],
    PAYMENT: [
      {
        id: "pm1",
        question: "HOW CAN I PAY FOR ORDERS?",
        answer:
          "We accept various payment methods including credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cash on delivery in select locations.",
      },
      {
        id: "pm2",
        question: "WHAT SHOULD I KNOW WHEN BUYING GOODS MORE THAN 100 EUROS?",
        answer:
          "If you have chosen a product whose value exceeds 100 euros, according to the law of Ukraine, you must pay value added tax (VAT), which is calculated by the State Customs. As a result of the purchase, you pay the full price of the goods, which already includes customs duty and value added tax (VAT and customs duty, which is calculated by the State Customs Service of Ukraine on the day of importation into the country in UAH at the NBU rate according to this formula - VAT = (cost of goods - 100 euros + customs duty (cost of goods - 150 euros)) * 10%) + 20%. On the day of importing the parcel to Ukraine, you will receive an SMS to the phone number you specified when placing the order, from the State Customs Service of Ukraine with the amount of tax and details for payment. After paying the tax (at the bank, terminal or online) your parcel will be handed over to the Meest Courier for delivery or sent to the Nova Poshta branch specified by you.",
      },
    ],
    "TECHNICAL PROBLEMS": [
      {
        id: "tp1",
        question: "HOW TO SUBSCRIBE FROM THE NEWSLETTER?",
        answer:
          "To subscribe to our newsletter, scroll to the bottom of any page and enter your email address in the newsletter signup form. You can also manage your subscription preferences in your account settings.",
      },
      {
        id: "tp2",
        question: "CAN MY ACCOUNT BE BLOCKED?",
        answer:
          "Your account may be temporarily blocked if we detect suspicious activity or violations of our terms of service. If you believe your account was blocked in error, please contact customer support.",
      },
      {
        id: "tp3",
        question: "I WANT TO DELETE MY ACCOUNT. HOW TO DO IT?",
        answer:
          "To delete your account, go to Account Settings > Privacy > Delete Account. Please note that this action is permanent and cannot be undone. All your data will be permanently removed.",
      },
      {
        id: "tp4",
        question: "I CAN'T LOG IN TO MY ACCOUNT. WHAT SHALL I DO?",
        answer:
          'If you\'re having trouble logging in, try resetting your password using the "Forgot Password" link. If the issue persists, please contact our customer support team for assistance.',
      },
    ],
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqData = Object.entries(faqData).reduce(
    (acc, [category, items]) => {
      const filtered = items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-secondary border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
            Help Center
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Find answers to your questions quickly
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {Object.entries(filteredFaqData).map(([category, items]) => (
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
                    className={`overflow-hidden transition-all ${
                      expandedItems[item.id]
                        ? "border-gray-900 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-base text-gray-900 pr-4">
                        {item.question}
                      </span>
                      <div
                        className={`flex-shrink-0 transition-transform duration-200 ${
                          expandedItems[item.id] ? "rotate-45" : ""
                        }`}
                      >
                        <Plus className="w-6 h-6 text-gray-900" />
                      </div>
                    </button>

                    {/* Answer */}
                    {expandedItems[item.id] && (
                      <div className="px-6 pb-6 pt-1 bg-gray-50 border-t border-gray-200">
                        <p className="text-base text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* No Results */}
        {Object.keys(filteredFaqData).length === 0 && searchQuery && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </p>
            <p className="text-gray-600">
              We couldn't find any results for "
              <span className="font-medium">{searchQuery}</span>"
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try using different keywords or check your spelling
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
