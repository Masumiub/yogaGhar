"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (!res.error) {
      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col gap-6 border-0">

      <div className="overflow-hidden p-0 border-0 ">
        <div className="grid p-0 md:grid-cols-2 items-center">
          <form className="p-6 md:p-8" onSubmit={handleCredentialsLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>

              <div className="grid gap-3">
                <label>Email</label>
                <input id="email" name="email" type="email" placeholder="m@example.com" className='input' required />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <label>Password</label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <input id="password" name="password" type="password" className='input' required />
              </div>

              <button type="submit" className="w-full text-white bg-blue-500 rounded-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>


              <div className="divider">or Continue With</div>

              <div className="grid grid-cols-1 gap-4">

                {/* Google Login */}
                <button variant="outline" type="button" className="w-full border-base-300 border-1 hover:bg-blue-300" onClick={handleGoogleLogin}>
                  <span className="sr-only">Login with Google</span>
                  <FcGoogle />
                </button>

              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            {/* <Image src={imgLogin} alt="imgLogin" width='250px'>

            </Image> */}
          </div>
        </div>
      </div>

      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">Terms of Service</a> and{" "}
        <a href="#" className="underline underline-offset-4">Privacy Policy</a>.
      </div>

    </div>
  );
}
