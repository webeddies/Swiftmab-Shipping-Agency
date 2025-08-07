import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bannerImage from '../images/requestquotebg.jpg';
import blurBackground from '../images/quote-blur.jpg';

const RequestQuote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://formspree.io/f/mwpqnkna', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        e.currentTarget.reset();
      }
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-0">
      {/* 🔲 Top Banner - Gentle fade with subtle scale */}
      <div
        className="w-full h-64 bg-cover bg-center flex items-center justify-center pt-20"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          style={{ fontFamily: '"Dela Gothic One", cursive' }}
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2,
            ease: [0.16, 0.77, 0.47, 0.97],
            delay: 0.2
          }}
        >
          <span className="text-[#FFD700]">Request a Quote</span>
        </motion.h1>
      </div>

      {/* 📦 Blurred background wrapper */}
      <div
        className="bg-cover bg-center bg-fixed bg-no-repeat w-full"
        style={{ backgroundImage: `url(${blurBackground})` }}
      >
        <div className="backdrop-blur-sm bg-white/80 w-full px-4 py-16">
          {/* 📝 Intro Paragraph - Soft staggered fade */}
          <motion.div 
            className="max-w-3xl mx-auto mt-10 text-center text-gray-700 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 0.8,
              duration: 1.5,
              ease: [0.65, 0, 0.35, 1]
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.9,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              Thank you for considering Swiftmab! Please fill out the form below to get a quote for your shipping requirements. After reviewing your request, our team will get back to you with a competitive quote as soon as possible.
            </motion.p>
            <br />
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.1,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              We offer personalized solutions that match your unique needs and budget, so please provide us with as much information as possible to ensure an accurate quote. We are grateful for the opportunity to serve you and look forward to helping you with your shipping needs.
            </motion.p>
          </motion.div>

          {/* 📋 Quote Form - Elegant card rise */}
          <motion.form
            onSubmit={handleSubmit}
            className="mt-12 max-w-3xl mx-auto bg-[#F0F6FF]/90 rounded-lg shadow-md p-6 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.4,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {/* Form fields remain exactly the same */}
            {/* Your Name */}
            <div>
              <label className="block font-medium mb-1">Your Name <span className="text-red-500">*</span></label>
              <input name="name" required className="w-full border rounded-md px-4 py-2" />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email Address <span className="text-red-500">*</span></label>
              <input name="email" type="email" required className="w-full border rounded-md px-4 py-2" />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input name="phone" type="tel" required className="w-full border rounded-md px-4 py-2" />
            </div>

            {/* National ID Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">National ID Type <span className="text-red-500">*</span></label>
                <select name="idType" required className="w-full border rounded-md px-4 py-2 bg-white">
                  <option value="">Select ID Type</option>
                  <option value="Ghana Card">Ghana Card</option>
                  <option value="Voter's ID">Voter's ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver's License">Driver's License</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">ID Number <span className="text-red-500">*</span></label>
                <input name="idNumber" required className="w-full border rounded-md px-4 py-2" />
              </div>
            </div>

            {/* Origin + Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">Origin Country <span className="text-red-500">*</span></label>
                <input name="origin" required placeholder="e.g. China, UAE" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">Destination Country <span className="text-red-500">*</span></label>
                <input name="destination" required placeholder="e.g. Ghana, USA" className="w-full border rounded-md px-4 py-2" />
              </div>
            </div>

            {/* Weight + Packages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">Estimated Weight or Volume <span className="text-red-500">*</span></label>
                <input name="weight" required placeholder="e.g. 500 kg or 2 cbm" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">Total Packages <span className="text-red-500">*</span></label>
                <input name="packages" required placeholder="e.g. 10 cartons" className="w-full border rounded-md px-4 py-2" />
              </div>
            </div>

            {/* Shipment Date */}
            <div>
              <label className="block font-medium mb-1">Preferred Shipment Date <span className="text-red-500">*</span></label>
              <input name="date" type="date" required className="w-full border rounded-md px-4 py-2" />
            </div>

            {/* Notes */}
            <div>
              <label className="block font-medium mb-1">Special Requirements <span className="text-red-500">*</span></label>
              <textarea
                name="notes"
                rows={4}
                required
                placeholder="e.g. refrigeration, insurance, etc."
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* ✅ Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#002366] text-white px-6 py-2 rounded-md font-bold hover:bg-[#FFD700] hover:text-[#002366] transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Submit Quote Request"
                )}
              </button>
            </div>

            {/* ✅ Submission Confirmation */}
            {submitted && (
              <motion.p 
                className="text-green-600 text-center font-semibold mt-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                Thank you! Your request has been submitted successfully.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;