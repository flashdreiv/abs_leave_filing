import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listLeave } from '../../actions/LeaveFilingAction';
import FilingDetailDialog from '../FilingDetailDialog';
import LatestFilingListResults from '../filings/FilingListResults';

const LatestFiling = (props) => {
  const dispatch = useDispatch();

  const [filing, setFiling] = useState([]);
  const [dialog, setDialog] = useState(false);
  const { userInfo, userFilingList } = props;

  const handleRowSelected = (filing) => {
    setFiling(filing);
    setDialog(true);
  };

  useEffect(() => {
    dispatch(listLeave());
  }, []);

  const renderLatestFilingListEmployee = () => {};
  return (
    <>
      {userInfo.group && userInfo.group === 'Employee' ? (
        'Shit'
      ) : (
        <Card {...props}>
          <CardHeader title="Latest Filing" />
          <Divider />
          <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>Day Type</TableCell>
                    <TableCell sortDirection="desc">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction="desc">
                          Leave Date From
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell sortDirection="desc">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction="desc">
                          Leave Date To
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <FilingDetailDialog
                    dialog={dialog}
                    setDialog={setDialog}
                    filing={filing}
                    title="Details"
                  />
                  {userFilingList &&
                    userFilingList.slice(0, 5).map((filing) => {
                      let user =
                        typeof userInfo === 'string'
                          ? JSON.parse(userInfo)
                          : userInfo;
                      if (
                        filing.status === 'Pending' ||
                        user.email !== filing.user
                      ) {
                        return (
                          <TableRow
                            hover
                            key={filing.id}
                            onClick={() => handleRowSelected(filing)}
                          >
                            <TableCell>{filing.id}</TableCell>
                            <TableCell>{filing.user}</TableCell>
                            <TableCell>{filing.leave_type}</TableCell>
                            <TableCell>{filing.day_type}</TableCell>
                            <TableCell>
                              {moment(filing.leave_date_from).format(
                                'DD/MM/YYYY'
                              )}
                            </TableCell>
                            <TableCell>
                              {moment(filing.leave_date_to).format(
                                'DD/MM/YYYY'
                              )}
                            </TableCell>
                            <TableCell>{filing.remarks}</TableCell>
                            <TableCell>
                              <Chip
                                color="primary"
                                label={filing.status}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              endIcon={<ArrowRightIcon />}
              size="small"
              variant="text"
            >
              View all
            </Button>
          </Box>
        </Card>
      )}
    </>
  );
};

export default LatestFiling;
