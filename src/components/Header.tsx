import { ChevronDown, Phone } from 'lucide-react';
import swiftmabLogo from '../images/swiftmab.png';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const forceSolidHeader =
    location.pathname.startsWith('/services') || location.pathname.startsWith('/quote') ||
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
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Mobile Logo (Visible below md) */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex md:hidden items-center tracking-tight"
            style={{ fontFamily: '"Dela Gothic One", cursive' }}
          >
            <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'}`}>
              Swift
            </span>
            <span className="ml-1 text-lg text-[#FFD700]">mab</span>
          </Link>

          {/* Desktop Logo (Hidden on mobile) */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="hidden md:flex items-center tracking-tight"
            style={{ fontFamily: '"Dela Gothic One", cursive' }}
          >
            <span className={`text-4xl font-bold transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'}`}>
              Swift
            </span>
            <span className="ml-1 text-2xl text-[#FFD700]">mab</span>
          </Link>

          {/* CENTER — Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
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
                className={`h-full object-contain transition-all duration-300 ${isScrolled ? 'max-h-[70px]' : 'max-h-[90px]'} ${!isScrolled ? 'drop-shadow-lg brightness-110' : ''}`}
              />
            </Link>
          </div>

          {/* RIGHT — Navigation + Call Button */}
          <div className="flex items-center space-x-6 ml-auto">
            <nav className="hidden md:flex items-center space-x-6">
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
                    <Link
                      to="/services/import-export"
                      onClick={() => {
                        setIsServicesOpen(false);
                        sessionStorage.setItem('fromServices', 'true');
                      }}
                      className="block px-4 py-3 text-[#002366] hover:bg-[#002366]/10"
                    >
                      Import/Export
                    </Link>

                    <Link
                      to="/services/freight-forwarding"
                      onClick={() => {
                        setIsServicesOpen(false);
                        sessionStorage.setItem('fromServices', 'true');
                      }}
                      className="block px-4 py-3 text-[#002366] hover:bg-[#002366]/10"
                    >
                      Freight Forwarding
                    </Link>

                    <Link
                      to="/services/courier"
                      onClick={() => {
                        setIsServicesOpen(false);
                        sessionStorage.setItem('fromServices', 'true');
                      }}
                      className="block px-4 py-3 text-[#002366] hover:bg-[#002366]/10"
                    >
                      Courier Services
                    </Link>
                  </div>
                )}
              </div>

              {/* Updated About and Contact links */}
              <HashLink
                smooth
                to="/#about"
                className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'} hover:text-[#FFD700]`}
              >
                About
              </HashLink>

              <HashLink
                smooth
                to="/#contact"
                className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'} hover:text-[#FFD700]`}
              >
                Contact
              </HashLink>
            </nav>

            {/* RIGHT — Navigation + Call Button */}
            <div className="flex items-center space-x-6 ml-auto">

              {/* Hamburger Icon (Mobile) */}
              <button
                className={`md:hidden z-[60] transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                {/* your nav items... */}
              </nav>

              {/* Call Button */}
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
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="bg-white w-64 h-full p-6 flex flex-col space-y-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button className="self-end text-[#002366]" onClick={() => setIsMobileMenuOpen(false)}>
              ✕
            </button>

            <Link
              to="/services/import-export"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#002366] font-semibold hover:text-[#FFD700]"
            >
              Import/Export
            </Link>

            <Link
              to="/services/freight-forwarding"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#002366] font-semibold hover:text-[#FFD700]"
            >
              Freight Forwarding
            </Link>

            <Link
              to="/services/courier"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#002366] font-semibold hover:text-[#FFD700]"
            >
              Courier Services
            </Link>

            <HashLink
              smooth
              to="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#002366] font-semibold hover:text-[#FFD700]"
            >
              About
            </HashLink>

            <HashLink
              smooth
              to="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#002366] font-semibold hover:text-[#FFD700]"
            >
              Contact
            </HashLink>
          </div>
        </div>
      )}


    </header>
  );
};

export default Header;