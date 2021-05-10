import React from "react";
import Navbar from "./Navbar";
import PendingFilingTable from "./PendingFilingTable";
import CardModal from "./CardModal";

//Material UI
import Grid from "@material-ui/core/Grid";
const PendingApproval = () => {
  return (
    <div>
      <Navbar />
      <Grid container direction="row" justify="center" alignItems="center">
        <PendingFilingTable CardModal={CardModal} />
      </Grid>
    </div>
  );
};

export default PendingApproval;
