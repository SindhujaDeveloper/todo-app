import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/logoutModal.css";

const LogoutModal = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  return (
    <Modal show={isOpen}>
      <Modal.Body>
        <h4 className="text-center">Are you sure? Want to logout?</h4>
        <div className="row">
          <div className="col-9 btn-container">
            <Button
              className="yes-btn"
              onClick={() => {
                localStorage.removeItem("userData");
                navigate({ pathname: "/home", search: `` });
              }}
            >
              Yes
            </Button>
          </div>
          <div className="col-3">
            <Button className="no-btn" onClick={() => closeModal()}>
              No
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
