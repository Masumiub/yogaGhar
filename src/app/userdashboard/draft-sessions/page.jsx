"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ManageDrafts() {
    const [drafts, setDrafts] = useState([]);
    const [editDraft, setEditDraft] = useState(null);
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

    const fetchDrafts = async () => {
        const res = await fetch("/api/getDraftSessions");
        const data = await res.json();
        setDrafts(data.sessions);
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    // const handleDelete = async (id) => {
    //     if (!confirm("Are you sure you want to delete this draft?")) return;
    //     const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    //     if (res.ok) fetchDrafts();
    // };


    const handleDelete = async (id) => {
  // Show confirmation dialog with SweetAlert2
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#8B5CF6',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    background: '#F9FAFB',
    customClass: {
      confirmButton: 'px-4 py-2 rounded-lg font-medium',
      cancelButton: 'px-4 py-2 rounded-lg font-medium',
      popup: 'rounded-2xl shadow-xl'
    }
  });

  // If user confirmed, proceed with deletion
  if (result.isConfirmed) {
    try {
      const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
      
      if (res.ok) {
        // Show success message
        await Swal.fire({
          title: 'Deleted!',
          text: 'Your draft has been deleted.',
          icon: 'success',
          confirmButtonColor: '#8B5CF6',
          confirmButtonText: 'OK',
          background: '#F9FAFB',
          customClass: {
            confirmButton: 'px-4 py-2 rounded-lg font-medium',
            popup: 'rounded-2xl shadow-xl'
          }
        });
        
        // Refresh the drafts list
        fetchDrafts();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      // Show error message
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the draft. Please try again.',
        icon: 'error',
        confirmButtonColor: '#EF4444',
        confirmButtonText: 'OK',
        background: '#F9FAFB',
        customClass: {
          confirmButton: 'px-4 py-2 rounded-lg font-medium',
          popup: 'rounded-2xl shadow-xl'
        }
      });
    }
  }
};


    const openEditModal = (draft) => {
        setEditDraft(draft);

        // normalize tags: ensure it's an array
        const tagsArray = Array.isArray(draft.tags)
            ? draft.tags
            : draft.tags
                ? draft.tags.split(",").map(t => t.trim())
                : [];

        setFormData({
            title: draft.title,
            description: draft.description,
            price: draft.price,
            instructor: draft.instructor,
            date: draft.date,
            time: draft.time,
            duration: draft.duration,
            tags: tagsArray.join(", "), // now safe
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/sessions/${editDraft._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            fetchDrafts();
            setEditDraft(null);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handlePublish = async (id) => {
        if (!confirm("Publish this session?")) return;
        const res = await fetch(`/api/publishSession/${id}`, { method: "PATCH" });
        if (res.ok) fetchDrafts();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Manage Draft Sessions</h1>

            {drafts.length === 0 ? (
                <div className="text-center py-12 bg-base-200 rounded-lg">
                    <p className="text-lg text-gray-600">No draft sessions found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                    <table className="table table-zebra w-full">
                        {/* Table header */}
                        <thead>
                            <tr className="bg-base-300">
                                <th className="text-left py-4 px-4">Title</th>
                                <th className="text-left py-4 px-4">Instructor</th>
                                <th className="text-left py-4 px-4">Date & Time</th>
                                <th className="text-left py-4 px-4">Duration</th>
                                <th className="text-left py-4 px-4">Price</th>
                                <th className="text-center py-4 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drafts.map((d) => (
                                <tr key={d._id} className="hover:bg-base-200 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="font-semibold">{d.title}</div>
                                        <div className="text-sm text-gray-600 line-clamp-2">{d.description}</div>
                                        {d.tags && d.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {Array.isArray(d.tags) ? (
                                                    d.tags.map((tag, index) => (
                                                        <span key={index} className="badge badge-outline badge-sm">
                                                            {tag}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="badge badge-outline badge-sm">{d.tags}</span>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">{d.instructor || "Not specified"}</td>
                                    <td className="py-4 px-4">
                                        <div>{d.date || "No date set"}</div>
                                        <div className="text-sm text-gray-600">{d.time || "No time set"}</div>
                                    </td>
                                    <td className="py-4 px-4">{d.duration || "Not specified"}</td>
                                    <td className="py-4 px-4 font-medium">${d.price || "0"}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => openEditModal(d)}
                                                className="btn btn-sm btn-outline btn-info"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handlePublish(d._id)}
                                                className="btn btn-sm btn-outline btn-success"
                                            >
                                                Publish
                                            </button>
                                            <button
                                                onClick={() => handleDelete(d._id)}
                                                className="btn btn-sm btn-outline btn-error"
                                            >
                                                Delete
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
            {editDraft && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Edit Draft</h2>
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
                                    onClick={() => setEditDraft(null)}
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


// "use client";

// import { useEffect, useState } from "react";

// export default function ManageDrafts() {
//   const [drafts, setDrafts] = useState([]);
//   const [editDraft, setEditDraft] = useState(null);
//   const [formData, setFormData] = useState({ title: "", description: "", price: "" });

//   const fetchDrafts = async () => {
//     const res = await fetch("/api/getDraftSessions");
//     const data = await res.json();
//     setDrafts(data.sessions);
//   };

//   useEffect(() => {
//     fetchDrafts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this draft?")) return;
//     const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
//     if (res.ok) fetchDrafts();
//   };

// const openEditModal = (draft) => {
//   setEditDraft(draft);

//   // normalize tags: ensure it's an array
//   const tagsArray = Array.isArray(draft.tags)
//     ? draft.tags
//     : draft.tags
//     ? draft.tags.split(",").map(t => t.trim())
//     : [];

//   setFormData({
//     title: draft.title,
//     description: draft.description,
//     price: draft.price,
//     instructor: draft.instructor,
//     date: draft.date,
//     time: draft.time,
//     duration: draft.duration,
//     tags: tagsArray.join(", "), // now safe
//   });
// };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`/api/sessions/${editDraft._id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });
//     if (res.ok) {
//       fetchDrafts();
//       setEditDraft(null);
//     }
//   };

//   const handlePublish = async (id) => {
//     if (!confirm("Publish this session?")) return;
//     const res = await fetch(`/api/publishSession/${id}`, { method: "PATCH" });
//     if (res.ok) fetchDrafts();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Draft Sessions</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {drafts.map((d) => (
//           <div key={d._id} className="p-4  rounded shadow relative">
//             <h2 className="font-bold text-lg">{d.title}</h2>
//             <p>{d.description}</p>
//             <p>Price: ${d.price}</p>
//             <p>Instructor: {d.instructor}</p>
//             <p>Date: {d.date}</p>
//             <p>Time: {d.time}</p>
//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => openEditModal(d)}
//                 className="px-3 py-1 bg-blue-600 text-white rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handlePublish(d._id)}
//                 className="px-3 py-1 bg-green-600 text-white rounded"
//               >
//                 Publish
//               </button>
//               <button
//                 onClick={() => handleDelete(d._id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {editDraft && (
//         <div className="fixed inset-0 flex justify-center items-center ">
//           <div className="bg-base-100 p-6 rounded-xl w-96 shadow-2xl">
//             <h2 className="text-xl font-bold mb-4">Edit Draft</h2>
//             <form onSubmit={handleEditSubmit} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="w-full px-3 py-2 rounded input"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 className="w-full px-3 py-2 rounded input"
//               />
//               <input
//                 type="text"
//                 placeholder="Price"
//                 value={formData.price}
//                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                 className="w-full px-3 py-2 rounded input"
//               />
//               <div className="flex justify-end gap-2 mt-2">
//                 <button
//                   type="button"
//                   onClick={() => setEditDraft(null)}
//                   className="px-4 py-2 rounded btn"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded btn">
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
