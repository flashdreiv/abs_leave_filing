import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listLeave } from "../actions/LeaveFilingAction";
import FilingDetailDialog from "./FilingDetailDialog";
//Material UI
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
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

export default function PendingFilingTable() {
  const rows = [];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "requestedby", headerName: "Requested By", width: 150 },
    { field: "leave_type", headerName: "Leave Type", width: 150 },
    { field: "day_type", headerName: "Total Days", width: 120 },
    { field: "leave_date_from", headerName: "Start Date", width: 120 },
    { field: "leave_date_to", headerName: "End Date", width: 120 },
    { field: "remarks", headerName: "Remarks", width: 120 },
    { field: "status", headerName: "Status", width: 100 },
  ];
  //------Above is table Data-----//
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const dispatch = useDispatch();
  const { userFilingList } = useSelector((state) => state.userFilingList);
  const { userInfo } = useSelector((state) => state.userLogin);
  //Default modal value for editing
  const [filing, setFiling] = useState("");

  const { filingInfo } = useSelector((state) => state.leaveFile);

  //Approval status state
  const { approvalStatus } = useSelector((state) => state.approveLeave);

  //Use effect
  useEffect(() => {
    dispatch(listLeave("pending"));
  }, [filingInfo, dispatch, approvalStatus]);

  const modalAction = (newSelection) => {
    setFiling(newSelection.data);
    setDialog(true);
  };

  return (
    <div
      style={{
        height: 700,
        width: "50%",
        display: "flex",
      }}
    >
      {userFilingList &&
        userFilingList.map((filing) => {
          //Check if its the pending filing for other user
          let user =
            typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
          if (user.email !== filing.user) {
            rows.push({
              id: filing.id,
              requestedby: filing.user,
              leave_type: filing.leave_type,
              day_type: filing.day_type,
              leave_date_from: filing.leave_date_from,
              leave_date_to: filing.leave_date_to,
              remarks: filing.remarks,
              //Design with Chip
              status: filing.status,
            });
          }
        })}

      <FilingDetailDialog
        dialog={dialog}
        setDialog={setDialog}
        filing={filing}
        title="Details"
      />

      {rows.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          onRowSelected={(newSelection) => {
            modalAction(newSelection);
          }}
          pageSize={5}
        />
      ) : (
        <CircularProgress style={{ marginLeft: "50%" }} />
      )}
    </div>
  );
}
