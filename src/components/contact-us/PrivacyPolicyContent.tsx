import React from "react";

interface PrivacySection {
  id: string;
  title: string;
  content: string[];
}

const privacyData: PrivacySection[] = [
  {
    id: "introduction",
    title: "INTRODUCTION",
    content: [
      "This Privacy Policy establishes the Rules for storing and accessing information on the User's devices using cookies, to provide electronic services requested by the User.",
      "We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from our store.",
      "By using our website, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our website.",
    ],
  },
  {
    id: "information-collection",
    title: "INFORMATION WE COLLECT",
    content: [
      "We collect information that you provide directly to us when you create an account, place an order, subscribe to our newsletter, or communicate with us. This may include your name, email address, postal address, phone number, payment information, and any other information you choose to provide.",
      "We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visits. We use cookies and similar tracking technologies to collect this information.",
      "If you make a purchase, we collect information necessary to process your transaction, including payment card details (processed securely through third-party payment processors), billing and shipping addresses, and order details.",
      "We may also collect information about your preferences, interests, and shopping behavior to provide you with a more personalized experience and to improve our services.",
    ],
  },
  {
    id: "use-information",
    title: "HOW WE USE YOUR INFORMATION",
    content: [
      "We use the information we collect to process and fulfill your orders, including processing payments, arranging shipping, and providing you with invoices and order confirmations.",
      "Your information helps us communicate with you about your orders, respond to your inquiries, provide customer support, and send you important updates about our services.",
      "We use your data to personalize your shopping experience, show you relevant products, send you marketing communications (if you've opted in), and improve our website functionality and user experience.",
      "We analyze usage patterns and trends to understand how our customers use our website, which helps us improve our products, services, and marketing strategies.",
      "Your information is used to prevent fraudulent transactions, protect against malicious activity, and ensure the security of our website and services.",
    ],
  },
  {
    id: "cookies",
    title: "COOKIES AND TRACKING TECHNOLOGIES",
    content: [
      "We use cookies, which are small text files stored on your device, to enhance your browsing experience, remember your preferences, and analyze how you use our website.",
      "Essential cookies are necessary for the website to function properly and cannot be disabled. These include cookies that enable you to log into secure areas, use a shopping cart, and make use of e-billing services.",
      "Performance cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve the website's functionality and user experience.",
      "Functionality cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, more personalized features.",
      "Targeting/advertising cookies are used to deliver advertisements more relevant to you and your interests. They also help measure the effectiveness of advertising campaigns.",
      "You can control and manage cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.",
    ],
  },
  {
    id: "information-sharing",
    title: "INFORMATION SHARING AND DISCLOSURE",
    content: [
      "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or serving our customers, as long as they agree to keep this information confidential.",
      "We share information with payment processors to facilitate transactions, shipping companies to deliver your orders, and marketing service providers to send communications on our behalf (if you've opted in).",
      "We may disclose your information if required by law, to enforce our site policies, protect our or others' rights, property, or safety, or to comply with legal processes such as court orders or subpoenas.",
      "In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred to the acquiring entity, subject to the same privacy protections.",
    ],
  },
  {
    id: "data-security",
    title: "DATA SECURITY",
    content: [
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "All payment transactions are processed through secure payment gateways that comply with PCI-DSS standards. We do not store complete credit card information on our servers.",
      "We use SSL (Secure Socket Layer) encryption technology to protect sensitive information during transmission. Our website is secured with HTTPS protocol.",
      "Despite our security measures, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.",
      "We regularly review and update our security practices to ensure they remain effective against evolving threats.",
    ],
  },
  {
    id: "data-retention",
    title: "DATA RETENTION",
    content: [
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
      "Order information is retained for accounting, tax, and legal purposes. Account information is retained until you request deletion or your account becomes inactive for an extended period.",
      "Marketing communication preferences are retained until you unsubscribe or request deletion. Analytics and usage data may be retained in aggregated, anonymized form indefinitely.",
    ],
  },
  {
    id: "your-rights",
    title: "YOUR PRIVACY RIGHTS",
    content: [
      "You have the right to access, update, or delete the personal information we hold about you. You can do this by logging into your account or contacting our customer support team.",
      "You have the right to opt out of receiving marketing communications from us at any time by clicking the unsubscribe link in our emails or updating your account preferences.",
      "You can request a copy of your personal data in a structured, commonly used, and machine-readable format (data portability).",
      "You have the right to object to the processing of your personal information in certain circumstances, such as for direct marketing purposes.",
      "If you believe we have processed your information unlawfully, you have the right to lodge a complaint with the relevant data protection authority.",
      "To exercise any of these rights, please contact us using the contact information provided at the end of this policy.",
    ],
  },
  {
    id: "children-privacy",
    title: "CHILDREN'S PRIVACY",
    content: [
      "Our website is not intended for children under the age of 13 (or the applicable age of consent in your jurisdiction). We do not knowingly collect personal information from children.",
      "If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information as quickly as possible.",
      "If you believe we have collected information from a child, please contact us immediately so we can take appropriate action.",
    ],
  },
  {
    id: "international-transfers",
    title: "INTERNATIONAL DATA TRANSFERS",
    content: [
      "Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country.",
      "When we transfer your information internationally, we ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.",
      "By using our website and providing your information, you consent to the transfer of your information to countries outside your country of residence.",
    ],
  },
  {
    id: "third-party-links",
    title: "THIRD-PARTY LINKS",
    content: [
      "Our website may contain links to third-party websites, plugins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you.",
      "We do not control these third-party websites and are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    id: "policy-changes",
    title: "CHANGES TO THIS PRIVACY POLICY",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors.",
      "We will notify you of any material changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date at the top of this policy.",
      "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.",
    ],
  },
  {
    id: "contact-information",
    title: "CONTACT INFORMATION",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer or customer support team.",
      "We will respond to your inquiry within a reasonable timeframe and work with you to address any concerns you may have about your privacy.",
      "You can reach us through the contact information provided on our website's Contact Us page.",
    ],
  },
];

export default function PrivacyPolicyContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-secondary border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-secondary-foreground">
            PRIVACY POLICY
          </h1>
          <p className="text-secondary-foreground text-lg mb-4">
            Last updated: October 17, 2025
          </p>
          <p className="text-secondary-foreground/80 text-base max-w-3xl mx-auto">
            This Privacy Policy establishes the Rules for storing and accessing
            information on the User's devices using cookies, to provide
            electronic services requested by the User
          </p>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {privacyData.map((section, index) => (
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
              Questions About Your Privacy?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about how we handle your
              personal information, please don't hesitate to contact our Data
              Protection Officer or customer support team.
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
