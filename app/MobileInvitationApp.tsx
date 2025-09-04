// MobileInvitationApp.tsx
'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileInvitationScreen from './components/mobile/InvitationScreen';
import MobileDetailsScreen from './components/mobile/DetailsScreen';
import MobileRSVPScreen from './components/mobile/RSVPScreen';
import MobileDateScreen from './components/mobile/DateScreen';
import NavigationDots from './NavigationDots';
import VideoIntroScreen from './components/mobile/VideoIntroScreen';
import MobileAudioControl from './components/mobile/AudioControl';

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
      y: { type: 'spring' as const, stiffness: 150, damping: 30 },
      opacity: { duration: 0.3 }
    }
  },
  exit: (direction: number) => ({
    y: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      y: { type: 'spring' as const, stiffness: 200, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function MobileInvitationApp() {
  const [showIntro, setShowIntro] = useState(true);
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

      {/* Video Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <VideoIntroScreen onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* App Screens */}
      {!showIntro && (
        <>
          <MobileAudioControl /> {/* Add the audio control component */}
          
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
        </>
      )}
    </div>
  );
}