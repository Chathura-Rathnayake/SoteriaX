import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Layout from "../../components/headAdmin/Layout";

export default function Statistics() {


  return (
    <Layout>
      <Container size="sm">
        <div>
          <Typography
            align='center'
            variant="h3"
            
            color="textSecondary"
          >
            Statistic Data
          </Typography>
        </div>

      </Container>
    </Layout>
  );
}
