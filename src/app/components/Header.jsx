"use client"

import Image from "next/image";
import Link from "next/link";


import React from 'react';

const Header = () => {
  return (
    <header className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1.0s; }
        .delay-1200 { animation-delay: 1.2s; }
        .delay-1400 { animation-delay: 1.4s; }
        
        .initial-hidden {
          opacity: 0;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight initial-hidden animate-fade-up delay-200">
              <span className="text-gray-900 dark:text-white">Find Your</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Inner Peace
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-700 dark:text-gray-300 initial-hidden animate-fade-up delay-400">
              Transform Your Mind, Body & Spirit
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 initial-hidden animate-fade-up delay-600">
              Join thousands on their journey to wellness through authentic yoga practices, 
              guided meditation, and mindful living. Discover the ancient wisdom that brings 
              balance to modern life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start initial-hidden animate-fade-up delay-800">
              <Link 
                href="/sessions"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <span className="relative z-10">Begin Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg 
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700 initial-hidden animate-fade-up delay-1000">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Classes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Access</div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative initial-hidden animate-slide-right delay-600">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1512291313931-d4291048e7b6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Peaceful yoga meditation scene"
                  className="w-full h-[500px] sm:h-[600px] lg:h-[700px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse initial-hidden animate-fade-up delay-1200"></div>
              
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-xl animate-pulse initial-hidden animate-fade-up delay-1400"></div>

              {/* Quote Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg initial-hidden animate-slide-left delay-1000">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white italic">
                      "Yoga is a light, which once lit will never dim."
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">- B.K.S. Iyengar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// export default function Header() {
//   return (
//     <header className="bg-base-100 text-black py-12 px-6 md:px-12">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
//         {/* Left Section - Text */}
//         <div className="text-center md:text-left md:w-1/2">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Welcome to Zen Yoga
//           </h1>
//           <h2 className="text-2xl font-semibold mb-2">
//             Find Your Inner Peace
//           </h2>
//           <p className="text-lg mb-6">
//             Join us to discover mindfulness and strength through yoga sessions.
//           </p>
//           <Link href="/register">
//             <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition">
//               Join Now
//             </button>
//           </Link>
//         </div>


//         <div className="md:w-1/2 flex justify-center">

//         </div>

//       </div>
//     </header>
//   );
// }
