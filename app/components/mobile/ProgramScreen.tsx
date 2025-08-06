import { FaGlassMartiniAlt, FaCamera, FaUtensils, FaMusic, FaRing } from "react-icons/fa";

export default function MobileProgramScreen() {
  const ceremonyIcon = "/ceremony.svg";
  const timeline = [
    {
      time: "3:30 PM",
      event: "Ceremony",
      location: "8221 Sunset Blvd, West Hollywood",
      icon: <img src={ceremonyIcon} className="w-12 h-12" alt="Ceremony" />
    },
    {
      time: "4:30 PM",
      event: "Cocktail",
      location: "8221 Sunset Blvd, West Hollywood",
      icon: <FaGlassMartiniAlt className="w-5 h-5 text-[#0a0a09]" />,
    },
    {
      time: "5:00 PM",
      event: "Photos",
      location: "8221 Sunset Blvd, West Hollywood",
      icon: <FaCamera className="w-5 h-5 text-[#0a0a09]" />,
    },
    {
      time: "6:30 PM",
      event: "Dinner",
      location: "8221 Sunset Blvd, West Hollywood",
      icon: <FaUtensils className="w-5 h-5 text-[#0a0a09]" />,
    },
    {
      time: "8:00 PM",
      event: "Party",
      location: "8221 Sunset Blvd, West Hollywood",
      icon: <FaMusic className="w-5 h-5 text-[#0a0a09]" />,
    },
  ];

  return (
    <div className="relative h-full w-full overflow-y-auto bg-[#faf9f5]">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-40"
        style={{
          backgroundImage: "url('venue-1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-white/0 backdrop-blur-[1px] z-1"></div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          
          <div className="font-roze text-4xl tracking-widest text-[#0a0a09] mt-1">
            PROGRAM
          </div>
          <div className="mt-4 mx-auto w-24 h-px bg-[#0a0a09]/30"></div>
        </div>

        {/* Centered Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-[#0a0a09]/20"></div>

          {/* Timeline items */}
          <div className="space-y-12 pb-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative w-full">

                {/* Dot on timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#0a0a09] rounded-full top-1/2 z-20"></div>

                {/* Icon Container */}
                <div className={`absolute ${index % 2 === 0 ? 'left-1/2 ml-4' : 'right-1/2 mr-6'} top-1/2 transform -translate-y-1/2 z-10`}>
                  {item.icon}
                </div>

                <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[45%] bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-[#0a0a09]/10 ${index % 2 === 0 ? 'mr-6' : 'ml-6'}`}>
                    <div className="flex flex-col items-center">
                      <div className="font-ophelia text-xl uppercase tracking-wider text-[#0a0a09]">
                        {item.time}
                      </div>
                      <h3 className="font-brittany text-xl text-[#0a0a09] mt-0.5 mb-1">
                        {item.event}
                      </h3>
                      <p className="font-ophelia text-xs text-center text-[#0a0a09]/80 mt-0.5">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative footer */}
        <div className="text-center pt-8">
          <div className="inline-block font-roze text-xs text-[#0a0a09]/50 tracking-widest">
            WE LOOK FORWARD TO SHARING THIS DAY WITH YOU
          </div>
        </div>
      </div>
    </div>
  );
}