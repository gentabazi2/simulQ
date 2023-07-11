import React from "react";
import "./style.scss";

const Input = ({
  label,
  type,
  placeholder,
  name,
  value,
  handleChange,
  text,
}) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
