import React from "react";
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

const CardModal = () => {
  const [open, setOpen] = React.useState(false);
  const [leaveType, setLeaveType] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (event) => {
    setLeaveType(event.target.value);
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
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
            <Select
              labelId="leave-type-label"
              id="leaveType"
              value={leaveType}
              onChange={handleOnChange}
            >
              <MenuItem value={10}>Sick Leave</MenuItem>
              <MenuItem value={20}>Service Incentive Leave</MenuItem>
              <MenuItem value={30}>Work From Home</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardModal;
