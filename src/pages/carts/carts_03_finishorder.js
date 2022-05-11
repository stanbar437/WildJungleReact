import React, { useState, useEffect } from "react";
import "./carts.scss";
import Process03 from "./components/Process_03";
import { useCart } from "./utils/useCart";
import Config from "./Config";

function Cartsfinishorder(props) {
  const m_sid = JSON.parse(localStorage.getItem("admin_account")).m_sid;
  const m_email = JSON.parse(localStorage.getItem("admin_account")).email;
  const m_name = JSON.parse(localStorage.getItem("admin_account")).m_name;
  const { clearCart, items } = useCart();
  const [backupitems,setBackupitems] = useState(items);
  const { name, phone, email, address, delivery, payment } = props;
  const [orderid, setOrderid] = useState("");
  useEffect(() => {
    const temp = async () => {
      await fetch(Config.RECEIVE_DATA, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ m_sid: m_sid, m_email: m_email, m_name: m_name }),
      })
        .then((r) => r.json())
        .then((obj) => {
          setOrderid(obj);
        });
    };
    temp();

    setTimeout(() => {
      clearCart();
    }, 1000)
  }, [])

  useEffect(()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
},[])

  return (
    <>
      <div className="stan_carts_main">
        <Process03 />
        <div className="stan_carts_middle">
          <div className="stan_fo_p">
            <p>感謝您的訂購</p>
            <p>訂購資訊以傳送至您的信箱</p>
            <p>
              訂單編號：<span>{orderid}</span>
            </p>
          </div>
          <div className="stan_fo_order">
            <div className="stan_format">
              <div className="stan_fo_orderinfo">收件人資訊</div>
              <div className="stan_fo_buyerinfo">
                <div className="stan_fo_frame">
                  <div className="stan_fo_title">收件人：</div>
                  <div className="stan_fo_content">{name}</div>
                </div>
                <div className="stan_fo_frame">
                  <div className="stan_fo_title">手機：</div>
                  <div className="stan_fo_content">{phone}</div>
                </div>
                <div className="stan_fo_frame">
                  <div className="stan_fo_title">電子信箱：</div>
                  <div className="stan_fo_content">{email}</div>
                </div>
                <div
                  className={
                    delivery === "園區取貨" ? "stan_displaynone" : "stan_fo_frame"
                  }
                >
                  <div className="stan_fo_title">運送地址：</div>
                  <div className="stan_fo_content">{address}</div>
                </div>
                <div className="stan_fo_frame">
                  <div className="stan_fo_title">貨運方式：</div>
                  <div className="stan_fo_content">{delivery}</div>
                </div>
                <div className="stan_fo_frame">
                  <div className="stan_fo_title">付款方式：</div>
                  <div className="stan_fo_content">{payment}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="stan_filloutform_order">
            <div className="stan_filloutform_order_title">
              <div>訂單摘要</div>
              <div>
                <i className="fas fa-angle-down stan_arrow_icon"></i>
              </div>
            </div>
            <div className="stan_filloutform_order_content">
              <div className="stan_filloutform_order_product_title">
                <ul>
                  <li></li>
                  <li>商品種類</li>
                  <li>商品名稱</li>
                  <li>單價</li>
                  <li>數量</li>
                </ul>
                <div className="stan_blackhr"></div>
              </div>
              {backupitems.map((v, i) => {
                return (
                  <div key={v.sid}>
                    <div className="stan_order_product">
                      <ul className="stan_order_product_left">
                        <li className="stan_order_product_sid">{i + 1}</li>
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
              <div className="stan_finishhr"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default Cartsfinishorder;
