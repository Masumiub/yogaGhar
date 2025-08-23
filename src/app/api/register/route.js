import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/app/lib/db";


export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    const client = await clientPromise;
    const db = client.db("YogaGharDB");

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      createdAt: new Date()
    });

    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
