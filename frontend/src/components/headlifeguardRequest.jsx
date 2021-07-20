import React from "react";
import "../assets/css/headlifeguardRequest.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from "@material-ui/core/Container";
import { Paper, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

export default function HeadlifeguardRequest() {
  return (
    <div className="regForm">
      <div className="regCard">
        <Paper
          style={{
            paddingTop: 30,
            paddingLeft: 40,
            paddingRight: 40,
            paddingBottom:20,
            margin: 10,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            style={{
              fontWeight: "bold",
              color: "#3b3c3d",
              textTransform: "none",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            The Request Form
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            style={{
              color: "#5e5e5e",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Please fill the following form with your information. A SoteriaX
            agent will contact you to proceed with the registration.
          </Typography>{" "}
          <br></br>
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: "bold",
              color: "#056f8c",
            }}
          >
            Your information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="firstName"
                name="firstName"
                label="Your First name"
                fullWidth
                autoComplete="given-name"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="lastName"
                name="lastName"
                label="Your Last name"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="email"
                name="email"
                label="Your email"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="phone"
                name="phone"
                label="Your Mobile Phone"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                size="small"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                row

                // value={value}
                // onChange={}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                style={{
                  fontWeight: "bold",
                  color: "#056f8c",
                }}
              >
                The Company information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="companyName"
                name="companyName"
                label="The Company Name"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="companyEmail"
                name="companyEmail"
                label="The Company email"
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                id="companyAddress"
                name="companyAddress"
                label="Company Address"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="companyPhone"
                name="companyPhone"
                label="Company Phone"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">The Subscription Type</FormLabel>
              <RadioGroup
                aria-label="subscription"
                name="subscription"
                row
                // value={value}
                // onChange={}
              >
                <FormControlLabel
                  value="withSupport"
                  control={<Radio />}
                  label="With Support"
                />
                <FormControlLabel
                  value="withoutSupport"
                  control={<Radio />}
                  label="Without Support"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                style={{
                  marginRight: 50,
                  fontWeight: "bold",
                  //   color: "blue",
                  textTransform: "none",
                }}
              >
                Submit the Request
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}
