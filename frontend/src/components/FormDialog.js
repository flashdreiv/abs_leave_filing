import React, { useState, useEffect } from 'react';
import { fileLeave, editLeave } from '../actions/LeaveFilingAction';
import { useDispatch, useSelector } from 'react-redux';
import axiosActions from '../axiosApi';

//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { format } from 'date-fns';
import SnackBar from './SnackBar';

export default function FormDialog() {
  const [dialog, setDialog] = React.useState(false);
  let today = format(new Date(), 'yyyy-MM-dd');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { filingInfo } = useSelector((state) => state.leaveFile);
  const [formData, setFormData] = useState({
    leaveType: '',
    dayType: 'Whole day',
    leaveDateFrom: today,
    leaveDateTo: today,
    remarks: ''
  });
  const dispatch = useDispatch();
  async function fetchData() {
    const { data } = await axiosActions[0].get('filings/leaves/');
    setLeaveTypes(data);
  }
  useEffect(() => {
    fetchData();
  }, [filingInfo]);

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = (e) => {
    setDialog(false);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fileLeave(
        formData.leaveType,
        formData.dayType,
        formData.leaveDateFrom,
        formData.leaveDateTo,
        formData.remarks
      )
    );
  };

  return (
    <div>
      <Fab
        onClick={handleClickOpen}
        color="primary"
        style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed'
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        name="dialog"
        open={dialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add</DialogTitle>

        <DialogContent>
          <DialogContentText>You can add a filing here</DialogContentText>
          <div>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                width: 300
              }}
              onSubmit={handleSubmit}
            >
              <FormControl>
                <InputLabel id="leave-type-label">Leave Type</InputLabel>
                <Select
                  labelId="leave-type-label"
                  required
                  id="leaveType"
                  name="leaveType"
                  onChange={handleChange}
                  value={formData.leaveType}
                >
                  {leaveTypes &&
                    leaveTypes.map((type) => {
                      return (
                        <MenuItem key={type.id} value={type.leave_type}>
                          {type.leave_type}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="day-type-label">Day Type</InputLabel>
                <Select
                  labelId="day-type-label"
                  required
                  id="dayType"
                  name="dayType"
                  value={formData.dayType}
                  onChange={handleChange}
                >
                  <MenuItem value={'First Half'}>First Half</MenuItem>
                  <MenuItem value={'Second Half'}>Second Half</MenuItem>
                  <MenuItem value={'Whole day'}>Whole Day</MenuItem>
                </Select>
                {leaveTypes &&
                  leaveTypes.map((type) => {
                    return type.leave_type === formData.leaveType ? (
                      <DialogContentText
                        key={type.id}
                        style={{ marginTop: 10 }}
                      >
                        Leave Credits: {type.leave_credits}
                      </DialogContentText>
                    ) : (
                      ''
                    );
                  })}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    name="leaveDateFrom"
                    required
                    value={formData.leaveDateFrom}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leaveDateFrom: format(e, 'yyyy-MM-dd')
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DatePicker
                    label="End Date"
                    name="leaveDateTo"
                    required
                    value={formData.leaveDateTo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        leaveDateTo: format(e, 'yyyy-MM-dd')
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  id="standard-textarea"
                  label="Remarks"
                  placeholder="Remarks"
                  name="remarks"
                  multiline
                  required
                  value={formData.remarks}
                  onChange={handleChange}
                />
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </DialogActions>
              </FormControl>
            </form>
            <SnackBar popUp={true} filingInfo={filingInfo} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
