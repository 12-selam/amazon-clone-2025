import React, { useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useContext } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/currencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import {db} from "../../Utility/firebase"
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()
  const handlChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e.error?.message) : setCardError("");
  };
  const [processing, setProcessing] = useState(false);
  const handlePyment = async (e) => {
    e.preventDefault();
    //1.backend || function ---> contact to the client secret

    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "post",
        url:`/payments/create?total=${totalPrice * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      //2.client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(confirmation);
      //3. after the confirmation --->order firstore database save,clear basket

      const orderRef = doc(
        collection(db, "users", user.uid, "orders"),
        paymentIntent.id
      );

      await setDoc(orderRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      dispatch({type: Type.EMPTY_BASKET})
      setProcessing(false);
      navigate("/orders");
      


    } catch (error) {
      console.log(error);
      setProcessing(false);
    }



  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/* Payment Method */}
      <section className={classes.payment}>
        {/* adress */}
        <div className={classes.flex}>
          <h3>Delivery Adress</h3>
          <div>
            <div>{user.email}</div>
            <div>123 React Lane</div>
            <div>Chicago,IL</div>
          </div>
        </div>
        <hr />
        {/* products */}
        <div>
          <h3>Review items and delivery</h3>
          {basket?.map((item) => (
            <ProductCard product={item} flex={true} />
          ))}
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePyment}>
                {/* error */}
                {cardError && (
                  <small className={classes.error}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handlChange} />
                {/* price  */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;