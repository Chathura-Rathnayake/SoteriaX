import React from "react";
import Navbar from "../components/navbar";
import HomeTopImage from "../components/homeTopImage";
import HomeCards from "../components/homeCards";
import HomeMiddle from "../components/homeMiddle";
import Footer from "../components/footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HomeTopImage />
      <HomeMiddle />
      <HomeCards />
      <Footer />
    </div>
  );
}
