import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import "../CustomCSS/AdminDashboard.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Card,
  CardContent,
  CardHeader,
  Box,
  Badge,
  MenuList,
  MenuItem,
  Snackbar,
  ListItemIcon,
  CircularProgress,
} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import StyleIcon from "@material-ui/icons/Style";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';


console.log(isAuthenticated);
const useStyles = makeStyles((theme) => ({
  CardHeader: {
    backgroundColor: "#A3A4BE",
  },
  Card:{
    display:'flex',
    flexShrink:20,
    flexDirection:"column",
    objectFit :'contain'


  }
}));

const AdminDashboard = ({ history }) => {
  if (isAuthenticated()) {
    var user =   isAuthenticated();
  }
  
  
  const classes = useStyles();

  const adminleftSide = () => {
    return (
      <Card className ={classes.Card}>
        <CardHeader className={classes.CardHeader} title="Admin Navigation" />
        <CardContent>
          <MenuList>
            <MenuItem onClick={() => redirect("/admin/create/category")}>
              <ListItemIcon>
                <CategoryIcon fontSize="small" />
              </ListItemIcon>

              <b>Create Category</b>
            </MenuItem>

            <MenuItem onClick={() => redirect("/admin/create/product")}>
              <ListItemIcon>
                <ControlPointIcon fontSize="small" />
              </ListItemIcon>
              <b>Create Product</b>{" "}
            </MenuItem>
            <MenuItem onClick={() => redirect("/admin/products")}>
              <ListItemIcon>
                <StyleIcon fontSize="small" />
              </ListItemIcon>
              <b>Manage Products</b>
            </MenuItem>
            <MenuItem onClick={() => redirect("/admin/orders")}>
              <ListItemIcon>
                <LocalShippingIcon fontSize="small" />
              </ListItemIcon>
              <b>Manage Order</b>
            </MenuItem>
          </MenuList>
        </CardContent>
      </Card>
    );
  };
  const adminRightSide = () => {
    console.log(user);
    return (<Box>
      <Card>
        <CardHeader className={classes.CardHeader} title="Admin Information" />
        <CardContent>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <b>{ user.user.name.toUpperCase() }</b> 
              
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <EmailIcon fontSize="small" />
              </ListItemIcon>
              <b>{user.user.email}</b>
             
            </MenuItem>
           
          </MenuList>
        </CardContent>
      </Card>
      </Box>
    );
  };
  const redirect = (path) => {
    history.push(path);
  };
  return (
    <Base title="Welcome to Admin Panel" description="Manage Store">
      <div className="app__adminDashboard">
        <div className="app__adminDashboard__left">{adminleftSide()}</div>
        <div className="app__adminDashboard__right">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
