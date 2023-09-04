import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../components/logoutModal";
import TodoList from "./TodoList";

const Dashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("userData"));

  const [isOpen, setIsOpen] = useState(false);

  return storedUser ? (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={() => navigate({ pathname: "/dashboard", search: `` })}
          >
            Dashboard
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text onClick={() => setIsOpen(true)}>Logout</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{<TodoList />}</Container>
      <LogoutModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  ) : (
    <div>404 Not Found</div>
  );
};

export default Dashboard;
