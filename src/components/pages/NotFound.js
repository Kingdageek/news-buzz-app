import React from "react";
import { NavLink } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
const NotFound = () => {
  return (
    <AppLayout page_title="404">
      <div>
        <h4>
          Seems you took a wrong turn in your web surfing. Go
          <NavLink to="/home"> home</NavLink>
        </h4>
      </div>
    </AppLayout>
  );
};

export default NotFound;
