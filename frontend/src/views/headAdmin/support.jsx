import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Layout from '../../components/headAdmin/Layout';
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles({
  bot:{
    marginBottom:10,
  },
  top50:{
    marginTop:20,
  },
  top70:{
    marginTop:70,
  },
  card:{
    marginTop: '30px' ,
    marginLeft: '50px',
  },
  bold400: {
    fontWeight: 600,
  },
});

export default function Support() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    type: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (

    <Layout>
    <Container size="sm">

    <div class={classes.top50}>
      <Typography
      variant="h5" 
      className={classes.bold400}
      color="textSecondary"  >
      Contact SoteriaX support center
      </Typography>
      </div>
      <div class={classes.top70}></div>
      <Grid container spacing={3}>
        <Grid item xs={10}>
        <form noValidate autoComplete="off">
          <div>
            <div style = {{marginTop: '10px' ,marginLeft: '50px'}}>
             <Grid container spacing={5} autoComplete="off">
             <Grid item xs={4}>
             <Typography
              size="12px"
              color="textSecondary"  >
              Service Type:
              </Typography>
              </Grid>
                <Grid item xs={6}>
                <Select
                native
                style = {{width:'60%'}}
                defaultValue={1}
                value={state.types}
                onChange={handleChange}
                inputProps={{
                  name: 'type',
                  id: 'filled-age-native-simple',
                 }}
                 >
                  
                  <option value={1}>Help Request</option>
                  <option value={2}>Complaints</option>
                  <option value={3}>Sugguestions</option>
                </Select>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="headline" label="Subject line"  style = {{width:'80%'}} />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  style = {{width:'80%'}}
                  id="outlined-multiline-static"
                  label="State your request here"
                  multiline
                  rows={8}
                  variant="outlined"
                />
                </Grid>
            </Grid>
             <div style = {{marginTop: '50px' ,marginLeft: '50px'}}>
                <Button
                    type="submit" value="Submit"
                    variant="contained"
                    color="secondary"
                    size="medium"
                    style={{ marginLeft: 25 }}
                    onClick={() => {
                    }}
                >
                    Submit Inquiry
                </Button>
          </div>
          </div>
        </div>

      </form>
        </Grid>
       

        {/* <div className={classes.root}>
        <Grid item xs={3}>            
          <div className={classes.card} >      
              <Typography
              variant="h6" 
              color="Secondary"  
            >
           Hot-Line :+45112211122
            </Typography>
          </div>  
          </Grid> 
          <Grid item xs={3}>
          <div className={classes.card} >      
              <Typography
              variant="h6" 
              color="Secondary"  
            >
           Email : Support@soteriax.com
            </Typography>
          </div>  
          </Grid>
          <Grid item xs={3}>
          <div className={classes.card} >      
              <Typography
              variant="h6" 
              color="Secondary"  
            >
           Skype : +4555555544

            </Typography>
          </div> 
          </Grid>
              
      </div> */}
        </Grid>
       
      </Container>
      </Layout>
  )
}
