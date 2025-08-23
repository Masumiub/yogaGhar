import clientPromise from "@/app/lib/db";
import Image from "next/image";
import { ObjectId } from "mongodb";

import { Calendar, Clock, User, DollarSign, Timer, MapPin, Users, Star, CheckCircle, AlertCircle, BookOpen } from "lucide-react";

// ISR Configuration
export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db("YogaGharDB");
  
  const sessions = await db.collection("yogaSessions").find({}).toArray();
  
  return sessions.map((session) => ({
    id: session._id.toString(),
  }));
}

export default async function SessionDetails({ params }) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("YogaGharDB");

  const session = await db.collection("yogaSessions").findOne({ _id: new ObjectId(id) });


  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Session Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The session you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Mock data for additional sections (in real app, fetch from database)
  const sessionBenefits = [
    "Improved flexibility and strength",
    "Enhanced mental clarity and focus",
    "Reduced stress and anxiety levels",
    "Better sleep quality",
    "Increased energy and vitality"
  ];

  const prerequisites = [
    "No prior yoga experience required",
    "Comfortable workout clothes",
    "Yoga mat (can be provided)",
    "Water bottle for hydration",
    "Open mind and willingness to learn"
  ];

  const instructorInfo = {
    name: session.instructor,
    experience: "8+ years",
    specialization: "Hatha & Vinyasa Yoga",
    certifications: "RYT-500, Meditation Teacher",
    bio: "Passionate about helping students discover inner peace through mindful movement and breathwork."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Side - Session Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                <Star className="w-4 h-4 mr-2" />
                Featured Session
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {session.title}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {session.description}
              </p>
            </div>

            {/* Session Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{session.instructor}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{session.date}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{session.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <Timer className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{session.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Session Price</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{session.price} BDT</p>
                  </div>
                </div>
                <button className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Book Now
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Session Image */}
          <div className="relative">
            {session.imageUrl && (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={session.imageUrl}
                  alt={session.title}
                  width={600}
                  height={700}
                  className="w-full h-[500px] sm:h-[600px] lg:h-[700px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">12 spots left</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Session Benefits */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Session Benefits</h3>
            </div>
            <ul className="space-y-3">
              {sessionBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">What to Bring</h3>
            </div>
            <ul className="space-y-3">
              {prerequisites.map((item, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructor Profile */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your Instructor</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{instructorInfo.name}</h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">{instructorInfo.specialization}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium text-gray-900 dark:text-white">Experience:</span> <span className="text-gray-600 dark:text-gray-400">{instructorInfo.experience}</span></p>
                <p><span className="font-medium text-gray-900 dark:text-white">Certifications:</span> <span className="text-gray-600 dark:text-gray-400">{instructorInfo.certifications}</span></p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{instructorInfo.bio}</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h3>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Join us for this transformative session and take the next step in your wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <MapPin className="mr-2 w-5 h-5" />
              Get Directions
            </button>
            <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full hover:bg-white/30 transform hover:-translate-y-1 transition-all duration-300">
              <Users className="mr-2 w-5 h-5" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ISR Configuration - Revalidate every 60 seconds
export const revalidate = 60;



// export default async function SessionDetails({ params }) {
//   const { id } = await params;

//   const client = await clientPromise;
//   const db = client.db("YogaGharDB");

//   const session = await db.collection("yogaSessions").findOne({ _id: new ObjectId(id) });

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden">
//         {/* Image */}
//         {session.imageUrl && (
//           <div className="relative w-full h-72">
//             <Image
//               src={session.imageUrl}
//               alt={session.title}
//               fill
//               className="object-cover"
//             />
//           </div>
//         )}

//         {/* Session Info */}
//         <div className="p-6">
//           <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
//           <p className=" mb-4">{session.description}</p>

//           <div className="space-y-2 text-lg">
//             <p><strong>Instructor:</strong> {session.instructor}</p>
//             <p><strong>Date:</strong> {session.date}</p>
//             <p><strong>Time:</strong> {session.time}</p>
//             <p><strong>Duration:</strong> {session.duration}</p>
//             <p><strong>Price:</strong> {session.price} BDT</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

