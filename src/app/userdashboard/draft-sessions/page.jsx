"use client";

import { useEffect, useState } from "react";

export default function ManageDrafts() {
  const [drafts, setDrafts] = useState([]);
  const [editDraft, setEditDraft] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", price: "" });

  const fetchDrafts = async () => {
    const res = await fetch("/api/getDraftSessions");
    const data = await res.json();
    setDrafts(data.sessions);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this draft?")) return;
    const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (res.ok) fetchDrafts();
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
    }
  };

  const handlePublish = async (id) => {
    if (!confirm("Publish this session?")) return;
    const res = await fetch(`/api/publishSession/${id}`, { method: "PATCH" });
    if (res.ok) fetchDrafts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Draft Sessions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drafts.map((d) => (
          <div key={d._id} className="p-4  rounded shadow relative">
            <h2 className="font-bold text-lg">{d.title}</h2>
            <p>{d.description}</p>
            <p>Price: ${d.price}</p>
            <p>Instructor: {d.instructor}</p>
            <p>Date: {d.date}</p>
            <p>Time: {d.time}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openEditModal(d)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handlePublish(d._id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Publish
              </button>
              <button
                onClick={() => handleDelete(d._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editDraft && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="bg-base-100 p-6 rounded-xl w-96 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Draft</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded input"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded input"
              />
              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 rounded input"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditDraft(null)}
                  className="px-4 py-2 rounded btn"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded btn">
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
