import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Layout from "../../components/headAdmin/Layout";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { useAuth } from "../../contexts/AuthContext.js";
import Notification from "../../components/headAdmin/Notification";
import { DataGrid } from '@material-ui/data-grid';
import AlertDialogSlide from "../../components/headAdmin/dialog";
import AlertDialog from "../../components/headAdmin/TrainRecordDeleteConfirm";


export default function TrainingRecords() {
  const [Alldata, getAllData] = useState([]);
  const [open, setOpen] = useState(false)
  const [passingDataDelete, setPassingDataDelete] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false)
  const [passingData, setPassingData] = useState([]);
  const [passingDataParticipants, setPassingDataParticipants] = useState([]);
  const [passingDataTrainingTimes, setPassingTrainingTimes] = useState([]);
  const { currentUser } = useAuth();

  const handleClick = (e, cellValues) => {
    console.log('cell val', cellValues.row.trainingTimes);
    setOpen(true)
    setPassingData(cellValues.row)
    setPassingDataParticipants(cellValues.row.participants)
    setPassingTrainingTimes(cellValues.row.trainingTimes)
  };
  const handleClickDelete = (e, cellValues) => {


    setOpenConfirm(true)
    setPassingDataDelete(cellValues.row)

    //  getAllData(Alldata.filter((record) => record.id !== cellValues.row.id))
    
  };
  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(e) => {
            handleClick(e, params)
          }}
        >
          View More
        </Button>
      </strong>
    )
  }

  const renderPendingDetailsEditButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(e) => {
            handleClick(e, params)
          }}
        >
          View More
        </Button>
      </strong>
    )
  }


  const renderDeleteButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(e) => {
            handleClickDelete(e, params)
          }}
        >
          Delete Session
        </Button>
      </strong>
    )
  }

  const pendingColumns = [
    {
      field: 'id',
      headerName: 'Unique-ID',
      width: 170,
      headerAlign: 'left',
    },
    {
      field: "title",
      headerName: 'Session title',
      width: 180,
      headerAlign: 'left',
    },

    {
      field: 'date',
      headerName: 'Date',
      width: 140,
      headerAlign: 'center',
    },
    {
      field: 'startTime',
      headerName: 'Time',
      width: 120,
      headerAlign: 'center',
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      renderCell: renderPendingDetailsEditButton,
      disableClickEventBubbling: true,
      width: 120,
      align: 'center',
      headerAlign: 'center',

    },
    {
      field: 'delete',
      headerName: 'Discard',
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
      width: 150,
      align: 'center',
      headerAlign: 'center',

    },
  ];

  const columns = [
    {
      field: 'id',
      headerName: 'Unique-ID',
      width: 220,
      headerAlign: 'left',
    },
    {
      field: "title",
      headerName: 'Session title',
      width: 180,
      headerAlign: 'left',
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 140,
      headerAlign: 'center',
    },
    {
      field: 'startTime',
      headerName: 'Time',
      width: 130,
      headerAlign: 'center',
    },
    {
      field: 'Edit',
      headerName: 'View Details',
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
      width: 200,
      align: 'center',
      headerAlign: 'center',

    },
  ];

  useEffect(() => {
    async function getList() {
      const idToken = await currentUser.getIdToken(true); //get the token of the current user
      var toSend = {
        token: idToken,
      };
      try {
        fetch("/getTrainingRecords", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend),
        })
          .then((res) => res.json()) //retrieving the request from backend
          .then((data) => getAllData(data));
        //printing it to the console
      } catch (err) { }
    }
    getList(); //executing it
  }, []);

  var completedData = Alldata.filter(function (sessions) {
    return sessions.completed == true;
  });
  var scheduledData = Alldata.filter(function (sessions) {
    return sessions.completed != true;
  });

  console.log(Alldata);
  return (
    <Layout>
      <Container size="sm">
        <Typography style={{ marginTop: "50px", marginBottom: 50 }} size="12px" variant="h5" color="textSecondary">
          <strong> Pending Training Sessions </strong>
        </Typography>

        <div style={{ height: 300, width: '100%' }}>
          <DataGrid
            autoHeight
            rows={scheduledData}
            columns={pendingColumns}
            pageSize={3}
            onRowDoubleClick
            disableSelectionOnClick
          />
        </div>
        <Typography style={{ marginTop: "50px", marginBottom: 50 }} size="12px" variant="h5" color="textSecondary">
          <strong> Completed Training Sessions </strong>
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            autoHeight
            rows={completedData}
            columns={columns}
            pageSize={8}
            onRowDoubleClick
            disableSelectionOnClick
          />
        </div>
        <AlertDialogSlide
          data={passingData}
          participants={passingDataParticipants}
          trainingTimes={passingDataTrainingTimes}
          open={open}
          setOpen={setOpen}
        >
        </AlertDialogSlide>
        <AlertDialog
          dataConfirm={passingDataDelete}
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}>
        </AlertDialog>
      </Container>
    </Layout>
  );
}
