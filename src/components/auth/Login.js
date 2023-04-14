import React, { useEffect, useState } from "react";
import { LoginService, getUserNoAuth } from "../../services/auth";
import AppLayout from "../layouts/AppLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, NavLink } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    error: "",
    isSaving: false,
  });
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = loginData;
    let payload = { email, password };
    // start loading, feedback
    setLoginData((prevLoginData) => {
      return { ...prevLoginData, isSaving: true };
    });

    await LoginService(payload, (response) => {
      const { status, message } = response;
      if (status !== true) {
        // Call failed
        // update the state accordingly
        setLoginData((prevLoginData) => {
          return {
            ...prevLoginData,
            isSaving: false,
            error: message,
          };
        });
        // Display Error alert
        setShowError(true);
      } else {
        // Successful call
        // update state
        setLoginData((prevLoginData) => {
          return { ...prevLoginData, isSaving: false };
        });
        // display success alert
        setShowSuccess(true);
        // redirect to home/feeds page
        navigate("/home");
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const user = getUserNoAuth();
    if (user && user.id) {
      navigate("/home");
    }
  }, [navigate]);
  return (
    <AppLayout page_title="Login">
      <Form onSubmit={handleLogin}>
        {showSuccess && (
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            <p>Login successful</p>
          </Alert>
        )}
        {showError && (
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{loginData.error}</p>
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text className="text-muted">
            Don't have an account yet? <NavLink to="/register">Sign up</NavLink>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!loginData.isSaving ? "Login" : "Logging in..."}
        </Button>
      </Form>
    </AppLayout>
  );
};
export default Login;
