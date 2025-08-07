'use client';
import { motion, useAnimation } from 'framer-motion';
import { Info, Code, Minimize2 } from 'react-feather';
import { Calendar1, CheckCheck, MailOpen, Expand } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Screen = 'invitation' | 'details' | 'rsvp' | 'date';

interface NavigationDotsProps {
  currentPage: Screen;
  setCurrentPage: (page: Screen) => void;
  screens: Screen[];
}

const screenIcons = {
  invitation: MailOpen,
  details: Info,
  rsvp: CheckCheck,
  date: Calendar1
};

const screenLabels = {
  invitation: 'INVITE',
  details: 'DETAILS',
  rsvp: 'RSVP',
  date: 'DATE'
};

export default function NavigationDots({
  currentPage,
  setCurrentPage,
  screens
}: NavigationDotsProps) {
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);
  const [isNavMinimized, setIsNavMinimized] = useState(false);
  const iconControls = useAnimation();
  const borderControls = useAnimation();
  const navControls = useAnimation();

  useEffect(() => {
    const animateColors = async () => {
      const colors = [
        { color: 'rgba(77, 17, 240, 0.5)', border: 'rgba(77, 17, 240, 0.5)' },
        { color: 'rgba(113, 14, 60, 0.5)', border: 'rgba(113, 14, 60, 0.5)' },
        { color: 'rgba(255, 255, 255, 0.5)', border: 'rgba(255, 255, 255, 0.2)' }
      ];
      
      while (true) {
        for (const color of colors) {
          await Promise.all([
            iconControls.start({ 
              color: color.color,
              transition: { duration: 1.5 } 
            }),
            borderControls.start({
              borderColor: color.border,
              transition: { duration: 1.5 }
            })
          ]);
        }
      }
    };
    animateColors();
  }, [iconControls, borderControls]);

  const toggleNavMinimized = async () => {
    if (isNavMinimized) {
      // Maximize
      await navControls.start({
        x: 0,
        opacity: 1,
        transition: { type: "spring", damping: 20, stiffness: 300 }
      });
    } else {
      // Minimize 
      await navControls.start({
        x: -100,
        opacity: 0,
        transition: { type: "spring", damping: 20, stiffness: 300 }
      });
    }
    setIsNavMinimized(!isNavMinimized);
  };

  return (
    <>
      {/* Minimize Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 left-3.5 z-50 flex items-center"
      >
        <motion.div 
          className="backdrop-blur-sm bg-black/40 border-2 border-white/20 rounded-full flex items-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full transition-all duration-300"
            onClick={toggleNavMinimized}
            aria-label={isNavMinimized ? "Show navigation" : "Hide navigation"}
          >
            <span className="text-white/70">
              {isNavMinimized ? <Expand size={20} strokeWidth={2.5} /> : <Minimize2 size={20} strokeWidth={2.5} />}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Developer Info Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 right-3.5 z-50 flex items-center"
      >
        <motion.div 
          animate={borderControls}
          className="backdrop-blur-sm bg-black/40 border-2 rounded-full flex items-center"
          style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full transition-all duration-300"
            onClick={() => setIsDevMenuOpen(!isDevMenuOpen)}
            aria-label="digiREB information"
          >
            <motion.span
              animate={iconControls}
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              <Code size={20} strokeWidth={2.5} />
            </motion.span>
          </motion.button>

          {/* digiREB Popup */}
          {isDevMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute right-0 bottom-full mb-4 bg-black/90 backdrop-blur-2xl text-gray-100 rounded-xl p-0 shadow-2xl w-70 border-1 border-white/40 overflow-hidden"
            >
              {/* Top Banner Image */}
              <div 
                className="w-full h-14 bg-cover bg-center border-b border-white/20"
                style={{ backgroundImage: "url('/digireb-logo.webp')" }}
              />

              {/* Content */}
              <div className="p-4 space-y-2 text-center">
                <div className="space-y-2">
                  <p className="text-xs font-poppins-regular text-gray-300/90 px-2 mb-1">Developed by digiREB.</p>
                  <p className="text-xs font-poppins-regular text-gray-300/90 px-2">Transforming ideas into digital reality.</p>
                </div>

                <div className="pt-1">
                  <Link 
                    href="https://digi.reb.ac" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-xs font-poppins-regular font-bold text-[#4d11f0] hover:text-blue-300 transition-colors group mx-auto px-3 py-1.5 rounded-md border border-[#4d11f0] hover:bg-gray-800/70 mb-2"
                  >
                    Need a Website or APP?
                  </Link>
                </div>
              </div>

              {/* Bottom Gradient Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4d11f0] to-[#710e3c]" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Navigation Icons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-3 left-0 right-0 flex justify-center z-40"
      >
        <motion.div
          animate={navControls}
          className="flex space-x-4 backdrop-blur-sm bg-black/40 rounded-4xl px-5 py-2"
          style={{ originX: 0.5 }}
        >
          {screens.map((screen, index) => {
            const Icon = screenIcons[screen];
            const label = screenLabels[screen];
            const isActive = currentPage === screen;
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center p-1 rounded-full transition-all duration-300 ${isActive ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
                onClick={() => setCurrentPage(screen)}
                aria-label={`Go to ${screen} screen`}
              >
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-all duration-300"
                />
                <span className="text-[10px] font-medium font-poppins-regular">{label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
}