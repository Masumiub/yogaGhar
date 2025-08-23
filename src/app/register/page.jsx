'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";


const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    const payload = { ...data, role: "user" }; // default role

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("User registered successfully!");
    } else {
      const err = await res.json();
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-base-100 rounded-2xl shadow my-30">
      

        <h1 className="text-3xl font-bold ">Create an account</h1>
        <p>Enter your email below to create your account</p>


        <button
          onClick={() => signIn("google")}
          className=" w-full btn rounded-full mt-5"
        ><FcGoogle />
          Sign in with Google
        </button>


        <div className="my-4 flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

          <label className="label">Name</label>
          <input {...register("name")} placeholder="Name" className="input w-full" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label className="label">Email</label>
          <input {...register("email")} placeholder="Email" className="input w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}


          <label className="label">Password</label>
          <input type="password" {...register("password")} placeholder="Password" className="input w-full " />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button className="btn rounded-full w-full mt-5 btn-primary">Sign Up</button>
        </form>

        <div className="mt-5">
          <p className="text-center">Already Have an account? <Link href='/login' className="text-blue-500">Login</Link></p>
        </div>
    </div>
  );
}
