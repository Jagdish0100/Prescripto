import React from 'react';

const BackgroundAnimation = () => {
  // Array of floating medical symbols with INCREASED opacity and stronger colors
  const floatingSymbols = [
    // Plus signs
    { id: 1, type: 'plus', size: 'w-8 h-8', left: '10%', delay: '0s', duration: '25s', color: 'text-blue-500 opacity-50' },
    { id: 2, type: 'plus', size: 'w-12 h-12', left: '85%', delay: '3s', duration: '20s', color: 'text-indigo-500 opacity-40' },
    { id: 3, type: 'plus', size: 'w-6 h-6', left: '45%', delay: '7s', duration: '15s', color: 'text-[#5f6FFF] opacity-60' },
    // Hearts
    { id: 4, type: 'heart', size: 'w-10 h-10', left: '65%', delay: '12s', duration: '28s', color: 'text-pink-400 opacity-50' },
    { id: 5, type: 'heart', size: 'w-8 h-8', left: '25%', delay: '5s', duration: '22s', color: 'text-red-400 opacity-40' },
    // Pills
    { id: 6, type: 'pill', size: 'w-7 h-7', left: '75%', delay: '2s', duration: '18s', color: 'text-teal-500 opacity-60' },
    { id: 7, type: 'plus', size: 'w-14 h-14', left: '5%', delay: '15s', duration: '30s', color: 'text-blue-400 opacity-40' },
    { id: 8, type: 'pill', size: 'w-9 h-9', left: '55%', delay: '8s', duration: '24s', color: 'text-green-500 opacity-50' },
  ];

  const renderIcon = (type) => {
    switch(type) {
      case 'plus':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 10.5h-5.5V5a1.5 1.5 0 0 0-3 0v5.5H5a1.5 1.5 0 0 0 0 3h5.5V19a1.5 1.5 0 0 0 3 0v-5.5H19a1.5 1.5 0 0 0 0-3z"/>
          </svg>
        );
      case 'heart':
        return (
           <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
           </svg>
        );
      case 'pill':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.24 2.24a6 6 0 0 0-8.49 8.49l9.52 9.51a6 6 0 0 0 8.49-8.49L10.24 2.24zm7.07 14.14a4 4 0 0 1-5.66 0L9.17 13.9l5.66-5.66 2.48 2.48a4 4 0 0 1 0 5.66z"/>
          </svg>
        );
      default:
        return null;
    }
  }

  return (
    <>
      {/* Baking the animations directly in here so it works 100% of the time */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite alternate ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes floatSymbol {
          0% {
            transform: translateY(10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: floatSymbol linear infinite;
        }
      `}} />

      <div className="fixed inset-0 z-[-1] bg-[#f8fafc] overflow-hidden pointer-events-none">
        {/* Soft gradient blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-300/20 blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-indigo-300/20 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[#5f6FFF]/10 blur-[100px] animate-blob animation-delay-4000"></div>
        
        {/* Floating Medical Symbols */}
        {floatingSymbols.map((item) => (
          <div 
            key={item.id} 
            className={`absolute ${item.color} ${item.size} animate-float`}
            style={{ 
              left: item.left, 
              top: '100%',
              animationDuration: item.duration,
              animationDelay: item.delay
            }}
          >
            {renderIcon(item.type)}
          </div>
        ))}
      </div>
    </>
  );
};

export default BackgroundAnimation;