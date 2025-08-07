import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Save scroll position when leaving
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        `scrollPos:${location.pathname}`,
        window.scrollY.toString()
      );
    };

    window.addEventListener('beforeunload', saveScrollPosition);
    return () => window.removeEventListener('beforeunload', saveScrollPosition);
  }, [location.pathname]);

  useEffect(() => {
    // If there is a hash (like #about), let browser handle it
    if (location.hash) return;

    // Restore saved scroll position
    const savedPosition = sessionStorage.getItem(`scrollPos:${location.pathname}`);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    } else {
      // New navigation - scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

export default ScrollManager;
