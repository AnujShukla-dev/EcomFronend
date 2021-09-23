import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import "../CustomCSS/AdminDashboard.css";
import categoryBg from "../images/category.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect,useHistory } from "react-router-dom";
//import Stack from '@mui/material/Stack';
import {
  Input,
  Card,
  Grid,
  Box,
  CardContent,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { isAuthenticated } from "../auth/helper";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "black",
    backgroundColor: "#A3A4BE",
  },
}));

const AddCategory = ({history}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const myCategoryForm = () => (
    <div className="app__adminDashboard__right">
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Input type="text" required placeholder="Eg Winter" />
        </Grid>
        <Grid item>
          <Button className={classes.button}>Create Category</Button><Button onClick={()=>history.push('/admin/dashboard')}>Back</Button>
        </Grid>
        <Grid item>
          
        </Grid>
      </Grid>
    </div>
  );
  return (
    <Base
      title="Please add Category"
      description="Add a new category for products."
    >
      {/* {errorMessage()}
          {signInForm()}
          {performRedirect()} */}
      <div className="app__adminDashboard">
        <div className="app__adminDashboard__left">
          <img
            className={"app__adminDashboard_categoryBg"}
            src={categoryBg}
            alt="not found"
          />
        </div>
        {myCategoryForm()}
      </div>
    </Base>
  );
};

export default AddCategory;
