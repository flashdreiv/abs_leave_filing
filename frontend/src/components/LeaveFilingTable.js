import React, { useState } from "react";

//Material UI
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import DeleteDialog from "./AlertDialog";

const useStyles = makeStyles({
  fabStyle: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
});

export default function LeaveFilingTable({ CardModal }) {
  const columns = [
    { field: "LeaveType", headerName: "Leave Type", width: 300 },
    { field: "DayType", headerName: "Total Days", width: 200 },
    { field: "LeaveDateFrom", headerName: "Start Date", width: 150 },
    { field: "LeaveDateTo", headerName: "End Date", width: 150 },
    { field: "Remarks", headerName: "Remarks", width: 150 },
    { field: "Status", headerName: "Status", width: 150 },
    {
      field: "Edit",
      headerName: "Edit",
      renderCell: () => {
        return (
          <Button
            onClick={() => setModalState(true)}
            size="small"
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
        );
      },
      width: 130,
    },
    {
      field: "Delete",
      headerName: "Delete",
      renderCell: () => {
        return (
          <DeleteDialog
            DialogText="Are you sure you want to delete your filing?"
            Title="Delete Filing"
            BtnText="Delete"
          />
        );
      },
      width: 130,
    },
  ];

  const rows = [
    {
      id: 1,
      LeaveType: "Work From Home",
      DayType: "First Half",
      LeaveDateFrom: "Jon",
      LeaveDateTo: 35,
      Remarks: "Game na",
      Status: "Pending",
    },
    {
      id: 2,
      LeaveType: "Service Incentive Leave",
      DayType: "Snow",
      LeaveDateFrom: "Jon",
      LeaveDateTo: 35,
      Remarks: "Game na",
      Status: "Pending",
    },
  ];

  //------Above is table Data-----//
  const classes = useStyles();
  const [modalState, setModalState] = useState(false);
  //Close modal
  const handleClose = () => {
    setModalState(false);
  };
  return (
    <div
      style={{
        height: 700,
        width: "80%",
        display: "flex",
      }}
    >
      <CardModal handleClose={handleClose} modalState={modalState} />
      <Fab
        onClick={() => setModalState(true)}
        color="primary"
        className={classes.fabStyle}
      >
        <AddIcon />
      </Fab>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
