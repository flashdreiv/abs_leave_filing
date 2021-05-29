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
import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listApproval } from '../actions/LeaveFilingAction';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(Tooltip);

const ApprovalListTable = (props) => {
  const { userApprovalList } = useSelector((state) => state.listApproval);
  const dispatch = useDispatch();

  const handleRowSelected = () => {};

  useEffect(() => {
    dispatch(listApproval());
  }, []);
  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
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
                {userApprovalList &&
                  userApprovalList.slice(0, 5).map((approval) => {
                    return (
                      <TableRow
                        key={approval.id}
                        hover
                        onClick={() => handleRowSelected(approval)}
                      >
                        <TableCell>{approval.filing.user}</TableCell>
                        <TableCell>{approval.filing.leave_type}</TableCell>
                        <TableCell>{approval.filing.day_type}</TableCell>
                        <TableCell>
                          {moment(approval.leave_date_from).format(
                            'MM/DD/YYYY'
                          )}
                        </TableCell>
                        <TableCell>
                          {moment(approval.leave_date_to).format('MM/DD/YYYY')}
                        </TableCell>
                        <TableCell>{approval.filing.remarks}</TableCell>
                        <TableCell>
                          <HtmlTooltip title={approval.approver[1]}>
                            <Chip
                              color="primary"
                              label={approval.status}
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

export default ApprovalListTable;
