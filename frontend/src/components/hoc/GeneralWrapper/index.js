import React, { useState, useEffect } from "react";
import "./style.scss";
import Header from "../../containers/Header";
import { verifyAuth } from "../../../helpers/auth/verifyAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useRequest from "../../../helpers/hooks/useRequest";

const GeneralWrapper = ({ children }) => {
  const [sendPost, sendGet] = useRequest();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiChecked, setApiChecked] = useState(false);
  const [unAuthorized, setUnAuthorized] = useState(true);
  const [selected, setSelected] = useState(null);

  const resolver = (data, error) => {
    if (error) {
      console.log("error", error);
      localStorage.setItem("userProfile", JSON.stringify({}));
      navigate("/login");
    } else {
      setUnAuthorized(false);
    }
    setApiChecked(true);
  };

  useEffect(() => {
    if (!apiChecked) {
      sendGet("/v1/auth/check", resolver);
    }
    if (verifyAuth()) {
      setUnAuthorized(false);
      if (
        location.pathname.includes("login") ||
        location.pathname.includes("register")
      ) {
        navigate("/");
      }
    } else {
      setUnAuthorized(true);
      if (
        !(
          location.pathname.includes("login") ||
          location.pathname.includes("register")
        )
      ) {
        navigate("/login");
      }
    }
    if (location.pathname.includes("shared")) {
      setSelected("Shared");
    } else if (location.pathname.includes("document")) {
      setSelected("Documents");
    } else {
      setSelected("Home");
    }
  }, [children, location]);
  return (
    <div className="generalWrapper">
      <Header unAuthorized={unAuthorized} selected={selected} />
      <div className="content-wrapper">{children}</div>
    </div>
  );
};

export default GeneralWrapper;
