import React, { useState, useEffect } from "react";
import { getUserNoAuth } from "../../services/auth";
import { APP_NAME } from "../../config/appConfig";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        {APP_NAME} © {new Date().getFullYear().toString()}
      </div>
    </footer>
  );
};

export default Footer;
