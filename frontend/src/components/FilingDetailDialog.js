import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { approveLeave } from "../actions/LeaveFilingAction";
import { Typography } from "@material-ui/core";

export default function AlertDialog({ dialog, setDialog, title, filing }) {
  const dispatch = useDispatch();
  const { approvalStatus } = useSelector((state) => state.approveLeave);

  const [remarks, setRemarks] = useState("");

  const handleApprove = () => {
    dispatch(approveLeave(filing.id, "2", remarks));
    setDialog(false);
  };
  const handleReject = () => {
    dispatch(approveLeave(filing.id, "3", remarks));
    setDialog(false);
  };

  return (
    <div>
      <Dialog
        open={dialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        size="500"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>Requested by: {filing.requestedby}</Typography>
            <Typography>Leave Type: {filing.leave_type}</Typography>
            <Typography>Day Type: {filing.day_type}</Typography>
            <Typography>Leave Date From: {filing.leave_date_from}</Typography>
            <Typography>Leave Date To: {filing.leave_date_to}</Typography>
            <Typography>Remarks: {filing.remarks}</Typography>
            <Typography>Status: {filing.status}</Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Remarks"
            type="text"
            fullWidth
            multiline
            onChange={(e) => setRemarks(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReject} color="primary" autoFocus>
            Reject
          </Button>
          <Button onClick={handleApprove} color="primary" autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
