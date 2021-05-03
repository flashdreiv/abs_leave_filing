import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listLeave, editLeave } from "../actions/LeaveFilingAction";
import AlertDialog from "./AlertDialog";
import axiosActions from "../axiosApi";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
  displayCard: {
    display: "flex",
    flexDirection: "row",
  },
  leaveCard: {
    width: 300,
    margin: 10,
  },
  cardContent: {
    justifyContent: "space-evenly",
    alignItems: "space-around",
  },
});

const LeaveCard = ({ CardModal }) => {
  const classes = useStyles();
  const { userFilingList } = useSelector((state) => state.leaveFile);
  const { filingInfo } = useSelector((state) => state.leaveFile);

  const dispatch = useDispatch();

  const editButtonHandle = (
    id,
    leave_type,
    day_type,
    leave_date_from,
    leave_date_to,
    remarks
  ) => {
    dispatch(
      editLeave(
        id,
        leave_type,
        day_type,
        leave_date_from,
        leave_date_to,
        remarks
      )
    );
  };
  const deleteButtonHandle = (id) => {
    axiosActions[0].delete(`filings/${id}`);
    console.log(id);
  };

  const leaveFilingFunctions = {
    edit: editButtonHandle,
    delete: deleteButtonHandle,
  };

  useEffect(() => {
    dispatch(listLeave());
  }, [filingInfo, dispatch]);

  return (
    <div className={classes.displayCard}>
      <CardModal />
      {userFilingList &&
        userFilingList.map((filing) => {
          return (
            <div key={filing.id}>
              <Card className={classes.leaveCard}>
                <CardContent className={classes.cardContent}>
                  <Typography>Leave Type:</Typography>
                  <Typography color="textSecondary">
                    {filing.leave_type}
                  </Typography>
                  <Typography>Day type:</Typography>
                  <Typography color="textSecondary">
                    {filing.day_type}
                  </Typography>
                  <Typography>Leave Date:</Typography>
                  <Typography color="textSecondary">
                    {filing.leave_date_from}---{filing.leave_date_to}
                  </Typography>
                  <Typography>Remarks:</Typography>
                  <Typography color="textSecondary">
                    {filing.remarks}
                  </Typography>
                  <Typography>Status:</Typography>
                  <Typography color="textSecondary">{filing.status}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary">
                    Edit
                  </Button>
                  <AlertDialog
                    DialogText="Are you sure you want to delete your filing?"
                    Title="Delete Filing"
                    BtnText="Delete"
                    BtnAction={leaveFilingFunctions}
                    Params={{
                      id: filing.id,
                      leave_type: filing.leave_type,
                      day_type: filing.day_type,
                      leave_date_from: filing.leave_date_from,
                      leave_date_to: filing.leave_date_to,
                      remarks: filing.remarks,
                    }}
                  />
                </CardActions>
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default LeaveCard;
