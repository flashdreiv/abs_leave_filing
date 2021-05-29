import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { approveLeave } from '../actions/LeaveFilingAction';
import moment from 'moment';

export default function FilingDetailDialog(props) {
  const dispatch = useDispatch();

  const [remarks, setRemarks] = useState('');
  const { dialog, setDialog, approval } = props;

  const handleApprove = (approval) => {
    dispatch(approveLeave(approval.id, '2', remarks));
    setDialog({ ...dialog, open: false });
  };
  const handleReject = (approval) => {
    dispatch(approveLeave(approval.id, '3', remarks));
    setDialog({ ...dialog, open: false });
  };

  return (
    <div>
      <Dialog
        open={dialog.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        size="500"
      >
        <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Requested by: {approval.filing.user}
            <br></br>
            Leave Type: {approval.filing.leave_type}
            <br></br>
            Day Type: {approval.filing.day_type}
            <br></br>
            Leave Date From:{' '}
            {moment(approval.filing.leave_date_from).format('DD/MM/YYYY')}
            <br></br>
            Leave Date To:{' '}
            {moment(approval.filing.leave_date_to).format('DD/MM/YYYY')}
            <br></br>
            Remarks: {approval.filing.remarks}
            <br></br>
            Status: {approval.status}
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
        </DialogContent> */}

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
