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