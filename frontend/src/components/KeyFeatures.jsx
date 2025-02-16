import React from 'react';
import Tilt from 'react-vanilla-tilt';

function KeyFeatures() {
  const features = [
    { 
      label: "Fast Delivery",
      image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=500&auto=format&fit=crop&q=60",
      description: "Get your packages delivered quickly and efficiently."
    },
    { 
      label: "Secure Transactions", 
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60", 
      description: "Your transactions are safe and secure with our blockchain technology." 
    },
    { 
      label: "Global Reach", 
      image: "https://images.unsplash.com/photo-1529081131152-8a18c6419355?w=500&auto=format&fit=crop&q=60", 
      description: "We deliver to locations all around the world." 
    },
    { 
      label: "24/7 Support", 
      image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=500&auto=format&fit=crop&q=60", 
      description: "Our support team is available 24/7 to assist you." 
    },
    { 
      label: "High Satisfaction", 
      image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=500&auto=format&fit=crop&q=60", 
      description: "Our customers are highly satisfied with our services." 
    },
    { 
      label: "User Friendly", 
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60", 
      description: "Our platform is easy to use and user-friendly." 
    },
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-b from-[#f8f9fb] to-[#eef1f6]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#131C24]">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Tilt
              key={index}
              style={{
                background: 'transparent',
                transformStyle: "preserve-3d",
                transform: "perspective(1000px)",
              }}
              options={{
                scale: 1.05,
                speed: 1000,
                max: 15,
                glare: true,
                "max-glare": 0.2,
                gyroscope: true
              }}
            >
              <div 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                style={{
                  transform: "translateZ(20px)",
                  background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
                }}
              >
                <div className="relative overflow-hidden h-52 flex items-center justify-center bg-gradient-to-br from-[#f8f9fb] to-[#eef1f6] p-6">
                  <img 
                    src={feature.image} 
                    alt={feature.label} 
                    className="w-40 h-40 object-contain transform transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#29374C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div 
                  className="p-6 transform group-hover:translate-y-0 transition-transform duration-300 bg-white"
                  style={{
                    transform: "translateZ(30px)",
                  }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-[#29374C] group-hover:text-[#F4C753] transition-colors duration-300">
                    {feature.label}
                  </h3>
                  <p className="text-[#64748b] transform opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {feature.description}
                  </p>
                </div>
                <div 
                  className="absolute inset-0 border-2 border-transparent group-hover:border-[#F4C753]/30 rounded-xl transition-colors duration-300 pointer-events-none"
                  style={{
                    transform: "translateZ(40px)",
                  }}
                />
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KeyFeatures;
