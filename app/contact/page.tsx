"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

// Define types for form data
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define types for form errors
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const ContactPreview = () => {
  // State for form data and errors
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes with type safety
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-72 bg-gradient-to-r from-cyan-900 to-slate-900 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-slate-800/90" />
        <div className="relative max-w-[1440px] mx-auto px-4 h-full flex items-center">
          <div className="text-white space-y-6 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-100"
            >
              We're here to help you find your perfect space
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-4 mt-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-slate-50 ${
                        errors.name ? "border-red-500" : "border-slate-200"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="absolute text-sm text-red-500 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-slate-50 ${
                        errors.email ? "border-red-500" : "border-slate-200"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="absolute text-sm text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-slate-50 ${
                      errors.subject ? "border-red-500" : "border-slate-200"
                    }`}
                    placeholder="How can we help?"
                  />
                  {errors.subject && (
                    <p className="absolute text-sm text-red-500 mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-slate-50 ${
                      errors.message ? "border-red-500" : "border-slate-200"
                    }`}
                    placeholder="Tell us more about what you're looking for..."
                  />
                  {errors.message && (
                    <p className="absolute text-sm text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-3 px-6 rounded-md font-medium hover:from-cyan-700 hover:to-cyan-800 transition-all"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600 group-hover:text-cyan-600 transition-colors">
                contact@example.com
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Phone</h3>
              <p className="text-slate-600 group-hover:text-cyan-600 transition-colors">
                +1 (555) 123-4567
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Address</h3>
              <p className="text-slate-600 group-hover:text-cyan-600 transition-colors">
                123 Design Street, NY 10001
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-24 h-96 bg-slate-200 w-full">
        <div className="h-full w-full flex items-center justify-center text-slate-400">
          Map would be rendered here
        </div>
      </div>
    </div>
  );
};

export default ContactPreview;
