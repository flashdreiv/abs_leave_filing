import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listLeave } from '../../actions/LeaveFilingAction';
import LatestFilingTable from '../LatestFilingTable';

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

  return (
    <>
      <LatestFilingTable
        userInfo={userInfo}
        filing={filing}
        userFilingList={userFilingList}
        dialog={dialog}
        setDialog={setDialog}
        handleRowSelected={handleRowSelected}
      />
    </>
  );
};

export default LatestFiling;
