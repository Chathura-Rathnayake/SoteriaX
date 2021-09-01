import React from 'react'
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Slide from '@material-ui/core/Slide';
const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(90)
    }
}))

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }
export default function Notification(props) {
    const { notify, setNotify } = props;
    const classes = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={9000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={TransitionUp}
            onClose={handleClose}>
            
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}