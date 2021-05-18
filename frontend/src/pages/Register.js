import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/userAction';
import axiosActions from '../axiosApi';

const Register = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  const [email, setEmail] = useState([]);
  const [department, setDepartment] = useState([]);
  const [password, setPassword] = useState([]);
  const [password2, setPassword2] = useState([]);
  const { userInfo } = useSelector((state) => state.userSignup);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(email, password, password2));
  };

  useEffect(() => {
    axiosActions[1].get('accounts/department').then((resp) => {
      const data = resp.data;
      setDepartments(data);
    });
    try {
      if (userInfo.success) {
        navigate('/login', { replace: true });
      }
    } catch {}
  }, [userInfo]);

  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: '',
              department: department
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('password is required')
            })}
          >
            {({ errors, handleBlur, isSubmitting, touched }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Confirm Password"
                  margin="normal"
                  name="password2"
                  onBlur={handleBlur}
                  onChange={(e) => setPassword2(e.target.value)}
                  type="password"
                  value={password2}
                  variant="outlined"
                />

                <Box sx={{ mt: 2 }}>
                  <FormControl variant="outlined" style={{ minWidth: 550 }}>
                    <InputLabel id="department">Deparment</InputLabel>
                    <Select
                      labelId="Department"
                      id="department"
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      {departments &&
                        departments.map((department) => {
                          return (
                            <MenuItem value={department.name}>
                              {department.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Box>

                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
