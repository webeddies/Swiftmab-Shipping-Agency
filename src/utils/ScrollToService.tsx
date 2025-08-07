// utils/ScrollToService.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToServicesEffect = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we're coming from a service detail page
    if (location.state?.fromServices) {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        // Use a slightly longer timeout to ensure the DOM is fully ready
        setTimeout(() => {
          servicesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
        
        // Clear the state after scrolling to prevent repeated behavior
        window.history.replaceState({ ...location.state, fromServices: false }, '');
      }
    }
  }, [location]);

  return null;
};

export default ScrollToServicesEffect;