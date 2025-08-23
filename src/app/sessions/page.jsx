"use client";

import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;

  const fetchSessions = async () => {
    const res = await fetch(
      `/api/sessions?search=${search}&sort=${sort}&page=${page}&limit=${limit}`
    );
    const data = await res.json();
    setSessions(data.sessions);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchSessions();
  }, [search, sort, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="  rounded-lg px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="  rounded-lg px-4 py-2"
        >
          <option value="desc">Sort by Date (Newest)</option>
          <option value="asc">Sort by Date (Oldest)</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session._id}
            className=" rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={session.imageUrl}
              alt={session.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-1">{session.title}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {session.description}
              </p>
              <div className="flex items-center text-gray-500 text-sm gap-4 mb-3">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> {session.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock /> {session.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <FaMoneyBillWave /> ${session.price}
                </span>
                <Link
                  href={`/sessions/${session._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1  rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-3 py-1  rounded ${
              page === num + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {num + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1  rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
