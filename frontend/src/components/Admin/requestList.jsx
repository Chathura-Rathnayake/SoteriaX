import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { firestore } from "../../firebase";

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    console.log("useEffect Hook!!!");

    firestore.collection("users").onSnapshot((snapshot) => {
      console.log("Firebase Snap!");
      setRequests(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            firstName: doc.data().firstName,
          };
        })
      );
    });
  }, []);

  const deleteUserRequest = (id) => {
    firestore
      .collection("users")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };
  //   firstName:
  //   lastName:
  //   userEmail: -- should be the pwd (maybe)
  //   userPhone:
  //   companyName:
  //   companyEmail:
  //   companyPhone:

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" color="initial">
        Pending User Requests
      </Typography>
      <List dense={true}>
        {requests.map((request) => (
          <ListItem key={request.id}>
            <ListItemText
              primary={request.firstName}
              secondary={request.id}
            />

            <ListItemSecondaryAction>
              <Button
                variant="contained"
                aria-label="delete"
                onClick={() => deleteUserRequest(request.id)}
              >
                Delete
              </Button>{" "}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
