import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const initialFormData = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('https://formspree.io/f/xnnbqagz', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });


      if (res.ok) {
        setSubmitted(true);
        setFormData(initialFormData);

        // ✅ Hide success message after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-[#002366] mb-6"
              style={{ fontFamily: '"Dela Gothic One", cursive' }}
            >
              Contact <span className="text-[#FFD700]">Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help. Contact us now to get a quote for all your global shipping needs.
            </p>
          </motion.div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div>
              <h3
                className="text-2xl font-bold text-[#002366] mb-8"
                style={{ fontFamily: '"Dela Gothic One", cursive' }}
              >
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#002366] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366] mb-1">Phone & WhatsApp</h4>
                    <a
                      href="tel:0541671196"
                      className="text-[#FFD700] hover:underline text-lg font-medium"
                    >
                      054 167 1196
                    </a>
                    <p className="text-gray-600 text-sm mt-1">Click to call or WhatsApp us</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#002366] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366] mb-1">Email</h4>
                    <a
                      href="mailto:swiftmabshippingagency1@gmail.com"
                      className="text-[#FFD700] hover:underline break-all"
                    >
                      swiftmabshippingagency1@gmail.com
                    </a>

                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#002366] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366] mb-1">Address</h4>
                    <p className="text-gray-700">
                      Aviance Cargo Village, Airport<br />
                      P.O. Box 999 - Accra, Ghana
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#002366] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002366] mb-1">Business Hours</h4>
                    <p className="text-gray-700">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 8:00 AM - 4:00 PM<br />

                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8267739774985!2d-0.16692708570459297!3d5.605161235282633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0x72f7455d9d0b7a1!2sKotoka%20International%20Airport!5e0!3m2!1sen!2sgh!4v1637751234567!5m2!1sen!2sgh"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Swiftmab Shipping Agency Location"
                ></iframe>
              </div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#F5F5F5] rounded-xl p-8">
              {/* Contact Form */}
              <div>
                <div className="bg-[#F5F5F5] rounded-xl p-8">
                  <h3
                    className="text-2xl font-bold text-[#002366] mb-6"
                    style={{ fontFamily: '"Dela Gothic One", cursive' }}
                  >
                    HAVE A QUESTION OR COMMENT?
                  </h3>
                  <p className="text-sm mt-1 text-[#002366] max-w-3xl mx-auto mb-3">
                    Please feel free to reach out to us using the contact form below.
                  </p>





                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                      <h4 className="text-xl font-bold text-green-500 mb-2">Thank You!</h4>
                      <p className="text-gray-600">
                        We've received your message and will get back to you within few hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#002366] font-medium mb-2">Full Name
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-[#002366] font-medium mb-2">Phone Number
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[#002366] font-medium mb-2">Email Address
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>



                      {/* Message */}
                      <div>
                        <label className="block text-[#002366] font-medium mb-2">Message
                          <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                          placeholder="Tell us about your shipping needs..."
                        ></textarea>
                      </div>



                      {/* ✅ Submit Button */}
                      <div className="text-right">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#002366] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] hover:text-[#002366] transition-all duration-300 flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                          ) : (
                            "Send Message"
                          )}
                          <Send className="ml-2" size={20} />
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
                          Thank you! Your message has been sent.
                        </motion.p>
                      )}





                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </section >
  );
};

export default Contact;
