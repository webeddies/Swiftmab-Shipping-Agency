// ScrollManager.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // On route change without a hash, scroll to top
    if (!location.hash) {
      window.scrollTo(0, 0);
    }

    // If there's a hash in the URL, scroll to the corresponding element
    else {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return null;
};

export default ScrollManager;
