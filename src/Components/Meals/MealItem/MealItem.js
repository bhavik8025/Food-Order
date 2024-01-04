import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../Store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.desc}</div>
        <div className={classes.price}>₹{props.price}</div>
      </div>
      <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};

export default MealItem;
