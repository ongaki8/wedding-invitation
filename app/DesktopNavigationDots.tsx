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

const screenLabels = {
  invitation: 'HOME',
  details: 'DETAILS',
  rsvp: 'RSVP',
  date: 'DATE'
};

export default function DesktopNavigationDots({
  currentPage,
  setCurrentPage,
  screens
}: NavigationDotsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-8 left-0 right-0 flex justify-center z-50"
    >
      <div className="flex space-x-8 backdrop-blur-sm bg-black/40 rounded-4xl px-6 py-2">
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
                size={25}
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-all duration-300 mb-1 cursor-pointer"
              />
              <span className="text-xs font-roze font-medium mt-1 cursor-pointer">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}