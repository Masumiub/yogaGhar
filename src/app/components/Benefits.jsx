"use client"
import React from 'react';
import { Shield, Heart, Zap } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Relieving Stress",
      description: "Release tension and find calm through mindful breathing and gentle movements that soothe your nervous system.",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20"
    },
    {
      icon: Heart,
      title: "Peaceful Mind",
      description: "Cultivate inner tranquility and mental clarity through meditation practices that quiet mental chatter.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      icon: Zap,
      title: "Reduce Anxiety",
      description: "Build resilience against worry and fear with proven techniques that restore emotional balance and confidence.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300 relative overflow-hidden">
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1.0s; }
        .delay-1200 { animation-delay: 1.2s; }
        
        .initial-hidden {
          opacity: 0;
        }
        
        .benefit-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .benefit-card:hover {
          transform: translateY(-12px) scale(1.02);
        }
        
        .icon-wrapper {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .benefit-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(10deg);
          filter: brightness(1.1);
        }
        
        .glow-effect {
          transition: all 0.4s ease;
        }
        
        .benefit-card:hover .glow-effect {
          opacity: 0.6;
          transform: scale(1.1);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight initial-hidden animate-slide-left delay-200">
                <span className="text-gray-900 dark:text-white">Benefits Of</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Yoga & Meditation
                </span>
              </h2>
            </div>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed initial-hidden animate-slide-left delay-400">
              Yoga and meditation offer a holistic approach to health by reducing stress, improving mental clarity, and fostering emotional balance. Regular practice helps maintain inner peace and enhances overall well-being.
            </p>

            {/* Floating Illustration */}
            <div className="relative py-8 initial-hidden animate-slide-left delay-600">
              <div className="relative">
                {/* Main circle */}
                <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-float"></div>
                
                {/* Smaller circles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits Cards */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className={`benefit-card relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 initial-hidden animate-slide-right delay-${(index + 4) * 200}`}
                >
                  {/* Background Glow Effect */}
                  <div className={`glow-effect absolute inset-0 bg-gradient-to-r ${benefit.bgGradient} rounded-3xl opacity-0`}></div>
                  
                  <div className="relative z-10 flex items-start space-x-6">
                    {/* Icon */}
                    <div className={`icon-wrapper flex-shrink-0 w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative dot */}
                  <div className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r ${benefit.gradient} rounded-full opacity-60`}></div>
                </div>
              );
            })}

            {/* Call to Action */}
            <div className="pt-8 initial-hidden animate-slide-right delay-1200">
              <button className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-out">
                <span className="relative z-10">Start Your Practice Today</span>
                <svg 
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Benefits;

// export default function Benefits() {
//     return (
//         <section className=" py-16  flex flex-col md:flex-row items-center gap-10">
//             {/* Text Section */}
//             <div className="md:w-1/2">
//                 <h2 className="text-4xl font-bold  mb-4">Benefits Of</h2>
//                 <h3 className="text-3xl font-semibold  mb-6">
//                     Yoga & Meditation
//                 </h3>
//                 <p className=" mb-6 leading-relaxed">
//                     Yoga and meditation offer a holistic approach to health by reducing
//                     stress, improving mental clarity, and fostering emotional balance.
//                     Regular practice helps maintain inner peace and enhances overall
//                     well-being.
//                 </p>



//                 <ul className="space-y-4">
//                     <div className="grid grid-cols-2">
//                         <li className="flex items-center text-lg ">
//                             <FaLeaf className="text-green-600 mr-3" />
//                             Relieving Stress
//                         </li>
//                         <li className="flex items-center text-lg ">
//                             <FaSmile className="text-yellow-500 mr-3" />
//                             Peaceful Mind
//                         </li>
//                         <li className="flex items-center text-lg ">
//                             <FaBrain className="text-purple-500 mr-3" />
//                             Reduce Anxiety
//                         </li>
//                         <li className="flex items-center text-lg ">
//                             <FaHeart className="text-red-500 mr-3" />
//                             Mental Health
//                         </li>
//                     </div>
//                 </ul>

//             </div>



//             <div className="md:w-1/2">

//             </div>
//         </section>
//     );
// }
