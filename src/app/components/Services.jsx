"use client";

import React from 'react';
import { Brain, Flower, Users, Waves } from 'lucide-react';
import Link from 'next/link';

const OurService = () => {
  const services = [
    {
      icon: Brain,
      title: "Meditation",
      description: "Practice mindfulness to reduce stress, improve focus, and promote inner peace through guided meditation.",
      gradient: "from-purple-500 to-indigo-500",
      hoverGradient: "from-purple-600 to-indigo-600"
    },
    {
      icon: Flower,
      title: "Aromatherapy",
      description: "Heal your senses with natural essential oils that enhance relaxation and restore emotional balance.",
      gradient: "from-pink-500 to-rose-500",
      hoverGradient: "from-pink-600 to-rose-600"
    },
    {
      icon: Users,
      title: "Yoga Asanas",
      description: "Strengthen your body and mind through postures that improve flexibility, balance, and overall well-being.",
      gradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Waves,
      title: "Sound Therapy",
      description: "Experience deep relaxation and mental clarity with soothing sound vibrations and frequency healing.",
      gradient: "from-indigo-500 to-purple-500",
      hoverGradient: "from-indigo-600 to-purple-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
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
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        
        .initial-hidden {
          opacity: 0;
        }
        
        .service-card {
          transition: all 0.3s ease;
        }
        
        .service-card:hover {
          transform: translateY(-8px);
        }
        
        .icon-container {
          transition: all 0.3s ease;
        }
        
        .service-card:hover .icon-container {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 initial-hidden animate-fade-up">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Our Wellness Services
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed initial-hidden animate-fade-up delay-200">
            Explore holistic practices designed to rejuvenate your body and mind.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className={`service-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 initial-hidden animate-scale-in delay-${(index + 1) * 100}`}
              >
                {/* Icon */}
                <div className={`icon-container w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                  {service.description}
                </p>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.hoverGradient} opacity-0 hover:opacity-5 rounded-3xl transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 initial-hidden animate-fade-up delay-500">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Begin Your Wellness Journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join our community of wellness seekers and discover the transformative power of holistic healing practices.
            </p>
            <Link href='/login'>
              <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out">
                <span className="relative z-10">Explore All Services</span>
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-pulse"></div>
      </div>
    </section>
  );
};

export default OurService;


// import { FaSpa, FaLeaf } from "react-icons/fa";
// import { GiMeditation, GiMusicalNotes } from "react-icons/gi";

// export default function Services() {
//   return (
//     <section className="py-16">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold  mb-4">
//           Our Wellness Services
//         </h2>
//         <p className="text-lg ">
//           Explore holistic practices designed to rejuvenate your body and mind.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//         {/* Meditation */}
//         <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
//           <GiMeditation className="text-5xl text-black mb-4" />
//           <h3 className="text-xl font-semibold mb-2 text-black">Meditation</h3>
//           <p className="text-gray-700">
//             Practice mindfulness to reduce stress, improve focus, and promote
//             inner peace through guided meditation.
//           </p>
//         </div>

//         {/* Aromatherapy */}
//         <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
//           <FaLeaf className="text-5xl text-black mb-4" />
//           <h3 className="text-xl font-semibold mb-2 text-black">Aromatherapy</h3>
//           <p className="text-gray-700">
//             Heal your senses with natural essential oils that enhance relaxation
//             and restore emotional balance.
//           </p>
//         </div>

//         {/* Yoga Asanas */}
//         <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
//           <FaSpa className="text-5xl text-black mb-4" />
//           <h3 className="text-xl font-semibold mb-2 text-black">Yoga Asanas</h3>
//           <p className="text-gray-700">
//             Strengthen your body and mind through postures that improve
//             flexibility, balance, and overall well-being.
//           </p>
//         </div>

//         {/* Sound Therapy */}
//         <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
//           <GiMusicalNotes className="text-5xl text-black mb-4" />
//           <h3 className="text-xl font-semibold mb-2 text-black">Sound Therapy</h3>
//           <p className="text-gray-700">
//             Experience deep relaxation and mental clarity with soothing sound
//             vibrations and frequency healing.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
