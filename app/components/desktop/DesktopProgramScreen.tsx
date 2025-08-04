export default function DesktopProgramScreen() {
  const timeline = [
    { time: '2:00 PM', event: 'Guest Arrival & Welcome Drinks' },
    { time: '2:30 PM', event: 'Ceremony Begins' },
    { time: '3:30 PM', event: 'Cocktail Hour' },
    { time: '4:30 PM', event: 'Reception & Dinner' },
    { time: '6:00 PM', event: 'First Dance' },
    { time: '7:00 PM', event: 'Cake Cutting' },
    { time: '8:00 PM', event: 'Dance Party' },
    { time: '10:00 PM', event: 'Grand Exit' },
  ];

  return (
    <div className="h-full w-full bg-gradient-to-b from-indigo-900 to-purple-900 relative flex items-center justify-center p-8 overflow-y-auto">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Wedding Program</h2>
        
        <div className="relative">
          <div className="absolute left-4 h-full w-0.5 bg-white/30 top-0"></div>
          
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-12 pb-8 last:pb-0 group">
              <div className="absolute left-0 w-8 h-8 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white group-hover:bg-pink-300 transition-colors"></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:border-pink-300 transition-colors">
                <p className="text-pink-200 font-semibold">{item.time}</p>
                <p className="text-white text-lg mt-1">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-8 text-center text-white/70 text-sm">Scroll down to return</p>
      </div>
    </div>
  );
}