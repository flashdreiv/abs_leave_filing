import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Snackbar, Alert } from '@material-ui/core';

const SnackBar = ({ filingInfo }, popUp) => {
  const [snackbar, setSnackbar] = useState(popUp);
  const handleClose = () => {
    setSnackbar(false);
  };
  return (
    <div>
      {filingInfo && (
        <Snackbar open={snackbar} onClose={handleClose} autoHideDuration={6000}>
          {filingInfo.hasOwnProperty('success') ? (
            <Alert open={snackbar} onClose={handleClose} severity="success">
              {filingInfo.success}
            </Alert>
          ) : (
            <Alert open={snackbar} onClose={handleClose} severity="error">
              {filingInfo.error}
            </Alert>
          )}
        </Snackbar>
      )}
    </div>
  );
};

export default SnackBar;
