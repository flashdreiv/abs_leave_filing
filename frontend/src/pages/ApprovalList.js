import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ApprovalListResults from 'src/components/filings/ApprovalListResults';
import FilingListToolbar from 'src/components/filings/FilingListToolbar';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listApproval } from '../actions/LeaveFilingAction';
import ApprovalListTable from '../components/ApprovalListTable';

const ApprovalList = () => {
  const { filingInfo } = useSelector((state) => state.leaveFile);
  const { userApprovalList } = useSelector((state) => state.listApproval);
  const { approvalStatus } = useSelector((state) => state.approveLeave);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listApproval());
  }, [approvalStatus]);

  return (
    <>
      {console.log(userApprovalList)}
      <Helmet>
        <title>Filings</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <FilingListToolbar />
          <Box sx={{ pt: 3 }}>
            {userApprovalList && (
              <ApprovalListTable
                userApprovalList={userApprovalList}
                filingInfo={filingInfo}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ApprovalList;
