import React, { useState, useEffect } from 'react';
import { Ship, Plane, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';
import bgImage from '../images/freightbg.jpg';
import { motion } from 'framer-motion';

const FreightForwarding = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative pt-40 pb-20 text-white overflow-hidden">
      {/* Background with fade-in animation */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className={`absolute inset-0 z-10 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />

      {/* Content with staggered animations */}
      <div className="relative z-20 container mx-auto px-4">
        {/* Title section - slide up with slight bounce */}
        <div className={`text-center mb-12 transition-all duration-700 delay-100 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: '"Dela Gothic One", cursive', color: '#FFD700' }}>
            Freight Forwarding
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Swiftmab is devoted to domestic and international freight business.
          </p>
        </div>

        {/* Description section - fade in with delay */}
        <div className={`max-w-4xl mx-auto mb-12 text-white/90 transition-opacity duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-lg mb-6">
            At Swiftmab, we proudly provide a full-service door-to-door shipping solution that covers everything from packing to final delivery. Our service simplifies the entire process by giving you a single point of contact for all your logistics needs, eliminating the hassle of dealing with multiple providers.
          </p>
          <p className="text-lg mb-6">
            Our experienced team takes care of every step, including packing, loading, transport, customs clearance, and delivery to the destination. In short, our door-to-door service offers a smooth, stress-free experience that guarantees your goods arrive safely and on time.
          </p>
          <p className="text-lg mb-6">
            Whether it's by sea or air, Swiftmab partners with a trusted network of global carriers to move your goods without unnecessary delays.
          </p>
          <p className="text-lg">
            Our freight forwarding solutions include end-to-end international shipping coordination, cargo documentation, and tracking. Reach out to us today to see how we can support your shipping requirements.
          </p>
        </div>


        {/* Features grid - staggered slide-up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Ship,
              title: 'Sea Freight',
              desc: 'Ideal for heavy and bulk shipments from Asia, Europe & the Americas.'
            },
            {
              icon: Plane,
              title: 'Air Freight',
              desc: 'Faster delivery for lighter goods, medical supplies, or business-critical items.'
            },
            {
              icon: CalendarClock,
              title: 'Flexible Timelines',
              desc: 'We work within your timelines and budget, striking the right balance between speed and affordability.'
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white/80 text-[#002366] p-6 rounded-lg shadow-md transition-all duration-500 delay-${400 + (index * 150)} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <item.icon size={32} className="text-[#FFD700] mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>


        {/* Process Section - Slide up animation */}
        <div className={`max-w-5xl mx-auto mb-16 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: '"Dela Gothic One", cursive', color: '#FFD700' }}>
              Swiftmab Freight Forwarding Process
            </h2>
            <p className="text-lg text-white/90">
              Our door to door service to Ghana is designed to be straightforward and hassle-free:
            </p>
          </div>

          {/* Process Steps - Staggered animation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: '1',
                title: 'Collection',
                desc: 'We pick up your goods from your specified location'
              },
              {
                icon: '2',
                title: 'Documentation',
                desc: 'Our experts handle all documentation'
              },
              {
                icon: '3',
                title: 'Shipping',
                desc: 'Sea or air transport with real-time tracking'
              },
              {
                icon: '4',
                title: 'Customs Clearance',
                desc: 'We take care of customs procedures to ensure smooth entry into Ghana'
              },
              {
                icon: '5',
                title: 'Final Delivery',
                desc: 'Doorstep delivery anywhere in Ghana'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.15) }}
                className="bg-white/90 text-[#002366] p-6 rounded-lg shadow-lg text-center"
              >
                <div className="w-12 h-12 bg-[#FFD700] text-[#002366] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-[#002366]/90">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Button - fade in with pulse effect */}
        <div className={`text-center transition-opacity duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Link
            to="/quote/freight"
            className="inline-block bg-[#FFD700] text-[#002366] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:scale-105 transition-all animate-pulse-once"
            onClick={() => window.scrollTo(0, 0)}
          >
            Request a Freight Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreightForwarding;