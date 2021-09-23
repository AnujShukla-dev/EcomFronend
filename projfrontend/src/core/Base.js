import React from "react";
import Menu from "./Menu";
import "../CustomCSS/App.css";
import { Button } from "@material-ui/core";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "test",
  children,
}) => (
  <div className="app">
    <Menu />
    <div className ="app_content">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <div className="app__footer">
      <div>
        <h4>If you got any questions, feel free to reach out!</h4>
        <Button >Contact Us</Button>
      </div>
      <div>
        <span>
          Make E-Commerce Boom <span className="text-white">@MECBoom</span>
        </span>
      </div>
    </div>
  </div>
);

export default Base;
