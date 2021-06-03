import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import LatestFiling from 'src/components/dashboard/LatestFiling';
import ApprovalListTable from 'src/components/ApprovalListTable';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';
import TasksProgress from 'src/components/dashboard//TasksProgress';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import TotalProfit from 'src/components/dashboard//TotalProfit';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { listApproval } from '../actions/LeaveFilingAction';
const Dashboard = () => {
  const { userFilingList } = useSelector((state) => state.listFiling);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userApprovalList } = useSelector((state) => state.listApproval);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listApproval());
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TasksProgress />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
            {/* <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid> */}
            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: '100%' }} />
          </Grid> */}
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LatestFiling userFilingList={userFilingList} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Typography>Approval List</Typography>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <ApprovalListTable userApprovalList={userApprovalList} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
