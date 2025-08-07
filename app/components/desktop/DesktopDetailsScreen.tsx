import { useState, useEffect } from "react";
import DressCodeSection from "./details/DesktopDressCodeSection";
import TransportationSection from "./details/DesktopTransportationSection";
import GiftSection from "./details/DesktopGiftSection";
import { ChevronUp } from 'react-feather';

export default function DesktopDetailsScreen() {
  const [selectedColor, setSelectedColor] = useState<{code: string, name: string} | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [transform, setTransform] = useState({
    scale: 1,
    translateX: 0
  });

  useEffect(() => {
    const duration = 15000;
    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      const zoomWave = Math.sin(progress * Math.PI * 2) / 2 + 0.5;
      const easedZoom = Math.pow(zoomWave, 0.7);
      
      const panWave = Math.sin(progress * Math.PI * 4);
      const easedPan = Math.pow(Math.abs(panWave), 0.7) * Math.sign(panWave);
      
      setTransform({
        scale: 1 + (easedZoom * 0.6),
        translateX: easedPan * 8
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/desktop-venue-1.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            transform: `scale(${transform.scale}) translateX(${transform.translateX}%)`,
            transition: 'transform 1.2s cubic-bezier(0.5, 0.05, 0.3, 1.1)',
            willChange: 'transform',
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-20 pt-6 pb-4 backdrop-blur-md border-b-1 border-b-white/5 bg-gradient-to-b from-black/20 via-black/10 to-transparent shadow-lg shadow-black/20">
        <div className="max-w-5xl mx-auto px-12">
          <div className="text-center">
            <div className="font-roze font-bold text-3xl tracking-widest text-white">
              WEDDING INFO
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 h-full pt-12 pb-24 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-12 text-white min-h-full">
          <div className="relative pl-0">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-[90%] w-0.5 bg-white/80"></div>

            <div className="space-y-16 mt-[10%]">
              <DressCodeSection 
                selectedColor={selectedColor} 
                setSelectedColor={setSelectedColor} 
              />
              <TransportationSection setShowMapModal={setShowMapModal} />
              <GiftSection />
            </div>

            {/* Scroll Up */}
            <div className="mt-8 mb-16 relative z-20 opacity-0" 
                  style={{ 
                    animation: 'fadeIn 0.5s ease-in 0.5s forwards, bounce 2s infinite 2.5s' 
                  }}>
              <div className="flex flex-col items-center justify-center">
                <ChevronUp className="text-white/80 h-8 w-8" />
                <span className="text-sm tracking-widest font-ophelia font-bold">Scroll Up</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Modal */}
      {selectedColor && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-30 animate-fadeIn"
          onClick={() => setSelectedColor(null)}
        >
          <div
            className="relative bg-white/95 p-10 rounded-3xl shadow-xl border border-white/10 max-w-md mx-4 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="absolute inset-0 rounded-3xl opacity-60 z-0"
              style={{
                backgroundImage: "url('/desktop-marble.webp')",
                backgroundSize: "cover",
              }}
            />
            
            <div className="relative z-10">
              <div 
                className="w-full h-48 rounded-xl mb-8 shadow-lg border border-white/10 transform transition-transform hover:scale-[1.02]"
                style={{ 
                  backgroundColor: selectedColor.code,
                  boxShadow: `0 10px 30px -5px ${selectedColor.code}40`
                }}
              ></div>
              
              <h3 className="font-roze text-2xl font-bold text-center uppercase tracking-wider text-[#0a0a09]/80 mb-4">
                {selectedColor.name}
              </h3>
              <p className="font-classyvogue text-base text-center text-[#0a0a09]/80 mb-6 border border-[#0a0a09]/80 rounded-xl px-6 py-3 inline-block">
                Colors we'd love to see you in
              </p>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => setSelectedColor(null)}
                  className="px-8 py-3 bg-[#0a0a09] text-white rounded-xl text-base font-classyvogue font-bold tracking-widest hover:bg-[#0a0a09]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-black/50 cursor-pointer"
                >
                  GOT IT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMapModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-30 animate-fadeIn p-6"
          onClick={() => setShowMapModal(false)}
        >
          <div
            className="relative bg-white/95 p-10 rounded-3xl shadow-xl border border-white/10 w-full max-w-4xl mx-4 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="absolute inset-0 rounded-3xl opacity-60 z-0"
              style={{
                backgroundImage: "url('/desktop-marble.webp')",
                backgroundSize: "cover",
              }}
            />
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h3 className="font-roze text-2xl font-bold uppercase tracking-wider text-[#0a0a09]/80">
                  HOW TO GET THERE
                </h3>
                <div className="w-40 h-px bg-[#0a0a09]/40 mx-auto mt-4 mb-8"></div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8 mb-6">
                <div className="w-full lg:w-1/2 rounded-xl overflow-hidden border border-[#0a0a09]/10 bg-[#0a0a09]">
                  <img 
                    src="/directions-white.webp" 
                    alt="Wedding venue directions"
                    className="w-full h-auto object-cover"
                  />
                  <div className="flex justify-center p-4">
                    <span className="text-lg font-roze text-white tracking-widest">VENUE UMWINZII</span>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2 aspect-video rounded-xl overflow-hidden border border-[#0a0a09]/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.567038939592!2d31.1818402!3d-17.7250374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931b73acc5a7e19%3A0x32f6164b2084aba5!2sVenue%20Umwinzii!5e0!3m2!1sen!2s!4v1722432000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => setShowMapModal(false)}
                  className="px-8 py-3 bg-[#0a0a09] text-white rounded-xl text-base font-classyvogue font-bold tracking-widest hover:bg-[#0a0a09]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-black/50 cursor-pointer"
                >
                  CLOSE MAP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95); 
          }
          to { 
            opacity: 1;
            transform: scale(1); 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}