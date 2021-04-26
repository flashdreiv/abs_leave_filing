import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//Material UI
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Your Website &nbsp;
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  palette: {
    primary: "green",
  },
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://scontent.fmnl6-2.fna.fbcdn.net/v/t1.6435-9/154795597_203490931529592_1563139964693051463_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=973b4a&_nc_ohc=WkqATw3q_Q4AX-5y5gB&_nc_oc=AQkPEU6qcEP_EAbxNl9Nt5-qcGDuWuRJn8G0qodO27uf2Ghb-5YLskOO_i6NVNXOYog&_nc_ht=scontent.fmnl6-2.fna&oh=5e7fb34384c4b6dd5dd4fe1b28d76491&oe=60A751F7)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "green",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "green",
  },
}));

export default function AuthForm({ handleSubmit, formTitle, se }) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            {formTitle}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value.trim());
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {formTitle === "Sign up" ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            ) : (
              ""
            )}

            {formTitle === "Sign up" ? (
              ""
            ) : (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {formTitle}
            </Button>
            {formTitle === "Sign up" ? (
              <Grid container>
                {/* <Grid item xs>
                  <Link to="" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link to="/" variant="body2">
                    {"Already have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid item xs>
                  <Link to="" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2"></Link>
                  Don't have an account? Sign up
                </Grid>
              </Grid>
            )}
            <Box mt={3}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
