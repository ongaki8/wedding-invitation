export default function DesktopGiftSection() {
  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 w-4 h-4 bg-[#0a0a09] rounded-full"></div>
      <div className="text-center max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-[#0a0a09]/10">
        <h3 className="font-roze text-xl uppercase tracking-wider text-[#0a0a09] mb-4">
          Gifts & Blessings
        </h3>

        <div className="w-24 h-px bg-[#0a0a09]/30 mx-auto mb-6"></div>

        <p className="text-[#0a0a09]/80 text-base font-ophelia leading-relaxed mb-6">
          Your presence is the greatest gift to us. As we are starting our life
          together abroad and cannot easily carry physical gifts, cash gift
          would be deeply appreciated.
        </p>
      </div>
    </div>
  );
}