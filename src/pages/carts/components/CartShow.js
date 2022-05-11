import React, { useState } from "react";
import { useSecondCart } from "../utils/useSecondCart";

function CartShow() {
  const { items, removeItem } = useSecondCart();
  const temp = JSON.parse(localStorage.getItem("secondCart"));
  const compare = temp.length;
  const [showbox, setShowbox] = useState(!!compare);
  return (
    <>
      {compare ? (
        <>
          <div className="stan_product_title">
            <ul>
              <li></li>
              <li>表演秀</li>
              <li>表演秀名稱</li>
              <li>單價</li>
              <li>座位表</li>
            </ul>
            <div className="stan_blackhr"></div>
          </div>
          {items.map((v, i) => {
            const temp = Object.keys(v.seats) + ",";
            const seats = temp.substring(0, temp.length - 1);
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
                    <div className="stan_seats_out">{seats}</div>
                  </li>

                  <div className="stan_mo_product">
                    <li>{v.name}</li>
                    <li>${v.price}</li>
                    <li className="stan_count_btn">{seats}</li>
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
            此購物車無表演秀定位
            <br />
            請至活動頁面預約
          </div>
        </>
      )}
    </>
  );
}

export default CartShow;
