import React, { useEffect, useState } from "react";
import Input from "../../atoms/Input";
import "./style.scss";
import axios from "axios";
import { registerUser } from "../../../../helpers/auth/register";
import useRequest from "../../../../helpers/hooks/useRequest";
import { useNavigate } from "react-router-dom";

const Form = ({ type }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState(null);
  const [sendPost] = useRequest();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (type === "register") {
      sendPost("/v1/auth/register", inputs, resolveData);
    } else {
      sendPost("/v1/auth/login", inputs, resolveData);
    }
  }

  const resolveData = (data, error) => {
    if (error !== null) {
      setErrors(error?.response?.data?.error);
    } else {
      setErrors(null);
      if (type === "register") {
        navigate("/login");
      } else {
        localStorage.setItem("userProfile", JSON.stringify(data?.data?.user));
        navigate("/");
      }
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <p>{type === "login" ? "Login" : "Register"}</p>
        {type === "register" ? (
          <Input
            placeholder="Full Name"
            type="text"
            name="full_name"
            value={inputs.full_name || ""}
            handleChange={handleChange}
          />
        ) : (
          ""
        )}

        <Input
          placeholder="Email"
          type="text"
          name="email"
          value={inputs.email || ""}
          handleChange={handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={inputs.password || ""}
          handleChange={handleChange}
        />
        {errors !== null && <p className="error">{errors}</p>}
        <Input type="submit" value={type === "login" ? "Login" : "Register"} />
      </form>
    </div>
  );
};

export default Form;
