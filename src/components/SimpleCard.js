import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 25,
    maxWidth: 220,
    maxHeight:120,
  },
  title: {
    fontSize: 14,
    
  },
  bot:{
    marginBottom:15,
    
  },

});

export default function SimpleCard(props) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" color="Secondary">
         
        </Typography>
        <Typography variant="h6" align="center" color="Secondary" >{props.name}</Typography>
        <div class={classes.bot}></div>
        <Typography variant="h4"  align="center" color="textSecondary">{props.num}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small"></Button>
      </CardActions>
    </Card>
  );
}
