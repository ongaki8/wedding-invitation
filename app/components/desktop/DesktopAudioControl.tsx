// components/desktop/DesktopAudioControl.tsx
'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '@/contexts/AudioContext';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'react-feather';

export default function DesktopAudioControl() {
  const { isPlaying, currentTime, duration, isMuted, togglePlay, restartAudio, seekAudio, toggleMute } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuteHovered, setIsMuteHovered] = useState(false);
  const [isPlayHovered, setIsPlayHovered] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && duration > 0) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * duration;
      seekAudio(newTime);
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className={`bg-black/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-48'
        }`}
        animate={{ width: isExpanded ? 264 : 192 }}
        transition={{ duration: 0.3 }}
      >
        {/* Buttons */}
        <div className="flex items-center p-2 space-x-2">
          {/* Restart */}
          <motion.button
            onClick={restartAudio}
            className="w-9 h-9 flex items-center justify-center text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={16} />
          </motion.button>

          {/* Play/Pause hover swap */}
        <motion.button
          onClick={togglePlay}
          onMouseEnter={() => setIsPlayHovered(true)}
          onMouseLeave={() => setIsPlayHovered(false)}
          className="w-9 h-9 flex items-center justify-center text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlayHovered ? (isPlaying ? <Play size={16} /> : <Pause size={16} />) : (isPlaying ? <Pause size={16} /> : <Play size={16} />)}
        </motion.button>

           {/* Mute */}
          <motion.button
            onClick={toggleMute}
            onMouseEnter={() => setIsMuteHovered(true)}
            onMouseLeave={() => setIsMuteHovered(false)}
            className="w-9 h-9 flex items-center justify-center text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            {isMuted ? <VolumeX size={16} /> : (isMuteHovered ? <VolumeX size={16} /> : <Volume2 size={16} />)}
          </motion.button>

          {/* Expand toggle */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-auto w-7 h-7 flex items-center justify-center text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? '–' : '+'}
          </motion.button>
        </div>

        {/* Expanded view */}
        {isExpanded && (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-3 pb-3"
        >
            {/* Track Info with Thumbnail */}
            <div className="flex items-center space-x-3 mb-3">
            <img
                src="/moyo.webp"
                alt="Moyo thumbnail"
                className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex flex-col">
                <span className="text-xs text-white/70 font-poppins-light">Now Playing</span>
                <span className="text-sm text-white/85 font-poppins-regular">Moyo - Nashie Zim</span>
            </div>
            </div>

            {/* Progress bar */}
            <div
            ref={progressBarRef}
            className="w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
            >
            <div
                className="h-full bg-[#e0b553] transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
            />
            </div>

            {/* Time labels */}
            <div className="flex items-center justify-between mt-2 text-xs text-white/80 font-poppins-light">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
            </div>
        </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}