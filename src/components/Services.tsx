import React, { useState } from 'react';
import { Globe, Truck, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import bg1 from '../images/bg-import.jpg';
import bg2 from '../images/bg-freight.png';
import bg3 from '../images/bg-courier.jpg';

const Services = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Globe,
      title: 'Import/Export',
      description:
        'Seamless customs clearance for businesses. We handle all documentation and regulatory requirements to ensure your goods move smoothly across borders.',
      features: ['Customs Documentation', 'Regulatory Compliance', 'Duty Optimization'],
      bg: bg1,
    },
    {
      icon: Truck,
      title: 'Freight Forwarding',
      description:
        "Global logistics solutions for air, sea, and land transportation. From small packages to large cargo, we've got you covered worldwide.",
      features: ['Air & Sea Freight', 'Door-to-Door Service', 'Customs Documentation', 'Real-Time Tracking'],
      bg: bg2,
    },
    {
      icon: Package,
      title: 'Courier Services',
      description:
        'Fast and secure document and package delivery across Ghana and internationally. Your urgent shipments delivered with care and precision.',
      features: ['Same-Day Delivery', 'Secure Handling', 'Proof of Delivery'],
      bg: bg3,
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F5F5F5] relative z-0">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[#002366] uppercase tracking-widest font-medium text-sm mb-2">
            What We Offer
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#002366] mb-4"
            style={{ fontFamily: 'Dela Gothic One, cursive' }}
          >
            Our <span className="text-[#FFD700]">Services</span>
          </h2>
        </div>

        {/* Service Cards Container with background image behind only the grid */}
        <div className="relative z-0">
          {hoverIndex !== null && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 transition-all duration-700 rounded-xl pointer-events-none"
              style={{
                backgroundImage: `url(${services[hoverIndex].bg})`,
              }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 relative z-10">
            {services.map((service, index) => {
              const route =
                service.title === 'Import/Export'
                  ? '/services/import-export'
                  : service.title === 'Freight Forwarding'
                    ? '/services/freight-forwarding'
                    : '/services/courier';

              const bgPosition = ['left', 'center', 'right'][index];

              return (
                <Link
                  to={{
                    pathname: route,
                  }}
                  state={{ fromServices: true, scrollY: window.scrollY }}
                  key={index}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 group block hover:-translate-y-2 overflow-hidden"

                  style={{
                    backgroundImage: hoverIndex !== null ? `url(${services[hoverIndex].bg})` : 'none',
                    backgroundSize: '300% 100%',
                    backgroundPosition: hoverIndex !== null ? `${bgPosition} center` : 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >


                  <div className="p-6 md:p-8 min-h-[540px] flex flex-col justify-between">
                    <div>
                      <div className="bg-[#002366] w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-colors duration-300">
                        <service.icon className="text-white group-hover:text-[#002366]" size={28} />
                      </div>
                      <h3
                        className="text-2xl font-extrabold mb-3 transition-colors duration-300 group-hover:text-white"
                        style={{
                          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                          color: hoverIndex === index ? '#ffffff' : '#002366'
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <ul className="space-y-4 text-base text-[#002366] font-semibold md:group-hover:text-white">

                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center py-0.5">
                          <span className="w-2 h-2 bg-[#FFD700] rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 text-[#002366] font-bold hover:text-[#FFD700] flex items-center group-hover:translate-x-1 transition-all duration-300 text-sm">
                      Learn More
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

};

export default Services;
