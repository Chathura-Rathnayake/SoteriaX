import React from "react";
import Typography from "@material-ui/core/Typography";
import "../assets/css/homeMiddle.css";
import middle1 from "../assets/images/middle22.jpg";

import lifeSaver from "../assets/icons/lifeSaver.png";
import drone from "../assets/icons/drone.png";
import chronometer from "../assets/icons/chronometer.png";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";

import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import WatchLaterRoundedIcon from "@material-ui/icons/WatchLaterRounded";

//The animations for cards
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const theme = createMuiTheme({
  palette: {
    Typography: {
      fontSize: 36,
    },
    primary: {
      main: "#2c2c2c",
    },
    secondary: {
      main: "#e65100",
    },
    error: {
      main: "#848484",
    },
  },
});

export default function HomeMiddle() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div>
          <br></br>
          <br></br>
          <br></br>
          <div data-aos="fade-up">
            <Typography
              variant="h3"
              color="secondary"
              align="center"
              style={{ fontFamily: " 'Amiko', sans-serif" }}
            >
              Who We Are
            </Typography>
          </div>
          <div data-aos="fade-up">
            <Typography
              variant="h5"
              color="primary"
              align="center"
              align="center"
            >
              - An IoT based application which provides the lifeguard rescue
              assistance via drones -
            </Typography>
          </div>
          <div data-aos="fade-up">
            <Typography
              variant="h6"
              color="error"
              align="center"
              align="center"
            >
              It is developed to provide real time lifeguard rescue assistance
              via an UAV where the operation could be assisted and monitored{" "}
              <br /> through our system in a way such that the life critical
              decision making would be made more proficiently.
            </Typography>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>

        <div className="middleSpace">
          <Grid container spacing={1}>
            <Grid item spacing={1} xs={12} sm={6}>
              <img src={middle1} alt="" />
            </Grid>

            <Grid item spacing={1} xs={12} sm={6}>
              <br></br>
              <br></br>
              <br></br>

              <div data-aos="fade-up">
                <Typography
                  variant="h4"
                  align="center"
                  style={{
                    fontFamily: " 'Amiko', sans-serif",
                    color: "#474747",
                  }}
                >
                  Why SoteriaX
                </Typography>
                <Typography variant="h6" color="error" align="center">
                  Our main goal is to provide fast action towards a drowning
                  person <br></br> when identified and to provide support to the
                  rescue operations.
                </Typography>
              </div>

              <div align="center" style={{ margin: 10, padding: 10 }}>
                <div data-aos="fade-up">
                  <div className="icons">
                    <img src={lifeSaver} alt="" />
                  </div>

                  {/* <ErrorRoundedIcon
                    color="secondary"
                    style={{ fontSize: 70 }}
                  /> */}
                </div>
                <div data-aos="fade-up">
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: " 'Amiko', sans-serif",
                      color: "#474747",
                    }}
                  >
                    The Lifeguards
                  </Typography>
                  <Typography variant="subtitle1" color="error">
                    Lifesaving is an extremely hard and risky job. An individual
                    completes several challenging courses to become a lifeguard.
                    They work at rescue missions in beaches, lakes, swimming
                    pools and in the middle of the ocean.{" "}
                  </Typography>
                </div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <div align="center" style={{ margin: 10 }}>
                <div data-aos="fade-up">
                  <div className="icons">
                    {" "}
                    <img src={chronometer} alt="" />{" "}
                  </div>

                  {/* <HelpRoundedIcon color="secondary" style={{ fontSize: 70 }} /> */}
                </div>
                <div data-aos="fade-up">
                  <Typography
                    variant="h6"
                    color="initial"
                    style={{
                      fontFamily: " 'Amiko', sans-serif",
                      color: "#474747",
                    }}
                  >
                    Every Second Matters
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    style={{ fontSize: 15 }}
                  >
                    The main problem is time and efficiency. In a typical beach
                    if a drowning incident occurs it takes 3 to 6 minutes on
                    average to locate and rescue the victim.{" "}
                  </Typography>
                </div>
              </div>
              <br></br>
              <br></br>
              <br></br>

              <div align="center" style={{ margin: 10 }}>
                <div data-aos="fade-up">
                  {/* <WatchLaterRoundedIcon
                    color="secondary"
                    style={{ fontSize: 70 }}
                  /> */}
                  <div className="icons">
                    {" "}
                    <img src={drone} alt="" />
                  </div>
                </div>
                <div data-aos="fade-up">
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: " 'Amiko', sans-serif",
                      color: "#474747",
                    }}
                  >
                    Much Better Solution
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    style={{ fontSize: 15 }}
                  >
                    A drone which is much faster than a lifeguard can help the
                    victim by dropping a floating device (rescue tube) until the
                    lifeguard swims and safely brings the victim to shore.{" "}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </div>
  );
}
