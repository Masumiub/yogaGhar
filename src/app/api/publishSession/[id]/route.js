import clientPromise from "@/app/lib/db";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("YogaGharDB");

    const result = await db.collection("yogaSessions").updateOne(
      { _id: new ObjectId(id), status: "draft" },
      { $set: { status: "published", updated_at: new Date().toISOString() } }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: "Draft not found or already published" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Session published successfully" }), { status: 200 });
  } catch (err) {
    console.error("Error publishing draft session:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
