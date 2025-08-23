import React from "react";
import { FaLeaf, FaSmile, FaBrain, FaHeart } from "react-icons/fa";

export default function Benefits() {
    return (
        <section className=" py-16  flex flex-col md:flex-row items-center gap-10">
            {/* Text Section */}
            <div className="md:w-1/2">
                <h2 className="text-4xl font-bold  mb-4">Benefits Of</h2>
                <h3 className="text-3xl font-semibold  mb-6">
                    Yoga & Meditation
                </h3>
                <p className=" mb-6 leading-relaxed">
                    Yoga and meditation offer a holistic approach to health by reducing
                    stress, improving mental clarity, and fostering emotional balance.
                    Regular practice helps maintain inner peace and enhances overall
                    well-being.
                </p>



                <ul className="space-y-4">
                    <div className="grid grid-cols-2">
                        <li className="flex items-center text-lg ">
                            <FaLeaf className="text-green-600 mr-3" />
                            Relieving Stress
                        </li>
                        <li className="flex items-center text-lg ">
                            <FaSmile className="text-yellow-500 mr-3" />
                            Peaceful Mind
                        </li>
                        <li className="flex items-center text-lg ">
                            <FaBrain className="text-purple-500 mr-3" />
                            Reduce Anxiety
                        </li>
                        <li className="flex items-center text-lg ">
                            <FaHeart className="text-red-500 mr-3" />
                            Mental Health
                        </li>
                    </div>
                </ul>

            </div>


            {/* Image Section */}
            <div className="md:w-1/2">
                {/* <img
          src="https://images.unsplash.com/photo-1554306274-f23873d9a26a?auto=format&fit=crop&w=800&q=80"
          alt="Yoga and Meditation"
          className="rounded-2xl shadow-lg w-full object-cover"
        /> */}
            </div>
        </section>
    );
}
