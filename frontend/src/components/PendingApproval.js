import React from "react";
import Navbar from "./Navbar";
import LeaveFilingTable from "./LeaveFilingTable";
import CardModal from "./CardModal";

//Material UI
import Grid from "@material-ui/core/Grid";
const PendingApproval = () => {
  return (
    <div>
      <Navbar />
      <Grid container direction="row" justify="center" alignItems="center">
        <LeaveFilingTable CardModal={CardModal} />
      </Grid>
    </div>
  );
};

export default PendingApproval;
