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
    { field: "LeaveType", headerName: "Leave Type", width: 200 },
    { field: "DayType", headerName: "Total Days", width: 150 },
    { field: "LeaveDateFrom", headerName: "Start Date", width: 150 },
    { field: "LeaveDateTo", headerName: "End Date", width: 150 },
    { field: "Remarks", headerName: "Remarks", width: 150 },
    { field: "Status", headerName: "Status", width: 100 },
    {
      field: "Edit",
      headerName: "Edit",
      renderCell: () => {
        return (
          <Button
            onClick={() => {
              setModalState(true);
              setBtnAction("edit");
              setFiling(userFilingList.find((x) => x.id === filing.id));
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
  //Default modal value for editng
  const [filing, setFiling] = useState("");

  const { userFilingList } = useSelector((state) => state.leaveFile);
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
            LeaveType: filing.leave_type,
            DayType: filing.day_type,
            LeaveDateFrom: filing.leave_date_from,
            LeaveDateTo: filing.leave_date_to,
            Remarks: filing.remarks,
            Status: filing.status,
          });
        })}
      <CardModal
        filing={filing}
        handleClose={handleClose}
        modalState={modalState}
        BtnAction={BtnAction}
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
          onRowSelected={(newSelection) => setFiling(newSelection.data)}
          pageSize={5}
        />
      ) : (
        <CircularProgress style={{ marginLeft: "50%" }} />
      )}
    </div>
  );
}
