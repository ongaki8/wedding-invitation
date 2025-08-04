// DesktopInvitationApp.tsx
'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopInvitationScreen from './components/desktop/DesktopInvitationScreen';
import DesktopDetailsScreen from './components/desktop/DesktopDetailsScreen';
import DesktopRSVPScreen from './components/desktop/DesktopRSVPScreen';
import DesktopDateScreen from './components/desktop/DesktopDateScreen';
import DesktopNavigationDots from './DesktopNavigationDots';

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

export default function DesktopInvitationApp() {
  const [currentPage, setCurrentPage] = useState<Screen>('invitation');
  const [direction, setDirection] = useState(0);
  const currentPageRef = useRef(currentPage);
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

  return (
    <div className="h-full w-full relative">
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
              <DesktopInvitationScreen />
            </motion.div>
          )}
          {currentPage === 'details' && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="h-full">
              <DesktopDetailsScreen />
            </motion.div>
          )}
          {currentPage === 'rsvp' && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="h-full">
              <DesktopRSVPScreen />
            </motion.div>
          )}
          {currentPage === 'date' && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="h-full">
              <DesktopDateScreen />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <DesktopNavigationDots currentPage={currentPage} setCurrentPage={navigate} screens={screens} />
    </div>
  );
}