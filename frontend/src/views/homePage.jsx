import React from "react";
import Navbar from "../components/navbar";
import HomeTopImage from "../components/homeTopImage";
import HomeCards from "../components/homeCards";
import HomeMiddle from "../components/homeMiddle";
import Footer from "../components/footer";
import CssBaseline from '@material-ui/core/CssBaseline';

export default function HomePage() {

  
  return (
    <div>
      {/* <CssBaseline> */}
      <Navbar />
      <HomeTopImage />
      <HomeMiddle />
      <HomeCards />
      <Footer />
      {/* </CssBaseline> */}
    </div>
  );
}
