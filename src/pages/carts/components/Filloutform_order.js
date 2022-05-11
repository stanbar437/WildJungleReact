import React from "react";
import { useCart } from "../utils/useCart";

function Filloutorder() {
  const { items } = useCart();
  return (
    <>
      {items.map((v, i) => {
        return (
          <div key={v.sid}>
            <div className="stan_order_product">
              <ul className="stan_order_product_left">
                <li className="stan_order_product_sid">{i+1}</li>
                <li className="stan_order_product_pic">
                <img alt="" src={v.image} />
                </li>
              </ul>
              <ul className="stan_order_product_right">
                <li>{v.name}</li>
                <li>${v.price}</li>
                <li>{v.quantity}</li>
              </ul>
            </div>
            <div className="stan_order_blackhr">
              <div></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Filloutorder;
