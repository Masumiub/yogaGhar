import clientPromise from "@/app/lib/db";
import Image from "next/image";
import { ObjectId } from "mongodb";

// async function getSession(id) {
//   const res = await fetch(`/api/sessions/${id}`, {
//     next: { revalidate: 60 }, // ISR every 60s
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch session details");
//   }

//   return res.json();
// }

export default async function SessionDetails({ params }) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("YogaGharDB");

  const session = await db.collection("yogaSessions").findOne({ _id: new ObjectId(id) });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        {session.imageUrl && (
          <div className="relative w-full h-72">
            <Image
              src={session.imageUrl}
              alt={session.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Session Info */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
          <p className=" mb-4">{session.description}</p>

          <div className="space-y-2 text-lg">
            <p><strong>Instructor:</strong> {session.instructor}</p>
            <p><strong>Date:</strong> {session.date}</p>
            <p><strong>Time:</strong> {session.time}</p>
            <p><strong>Duration:</strong> {session.duration}</p>
            <p><strong>Price:</strong> {session.price} BDT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pre-generate paths for all sessions (SSG/ISR)
// export async function generateStaticParams() {
//   const res = await fetch(`/api/sessions`);
//   const data = await res.json();

//   const sessions = Array.isArray(data.sessions) ? data.sessions : [];

//   return sessions.map((session) => ({
//     id: session._id.toString(),
//   }));
// }

// // Metadata for SEO
// export async function generateMetadata({ params }) {
//     const { id } = await params;
//   const session = await getSession(id);

//   return {
//     title: `${session.title} | Yoga Sessions`,
//     description: session.description,
//   };
// }
