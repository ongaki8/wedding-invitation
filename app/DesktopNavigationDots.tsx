'use client';
import { motion, useAnimation } from 'framer-motion';
import { Info, Mail, Calendar, Home, Code } from 'react-feather';
import { Gem, CalendarCheck, Calendar1, MailOpen, CheckCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

export default function DesktopNavigationDots({
  currentPage,
  setCurrentPage,
  screens
}: NavigationDotsProps) {
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);
  const iconControls = useAnimation();
  const borderControls = useAnimation();

  useEffect(() => {
    const animateColors = async () => {
      const colors = [
        { color: 'rgba(77, 17, 240, 0.8)', border: 'rgba(77, 17, 240, 0.8)' },
        { color: 'rgba(113, 14, 60, 0.8)', border: 'rgba(113, 14, 60, 0.8)' },
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

  return (
    <>
      {/* Developer Info Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-12 right-8 z-50 flex items-center"
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
            aria-label="Developer information"
          >
            <motion.span
              animate={iconControls}
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              <Code size={20} strokeWidth={2.5} className='cursor-pointer'/>
            </motion.span>
          </motion.button>

          {/* Developer Menu Popup */}
          {isDevMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute right-0 bottom-full mb-4.5 bg-black/80 backdrop-blur-2xl text-gray-100 rounded-2xl p-0 shadow-2xl w-100 border-1 border-white/40 overflow-hidden"
            >
              {/* Top Banner with Image */}
              <div 
                className="w-full h-21 bg-cover bg-center border-b border-white/20" 
                style={{ backgroundImage: "url('/digireb-logo.webp')" }}
              />

              {/* Content */}
              <div className="p-6 space-y-3 text-center">
                <div className="space-y-3">
                  <p className="text-[0.9375rem] font-poppins-light text-gray-300/90 px-3 mb-1.5">
                    Developed by digiREB.
                  </p>
                  <p className="text-[0.9375rem] font-poppins-light text-gray-300/90 px-3">
                    Transforming ideas into digital reality.
                  </p>
                </div>

                <div className="pt-1.5">
                  <Link 
                    href="https://digi.reb.ac" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-[0.9375rem] font-poppins-regular font-bold text-[#4d11f0] hover:text-[#710e3c] transition-colors group mx-auto px-4.5 py-2.25 rounded-md border-2 border-[#4d11f0] hover:border-[#710e3c] mb-3"
                  >
                    Need a Website or APP?
                  </Link>
                </div>
              </div>

              {/* Bottom Gradient Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4d11f0] to-[#710e3c]" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Navigation Dots */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 left-0 right-0 flex justify-center z-40"
      >
        <div className="flex space-x-8 backdrop-blur-sm bg-black/40 rounded-4xl px-8 py-3">
          {screens.map((screen, index) => {
            const Icon = screenIcons[screen];
            const label = screenLabels[screen];
            const isActive = currentPage === screen;
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center p-2 rounded-full transition-all duration-300 ${isActive ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
                onClick={() => setCurrentPage(screen)}
                aria-label={`Go to ${screen} screen`}
              >
                <Icon 
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-all duration-300 mb-1 cursor-pointer"
                />
                <span className="text-xs font-medium font-poppins-regular mt-1 cursor-pointer">{label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}