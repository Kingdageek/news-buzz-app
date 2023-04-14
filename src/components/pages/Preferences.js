import React, { useState, useEffect } from "react";
import AppLayout from "../layouts/AppLayout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, NavLink } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Preferences = () => {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    sources: [],
    categories: [],
    isSaving: false,
    error: "",
  });
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    let values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: values,
      };
    });
  };

  const handleUpdate = async () => {};
  return (
    <AppLayout page_title="Update Preferences">
      <Form onSubmit={handleUpdate}>
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
            <p>{formData.error}</p>
          </Alert>
        )}
        <p>
          Customize your feed. Choose the news sources and categories you want
          to follow
        </p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Choose News sources</Form.Label>
          <Form.Select
            multiple
            aria-label="Default select example"
            data-mdb-option-height="44"
            value={formData.sources}
            data-mdb-filter="true"
            name="sources"
            onChange={handleChange}
          >
            <option value="1" data-mdb-secondary-text="Secondary text">
              One
            </option>
            <option value="1">One</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Choose categories</Form.Label>
          <Form.Select
            multiple
            aria-label="Default select example"
            data-mdb-option-height="44"
            value={formData.categories}
            data-mdb-filter="true"
            name="categories"
            onChange={handleChange}
          >
            <option value="1" data-mdb-secondary-text="Secondary text">
              One
            </option>
            <option value="1">One</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          {!formData.isSaving ? "Update preference" : "Updating..."}
        </Button>
      </Form>
    </AppLayout>
  );
};

export default Preferences;
