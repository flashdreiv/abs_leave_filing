import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
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
import { withStyles, makeStyles } from '@material-ui/core/styles';

import FormDialog from '../FormDialog';
import SnackBar from '../SnackBar';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(Tooltip);

const FilingListResults = ({ filings, filingInfo, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [sortDirection, setSortDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState('startdate');
  const [selectedRow, setSelectedRow] = useState({});

  const [dialog, setDialog] = useState({ open: false, action: 'add' });
  const createSortHandler = (event, property) => {
    const isAscending = valueToOrderBy === property && sortDirection === 'asc';
    setSortDirection(isAscending ? 'desc' : 'asc');
    setValueToOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedRowArray.map((el) => el[0]);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectedRow = (filing) => {
    setSelectedRow(filing);
    //Check if filing is already approved so you can't edit
    if (filing.approval[0].status === '1') {
      setDialog({ ...dialog, open: true, action: 'edit' });
    }
  };

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell>
                  <TableCell>Email</TableCell> */}
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Day Type</TableCell>
                  <TableCell key="startdate">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel
                        onClick={(e) => createSortHandler(e, 'startdate')}
                        active={valueToOrderBy === 'startdate'}
                        direction={
                          valueToOrderBy === 'startdate' ? sortDirection : 'asc'
                        }
                      >
                        Start Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell key="enddate">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel
                        onClick={(e) => {
                          createSortHandler(e, 'enddate');
                        }}
                        active={valueToOrderBy === 'enddate'}
                        direction={
                          valueToOrderBy === 'enddate' ? sortDirection : 'asc'
                        }
                      >
                        End Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRowInformation(
                  filings,
                  getComparator(sortDirection, valueToOrderBy)
                )
                  .slice(0, limit)
                  .map((filing) => {
                    return (
                      <TableRow
                        key={filing.id}
                        hover
                        onClick={() => handleSelectedRow(filing)}
                      >
                        {/* <TableCell>{filing.id}</TableCell>
                  <TableCell>{filing.user}</TableCell> */}
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
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={filings.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <SnackBar filingInfo={filingInfo} />
      <FormDialog filing={selectedRow} dialog={dialog} setDialog={setDialog} />
    </>
  );
};

FilingListResults.propTypes = {
  filings: PropTypes.array.isRequired
};

export default FilingListResults;
