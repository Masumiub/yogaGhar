"use client";

import { FaSpa, FaLeaf } from "react-icons/fa";
import { GiMeditation, GiMusicalNotes } from "react-icons/gi";

export default function Services() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold  mb-4">
          Our Wellness Services
        </h2>
        <p className="text-lg ">
          Explore holistic practices designed to rejuvenate your body and mind.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Meditation */}
        <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
          <GiMeditation className="text-5xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-black">Meditation</h3>
          <p className="text-gray-700">
            Practice mindfulness to reduce stress, improve focus, and promote
            inner peace through guided meditation.
          </p>
        </div>

        {/* Aromatherapy */}
        <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
          <FaLeaf className="text-5xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-black">Aromatherapy</h3>
          <p className="text-gray-700">
            Heal your senses with natural essential oils that enhance relaxation
            and restore emotional balance.
          </p>
        </div>

        {/* Yoga Asanas */}
        <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
          <FaSpa className="text-5xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-black">Yoga Asanas</h3>
          <p className="text-gray-700">
            Strengthen your body and mind through postures that improve
            flexibility, balance, and overall well-being.
          </p>
        </div>

        {/* Sound Therapy */}
        <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
          <GiMusicalNotes className="text-5xl text-black mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-black">Sound Therapy</h3>
          <p className="text-gray-700">
            Experience deep relaxation and mental clarity with soothing sound
            vibrations and frequency healing.
          </p>
        </div>
      </div>
    </section>
  );
}
