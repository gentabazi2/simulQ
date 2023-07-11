import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import useRequest from "../../../helpers/hooks/useRequest";
import { useNavigate } from "react-router-dom";

const Header = ({ unAuthorized, selected }) => {
  const navigate = useNavigate();
  const [sendPost] = useRequest();
  const resolver = (data, error) => {
    if (data?.data?.message === "Success") {
      localStorage.setItem("userProfile", JSON.stringify({}));
      navigate("/login");
    }
  };
  useEffect(() => {
  }, []);
  return (
    <div className="header">
      <div className="header-section company-section">
        <div className="header-heading">SimulQ</div>
      </div>
      {!unAuthorized ? (
        <div className="header-section main-navigator">
          <Link to="/">
            <div
              className={`header-item ${
                selected && selected === "Home" ? "active" : ""
              }`}
            >
              Home
            </div>
          </Link>
          <Link to="/documents">
            <div
              className={`header-item ${
                selected && selected === "Documents" ? "active" : ""
              }`}
            >
              Documents
            </div>
          </Link>
          <Link to="/my-profile">
            <div
              className={`header-item ${
                selected && selected === "Profile" ? "active" : ""
              }`}
            >
              Profile
            </div>
          </Link>
        </div>
      ) : (
        <div className="header-section welcome-section">
          <div className="header-heading">SimulQ</div>
        </div>
      )}

      <div className="header-section account-buttons">
        {unAuthorized ? (
          <>
            <Link to="/register">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/settings">
              <button>Settings</button>
            </Link>
            <button
              onClick={() => {
                sendPost("/v1/auth/logout", { body: null }, resolver);
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
