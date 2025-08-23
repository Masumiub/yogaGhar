"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye, FaCalendarAlt, FaClock, FaUser, FaTag } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ManageSessions() {
  const [sessions, setSessions] = useState([]);
  const [editSession, setEditSession] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    instructor: "",
    date: "",
    time: "",
    duration: "",
    tags: ""
  });

  const fetchSessions = async () => {
    const res = await fetch("/api/getPublishedSession");
    const data = await res.json();
    setSessions(data.sessions);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this session?")) return;

    const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (res.ok) fetchSessions();
  };

  const openEditModal = (session) => {
    setEditSession(session);

    // normalize tags: ensure it's an array
    const tagsArray = Array.isArray(session.tags)
      ? session.tags
      : session.tags
        ? session.tags.split(",").map(t => t.trim())
        : [];

    setFormData({
      title: session.title,
      description: session.description,
      price: session.price,
      instructor: session.instructor,
      date: session.date,
      time: session.time,
      duration: session.duration,
      tags: tagsArray.join(", "),
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

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      
      fetchSessions();
      setEditSession(null);


    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Manage Yoga Sessions</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <p className="text-lg text-gray-600">No published sessions found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
          <table className="table table-zebra w-full">
            {/* Table header */}
            <thead>
              <tr className="bg-base-300">
                <th className="text-left py-4 px-4">Session Details</th>
                <th className="text-left py-4 px-4">Instructor</th>
                <th className="text-left py-4 px-4">Date & Time</th>
                <th className="text-left py-4 px-4">Duration</th>
                <th className="text-left py-4 px-4">Price</th>
                <th className="text-center py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s._id} className="hover:bg-base-200 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-gray-600 line-clamp-2">{s.description}</div>
                    {s.tags && s.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {Array.isArray(s.tags) ? (
                          s.tags.map((tag, index) => (
                            <span key={index} className="badge badge-outline badge-sm">
                              <FaTag className="mr-1" size={10} /> {tag}
                            </span>
                          ))
                        ) : (
                          <span className="badge badge-outline badge-sm">
                            <FaTag className="mr-1" size={10} /> {s.tags}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-gray-500" />
                      {s.instructor || "Not specified"}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-500" />
                      {s.date || "No date set"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <FaClock className="mr-2 text-gray-500" />
                      {s.time || "No time set"}
                    </div>
                  </td>
                  <td className="py-4 px-4">{s.duration || "Not specified"}</td>
                  <td className="py-4 px-4 font-medium">${s.price || "0"}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="btn btn-sm btn-outline btn-info flex items-center justify-center"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="btn btn-sm btn-outline btn-error flex items-center justify-center"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editSession && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Session</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full input input-bordered"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full textarea textarea-bordered"
                  rows="3"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Price ($)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full input input-bordered"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Instructor</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Instructor"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="w-full input input-bordered"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full input input-bordered"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full input input-bordered"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Duration</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Duration (e.g., 60 mins)"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full input input-bordered"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Tags (comma separated)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full input input-bordered"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditSession(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// export default function ManageSessions() {
//   const [sessions, setSessions] = useState([]);
//   const [editSession, setEditSession] = useState(null);
//   const [formData, setFormData] = useState({ title: "", description: "", price: "" });

//   const fetchSessions = async () => {
// const res = await fetch("/api/getPublishedSession");
//     const data = await res.json();
//     setSessions(data.sessions);
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, []);

// //console.log(sessions)

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this session?")) return;

//     const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
//     if (res.ok) fetchSessions();
//   };

//   const openEditModal = (session) => {
//     setEditSession(session);
//     setFormData({
//       title: session.title,
//       description: session.description,
//       price: session.price,
//     });
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`/api/sessions/${editSession._id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });
//     if (res.ok) {
//       fetchSessions();
//       setEditSession(null);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Yoga Sessions</h1>

//       <table className="w-full table-auto  ">
//         <thead className="bg-base-100">
//           <tr>
//             <th className=" px-4 py-2">Title</th>
//             <th className=" px-4 py-2">Instructor</th>
//             <th className=" px-4 py-2">Date</th>
//             <th className=" px-4 py-2">Time</th>
//             <th className=" px-4 py-2">Price</th>
//             <th className=" px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sessions.map((s) => (
//             <tr key={s._id} className="text-center">
//               <td className=" px-4 py-2">{s.title}</td>
//               <td className=" px-4 py-2">{s.instructor}</td>
//               <td className=" px-4 py-2">{s.date}</td>
//               <td className=" px-4 py-2">{s.time}</td>
//               <td className=" px-4 py-2">{s.price}</td>
//               <td className=" px-4 py-2 flex justify-center gap-2">
//                 <button
//                   onClick={() => openEditModal(s)}
//                   className="text-blue-600 hover:text-blue-800"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(s._id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Edit Modal */}
//       {editSession && (
//         <div className="fixed inset-0  flex justify-center items-center">
//           <div className="bg-base-100 p-6 rounded-xl w-96 shadow-2xl">
//             <h2 className="text-xl font-bold mb-4">Edit Session</h2>
//             <form onSubmit={handleEditSubmit} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="w-full  px-3 py-2 rounded input"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 className="w-full  px-3 py-2 rounded input"
//               />
//               <input
//                 type="text"
//                 placeholder="Price"
//                 value={formData.price}
//                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                 className="w-full  px-3 py-2 rounded input"
//               />
//               <div className="flex justify-end gap-2 mt-2">
//                 <button
//                   type="button"
//                   onClick={() => setEditSession(null)}
//                   className="px-4 py-2  rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
