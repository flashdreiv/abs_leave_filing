import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@material-ui/core';

const SnackBar = ({ filingInfo }) => {
  const [snackbar, setSnackbar] = useState(false);
  const handleClose = () => {
    setSnackbar(false);
  };
  useEffect(() => {
    setSnackbar(true);
  }, [filingInfo]);
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
