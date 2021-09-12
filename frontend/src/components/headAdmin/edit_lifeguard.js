import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TextField } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
const {open, setOpen,data } = props;
  const num = [0, 1, 2, 3, 4];
  const stage = [
    "Mission Initiated",
    "Reached Victim",
    "Rest-tube Dropped",
    "Lifeguard Reached",
    "Mission Completed",
  ];
  var times = [];
  console.log("popup:",data);
  const columns = [
    {
      field: "id",
      headerName: "Operation Stage",
      width: 220,
      headerAlign: "left",
    },
    {
      field: "time",
      headerName: "Timeline",
      width: 180,
      headerAlign: "left",
    },
  ];
//   num.map((num) => times.push({ id: stage[num], time: trainingTimes[num] }));
//   console.log(times);
  return (
    <Dialog
      style={{ marginBottom: "10px", marginTop: "30px" }}
      open={open}
      maxWidth={"xl"}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <strong>Edit User</strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        <form  noValidate autoComplete="off">
            <div style={{ marginTop: '50px', marginLeft: '50px' }}>

              Please note that the default password will be allocated as the first time password.
              <div style={{ marginTop: '50px', marginLeft: '50px' }}>
                <Grid container spacing={5} autoComplete="off">
                  <Grid item xs={5} >
                    <TextField name="fname" label="First name" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField name="lname" label="Last name" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField name="email" id="email" label="Email" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField name="NIC" id="Id" label="NIC Number" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5} >
                    <TextField name="phone" id="phone" label="Phone Number" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5} >
                    <TextField name="certificate_level" id="certificate_level" label="Certificate Level" style={{ width: 300 }} />
                  </Grid>
                  <Grid item xs={5} >
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Is Pilot?</FormLabel>
                      <RadioGroup row aria-label="position" name="isPilot" >
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="True"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="False"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5} >
                    <TextField
                      required={true}
                      name="birthdate"
                      label="Birthday"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <TextField id="standard-secondary" label="Username" style={{ width: 300 }} />
                  </Grid> */}
                </Grid>

              </div>

            </div>

          </form>
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions>
        <Button
          style={{ marginRight: "20px" }}
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
        >
          <strong>Close</strong>
        </Button>
      </DialogActions> */}
    </Dialog>
);
{/* <div>
    <p>adsaasdasd</p>
</div> */}

}
