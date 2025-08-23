import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#F7DAB5] text-black py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Section - Text */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Zen Yoga
          </h1>
          <h2 className="text-2xl font-semibold mb-2">
            Find Your Inner Peace
          </h2>
          <p className="text-lg mb-6">
            Join us to discover mindfulness and strength through yoga sessions.
          </p>
          <Link href="/register">
            <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition">
              Join Now
            </button>
          </Link>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 flex justify-center">
          {/* <Image
            src="/images/yoga-header.png" // Place your image in public/images
            alt="Yoga Pose"
            width={400}
            height={400}
            className="rounded-2xl shadow-lg"
          /> */}
        </div>

      </div>
    </header>
  );
}
