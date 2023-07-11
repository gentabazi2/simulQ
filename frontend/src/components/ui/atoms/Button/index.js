import React from "react";
import "./style.scss";

const Button = ({ text, click, classname }) => {
  return (
    <button className={classname} onClick={click}>
      {text}
    </button>
  );
};

export default Button;
