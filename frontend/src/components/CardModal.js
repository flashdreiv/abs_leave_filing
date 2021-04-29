import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileLeave } from "../actions/LeaveFilingAction";
//Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Typography } from "@material-ui/core";

const CardModal = () => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { filingInfo } = useSelector((state) => state.leaveFile);
  const [leaveType, setLeaveType] = useState("");
  const [dayType, setdayType] = useState("");
  const [leaveDateFrom, setleaveDateFrom] = useState(new Date());
  const [leaveDateTo, setleaveDateTo] = useState(new Date());
  const [remarks, setRemarks] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fileLeave(leaveType, dayType, leaveDateFrom, leaveDateTo, remarks)
    );
    console.log(filingInfo);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Details</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 30,
            }}
          >
            <FormControl>
              <InputLabel id="leave-type-label">Leave Type</InputLabel>
              <Select
                labelId="leave-type-label"
                required
                id="leaveType"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <MenuItem value={10}>Sick Leave</MenuItem>
                <MenuItem value={11}>Service Incentive Leave</MenuItem>
                <MenuItem value={9}>Work From Home</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ marginTop: 10 }}>
              <InputLabel id="day-type-label">Fuck</InputLabel>
              <Select
                labelId="day-type-label"
                required
                id="dayType"
                value={dayType}
                onChange={(e) => setdayType(e.target.value)}
              >
                <MenuItem value={1}>First Half</MenuItem>
                <MenuItem value={2}>Second Half</MenuItem>
              </Select>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Typography style={{ marginTop: 10 }}>
                  Leave Credits: {0}
                </Typography>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="Date From"
                  label="Date From"
                  required
                  value={leaveDateFrom}
                  onChange={(e) => setleaveDateFrom(e.target.value)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="Date To"
                  label="Date To"
                  required
                  value={leaveDateTo}
                  onChange={(e) => setleaveDateTo(e.target.value)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <TextField
                  id="standard-textarea"
                  label="Remarks"
                  placeholder="Remarks"
                  multiline
                  required
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </MuiPickersUtilsProvider>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardModal;
