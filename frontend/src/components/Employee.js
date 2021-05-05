import React, { useState } from "react";
import LeaveFilingTable from "./LeaveFilingTable";
import Navbar from "./Navbar";
import CardModal from "./CardModal";
//Material UI
import Grid from "@material-ui/core/Grid";

const Employee = () => {
  return (
    <div>
      <Navbar />
      <Grid container direction="row" justify="center" alignItems="center">
        <LeaveFilingTable CardModal={CardModal} />
      </Grid>
    </div>
  );
};

export default Employee;
