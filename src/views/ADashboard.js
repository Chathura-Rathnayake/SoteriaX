import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import SimpleCard from '../components/SimpleCard'
import Simplemap from '../components/Simplemap';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/Layout';

const useStyles = makeStyles({
  bot:{
    marginBottom:35,
  },
});
export default function ADashboard() {
  const classes = useStyles();
  return (

    <Layout>
    <Container size="sm">
      <Typography
        variant="h3" 
        color="textSecondary"
        gutterBottom
      >
      Dashboard - Lifecorp(Pvt) Ltd
      <div class={classes.bot}></div>
      <Simplemap />
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <SimpleCard name='Incidents Logged' num='12' />  
        </Grid>
        <Grid item xs={3}>
          <SimpleCard name='Members Registred' num='2' />  
        </Grid>
        <Grid item xs={3}>
          <SimpleCard name='Users Active' num='2' />  
        </Grid>
      </Grid>
    </Container>
    </Layout>
  )
}
