import React from "react";
import "../assets/css/homeCards.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import AOS from "aos";
import "aos/dist/aos.css";


AOS.init();

const theme = createMuiTheme({
  palette: {
    Typography: {
      fontSize: 36,
    },
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#e65100",
    },
  },
});

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function HomeCards() {
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
          <Typography variant="h2" color="initial" align="center">
              Who are we?
          </Typography>
        <Grid container spacing={3}>
          <div data-aos="fade-up">
            <Grid item spacing={1}>
              <Paper>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="drone assistance1"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Drone Assistance
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Providing a resuce tube quickly and efficiently for the
                        drowning victim via a drone.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </Grid>
          </div>

          <div data-aos="fade-up">
            <Grid item spacing={1}>
              <Paper>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="drone assistance2"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Situational Awareness
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Overseeing the whole operation using the realtime video
                        feed from the drone.
                        {/* And guiding the lifeguard in action via the speaker mounted to the drone. */}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </Grid>
          </div>

          <div data-aos="fade-up">
            <Grid item spacing={1}>
              <Paper>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="drone assistance3"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Lifeguard Training
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Training lifeguards with the help of the features
                        provided by the mobile application
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </Grid>
          </div>

          <div data-aos="fade-up">
            <Grid item spacing={1}>
              <Paper>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="drone assistance3"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Quick Reaction
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Quickly reacting and informing relevant parties such as
                        hospitals and police stations.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </Grid>
          </div>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
