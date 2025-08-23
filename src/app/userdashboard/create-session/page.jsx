"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useSession } from "next-auth/react";

// ✅ Validation Schema
const sessionSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  instructor: z.string().min(3, "Instructor name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().nonempty("Time is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.string().min(1, "Price is required"),
  image: z.any().refine((file) => file?.length === 1, "Please upload an image"),
  tags: z.string().optional(),
});

export default function CreateSessionPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(sessionSchema),
  });

  const onSubmit = async (data, statusType) => {
    if (!session?.user?.email) {
      alert("You must be logged in to create a session");
      return;
    }

    try {
      setLoading(true);

      // Upload image to imgbb
      const imgFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imgFile);

      const imgbbApiKey = process.env.NEXT_PUBLIC_imgBB_key;
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      const imageUrl = uploadRes.data.data.url;

      // Prepare session data
      const newSession = {
        title: data.title,
        description: data.description,
        instructor: data.instructor,
        date: data.date,
        time: data.time,
        duration: data.duration,
        price: data.price,
        imageUrl,
        tags: data.tags || "",
        user_email: session.user.email,
        statusType, // "draft" or "publish"
      };

      console.log("Sending session:", newSession);

      const response = await axios.post("/api/sessions", newSession);

      alert(
        statusType === "publish"
          ? "Session published successfully!"
          : "Draft saved successfully!"
      );
      console.log("API Response:", response.data);

    } catch (err) {
      console.error("Error creating session:", err.response || err);
      alert("Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl  p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Yoga Session</h2>
      <form className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input type="text" {...register("title")} className="w-full p-2 rounded input"/>
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea {...register("description")} className="w-full p-2 rounded input"/>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* Instructor */}
        <div>
          <label className="block font-medium">Instructor</label>
          <input type="text" {...register("instructor")} className="w-full p-2 input rounded"/>
          {errors.instructor && <p className="text-red-500">{errors.instructor.message}</p>}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block font-medium">Date</label>
          <input type="date" {...register("date")} className="w-full p-2 input rounded"/>
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>
        <input type="time" {...register("time")} className="w-full p-2 input"/>
        {errors.time && <p className="text-red-500">{errors.time.message}</p>}

        {/* Duration */}
        <div>
          <label className="block font-medium">Duration (e.g. 60 mins)</label>
          <input type="text" {...register("duration")} className="w-full p-2 input rounded"/>
          {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price ($)</label>
          <input type="number" {...register("price")} className="w-full p-2 input rounded"/>
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium">Tags (comma separated)</label>
          <input type="text" {...register("tags")} placeholder="yoga, meditation" className="w-full p-2 input rounded"/>
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium">Image</label>
          <input type="file" {...register("image")} className="w-full p-2 input"/>
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={loading}
            onClick={handleSubmit((data) => onSubmit(data, "draft"))}>
            {loading ? "Saving..." : "Save as Draft"}
          </button>
          <button type="button" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
            onClick={handleSubmit((data) => onSubmit(data, "publish"))}>
            {loading ? "Publishing..." : "Publish Session"}
          </button>
        </div>
      </form>
    </div>
  );
}
