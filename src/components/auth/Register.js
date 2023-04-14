import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, RegisterService, getUserNoAuth } from "../../services/auth";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AppLayout from "../layouts/AppLayout";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    isSaving: false,
  });
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const token = getToken();
    const user = getUserNoAuth();
    if (token && user && user.id) navigate("/home");
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevRegisterData) => {
      return {
        ...prevRegisterData,
        [name]: value,
      };
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const { firstname, lastname, email, password } = registerData;
    let payload = { firstname, lastname, email, password };
    // start loading, feedback
    setRegisterData((prevRegisterData) => {
      return { ...prevRegisterData, isSaving: true };
    });

    await RegisterService(payload, (response) => {
      const { status, message } = response;
      if (status !== true) {
        // Call failed
        // update the state accordingly
        setRegisterData((prevRegisterData) => {
          return {
            ...prevRegisterData,
            isSaving: false,
            error: message,
          };
        });
        // Display Error alert
        setShowError(true);
      } else {
        // Successful call
        // update state
        setRegisterData((prevRegisterData) => {
          return { ...prevRegisterData, isSaving: false };
        });
        // display success alert
        setShowSuccess(true);
        // redirect to home/feeds page
        navigate("/home");
      }
    });
  };
  return (
    <AppLayout page_title="Sign up">
      <Form onSubmit={handleSignup}>
        {showSuccess && (
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            <p>You've been signed up!</p>
          </Alert>
        )}
        {showError && (
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{registerData.error}</p>
          </Alert>
        )}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridText1">
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="firstname"
              placeholder="Immanuel"
              value={registerData.firstname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridText2">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              name="lastname"
              placeholder="Kant"
              value={registerData.lastname}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={registerData.email}
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
            value={registerData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Text className="text-muted">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!registerData.isSaving ? "Sign up" : "Signing up..."}
        </Button>
      </Form>
    </AppLayout>
  );
};
export default Register;
