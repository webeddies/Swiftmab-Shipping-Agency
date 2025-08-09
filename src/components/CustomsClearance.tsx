import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calculator, Clock, CheckCircle } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import customsBanner from '../images/customs-banner.jpg';
import customsImage from '../images/customs-process.jpg';

const CustomsClearance = () => {
  const processSteps = [
    {
      icon: <FileText size={24} className="text-[#FFD700]" />,
      title: "Efficient Documentation Management",
      description: "We ensure all required documents like invoices, packing lists, and certificates of origin are filled out correctly and submitted following customs rules."
    },
    {
      icon: <Calculator size={24} className="text-[#FFD700]" />,
      title: "Efficient Duty and Tax Calculations",
      description: "We guide you through the correct rates for your imports and exports, helping you stay on top of costs and avoid overpaying."
    },
    {
      icon: <Clock size={24} className="text-[#FFD700]" />,
      title: "Real-Time Tracking and Updates",
      description: "Track your shipments in real time and receive updates every step of the way for full visibility over your supply chain."
    }
  ];

  return (
    <div className="pt-0">
      {/* Banner Section */}
      <div className="relative h-52 md:h-72 lg:h-[20rem] w-full">
        <img
          src={customsBanner}
          alt="Customs Clearance Banner"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.16, 0.77, 0.47, 0.97],
              delay: 0.2
            }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold pt-10 md:pt-0 text-center text-[#FFD700]"
            style={{ fontFamily: '"Dela Gothic One", cursive' }}
          >
            Customs <span className="text-[#FFD700]">Clearance</span>
          </motion.h1>

        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#002366] mb-6 text-center">
            Your Trusted Customs Clearance Agent
          </h2>


          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Having a trustworthy customs clearing partner is crucial when navigating the complexities of international trade. Swiftmab is a trusted name in customs clearance, committed to making your import and export operations seamless and efficient. Our deep understanding of local regulations and global standards makes us the preferred choice for businesses looking to streamline their customs processes.
            </p>

            <p>
              Swiftmab ensures your goods are cleared and released on time with our reliable customs clearance services. We take the stress out of the process by handling every detail in full compliance with all relevant regulations and requirements.
            </p>
          </div>
        </motion.div>

        {/* Process Section with Image */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#002366] mb-4">
              Our Customs Clearance Process
            </h2>

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-[#002366] p-3 rounded-full">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#002366] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-700">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src={customsImage}
              alt="Customs clearance process"
              className="rounded-2xl shadow-lg object-cover w-full"
            />
          </motion.div>
        </div>

        {/* Services List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-[#002366] mb-4">
            Our Customs Services Include:
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Preparing accurate customs documentation",
              "Managing pre-entry and clearance procedures",

              "Conducting commodity inspections",
              "Classification of goods (HS codes)",
              "Duty and tax calculation",

              "Temporary import/export permits"
            ].map((service, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start"
              >
                <CheckCircle size={20} className="text-[#FFD700] mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{service}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="px-4 md:px-8 mb-12"
      >
        <div className="border border-[#002366] rounded-xl bg-white p-2">
          <div className="bg-[#002366] text-white rounded-xl p-6 md:p-10 pt-8 pb-10 shadow-lg">
            <h3
              className="text-3xl md:text-4xl font-bold mb-4 text-center"
              style={{ fontFamily: '"Dela Gothic One", cursive' }}
            >
              Streamline Your Customs Process
            </h3>
            <p className="text-xl text-gray-300 mb-6 text-center">
              Let Swiftmab handle your customs clearance for fast, compliant processing of your imports and exports.
            </p>
            <div className="text-center">
              <HashLink
                smooth
                to="/#contact"
                className="inline-block bg-[#FFD700] text-[#002366] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-colors duration-300"
              >
                Get in Touch
              </HashLink>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomsClearance;