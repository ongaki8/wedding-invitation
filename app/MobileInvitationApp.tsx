'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileInvitationScreen from './components/mobile/InvitationScreen';
import MobileProgramScreen from './components/mobile/ProgramScreen';
import MobileDetailsScreen from './components/mobile/DetailsScreen';
import MobileRSVPScreen from './components/mobile/RSVPScreen';
import MobileDateScreen from './components/mobile/DateScreen';
import NavigationDots from './NavigationDots';

type Screen = 'invitation' | 'details' | 'rsvp' | 'date';

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.3 }
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 }
    }
  },
  exit: (direction: number) => ({
    y: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      y: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function MobileInvitationApp() {
  const [currentPage, setCurrentPage] = useState<Screen>('invitation');
  const [direction, setDirection] = useState(0);
  const currentPageRef = useRef(currentPage);
  const touchStartY = useRef<number | null>(null);
  const screens: Screen[] = ['invitation', 'details', 'rsvp', 'date'];

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const navigate = useCallback((newPage: Screen) => {
    const currentIndex = screens.indexOf(currentPageRef.current);
    const newIndex = screens.indexOf(newPage);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentPage(newPage);
  }, [screens]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartY.current) return;
    e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartY.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    const threshold = 50;
    const currentIndex = screens.indexOf(currentPageRef.current);

    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0 && currentIndex < screens.length - 1) {
        navigate(screens[currentIndex + 1]);
      } else if (deltaY < 0 && currentIndex > 0) {
        navigate(screens[currentIndex - 1]);
      }
    }

    touchStartY.current = null;
  }, [screens, navigate]);

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div className="h-full w-full relative touch-pan-y">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {currentPage === 'invitation' && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="h-full">
              <MobileInvitationScreen />
            </motion.div>
          )}
          {/* {currentPage === 'program' && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="h-full">
              <MobileProgramScreen />
            </motion.div>
          )} */}
          {currentPage === 'details' && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="h-full">
              <MobileDetailsScreen />
            </motion.div>
          )}
          {currentPage === 'rsvp' && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="h-full">
              <MobileRSVPScreen />
            </motion.div>
          )}
          {currentPage === 'date' && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="h-full">
              <MobileDateScreen />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <NavigationDots currentPage={currentPage} setCurrentPage={navigate} screens={screens} />
    </div>
  );
}