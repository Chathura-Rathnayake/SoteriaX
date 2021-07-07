import React from "react";
import Navbar from "../components/navbar";
import HomeTopImage from "../components/homeTopImage";
import HomeCards from "../components/homeCards";


export default function HomePage() {
  return (
    <div>
        <Navbar />
        <HomeTopImage />
        <HomeCards />
    </div>
  );
}
