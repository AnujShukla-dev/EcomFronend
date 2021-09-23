import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Card,
  Box,
  CardContent,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles} from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import "../CustomCSS/Auth.css";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "black",
    backgroundColor: "#A3A4BE",
  },
}));
const Signin = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to  = "/admin/dashboard"/>
      } else {
        return <Redirect to  = "/user/dashboard"/>
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const errorMessage = () => {
    let vertical = "bottom";
    let horizontal = "center";
    return (
      <Snackbar
        autoHideDuration={6000}
        severity="error"
        anchorOrigin={{ vertical, horizontal }}
        open={error}
        key={vertical + horizontal}
      >
        <Alert
          onClose={() => {
            setValues({ ...values, error: "" });
          }}
          severity="error"
        >
          {error}
        </Alert>
      </Snackbar>
    );
  };
  const onSubmit = () => {
       setValues({ ...values, error: false, loading: true });
    signin({ email,password })
      .then((data) => {
        if (data.success) {
          authenticate(data, () => {
            setValues({
              ...values,
              loading:false,
              didRedirect: true,
            });
          });
        } else {
          setValues({ ...values, error: data.error.message });
        }
      })
      .catch(console.log("something  went wrong "));
  };
  const frontValidation = (event) => {
    event.preventDefault();
    if (email && password) {
      onSubmit();
    } else {
      setValues({ ...values, error: "please fill the required fields" });
    }
  };
  const signInForm = () => {
    return (
      <div className="app__auth">
        <Card className="app__card">
          <CardContent>
            <label>Email</label>
            <Input
              onChange={handleChange("email")}
              value={email}
              type="email"
              fullWidth={true}
            />
          </CardContent>
          <CardContent>
            <label>Password</label>
            <Input
              onChange={handleChange("password")}
              value={password}
              fullWidth={true}
              type="password"
            />
          </CardContent>
          <CardContent>
            {loading ? (
              <Button variant="contained" className={classes.button} disabled>
                <CircularProgress
                  className={classes.circularProgress}
                />
                Loading
              </Button>
            ) : (
              <Button className={classes.button} onClick= {frontValidation}>
                Submit
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Base title="Sign in Page" description="A page for user to sign in!">
    
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
