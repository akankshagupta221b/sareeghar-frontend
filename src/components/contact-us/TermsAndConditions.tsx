import React from "react";

interface TermsSection {
  id: string;
  title: string;
  content: string[];
}

const termsData: TermsSection[] = [
  {
    id: "acceptance",
    title: "ACCEPTANCE OF TERMS",
    content: [
      "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
      "These Terms and Conditions apply to all visitors, users, and others who access or use the Service. We reserve the right to update and change the Terms and Conditions by posting updates and changes to the website.",
      "Your continued use of the website after any such changes constitutes your acceptance of the new Terms and Conditions.",
    ],
  },
  {
    id: "use-license",
    title: "USE LICENSE",
    content: [
      "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
      "Under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on our website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or 'mirror' the materials on any other server.",
      "This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.",
    ],
  },
  {
    id: "user-account",
    title: "USER ACCOUNT",
    content: [
      "When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.",
      "You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.",
      "You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
      "You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.",
    ],
  },
  {
    id: "orders-payments",
    title: "ORDERS AND PAYMENTS",
    content: [
      "All orders placed through our website are subject to product availability and confirmation of the order price. We reserve the right to refuse or cancel any order for any reason at any time.",
      "Payment must be made in full before your order is processed. We accept various payment methods including credit cards, debit cards, PayPal, and other payment gateways as displayed on our website.",
      "All prices are listed in the currency specified on the website and include applicable taxes unless otherwise stated. Prices are subject to change without notice.",
      "If a payment is not received or payment method is declined, the right to use the products is revoked and your account may be suspended or terminated.",
    ],
  },
  {
    id: "shipping-delivery",
    title: "SHIPPING AND DELIVERY",
    content: [
      "We will make every effort to deliver products within the estimated timeframes specified at the time of order. However, delivery times are estimates and not guaranteed.",
      "Risk of loss and title for items purchased from our website pass to you upon delivery of the items to the carrier. You are responsible for filing any claims with carriers for damaged or lost shipments.",
      "Shipping costs are non-refundable unless the return is due to our error or a defective product. International orders may be subject to customs duties and import taxes, which are the responsibility of the customer.",
    ],
  },
  {
    id: "returns-refunds",
    title: "RETURNS AND REFUNDS",
    content: [
      "We accept returns within 30 days of delivery for most products in their original condition. Items must be unworn, unwashed, and with all original tags attached.",
      "To initiate a return, please contact our customer service team with your order number and reason for return. We will provide you with a return authorization and instructions.",
      "Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.",
      "If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.",
      "Sale items, gift cards, and certain other products may be non-refundable as specified at the time of purchase.",
    ],
  },
  {
    id: "intellectual-property",
    title: "INTELLECTUAL PROPERTY",
    content: [
      "The Service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors. The Service is protected by copyright, trademark, and other laws.",
      "Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent. You may not use any of our intellectual property without our express written permission.",
    ],
  },
  {
    id: "prohibited-uses",
    title: "PROHIBITED USES",
    content: [
      "You may not use our website for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.",
      "You agree not to: use the Service in any way that could damage, disable, overburden, or impair the Service; attempt to gain unauthorized access to any part of the Service, other accounts, computer systems or networks connected to the Service; use any robot, spider, scraper or other automated means to access the Service; or interfere with or disrupt the Service or servers or networks connected to the Service.",
    ],
  },
  {
    id: "limitation-liability",
    title: "LIMITATION OF LIABILITY",
    content: [
      "In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
      "Our liability is limited to the maximum extent permitted by law. In no event shall our aggregate liability exceed the amount you paid for the product or service that gave rise to the claim.",
    ],
  },
  {
    id: "indemnification",
    title: "INDEMNIFICATION",
    content: [
      "You agree to defend, indemnify and hold harmless our company and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses arising from your use of and access to the Service, your violation of any term of these Terms, or your violation of any third party right.",
    ],
  },
  {
    id: "governing-law",
    title: "GOVERNING LAW",
    content: [
      "These Terms shall be governed and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions.",
      "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions will remain in effect.",
    ],
  },
  {
    id: "changes-terms",
    title: "CHANGES TO TERMS",
    content: [
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.",
      "What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.",
    ],
  },
  {
    id: "contact",
    title: "CONTACT INFORMATION",
    content: [
      "If you have any questions about these Terms and Conditions, please contact our customer service team through the contact information provided on our website.",
      "We are committed to resolving any disputes or concerns you may have in a timely and professional manner.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-secondary border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-secondary-foreground">
            TERMS AND CONDITIONS
          </h1>
          <p className="text-secondary-foreground text-lg mb-4">
            Last updated: October 17, 2025
          </p>
          <p className="text-secondary-foreground/80 text-base max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our
            Service. By accessing or using our website, you agree to be bound by
            these Terms and Conditions.
          </p>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {termsData.map((section, index) => (
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
              Questions About Our Terms?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about these Terms and
              Conditions, please don't hesitate to contact our customer support
              team. We're here to help clarify any points you may find unclear.
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
