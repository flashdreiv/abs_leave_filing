import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLeave, listLeave } from "../actions/LeaveFilingAction";
//Material UI
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import DeleteDialog from "./AlertDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  fabStyle: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

export default function LeaveFilingTable({ CardModal }) {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "leave_type", headerName: "Leave Type", width: 200 },
    { field: "day_type", headerName: "Total Days", width: 150 },
    { field: "leave_date_from", headerName: "Start Date", width: 150 },
    { field: "leave_date_to", headerName: "End Date", width: 150 },
    { field: "remarks", headerName: "Remarks", width: 150 },
    { field: "status", headerName: "Status", width: 100 },

    {
      field: "Edit",
      headerName: "Edit",
      renderCell: () => {
        return (
          <Button
            onClick={() => {
              setFiling(userFilingList.find((x) => x.id === filing.id));
              setModalState(true);
              setBtnAction("edit");
            }}
            size="small"
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
        );
      },
      width: 100,
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
            BtnAction={deleteButtonHandle}
            Params={{ id: filing.id }}
          />
        );
      },
      width: 100,
    },
  ];

  const rows = [];

  //------Above is table Data-----//
  const classes = useStyles();
  const [modalState, setModalState] = useState(false);
  const dispatch = useDispatch();
  const { userFilingList } = useSelector((state) => state.leaveFile);
  //Default modal value for editing
  const [filing, setFiling] = useState("");

  const { filingInfo } = useSelector((state) => state.leaveFile);
  const [BtnAction, setBtnAction] = useState("");

  //Use effect
  useEffect(() => {
    dispatch(listLeave());
  }, [filingInfo, dispatch]);

  //Close modal
  const handleClose = () => {
    setModalState(false);
  };
  //Delete Function for Filing
  const deleteButtonHandle = (id) => {
    dispatch(deleteLeave(id));
    console.log("delete");
  };

  return (
    <div
      style={{
        height: 700,
        width: "65%",
        display: "flex",
      }}
    >
      {userFilingList &&
        userFilingList.map((filing) => {
          rows.push({
            id: filing.id,
            leave_type: filing.leave_type,
            day_type: filing.day_type,
            leave_date_from: filing.leave_date_from,
            leave_date_to: filing.leave_date_to,
            remarks: filing.remarks,
            //Design with Chip
            status: filing.status,
          });
        })}
      <CardModal
        handleClose={handleClose}
        modalState={modalState}
        BtnAction={BtnAction}
        filing={filing}
      />

      <Fab
        onClick={() => {
          setModalState(true);
          setBtnAction("add");
        }}
        color="primary"
        className={classes.fabStyle}
      >
        <AddIcon />
      </Fab>
      {rows.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          onRowSelected={(newSelection) => {
            setFiling(newSelection.data);
          }}
          pageSize={5}
        />
      ) : (
        <CircularProgress style={{ marginLeft: "50%" }} />
      )}
    </div>
  );
}