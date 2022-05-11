import React, { useState } from "react";
import { useFourthCart } from "../utils/useFourthCart";

function CartLive() {
  const { items, plusOne, minusOne, removeItem } = useFourthCart();
  const temp = JSON.parse(localStorage.getItem("fourthCart"));
  const compare = temp.length;
  const [showbox, setShowbox] = useState(!!compare);

  return (
    <>
      {compare ? (
        <>
          <div className="stan_product_title_livd">
            <ul>
              <li></li>
              <li>房型</li>
              <li>房型名稱</li>
              <li>數量</li>
              <li>入住、退房日</li>
              <li>價格</li>
            </ul>
            <div className="stan_blackhr"></div>
          </div>
          {items.map((v, i) => {
            return (
              <div className="stan_live_space" key={v.sid}>
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
                  <li className="stan_ds_product">
                    {v.start}
                    <br />至<br />
                    {v.end}
                  </li>
                  <li className="stan_ds_product">${v.price}</li>

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
                  <div className="stan_mo_product2">
                    <li>住宿日期</li>
                    <li>
                      {v.start}
                      <br />至<br />
                      {v.end}
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
            此購物車並無住宿預約資訊
            <br />
            請至訂房頁面預約
          </div>
        </>
      )}
    </>
  );
}

export default CartLive;
