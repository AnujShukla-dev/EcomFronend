import React,{Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import "../CustomCSS/App.css";
import { Button } from "@material-ui/core";
import logo from "../images/logo.png";
import { signout, isAuthenticated, authenticate } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black" };
  } else {
    return { color: "black" };
  }
};

const Menu = ({ history }) => {
  var authanticated = isAuthenticated();
  return (
    <div className="app__header">
      <img src={logo} alt="" className="app__headerImage" />
      <div>
        <ul>
          <li>
            <Link style={currentTab(history, "/")} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link style={currentTab(history, "/cart")} to="/cart">
              Cart
            </Link>
          </li>{isAuthenticated() &&  isAuthenticated().user.role ===1  && <li>
            <Link
              style={currentTab(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              A. DashBoard
            </Link>
          </li>}{isAuthenticated() &&  isAuthenticated().user.role ===0  && <li>
            <Link
              style={currentTab(history, "/user/dashboard")}
              to="/user/dashboard"
            >
             U. DashBoard
            </Link>
          </li>}
                   
        </ul>
      </div>
      <div className="app_profile">
        {authanticated ? (
          <span
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            SignOut
          </span>
        ) : (
          <Fragment>
            {" "}
            <Link style={currentTab(history, "/signin")} to="/signin">
              Sign In
            </Link>
            <Link style={currentTab(history, "/signup")} to="/signup">
              Sign Up
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withRouter(Menu);
