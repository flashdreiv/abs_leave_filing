import {
  Box,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FilingDetailDialog from './FilingDetailDialog';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(Tooltip);

const LatestFilingTable = (props) => {
  const { filing, dialog, setDialog, handleRowSelected, userFilingList } =
    props;
  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
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
                {userFilingList &&
                  userFilingList.slice(0, 5).map((filing) => {
                    return (
                      <TableRow
                        key={filing.id}
                        hover
                        onClick={() => handleRowSelected(filing)}
                      >
                        <TableCell>{filing.leave_type}</TableCell>
                        <TableCell>{filing.day_type}</TableCell>
                        <TableCell>
                          {moment(filing.leave_date_from).format('MM/DD/YYYY')}
                        </TableCell>
                        <TableCell>
                          {moment(filing.leave_date_to).format('MM/DD/YYYY')}
                        </TableCell>
                        <TableCell>{filing.remarks}</TableCell>
                        <TableCell>
                          <HtmlTooltip
                            title={filing.approval.map((approval) => {
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
                                filing.approval[0].status === '3'
                                  ? 'Approved'
                                  : 'Pending'
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Link to="/app/filings">
              <Button
                color="primary"
                endIcon={<ArrowRightIcon />}
                size="small"
                variant="text"
              >
                View all
              </Button>
            </Link>
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  );
};

export default LatestFilingTable;
