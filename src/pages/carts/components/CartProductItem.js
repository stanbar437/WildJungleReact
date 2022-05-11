import React, { useState } from "react";
import { useCart } from "../utils/useCart";

function CartProductItem() {
  const { items, plusOne, minusOne, removeItem } = useCart();
  const temp = JSON.parse(localStorage.getItem("cart"));
  const compare = temp.length;
  const [showbox, setShowbox] = useState(!!compare);
  return (
    <>
      {compare ? (
        <>
          <div className="stan_product_title">
            <ul>
              <li></li>
              <li>商品種類</li>
              <li>商品名稱</li>
              <li>單價</li>
              <li>數量</li>
            </ul>
            <div className="stan_blackhr"></div>
          </div>
          {items.map((v, i) => {
            return (
              <div className="stan_product_space" key={v.sid}>
                <ul>
                  <li className="">
                    <button
                      className="stan_btndelete"
                      onClick={() => {
                        removeItem(v.sid);
                      }}
                    >
                      <i className="fas fa-times stan_btnicon_delete"></i>
                    </button>
                  </li>
                  <li>
                    <img alt="" src={v.image} />
                  </li>
                  <li className="stan_ds_product">{v.name}</li>
                  <li className="stan_ds_product">${v.price}</li>
                  <li className="stan_ds_product stan_count_btn">
                    <button
                      className="stan_count_minus"
                      onClick={() => {
                        minusOne(v.sid);
                      }}
                    >
                      <i className="fas fa-minus stan_btnicon"></i>
                    </button>
                    <div className="stan_btninput">{v.quantity}</div>
                    <button
                      className="stan_count_add"
                      onClick={() => {
                        plusOne(v.sid);
                      }}
                    >
                      <i className="fas fa-plus stan_btnicon"></i>
                    </button>
                  </li>

                  <div className="stan_mo_product">
                    <li>{v.name}</li>
                    <li>${v.price}</li>
                    <li className="stan_count_btn">
                      <button
                        className="stan_count_minus"
                        onClick={() => {
                          minusOne(v.sid);
                        }}
                      >
                        <i className="fas fa-minus stan_btnicon"></i>
                      </button>
                      <div className="stan_btninput">{v.quantity}</div>
                      <button
                        className="stan_count_add"
                        onClick={() => {
                          plusOne(v.sid);
                        }}
                      >
                        <i className="fas fa-plus stan_btnicon"></i>
                      </button>
                    </li>
                  </div>
                </ul>
                <div className="stan_blackhr"></div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="stan_compare">
            此購物車無產品及票券
            <br />
            請至產品頁面選購
          </div>
        </>
      )}
    </>
  );
}

export default CartProductItem;
