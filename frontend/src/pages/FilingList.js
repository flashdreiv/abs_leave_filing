import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import FilingListResults from 'src/components/filings/FilingListResults';
import FilingListToolbar from 'src/components/filings/FilingListToolbar';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listLeave } from '../actions/LeaveFilingAction';

const FilingList = () => {
  const { userFilingList } = useSelector((state) => state.listFiling);
  const { filingInfo } = useSelector((state) => state.leaveFile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listLeave());
  }, [filingInfo]);

  return (
    <>
      {console.log(userFilingList)}
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
            {userFilingList && (
              <FilingListResults
                filings={userFilingList}
                filingInfo={filingInfo}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FilingList;
