"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, DollarSign, Search } from "lucide-react";
import Link from "next/link";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 9;

  const fetchSessions = async () => {
    setIsLoading(true);
    const res = await fetch(
      `/api/sessions?search=${search}&sort=${sort}&page=${page}&limit=${limit}`
    );
    const data = await res.json();
    setSessions(data.sessions);
    setTotal(data.total);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, [search, sort, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
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
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
        
        .session-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .session-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        
        .initial-hidden {
          opacity: 0;
        }
      `}</style>

      <div className="px-4 py-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 initial-hidden animate-fade-up">
            <span className="text-gray-900 dark:text-white">Discover Your Perfect</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Yoga Session
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8 initial-hidden animate-fade-up delay-200">
            Explore our curated collection of yoga and meditation sessions designed to enhance your wellness journey. 
            Find the perfect practice that resonates with your mind, body, and spirit.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto initial-hidden animate-fade-up delay-400">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {total}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Live
              </div>
              <div className="text-gray-600 dark:text-gray-400">Interactive Classes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400">Available Access</div>
            </div>
          </div>
        </div>

        {/* Search & Sort */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 mb-12 shadow-lg border border-gray-200/50 dark:border-gray-700/50 initial-hidden animate-slide-left delay-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search sessions by title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 cursor-pointer"
              >
                <option value="desc">Sort by Date (Newest)</option>
                <option value="asc">Sort by Date (Oldest)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg">
                <div className="shimmer h-48 w-full"></div>
                <div className="p-6 space-y-3">
                  <div className="shimmer h-6 w-3/4 rounded"></div>
                  <div className="shimmer h-4 w-full rounded"></div>
                  <div className="shimmer h-4 w-2/3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sessions.map((session, index) => (
              <div
                key={session._id}
                className={`session-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 initial-hidden animate-scale-in delay-${Math.min((index % 3) + 1, 5) * 100}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={session.imageUrl}
                    alt={session.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {session.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {session.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar className="mr-2 w-4 h-4 text-purple-500" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Clock className="mr-2 w-4 h-4 text-blue-500" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <span className="text-green-600 dark:text-green-400 font-bold text-lg flex items-center">
                      <DollarSign className="mr-1 w-5 h-5" />
                      {session.price}
                    </span>
                    <Link
                      href={`/sessions/${session._id}`}
                      className="group inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      View Details
                      <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sessions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center opacity-50">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No sessions found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters to find more sessions.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-center items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Previous
              </button>
              
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num + 1)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    page === num + 1
                      ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
              
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import { FaCalendarAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
// import Link from "next/link";

// export default function SessionsPage() {
//   const [sessions, setSessions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const limit = 9;

//   const fetchSessions = async () => {
//     const res = await fetch(
//       `/api/sessions?search=${search}&sort=${sort}&page=${page}&limit=${limit}`
//     );
//     const data = await res.json();
//     setSessions(data.sessions);
//     setTotal(data.total);
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, [search, sort, page]);

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div className="p-6">
//       {/* Search & Sort */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//           className="  rounded-lg px-4 py-2 w-full md:w-1/3"
//         />

//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="  rounded-lg px-4 py-2"
//         >
//           <option value="desc">Sort by Date (Newest)</option>
//           <option value="asc">Sort by Date (Oldest)</option>
//         </select>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sessions.map((session) => (
//           <div
//             key={session._id}
//             className=" rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
//           >
//             <img
//               src={session.imageUrl}
//               alt={session.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-bold mb-1">{session.title}</h2>
//               <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                 {session.description}
//               </p>
//               <div className="flex items-center text-gray-500 text-sm gap-4 mb-3">
//                 <span className="flex items-center gap-1">
//                   <FaCalendarAlt /> {session.date}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <FaClock /> {session.time}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-green-600 font-bold flex items-center gap-1">
//                   <FaMoneyBillWave /> ${session.price}
//                 </span>
//                 <Link
//                   href={`/sessions/${session._id}`}
//                   className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
//                 >
//                   Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-2 mt-6">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((prev) => prev - 1)}
//           className="px-3 py-1  rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         {[...Array(totalPages).keys()].map((num) => (
//           <button
//             key={num}
//             onClick={() => setPage(num + 1)}
//             className={`px-3 py-1  rounded ${
//               page === num + 1 ? "bg-blue-600 text-white" : ""
//             }`}
//           >
//             {num + 1}
//           </button>
//         ))}
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((prev) => prev + 1)}
//           className="px-3 py-1  rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
