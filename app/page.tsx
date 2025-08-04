'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StaticDoorScreen from './components/mobile/StaticDoorScreen';
import MobileInvitationApp from './MobileInvitationApp';
import DesktopInvitationApp from './DesktopInvitationApp';
import DesktopDoorAnimation from './components/desktop/DesktopDoorAnimation';
import DesktopStaticDoorScreen from './components/desktop/DesktopStaticDoorScreen';

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function Home() {
  const [showSecondScreen, setShowSecondScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondScreen(true);
    }, 6000); // Increased to 6 seconds to account for both static and animated phases
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        {!showSecondScreen ? (
          <motion.div
            key="door-animation"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeVariants}
            className="absolute inset-0"
          >
            {isMobile ? <StaticDoorScreen /> : <DesktopStaticDoorScreen />}
          </motion.div>
        ) : (
          <motion.div
            key="app-content"
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
            className="absolute inset-0"
          >
            {isMobile ? <MobileInvitationApp /> : <DesktopInvitationApp />}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}