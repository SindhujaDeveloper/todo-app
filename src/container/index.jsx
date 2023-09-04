import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 className="home-title text-center">Welcome To Todo App</h1>
      <div className="row home-btn-container">
        <Button
          variant="success"
          className="home-btn"
          onClick={() => navigate({ pathname: "/register" })}
        >
          Register
        </Button>
        {/* <h4>Already have a account?</h4> */}
        <Button
          variant="danger"
          className="home-btn"
          onClick={() => navigate({ pathname: "/login" })}
        >
          Login
        </Button>
      </div>
    </Container>
  );
};

export default Home;
