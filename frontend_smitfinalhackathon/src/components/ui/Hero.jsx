import React from "react";

const SimpleCarousel = () => {
  return (
    <section className="w-full">
        <div className="relative">
          <img 
            src="https://i.ytimg.com/vi/75HFXU2yG5Y/maxresdefault.jpg"
            alt="Slide 1"
            className="w-full h-120 opacity-500"
          />
          <div className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <div className="max-w-3xl">
              <h2 className="text-indigo-400 tracking-widest font-bold text-lg">SAYLANI WELFARE TRUST</h2>
              <h1 className="text-white text-5xl font-bold my-4">Microfinance Bank</h1>
              <p className="text-white text-lg">
                Saylani Welfare Trust's Microfinance Bank offers <strong>interest-free loans</strong> through the{" "}
                <span className="text-white font-semibold">Qarze Hasana program</span>, empowering individuals to start small businesses, cover emergencies, and enhance their livelihoods.
              </p>
            </div>
          </div>
        </div>
    </section>
  );
};

export default SimpleCarousel;
