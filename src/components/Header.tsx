import { ChevronDown, Phone } from 'lucide-react';
import swiftmabLogo from '../images/swiftmab.png';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';




const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const forceSolidHeader =
    location.pathname.startsWith('/services') ||
    location.pathname.startsWith('/quote') ||
    location.pathname === '/about';

  useEffect(() => {
    const handleScroll = () => {
      if (forceSolidHeader) {
        setIsScrolled(true);
      } else {
        setIsScrolled(window.scrollY > 10);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceSolidHeader]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md h-24' : 'bg-transparent h-32'}`}>
      <div className="container mx-auto px-4 h-full relative">
        <div className="flex items-center justify-between h-full">
          {/* MOBILE HEADER STRUCTURE */}
          <div className="flex items-center justify-between md:hidden w-full relative h-full">

            {/* Left — Swiftmab */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="font-bold tracking-tight"
              style={{ fontFamily: '"Dela Gothic One", cursive' }}
            >
              <span className={`text-2xl transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'}`}>
                Swift
              </span>
              <span className="ml-1 text-lg text-[#FFD700]">mab</span>
            </Link>

            {/* Center — Logo (only when scrolled) */}
            {isScrolled && (
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link
                  to="/"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <img
                    src={swiftmabLogo}
                    alt="Swiftmab Logo"
                    className="h-[50px] object-contain transition-all duration-300 max-h-[50px]"
                  />

                </Link>
              </div>
            )}


            {/* Right — Hamburger */}
            <button
              className={`transition-colors duration-300 border border-white rounded-lg p-[2px] ${isScrolled ? 'text-[#002366]' : 'text-white'}`}
              style={{ width: '28px', height: '28px' }}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </div>


          {/* Desktop Name */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="hidden md:flex items-center tracking-tight ml-12"
            style={{ fontFamily: '"Dela Gothic One", cursive' }}
          >
            <span className={`text-xl md:text-4xl font-bold transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'}`}>
              Swift
            </span>
            <span className="ml-1 text-sm md:text-2xl text-[#FFD700]">mab</span>
          </Link>

          {/* Desktop Centered Logo (only when scrolled) */}
          {isScrolled && (
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <img
                  src={swiftmabLogo}
                  alt="Swiftmab Logo"
                  className="h-[85px] object-contain transition-all duration-300 max-h-[85px]"
                />

              </Link>
            </div>
          )}



          {/* Desktop Navigation + Call Us */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            <nav className="flex items-center space-x-6">
              <div className="relative group">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center space-x-1 font-medium transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'} hover:text-[#FFD700]`}
                >
                  <span>Services</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isServicesOpen && (
                  <div ref={dropdownRef} className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50">
                    <Link to="/services/import-export" onClick={() => { setIsServicesOpen(false); sessionStorage.setItem('fromServices', 'true'); }} className="block px-4 py-3 text-[#002366] hover:bg-[#002366]/10">Import/Export</Link>
                    <Link to="/services/freight-forwarding" onClick={() => { setIsServicesOpen(false); sessionStorage.setItem('fromServices', 'true'); }} className="block px-4 py-3 text-[#002366] hover:bg-[#002366]/10">Freight Forwarding</Link>
                    <Link to="/services/courier" onClick={() => { setIsServicesOpen(false); sessionStorage.setItem('fromServices', 'true'); }} className="block px-4 py-3 text-[#002366] hover:bg-[#002366]/10">Courier Services</Link>
                  </div>
                )}
              </div>

              <HashLink smooth to="/#about" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'} hover:text-[#FFD700]`}>About</HashLink>
              <HashLink smooth to="/#contact" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'} hover:text-[#FFD700]`}>Contact</HashLink>
            </nav>

            {/* Call Button (Desktop Only) */}
            <a
              href="tel:0546921087"
              className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300 ${isScrolled
                ? 'bg-[#002366] text-white hover:bg-[#FFD700] hover:text-[#002366]'
                : 'bg-white/20 text-white backdrop-blur-sm hover:bg-[#FFD700] hover:text-[#002366] border border-white/30'
                }`}
            >
              <Phone size={16} />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY (replace your old overlay with this) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          // backdrop (fades)
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden={!isMobileMenuOpen}
          >
            {/* Menu panel (drops down from top) */}
            <motion.div
              key="mobile-panel"
              initial={{ y: '-12%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-6%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              // position the panel just under the header; header is h-24 when scrolled (6rem) and h-32 when not (8rem)
              style={{ top: isScrolled ? '6rem' : '8rem' }}
              className="absolute left-1/2 transform -translate-x-1/2 w-64 bg-gray-100 border border-white/30 rounded-xl shadow-lg p-2 z-60"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()} // don't close when clicking inside
            >
              <ul className="flex flex-col divide-y divide-gray-200">
                <li>
                  <Link
                    to="/services/import-export"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-[#002366] font-semibold hover:bg-gray-200 rounded-md"
                  >
                    Import/Export
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services/freight-forwarding"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-[#002366] font-semibold hover:bg-gray-200 rounded-md"
                  >
                    Freight Forwarding
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services/courier"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-[#002366] font-semibold hover:bg-gray-200 rounded-md"
                  >
                    Courier Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services/customs-clearance"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-[#002366] font-semibold hover:bg-gray-200 rounded-md"
                  >
                    Customs Clearance
                  </Link>
                </li>

                <li>
                  <HashLink
                    smooth
                    to="/#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-[#002366] font-semibold hover:bg-gray-200 rounded-md"
                  >
                    About
                  </HashLink>
                </li>

                <li>
                  <HashLink
                    smooth
                    to="/#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-[#002366] font-semibold hover:bg-gray-200 rounded-md"
                  >
                    Contact
                  </HashLink>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </header>
  );
};

export default Header;
