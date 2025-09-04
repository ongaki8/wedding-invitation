// components/mobile/MobileAudioControl.tsx
'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '@/contexts/AudioContext';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Minimize2, Music } from 'react-feather';
import Image from 'next/image';

export default function MobileAudioControl() {
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

  const progressPercentage = duration > 0 ? currentTime / duration : 0;

  // Circle progress calculation
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressPercentage);

  return (
    <motion.div
      className="fixed bottom-4 left-3.5 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Minimize/Expand Button with Circular Progress */}
      <div className="relative" style={{ transform: 'scale(0.8)' }}>
        <svg className="absolute -top-1 -left-1 w-16 h-16">
          <circle
            className="stroke-white/20"
            strokeWidth="4"
            fill="transparent"
            r={radius}
            cx="32"
            cy="32"
          />
          <circle
            className="stroke-[#e0b553]"
            strokeWidth="4"
            fill="transparent"
            r={radius}
            cx="32"
            cy="32"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
          />
        </svg>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center relative z-10"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Minimize player" : "Expand player"}
        >
          {isExpanded ? <Minimize2 size={20} strokeWidth={2.5} /> : <Music size={20} strokeWidth={2.5} />}
        </motion.button>
      </div>

      {/* Expanded Player Popup */}
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="absolute left-0 bottom-full mb-4 bg-black/50 backdrop-blur-sm text-white rounded-xl p-4 shadow-2xl w-80 border border-white/20 overflow-hidden"
        >
          {/* Track Info with Thumbnail */}
          <div className="flex items-center mb-4 space-x-3">
            <Image 
              src="/moyo.webp" 
              alt="Moyo thumbnail" 
              width={48} 
              height={48} 
              className="rounded-lg object-cover"
            />
            <div>
              <p className="text-xs text-white/70 font-poppins-light mb-1">Now Playing</p>
              <h3 className="text-md font-poppins-regular font-bold">MOYO - Nashie Zim</h3>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            ref={progressBarRef}
            className="w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer mb-2"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-[#e0b553] transition-all duration-100"
              style={{ width: `${progressPercentage * 100}%` }}
            />
          </div>

          {/* Time Labels */}
          <div className="flex items-center justify-between mb-2 text-xs text-white/80 font-poppins-light">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center space-x-4">
            {/* Restart */}
            <motion.button
                onClick={restartAudio}
                className="w-12 h-12 flex items-center justify-center text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <RotateCcw size={20} />
            </motion.button>

            {/* Play/Pause */}
            <motion.button
                onClick={togglePlay}
                onMouseEnter={() => setIsPlayHovered(true)}
                onMouseLeave={() => setIsPlayHovered(false)}
                className="w-12 h-12 flex items-center justify-center text-white rounded-full bg-[#e0b553] hover:bg-[#d0a548] transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isPlayHovered ? (isPlaying ? <Play size={20} /> : <Pause size={20} />) : (isPlaying ? <Pause size={20} /> : <Play size={20} />)}
            </motion.button>

            {/* Mute */}
            <motion.button
                onClick={toggleMute}
                onMouseEnter={() => setIsMuteHovered(true)}
                onMouseLeave={() => setIsMuteHovered(false)}
                className="w-12 h-12 flex items-center justify-center text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isMuted ? <VolumeX size={20} /> : (isMuteHovered ? <VolumeX size={20} /> : <Volume2 size={20} />)}
            </motion.button>
            </div>
        </motion.div>
      )}
    </motion.div>
  );
}