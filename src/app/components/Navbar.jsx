"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEarthAmericas } from "react-icons/fa6";
import { CgDarkMode } from "react-icons/cg";
import { usePathname } from 'next/navigation';

export default function Navbar() {
      const pathname = usePathname();

          if (pathname.startsWith('/userdashboard')) {
        return null;
    }
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };


  return (
    <div className="bg-neutral">
      <div className="navbar bg-neutral text-neutral-content shadow-sm py-5 max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-800 text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/events'>Events</Link>
              </li>
              <li>
                <Link href='/contact'>Contact</Link>
              </li>
            </ul>
          </div>

          <Link href='/'>
            <div className="flex items-center">
              <div className="ml-2">
                <FaEarthAmericas />
              </div>
              <p className="px-3 text-xl font-bold hidden md:block">YogaGhar</p>
            </div>

          </Link>

        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/sessions'>Sessions</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex gap-2">


          {status === "loading" ? (
            <span>Loading...</span>
          ) : session ? (
            <>
              <span className="hidden md:inline">
                Hi, {session.user.name || session.user.email}
              </span>
              {session.user.role === "user" && (
                <Link href="/userdashboard" className="btn rounded-full">
                  Dashboard
                </Link>
              )}

              <button onClick={handleLogout} className="btn btn-outline rounded-full">
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline rounded-full"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="btn  rounded-full"
                onClick={() => router.push("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
