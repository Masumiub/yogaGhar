import Image from "next/image";
import Header from "./components/Header";
import Services from "./components/Services";
import Benefits from "./components/Benefits";

export default function Home() {
  return (
    <div className="mx-auto">
      <Header></Header>
      <Services></Services>
      <Benefits></Benefits>
      </div>
  );
}
