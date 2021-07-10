import React from "react";
import "../assets/css/homeCards.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//card images
import card1 from "../assets/images/card1.jpg";
import card2 from "../assets/images/card2.jpg";
import card3 from "../assets/images/card3.jpg";
import card4 from "../assets/images/card4.jpg";

//The animations for cards
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const useStyles = makeStyles({
  root: {
    maxWidth: 320, //345
  },
  media: {
    height: 140,
  },
});

export default function HomeCards() {
  const classes = useStyles();

  return (
    <div className="cardSpace">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div data-aos="fade-up">
        {" "}
        <Typography
          variant="h4"
          align="center"
          style={{
            fontFamily: " 'Amiko', sans-serif",
            color: "#474747",
          }}
        >
          Our Services
        </Typography>
        <Typography
          variant="h6"
          align="center"
          style={{
            color: "#474747",
          }}
        >
          - SoteriaX offers following services -{" "}
        </Typography>
      </div>

      <br></br>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <div data-aos="fade-up">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={card1}
                  title="drone assistance1"
                />{" "}
                <CardContent>
                  <Typography
                    gutterBottom
                    align="center"
                    variant="h5"
                    component="h2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Drone Assistance
                  </Typography>
                  <Typography
                    align="center"
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 12,
                    }}
                  >
                    Providing a resuce tube quickly and efficiently for the
                    drowning victim via a drone.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>

        <Grid item>
          <div data-aos="fade-up">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={card2}
                  title="drone assistance2"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Situational Awareness
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 12,
                    }}
                    align="center"
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Overseeing the whole operation using the realtime video feed
                    from the drone.
                    {/* And guiding the lifeguard in action via the speaker mounted to the drone. */}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>

        <Grid item>
          <div data-aos="fade-up">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={card3}
                  title="drone assistance3"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Lifeguard Training
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 12,
                    }}
                    align="center"
                  >
                    Training lifeguards with the help of the features provided
                    by the mobile application
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>

        <Grid item>
          <div data-aos="fade-up">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={card4}
                  title="drone assistance4"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
           
                    }}
                    align="center"
                  >
                    Quick Reaction
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 12,
                    }}
                    align="center"
                  >
                    Quickly reacting and informing relevant parties such as
                    hospitals and police stations.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
