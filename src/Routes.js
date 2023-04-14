import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Preferences from "./components/pages/Preferences";
// const UpdatePassword = React.lazy(() => import("pages/UpdatePassword"));
// const ForgotPassword = React.lazy(() => import("pages/ForgotPassword"));
// const Register = React.lazy(() => import("pages/Register"));
// const Login = React.lazy(() => import("pages/Login"));
// const AllBlog = React.lazy(() => import("pages/AllBlog"));
// const SigleBlog = React.lazy(() => import("pages/SigleBlog"));
// const Subscribe = React.lazy(() => import("pages/Subscribe"));
// const Homepage = React.lazy(() => import("pages/Homepage"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/preferences" element={<Preferences />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
