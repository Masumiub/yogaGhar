"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";

export default function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500
      });

      router.push("/");
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid email or password",
        showConfirmButton: false,
        timer: 1500
      });
      // alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

        {/* Left Side - Welcome Content */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
                Welcome Back to yogaGhar
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Continue your wellness journey with personalized yoga sessions, guided meditations, and a supportive community.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span>Access to 500+ guided sessions</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span>Personalized practice recommendations</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
                <span>Track your progress and achievements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl shadow-blue-200/20 dark:shadow-purple-900/30 p-8">

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to continue your practice
              </p>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] mb-6"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleCredentialsLogin} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email" defaultValue="musfiquemasum@gmail.com"
                    placeholder="Enter your email"
                    className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 pl-11 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password" defaultValue='admin1234'
                    className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 pl-11 pr-11 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300 transition-colors duration-200"
                >
                  Create one now
                </a>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By signing in, you agree to our{" "}
                <a href="/terms" className="text-blue-600 dark:text-purple-400 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 dark:text-purple-400 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Additional decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl lg:hidden"></div>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// import Image from "next/image";
// import { FcGoogle } from "react-icons/fc";

// export default function LoginForm({ className, ...props }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleCredentialsLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     setLoading(false);

//     if (!res.error) {
//       router.push("/");
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     await signIn("google", { callbackUrl: "/" });
//   };

//   return (
//     <div className="flex flex-col gap-6 border-0">

//       <div className="overflow-hidden p-0 border-0 ">
//         <div className="grid p-0 md:grid-cols-2 items-center">
//           <form className="p-6 md:p-8" onSubmit={handleCredentialsLogin}>
//             <div className="flex flex-col gap-6">
//               <div className="flex flex-col items-center text-center">
//                 <h1 className="text-2xl font-bold">Welcome back</h1>
//                 <p className="text-muted-foreground text-balance">
//                   Login to your account
//                 </p>
//               </div>

//               <div className="grid gap-3">
//                 <label>Email</label>
//                 <input id="email" name="email" type="email" placeholder="m@example.com" className='input' required />
//               </div>

//               <div className="grid gap-3">
//                 <div className="flex items-center">
//                   <label>Password</label>
//                   <a
//                     href="#"
//                     className="ml-auto text-sm underline-offset-2 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <input id="password" name="password" type="password" className='input' required />
//               </div>

//               <button type="submit" className="w-full text-white bg-blue-500 rounded-full" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>


//               <div className="divider">or Continue With</div>

//               <div className="grid grid-cols-1 gap-4">

//                 {/* Google Login */}
//                 <button variant="outline" type="button" className="w-full border-base-300 border-1 hover:bg-blue-300" onClick={handleGoogleLogin}>
//                   <span className="sr-only">Login with Google</span>
//                   <FcGoogle />
//                 </button>

//               </div>

//               <div className="text-center text-sm">
//                 Don&apos;t have an account?{" "}
//                 <a href="/register" className="underline underline-offset-4">
//                   Sign up
//                 </a>
//               </div>
//             </div>
//           </form>

//           <div className="bg-muted relative hidden md:block">
//             {/* <Image src={imgLogin} alt="imgLogin" width='250px'>

//             </Image> */}
//           </div>
//         </div>
//       </div>

//       <div className="text-muted-foreground text-center text-xs text-balance">
//         By clicking continue, you agree to our{" "}
//         <a href="#" className="underline underline-offset-4">Terms of Service</a> and{" "}
//         <a href="#" className="underline underline-offset-4">Privacy Policy</a>.
//       </div>

//     </div>
//   );
// }
