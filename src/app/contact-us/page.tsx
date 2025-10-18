"use client";

import React from "react";
import HelpCenter from "@/components/contact-us/HelpCenter";
import ContactForm from "@/components/contact-us/ContactForm";
import AboutUs from "@/components/contact-us/AboutUs";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen">
      {/* Help Center Section */}
      <HelpCenter />

      {/* Contact Form Section */}
      <ContactForm />

      {/* About Us Section */}
      <AboutUs />
    </div>
  );
};

export default ContactUsPage;
