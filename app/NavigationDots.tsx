'use client';
import { motion } from 'framer-motion';
import { Info, Mail, Calendar, Home } from 'react-feather';

type Screen = 'invitation' | 'details' | 'rsvp' | 'date';

interface NavigationDotsProps {
  currentPage: Screen;
  setCurrentPage: (page: Screen) => void;
  screens: Screen[];
}

const screenIcons = {
  invitation: Home,
  details: Info,
  rsvp: Mail,
  date: Calendar
};

export default function NavigationDots({
  currentPage,
  setCurrentPage,
  screens
}: NavigationDotsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-5 left-0 right-0 flex justify-center z-50"
    >
      <div className="flex space-x-4 backdrop-blur-sm bg-black/40 rounded-full px-5 py-3">
        {screens.map((screen, index) => {
          const Icon = screenIcons[screen];
          const isActive = currentPage === screen;
          
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1 rounded-full transition-all duration-300 ${isActive ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
              onClick={() => setCurrentPage(screen)}
              aria-label={`Go to ${screen} screen`}
            >
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-all duration-300"
              />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}