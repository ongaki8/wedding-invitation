// page.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileInvitationApp from './MobileInvitationApp';
import DesktopInvitationApp from './DesktopInvitationApp';

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function Home() {
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

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key="app-content"
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          className="absolute inset-0"
        >
          {isMobile ? <MobileInvitationApp /> : <DesktopInvitationApp />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}