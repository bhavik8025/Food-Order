import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../Store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [btnIsHighlighted, setbtnIsHighlighted] = useState(false);

  const { items } = cartCtx; // optional, so we can use items instead of cartCtx.items

  const numberOfItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) return;

    setbtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setbtnIsHighlighted(false);
    }, 300);

    //clean-up function // means if button clicked multiple time timer will set for the only last timer
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart2}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.cartText}>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
