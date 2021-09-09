import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  bot: {
    marginBottom: 15,
  },
  top: {
    margintop: 45,
  },
});

export default function MsgCard(props) {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.root}>
      <CardContent>
        <Typography variant="h6" align="left" color="Secondary">
          Reference Number :{props.id}
        </Typography>
        <Typography variant="h8" align="right" color="Secondary">
          Status :{props.status}
        </Typography>
        <div className={classes.bot}> </div>
        <TextField
          className={classes.bot}
          value={props.headline}
          name="headline"
          label="Subject line :"
          variant="filled"
          style={{ width: "100%" }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          className={classes.bot}
          value={props.msg}
          style={{ width: "100%" }}
          name="msg"
          label="Sent Message :"
          multiline
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          value={props.reply}
          style={{ width: "100%" }}
          name="reply"
          label="Reply from SoteriaX :"
          multiline
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small"></Button>
      </CardActions>
    </Card>
  );
}
