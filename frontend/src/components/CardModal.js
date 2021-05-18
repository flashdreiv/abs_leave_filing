import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fileLeave, editLeave } from '../actions/LeaveFilingAction';
import { format } from 'date-fns';
import axiosActions from '../axiosApi';
//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

import { Typography } from '@material-ui/core';

const CardModal = ({ modalState, handleClose, filing, BtnAction }) => {
  let today = format(new Date(), 'yyyy-MM-dd');

  const dispatch = useDispatch();

  const [dayType, setdayType] = useState('Whole day');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leave, setLeave] = useState();
  const [leaveDateFrom, setleaveDateFrom] = useState(today);
  const [leaveDateTo, setleaveDateTo] = useState(today);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosActions[0].get('filings/leaves/');
      setLeaveTypes(data);
    }
    fetchData();
    //Set default value when editing
    if (BtnAction === 'edit') {
      setLeave(filing.leave_type);
      setdayType(filing.day_type);
      setleaveDateFrom(filing.leave_date_from);
      setleaveDateTo(filing.leave_date_to);
      setRemarks(filing.remarks);
    }
  }, [filing, BtnAction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (BtnAction) {
      case 'add':
        dispatch(
          fileLeave(leave, dayType, leaveDateFrom, leaveDateTo, remarks)
        );
        break;
      case 'edit':
        dispatch(
          editLeave(
            filing.id,
            leave,
            dayType,
            leaveDateFrom,
            leaveDateTo,
            remarks
          )
        );
    }

    handleClose();
  };

  const handleChange = (e) => {
    setLeave(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={modalState}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Details</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 30
            }}
          >
            <FormControl>
              <InputLabel id="leave-type-label">Leave Type</InputLabel>
              <Select
                labelId="leave-type-label"
                required
                id="leaveType"
                value={leave}
                onChange={handleChange}
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
            <FormControl style={{ marginTop: 10 }}>
              <InputLabel id="day-type-label">Fuck</InputLabel>
              <Select
                labelId="day-type-label"
                required
                id="dayType"
                value={dayType}
                onChange={(e) => setdayType(e.target.value)}
              >
                <MenuItem value={'First Half'}>First Half</MenuItem>
                <MenuItem value={'Second Half'}>Second Half</MenuItem>
                <MenuItem value={'Whole day'}>Whole Day</MenuItem>
              </Select>
              {leaveTypes &&
                leaveTypes.map((type) => {
                  return type.leave_type === leave ? (
                    <Typography key={type.id} style={{ marginTop: 10 }}>
                      Leave Credits: {type.leave_credits}
                    </Typography>
                  ) : (
                    ''
                  );
                })}

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  autoOk={true}
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="Date From"
                  label="Date From"
                  required
                  value={leaveDateFrom}
                  onChange={(e) => setleaveDateFrom(format(e, 'yyyy-MM-dd'))}
                  ButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <DatePicker
                  autoOk={true}
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="Date To"
                  label="Date To"
                  required
                  value={leaveDateTo}
                  onChange={(e) => setleaveDateTo(format(e, 'yyyy-MM-dd'))}
                  ButtonProps={{
                    'aria-label': 'change date'
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
              </LocalizationProvider>
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
