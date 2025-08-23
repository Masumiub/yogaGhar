
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
// import clientPromise from "@/app/lib/db";

// function normalizeTags(tags) {
//   if (!tags) return [];
//   if (Array.isArray(tags)) {
//     return tags.map(t => String(t).trim()).filter(Boolean);
//   }
//   return String(tags)
//     .split(",")
//     .map(t => t.trim())
//     .filter(Boolean);
// }

// function requireFields(body) {
//   const required = ["title","description","instructor","date","time","duration","imageUrl","price","user_email"];
//   const missing = required.filter(k => !body?.[k]);
//   return missing;
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const missing = requireFields(body);
//     if (missing.length) {
//       return NextResponse.json(
//         { message: `Missing required fields: ${missing.join(", ")}` },
//         { status: 400 }
//       );
//     }

//     // let userObjectId;
//     // try {
//     //   userObjectId = new ObjectId(body.user_id);
//     // } catch {
//     //   return NextResponse.json(
//     //     { message: "Invalid user_id format" },
//     //     { status: 400 }
//     //   );
//     // }

//     const now = new Date();
//     const doc = {
//       title: body.title,
//       description: body.description,
//       instructor: body.instructor,
//       date: body.date,
//       time: body.time,
//       duration: body.duration,
//       imageUrl: body.imageUrl,
//       price: body.price,
//       user_email: String(body.user_email).toLowerCase(),
//       tags: normalizeTags(body.tags),
//       status: "published",
//       created_at: now.toISOString(),
//       updated_at: now.toISOString(),
//     };

//     const client = await clientPromise;
//     const db = client.db("YogaGharDB");
//     const result = await db.collection("yogaSessions").insertOne(doc);

//     return NextResponse.json(
//       { message: "Session published", sessionId: result.insertedId },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("Error publishing session:", err);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }
