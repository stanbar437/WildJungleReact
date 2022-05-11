import React, { useState } from "react";
import { useThirdCart } from "../utils/useThirdCart";

function CartAdopt() {
  const { items, removeItem } = useThirdCart();
  const temp = JSON.parse(localStorage.getItem("thirdCart"));
  const compare = temp.length;
  const [showbox, setShowbox] = useState(!!compare);

  return (
    <>
      {compare ? (
        <>
          <div className="stan_product_title">
            <ul>
              <li></li>
              <li>認養計畫</li>
              <li>方案名稱</li>
              <li>單價</li>
              <li></li>
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
                    <i className="fas fa-edit stan_btnicon_delete"></i>
                  </li>

                  <div className="stan_mo_product">
                    <li>{v.name}</li>
                    <li>${v.price}</li>
                    <li className="stan_count_btn">
                      <i className="fas fa-edit stan_btnicon_delete"></i>
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
            此購物車無認養資訊
            <br />
            請至活動頁面選擇認養項目
          </div>
        </>
      )}
    </>
  );
}

export default CartAdopt;
