import React, { useState, useEffect, useRef } from 'react';
import { PackageCheck, LocateFixed, TimerReset, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgImage from '../images/courierbg.jpg';

const CourierServices = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    senderName: '',
    recipientName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    deliveryAddress: '',
    packageDetails: '',
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };
    if (showModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mwpqnkna", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setFormData({
          senderName: '',
          recipientName: '',
          email: '',
          phone: '',
          pickupAddress: '',
          deliveryAddress: '',
          packageDetails: '',
        });
        setSubmitted(true);
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative pt-40 pb-20 text-white overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-10 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-1000" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: '"Dela Gothic One", cursive', color: '#002366' }}
          >
            Courier <span style={{ color: '#FFD700' }}>Services</span>
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Same-day or next-day parcel delivery — swift, secure, and trackable.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto mb-12 text-white/90 transition-opacity duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <p className="text-lg mb-6">
            Need to send a package across Accra or to another region in Ghana? Swiftmab's courier team is on hand to
            collect and deliver documents, parcels, and small cargo directly to your recipient.
          </p>
          <p className="text-lg">
            Whether it's a business delivery or a personal item, we offer competitive rates with pickup and drop-off options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: PackageCheck,
              title: 'Safe Parcel Handling',
              desc: 'We handle your items with care — no rough handling or breakage.',
            },
            {
              icon: LocateFixed,
              title: 'Live Delivery Updates',
              desc: 'You will know where your item is at every stage of the journey.',
            },
            {
              icon: TimerReset,
              title: 'Timely Dispatch',
              desc: 'Deliveries made within 24–48 hours depending on location.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white/80 text-[#002366] p-6 rounded-lg shadow-md transition-opacity duration-500 delay-${400 + index * 150
                } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <item.icon size={32} className="text-[#FFD700] mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center transition-opacity duration-700 delay-700">
          <button
            onClick={() => {
              setShowModal(true);
              setSubmitted(false);
            }}
            className="inline-block bg-[#FFD700] text-[#002366] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300"
          >
            Book a Courier Pickup
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ y: '-100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="bg-white text-[#002366] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg p-8 relative shadow-xl"
              ref={modalRef}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-[#002366] hover:text-red-500 z-10"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center">Book a Courier Pickup</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-1" htmlFor="senderName">
                      Sender’s Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="senderName"
                      name="senderName"
                      required
                      value={formData.senderName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1" htmlFor="recipientName">
                      Recipient’s Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="recipientName"
                      name="recipientName"
                      required
                      value={formData.recipientName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Recipient's full name"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1" htmlFor="phone">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Delivery notifications number"
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1" htmlFor="email">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email for notifications"
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1" htmlFor="pickupAddress">
                      Pickup Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="pickupAddress"
                      name="pickupAddress"
                      required
                      value={formData.pickupAddress}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Pickup location"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1" htmlFor="deliveryAddress">
                      Delivery Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="deliveryAddress"
                      name="deliveryAddress"
                      required
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Delivery location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1" htmlFor="packageDetails">
                    Package Details <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="packageDetails"
                    name="packageDetails"
                    required
                    value={formData.packageDetails}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    rows={4}
                    placeholder="Describe your package"
                  />
                </div>

                <p className="text-sm text-red-600 font-semibold mb-4">
                  Note: Swiftmab Couriers do not accept checks or money orders.
                </p>

                {/* Thank-you message above submit button */}
                {submitted && (
                  <motion.p
                    className="text-green-600 text-center font-semibold"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Thank you! Your pickup request has been submitted.
                  </motion.p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#002366] text-white px-6 py-3 rounded hover:bg-[#FFD700] hover:text-[#002366] transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CourierServices;
