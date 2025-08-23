"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ManageSessions() {
  const [sessions, setSessions] = useState([]);
  const [editSession, setEditSession] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", price: "" });

  const fetchSessions = async () => {
const res = await fetch("/api/getPublishedSession");
    const data = await res.json();
    setSessions(data.sessions);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

//console.log(sessions)

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this session?")) return;

    const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (res.ok) fetchSessions();
  };

  const openEditModal = (session) => {
    setEditSession(session);
    setFormData({
      title: session.title,
      description: session.description,
      price: session.price,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/sessions/${editSession._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      fetchSessions();
      setEditSession(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Yoga Sessions</h1>

      <table className="w-full table-auto  ">
        <thead className="bg-base-100">
          <tr>
            <th className=" px-4 py-2">Title</th>
            <th className=" px-4 py-2">Instructor</th>
            <th className=" px-4 py-2">Date</th>
            <th className=" px-4 py-2">Time</th>
            <th className=" px-4 py-2">Price</th>
            <th className=" px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s._id} className="text-center">
              <td className=" px-4 py-2">{s.title}</td>
              <td className=" px-4 py-2">{s.instructor}</td>
              <td className=" px-4 py-2">{s.date}</td>
              <td className=" px-4 py-2">{s.time}</td>
              <td className=" px-4 py-2">{s.price}</td>
              <td className=" px-4 py-2 flex justify-center gap-2">
                <button
                  onClick={() => openEditModal(s)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editSession && (
        <div className="fixed inset-0  flex justify-center items-center">
          <div className="bg-base-100 p-6 rounded-xl w-96 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Session</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full  px-3 py-2 rounded input"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full  px-3 py-2 rounded input"
              />
              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full  px-3 py-2 rounded input"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditSession(null)}
                  className="px-4 py-2  rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
