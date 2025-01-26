import React from 'react';
import LoanCategories from './LoanCategory.jsx'

const Hero = () => {
    return (
        <section className="relative text-gray-600 body-font min-h-screen">
                    <div className="relative w-full h-[60vh]">
                        {/* Text Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white">
                            <h2 className="text-xs text-indigo-400 tracking-widest font-medium mb-2">
                                SAYLANI WELFARE TRUST
                            </h2>
                            <h1 className="sm:text-3xl text-5xl font-medium mb-4">
                                Microfinance Bank
                            </h1>
                            <p className="lg:w-2/3 text-center leading-relaxed">
                            Saylani Welfare Trust's Microfinance Bank empowers individuals and families through interest-free loans under the Qarze Hasana program. This initiative supports people in starting or expanding small businesses, managing urgent financial needs, and enhancing their quality of life.
                            </p>
                        </div>
                    </div>

            <div className='m-10'>
            <LoanCategories />
            </div>
        </section>
    );
};

export default Hero;
