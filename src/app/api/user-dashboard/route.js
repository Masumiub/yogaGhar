// app/api/user-dashboard/route.js
import { authOptions } from "@/app/lib/auth";
import clientPromise from "@/app/lib/db";
import { getServerSession } from "next-auth/next";



export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("YogaGharDB");
    
    // Get user sessions
    const userSessions = await db
      .collection("yogaSessions")
      .find({ user_email: session.user.email })
      .toArray();
    
    // Calculate statistics
    const totalSessions = userSessions.length;
    const draftSessions = userSessions.filter(session => session.status === "draft").length;
    const publishedSessions = userSessions.filter(session => session.status === "published").length;
    
    // Prepare data for charts
    const pieChartData = [
      { name: "Published", value: publishedSessions, fill: "#10B981" },
      { name: "Drafts", value: draftSessions, fill: "#F59E0B" },
    ];
    
    const barChartData = userSessions
      .filter(session => session.status === "published")
      .map(session => ({
        name: session.title.length > 15 ? session.title.substring(0, 15) + "..." : session.title,
        price: session.price || 0,
      }));
    
    return new Response(
      JSON.stringify({
        user: session.user,
        statistics: {
          totalSessions,
          draftSessions,
          publishedSessions,
        },
        charts: {
          pieChartData,
          barChartData,
        },
        sessions: userSessions,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Dashboard API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}