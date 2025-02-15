"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Star, Shield, Clock } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const RichAboutPreview = () => {
  const stats = [
    { label: "Properties Listed", value: "10,000+" },
    { label: "Happy Clients", value: "5,000+" },
    { label: "Cities Covered", value: "50+" },
    { label: "Years Experience", value: "15+" },
  ];

  const values = [
    {
      icon: Star,
      title: "Excellence",
      description:
        "We strive for excellence in every property we list and every client interaction",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building lasting relationships with our clients and communities",
    },
    {
      icon: Shield,
      title: "Trust",
      description:
        "Maintaining the highest standards of integrity and transparency",
    },
    {
      icon: Clock,
      title: "Efficiency",
      description:
        "Quick responses and streamlined processes for better results",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Visionary leader with 15 years in real estate innovation and market expertise. Pioneer in digital property solutions.",
      achievements: "Forbes 30 Under 30 • Real Estate Innovation Award",
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      bio: "Award-winning designer specialized in contemporary spaces. Former lead architect at renowned design firms.",
      achievements: "Design Excellence Award • RIBA Member",
    },
    {
      name: "Lisa Rodriguez",
      role: "Client Success Director",
      bio: "Dedicated to creating exceptional client experiences. 10+ years in luxury property management.",
      achievements: "Best Customer Service • Industry Leader Award",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 bg-gradient-to-r from-cyan-900 to-slate-900 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-slate-800/90" />
        <div className="relative max-w-[1440px] mx-auto px-4 h-full flex items-center">
          <div className="text-white space-y-6 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl font-bold"
            >
              Our Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-100"
            >
              Transforming the way people discover and connect with their
              perfect spaces since 2010
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-[1440px] mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 p-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-cyan-600 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="max-w-[1440px] mx-auto px-4 py-24">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="space-y-16"
        >
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Our Mission
            </h2>
            <p className="text-slate-600 text-lg">
              We believe everyone deserves to find their perfect space. Our
              mission is to revolutionize the real estate experience through
              innovation, exceptional service, and a deep understanding of our
              clients' needs.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <value.icon className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="space-y-16"
          >
            <div className="text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Meet Our Team
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Our experienced team of professionals is dedicated to helping
                you achieve your real estate goals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-slate-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-24 h-24 bg-cyan-100 rounded-full mb-6 mx-auto" />
                  <h3 className="text-2xl font-bold text-center mb-2 text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-cyan-600 text-center mb-4 font-medium">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-center mb-4">
                    {member.bio}
                  </p>
                  <p className="text-sm text-slate-500 text-center italic">
                    {member.achievements}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-cyan-900 to-slate-900 text-white py-24"
      >
        <div className="max-w-[1440px] mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Find Your Perfect Space?
            </h2>
            <p className="text-lg text-gray-200">
              Join thousands of satisfied clients who have found their ideal
              properties through our platform
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-cyan-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RichAboutPreview;
