import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import { getUserNoAuth } from "../../services/auth";

let user_data = {};
const AppLayout = ({
  children,
  type,
  page_title,
  no_padding = false,
  page,
  darkMode,
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    user_data = getUserNoAuth();
    setUser(() => {
      return user_data;
    });
    setIsLogin(user_data !== null);
  }, []);

  return (
    <Container>
      <Header
        type={type}
        page_title={page_title}
        page={page}
        isLogin={isLogin}
        user={user}
        darkMode={darkMode}
      />
      <Container className="p-3 py-4">{children}</Container>
      <Footer page={page} />
    </Container>
  );
};
export default AppLayout;
