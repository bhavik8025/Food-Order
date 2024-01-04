import react, { Fragment } from "react";
import foodsPhoto from "../../Assets/Food.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>5⭐ Restorant </h1>
        <HeaderCartButton onShowCart2={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={foodsPhoto} alt="Foods table" />
      </div>
    </Fragment>
  );
};

export default Header;
