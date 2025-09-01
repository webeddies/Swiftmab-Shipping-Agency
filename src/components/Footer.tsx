import React from 'react';
import { Facebook, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  return (
    <footer className="bg-[#002366] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-baseline font-bold transition-colors duration-300"
                style={{ fontFamily: '"Dela Gothic One", cursive' }}
              >
                <span className="text-4xl text-white">Swift</span>
                <span className="ml-1 text-2xl text-[#FFD700]">mab</span>
              </Link>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted logistics partner in Ghana. We provide reliable, affordable, and efficient shipping solutions
              for businesses and individuals across the globe.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61579656132870" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-lg hover:bg-[#FFD700] hover:text-[#002366] transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@swiftmabshippingagency?_t=ZM-8zDwzNLNelB&_r=1" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-lg hover:bg-[#FFD700] hover:text-[#002366] transition-all duration-300">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-[#FFD700]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <HashLink smooth to="/#home" className="text-left text-gray-300 hover:text-[#FFD700] transition-colors duration-300">
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#services" className="text-left text-gray-300 hover:text-[#FFD700] transition-colors duration-300">
                  Services
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#about" className="text-left text-gray-300 hover:text-[#FFD700] transition-colors duration-300">
                  About Us
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#contact" className="text-left text-gray-300 hover:text-[#FFD700] transition-colors duration-300">
                  Contact
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-[#FFD700]">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/import-export" className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300">
                  Import/Export
                </Link>
              </li>
              <li>
                <Link to="/services/freight-forwarding" className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300">
                  Freight Forwarding
                </Link>
              </li>
              <li>
                <Link to="/services/courier" className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300">
                  Courier Services
                </Link>
              </li>
              <li>
                <Link to="/services/customs-clearance" className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300">
                  Customs Clearance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* WhatsApp Button */}
      <a
        href="https://wa.me/233541671196"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 mb-4 md:mb-0">
              <p>&copy; 2025 Swiftmab Shipping Agency. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
