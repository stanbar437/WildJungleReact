import "./carts.scss";
import Process01 from "./components/Process_01";
import CartProductItem from "./components/CartProductItem";
import CartShow from "./components/CartShow";
import CartAdopt from "./components/CartAdopt";
import CartLive from "./components/CartLive";
import Checkarea from "./components/Checkarea";
import CheckareaShow from "./components/Checkarea_show";
import CheckareaAdopt from "./components/Checkarea_adopt";
import CheckareaLive from "./components/Checkarea_live";
import React, { useState, useEffect } from "react";
import Config from "./Config";

function Carts(props) {
  const [cartpro, setCartpro] = useState(true);
  const [cartshow, setCartshow] = useState(false);
  const [cartlive, setCartlive] = useState(false);
  const [cartadopt, setCartadopt] = useState(false);
  const m_sid = JSON.parse(localStorage.getItem("admin_account")).m_sid;
  const [bonus,setBonus] = useState([]);
  useEffect(() => {
    const temp = async () => {
      await fetch(Config.GET_BONUSPOINTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ m_sid: m_sid }),
      })
        .then((r) => r.json())
        .then((obj) => {
          setBonus(obj);
        });
    };
    temp();
  }, []);

  return (
    <>
    {          console.log(bonus[bonus.length-1])}
      <div className="stan_carts_main_ec">
        <Process01 />
        <div className="stan_carts_middle_ec">
          <div className="stan_product_main">
            <ul className="stan_product_selector">
              <li
                value="1"
                onClick={(e) => {
                  if (e.target.value == "1") {
                    setCartpro(true);
                    setCartshow(false);
                    setCartlive(false);
                    setCartadopt(false);
                  }
                }}
              >
                商品/票券
              </li>
              <li
                value="2"
                onClick={(e) => {
                  if (e.target.value == "2") {
                    setCartpro(false);
                    setCartshow(true);
                    setCartlive(false);
                    setCartadopt(false);
                  }
                }}
              >
                表演秀
              </li>
              <li
                value="3"
                onClick={(e) => {
                  if (e.target.value == "3") {
                    setCartpro(false);
                    setCartshow(false);
                    setCartadopt(true);
                    setCartlive(false);
                  }
                }}
              >
                認養方案
              </li>
              <li
                value="4"
                onClick={(e) => {
                  if (e.target.value == "4") {
                    setCartpro(false);
                    setCartshow(false);
                    setCartadopt(false);
                    setCartlive(true);
                  }
                }}
              >
                預定住宿
              </li>
            </ul>
            <div className="stan_hr"></div>
            <ul className="stan_forcus_selector">
              <li
                className={cartpro ? "stan_cart_click" : "stan_cart_unclick"}
              ></li>
              <li
                className={cartshow ? "stan_cart_click" : "stan_cart_unclick"}
              ></li>
              <li
                className={cartadopt ? "stan_cart_click" : "stan_cart_unclick"}
              ></li>
              <li className={cartlive ? "stan_cart_click" : "stan_cart_unclick"}
              ></li>
            </ul>

            <div className={cartpro ? "stan_displayblock" : "stan_displaynone"}>
              <CartProductItem />
            </div>
            <div
              className={cartshow ? "stan_displayblock" : "stan_displaynone"}
            >
              <CartShow />
            </div>
            <div
              className={cartadopt ? "stan_displayblock" : "stan_displaynone"}
            >
              <CartAdopt />
            </div>
            <div
              className={cartlive ? "stan_displayblock" : "stan_displaynone"}
            >
              <CartLive />
            </div>
          </div>
          <div className="stan_block"></div>
          <div className={cartpro ? "stan_checkout_area" : "stan_displaynone"}>
            <Checkarea bonus={bonus[bonus.length-1]}/>
          </div>
          <div className={cartshow ? "stan_checkout_area" : "stan_displaynone"}>
            <CheckareaShow bonus={bonus[bonus.length-1]}/>
          </div>
          <div className={cartadopt ? "stan_checkout_area" : "stan_displaynone"}>
            <CheckareaAdopt bonus={bonus[bonus.length-1]}/>
          </div>
          <div className={cartlive ? "stan_checkout_area" : "stan_displaynone"}>
            <CheckareaLive bonus={bonus[bonus.length-1]}/>
          </div>
        </div>
      </div>
      <div className="stan_footerbgc"></div>
    </>
  );
}

export default Carts;
