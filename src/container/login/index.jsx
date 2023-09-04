import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";

function LoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (loginData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      const storedUser = JSON.parse(localStorage.getItem("userData"));
      if (!localStorage.getItem("taskList")) {
        localStorage.setItem("taskList", JSON.stringify([]));
      }
      if (
        storedUser &&
        storedUser.email === loginData.email &&
        storedUser.password === loginData.password
      ) {
        navigate({ pathname: "/dashboard", search: `` });
      } else {
        alert("Invalid login credentials");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center">Login Form</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="login-btn-container">
              <Button
                className="login-btn"
                variant="primary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
