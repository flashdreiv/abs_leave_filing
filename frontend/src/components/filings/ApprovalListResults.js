import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TableSortLabel,
  Tooltip,
  Chip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import FormDialog from '../FormDialog';
import SnackBar from '../SnackBar';
import ApprovalListTable from '../ApprovalListTable';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(Tooltip);

const ApprovalListResults = ({ approvals, filingInfo, ...rest }) => {
  const [selectedRow, setSelectedRow] = useState({});

  const [dialog, setDialog] = useState({ open: false, action: 'add' });

  const handleSelectedRow = (approval) => {
    setSelectedRow(approval);
    //Check if approval is already approved so you can't edit
    if (approval.approval[0].status === '1') {
      setDialog({ ...dialog, open: true, action: 'edit' });
    }
  };

  return (
    <>
      <ApprovalListTable />
      {/* <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Day Type</TableCell>
                  <TableCell key="startdate">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel>Start Date</TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell key="enddate">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel>End Date</TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvals.slice(0, 5).map((approval) => {
                  return (
                    <TableRow
                      key={approval.id}
                      hover
                      onClick={() => handleSelectedRow(approval)}
                    >
                      <TableCell>{approval.filing.user}</TableCell>
                      <TableCell>{approval.filing.leave_type}</TableCell>
                      <TableCell>{approval.filing.day_type}</TableCell>
                      <TableCell>
                        {moment(approval.filing.leave_date_from).format(
                          'MM/DD/YYYY'
                        )}
                      </TableCell>
                      <TableCell>
                        {moment(approval.filing.leave_date_to).format(
                          'MM/DD/YYYY'
                        )}
                      </TableCell>
                      <TableCell>{approval.remarks}</TableCell>
                      <TableCell>
                        <HtmlTooltip
                          title={approvals.map((approval) => {
                            return (
                              <Fragment>
                                <Typography color="inherit">
                                  <strong>Approval Details</strong>
                                </Typography>
                                Approver: {approval.approver}
                                <br></br>
                                Remarks:{' '}
                                {approval.remarks
                                  ? approval.remarks
                                  : '--------'}
                                <br></br>
                                Status:{' '}
                                {(() => {
                                  switch (approval.status) {
                                    case '1':
                                      return 'Pending';
                                    case '2':
                                      return 'Approved';
                                    case '3':
                                      return 'Rejected';
                                  }
                                })()}
                              </Fragment>
                            );
                          })}
                        >
                          <Chip
                            color="primary"
                            label={
                              approval.status === '3' ? 'Approved' : 'Pending'
                            }
                            size="small"
                          />
                        </HtmlTooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={approvals.length}
          rowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card> */}
      <SnackBar filingInfo={filingInfo} />
      <FormDialog filing={selectedRow} dialog={dialog} setDialog={setDialog} />
    </>
  );
};

ApprovalListResults.propTypes = {
  filings: PropTypes.array.isRequired
};

export default ApprovalListResults;
