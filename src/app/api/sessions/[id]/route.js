
import clientPromise from "@/app/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("YogaGharDB");
    const session = await db
      .collection("yogaSessions")
      .findOne({ _id: new ObjectId(id) });

    if (!session) {
      return new Response(JSON.stringify({ error: "Session not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(session), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}



export async function PATCH(req, { params }) {
  try {
    const id = await params?.id;
    if (!id) return new Response(JSON.stringify({ message: "Missing session ID" }), { status: 400 });

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("YogaGharDB");

    const updateFields = {};
    ["title", "description", "price", "instructor", "date", "time", "duration", "tags"].forEach(key => {
      if (body[key] !== undefined) updateFields[key] = body[key];
    });
    updateFields.updated_at = new Date().toISOString();

    // Allow updating both draft and published sessions
    const result = await db.collection("yogaSessions").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Session not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Session updated" }), { status: 200 });
  } catch (err) {
    console.error("PATCH error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = await params?.id;
    if (!id) return new Response(JSON.stringify({ message: "Missing session ID" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("YogaGharDB");

    const result = await db.collection("yogaSessions").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Session not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Session deleted" }), { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}


// export async function DELETE(req, { params }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("YogaGharDB");
//     const result = await db
//       .collection("yogaSessions")
//       .deleteOne({ _id: new ObjectId(params.id) });

//     if (result.deletedCount === 0) {
//       return new Response(JSON.stringify({ error: "Session not found" }), { status: 404 });
//     }

//     return new Response(JSON.stringify({ message: "Deleted successfully" }));
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }



// export async function PATCH(req, { params }) {
//   try {
//     const body = await req.json();
//     const client = await clientPromise;
//     const db = client.db("YogaGharDB");

//     const result = await db.collection("yogaSessions").updateOne(
//       { _id: new ObjectId(params.id) },
//       { $set: body }
//     );

//     if (result.matchedCount === 0) {
//       return new Response(JSON.stringify({ error: "Session not found" }), { status: 404 });
//     }

//     return new Response(JSON.stringify({ message: "Updated successfully" }));
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }
