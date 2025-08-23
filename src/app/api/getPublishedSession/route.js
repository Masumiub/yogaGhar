import { authOptions } from "@/app/lib/auth";
import clientPromise from "@/app/lib/db";
import { getServerSession } from "next-auth"; // Assuming you use next-auth


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }


    const userEmail = session.user.email.toLowerCase();

    const client = await clientPromise;
    const db = client.db("YogaGharDB");

    // ✅ Fetch all published sessions
    const sessions = await db
      .collection("yogaSessions")
      .find({ status: "published" , user_email: userEmail})
      .sort({ date: -1 })
      .toArray();

    return new Response(JSON.stringify({ sessions }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching published sessions:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}



// import clientPromise from "@/app/lib/db";
// import { ObjectId } from "mongodb";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("YogaGharDB");
//     const sessions = await db
//       .collection("yogaSessions")
//       .find()
//       .sort({ date: -1 })
//       .toArray();

//     return new Response(JSON.stringify({ sessions }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }
