<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState } from 'react';
import { useSelector } from 'react-redux';
>>>>>>> dabc46bcf0173a9ffbe2b3d7463b59c9abdc8425
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

import FormDialog from '../FormDialog';

const FilingListResults = ({ filings, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

<<<<<<< HEAD
=======
  const { filingInfo } = useSelector((state) => state.leaveFile);

>>>>>>> dabc46bcf0173a9ffbe2b3d7463b59c9abdc8425
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = filings.map((filing) => filing.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Day Type</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Start Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        End Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filings.slice(0, limit).map((filing) => (
                  <TableRow
                    hover
                    key={filing.id}
                    selected={selectedCustomerIds.indexOf(filing.id) !== -1}
                  >
                    <TableCell>{filing.id}</TableCell>
                    <TableCell>{filing.user}</TableCell>
                    <TableCell>{filing.leave_type}</TableCell>
                    <TableCell>{filing.day_type}</TableCell>
                    <TableCell>
                      {moment(filing.leave_date_from).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {moment(filing.leave_date_to).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{filing.remarks}</TableCell>
                    <TableCell>
                      {' '}
                      <Chip
                        color="primary"
                        label={filing.status}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
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

      <FormDialog />
    </>
  );
};

FilingListResults.propTypes = {
  filings: PropTypes.array.isRequired
};

export default FilingListResults;
