import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label>{props.label}</label>

      {/* take all the props using spread operator from MealItemForm.js */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
