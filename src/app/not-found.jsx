"use client"

import Image from "next/image";
import Link from "next/link";
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
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
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .initial-hidden {
          opacity: 0;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Content */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-200 dark:text-gray-700 initial-hidden animate-fade-up">
            404
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 initial-hidden animate-fade-up delay-200">
              Page Not Found
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto initial-hidden animate-fade-up delay-400">
              It seems you've lost your way on the path to enlightenment. Let's guide you back to your mat.
            </p>
          </div>
        </div>

        {/* Yoga Illustration */}
        <div className="relative my-12 initial-hidden animate-fade-up delay-600">
          <div className="animate-float">
            <svg className="w-64 h-64 mx-auto" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="256" cy="256" r="240" stroke="url(#gradient)" strokeWidth="8" fill="transparent"/>
              <path d="M256 176C256 176 216 216 216 296C216 328 240 352 256 352C272 352 296 328 296 296C296 216 256 176 256 176Z" 
                    stroke="url(#gradient)" strokeWidth="16" strokeLinecap="round" fill="transparent"/>
              <path d="M216 296L136 376M296 296L376 376" stroke="url(#gradient)" strokeWidth="16" strokeLinecap="round"/>
              <path d="M256 96V176" stroke="url(#gradient)" strokeWidth="16" strokeLinecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
        </div>

        {/* Action Button */}
        <div className="initial-hidden animate-fade-up delay-600">
          <Link 
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            <span className="relative z-10">Return to Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg 
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>

        {/* Quote */}
        <div className="mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md mx-auto initial-hidden animate-fade-up delay-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white italic">
                "Yoga is the journey of the self, through the self, to the self."
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">- The Bhagavad Gita</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;