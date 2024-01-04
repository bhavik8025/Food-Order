import { Fragment, useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import supabase from "../../util/supabase";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `₹${cartCtx.totalAmount}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    
    const { data: orderData, error : orderError } = await supabase
    .from('orders')
    .insert([
      { 
        name : userData.name,
        street : userData.street,
        postalCode : userData.postalCode,
        city : userData.city,
       },
    ])
    .select("orderId");

    if (orderError) {
      throw new Error(orderError.message);
    }

    const orderedItems = cartCtx.items.map((item) => {
      return {
        orderId : orderData[0].orderId,
        mealId: item.id,
        quantity: item.amount,
      };
    });

    
    const { data : orderItemsData, error : orderItemsError } = await supabase
    .from('orderItems')
    .insert(orderedItems);

    if(orderItemsError){
      throw new Error(orderItemsError.message);
    }

    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderClickHandler = (event) => {
    setIsCheckingOut(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckingOut && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending the order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Congratulations! Your order is sucessfully submitted.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
