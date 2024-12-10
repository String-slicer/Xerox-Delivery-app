import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-8 bg-[#0E0A19] text-yellow-400 text-center shadow-xl">
        <h1 className="text-5xl font-bold">Xerox Delivery Service</h1>
        <p className="mt-3 text-lg">Secure document delivery powered by blockchain</p>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center py-20 px-4 bg-gradient-to-r from-[#0E0A19] via-yellow-500 to-[#0E0A19] text-white text-center">
        <h2 className="text-4xl font-bold mb-6 leading-tight">
          Fast, Secure, and Blockchain-Enabled Document Delivery
        </h2>
        <p className="text-xl mb-6 max-w-2xl">
          Share your important documents safely and track deliveries in real time using our secure, blockchain-powered platform.
        </p>
        <a
          href="#features"
          className="bg-yellow-400 text-[#0E0A19] font-semibold px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105 hover:bg-yellow-500"
        >
          Learn More
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-[#0E0A19] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-3xl font-semibold mb-4 text-yellow-400">Blockchain Security</h3>
            <p className="text-lg leading-relaxed">
              Store and share your documents securely using blockchain technology and IPFS, ensuring complete confidentiality and integrity.
            </p>
          </div>
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-3xl font-semibold mb-4 text-yellow-400">Real-time Tracking</h3>
            <p className="text-lg leading-relaxed">
              Track your documents in real time with our intuitive delivery tracking system, powered by advanced GPS and monitoring tools.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-yellow-400 text-[#0E0A19] text-center py-12">
        <h3 className="text-3xl font-semibold mb-6">Ready to Experience the Future of Document Delivery?</h3>
        <p className="text-xl mb-8">Join us now to get started with secure document sharing and real-time tracking.</p>
        <a
          href="userSignup"
          className="bg-[#0E0A19] text-yellow-400 font-semibold px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105 hover:bg-yellow-500"
        >
          Sign Up Now
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center py-6">
        <p>&copy; 2024 Xerox Delivery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
