
import clientPromise from "@/app/lib/db";
import { NextResponse } from "next/server";


function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map(t => String(t).trim()).filter(Boolean);
  return String(tags).split(",").map(t => t.trim()).filter(Boolean);
}

function requireFields(body) {
  const required = ["title","description","instructor","date","time","duration","imageUrl","price","user_email"];
  return required.filter(k => !body?.[k]);
}

export async function POST(req) {
  try {
    const body = await req.json();

    // validate required fields
    const missing = requireFields(body);
    if (missing.length) {
      return NextResponse.json(
        { message: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const now = new Date();
    const doc = {
      title: body.title,
      description: body.description,
      instructor: body.instructor,
      date: body.date,
      time: body.time,
      duration: body.duration,
      imageUrl: body.imageUrl,
      price: body.price,
      user_email: String(body.user_email).toLowerCase(),
      tags: normalizeTags(body.tags),
      status: body.statusType === "publish" ? "published" : "draft",
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    console.log("Inserting document:", doc);

    const client = await clientPromise;
    const db = client.db("YogaGharDB");
    const result = await db.collection("yogaSessions").insertOne(doc);

    console.log("Insert result:", result);

    return NextResponse.json({ message: "Session saved", sessionId: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("Error saving session:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}



// export async function POST(req) {
//   try {
//     const body = await req.json(); // ✅ Fix here

//     const {
//       title,
//       description,
//       instructor,
//       date,
//       time,
//       duration,
//       price,
//       imageUrl,
//       tags,
//       user_id,
//       user_email,
//       statusType,
//     } = body;

//     if (!title || !description || !instructor || !date || !time || !duration || !price || !imageUrl || !user_id || !user_email) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db("YogaGharDB");

//     const sessionDoc = {
//       title,
//       description,
//       instructor,
//       date,
//       time,
//       duration,
//       price,
//       imageUrl,
//       tags: tags || [],
//       user_id,
//       user_email,
//       statusType: statusType || "draft",
//       createdAt: new Date(),
//     };

//     const result = await db.collection("sessions").insertOne(sessionDoc);

//     return NextResponse.json({ success: true, sessionId: result.insertedId }, { status: 201 });
//   } catch (error) {
//     console.error("Error saving session:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("YogaGharDB");
    const sessionsCollection = db.collection("yogaSessions");

    // Extract query params
    const { search, sort, page, limit } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // partial & case-insensitive
    }

    const sortOption = sort === "asc" ? 1 : -1;
    const pageNumber = parseInt(page) || 1;
    const perPage = parseInt(limit) || 9;
    const skip = (pageNumber - 1) * perPage;

    const total = await sessionsCollection.countDocuments(query);

    const sessions = await sessionsCollection
      .find(query)
      .sort({ date: sortOption })
      .skip(skip)
      .limit(perPage)
      .toArray();

    return Response.json({ sessions, total });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
