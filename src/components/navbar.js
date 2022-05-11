import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { animateScroll as scroll, scroller } from "react-scroll";
import { useCart } from "../pages/carts/utils/useCart";
import { useSecondCart } from "../pages/carts/utils/useSecondCart";
import { useThirdCart } from "../pages/carts/utils/useThirdCart";
import { useFourthCart } from "../pages/carts/utils/useFourthCart";
import "../components/all.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const firstcart = useCart();
  const secondcart = useSecondCart();
  const thirdcart = useThirdCart();
  const fourthcart = useFourthCart();
  const allcartItems =
    firstcart.cart.totalItems +
    secondcart.cart.totalItems +
    thirdcart.cart.totalItems +
    fourthcart.cart.totalItems;

  const [nav, setNav] = useState(0);
  const { auth, setAuth, localState, setLocalState, setComeUrl } = props;
  const history = useHistory();
  const location = useLocation();
  // 登入後的選單狀態
  const [showOut, setShowOut] = useState(false);

  const close = function () {
    const menu = document.querySelector(".theMenu");
    menu.style.display = "none";
    const enter = document.querySelector(".enterTitle");
    enter.style.display = "block";
    //window.location.reload();
  };
  const click = function () {
    const menu = document.querySelector(".theMenu");
    menu.style.display = "block";
    menu.style.width = "100vw";
  };
  const scrollToSection = () => {
    scroller.scrollTo("theMenu", {
      duration: 10,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: 0,
    });
  };
  useEffect(() => {
    const enter = document.querySelector(".enterTitle");
    const none = function () {
      enter.style.display = "none";
    };
    enter.addEventListener("animationend", none);
    return () => {
      enter.removeEventListener("animationend", none);
    };
  }, [nav]);

  window.addEventListener("load", () => {
    if (
      window.localStorage.getItem("like") === null ||
      window.localStorage.getItem("like") === []
    ) {
      localStorage.setItem("like", JSON.stringify([]));
    }
  });

  return (
    <>
      <div className="navbar1">
        <div className="navbarLeftLeft">
          <a href="#/">
            <i className="fas fa-bars"></i>
          </a>
        </div>
        <div className="navbarLeft">
          <Link to="/#">
            <h1 className="Title">WILD JUNGLE</h1>
          </Link>
        </div>
        <div className="navbarRight">
          <div className="navbarIcon">
            {auth || localState.token ? (
              <>
                <FontAwesomeIcon
                  icon={faHouse}
                  className="tysu_logInOut"
                  onClick={() => {
                    if (showOut) {
                      setShowOut(false);
                    } else {
                      setShowOut(true);
                    }
                  }}
                />
              </>
            ) : (
              <>
                <i
                  className="fas fa-user-friends tysu_logInOut"
                  onClick={() => {
                    // console.log(location.pathname)
                    setComeUrl(location.pathname);
                    history.push("/members");
                  }}
                ></i>
              </>
            )}
            {showOut && (
              <div className="tysu_logInfo">
                <ul>
                  <li
                    onClick={() => {
                      history.push("/members/modify-member-info");
                      setShowOut(false);
                    }}
                  >
                    會員專區
                  </li>
                  <li
                    onClick={() => {
                      // const m_sid = JSON.parse(
                      //   localStorage.getItem("admin_account")
                      // ).m_sid;

                      // const cart_temp1 = JSON.parse(
                      //   localStorage.getItem("cart")
                      // );
                      // console.log(cart_temp1);
                      // const cart_temp2 = JSON.parse(
                      //   localStorage.getItem("secondCart")
                      // );
                      // const cart_temp3 = JSON.parse(
                      //   localStorage.getItem("thirdCart")
                      // );
                      // const cart_temp4 = JSON.parse(
                      //   localStorage.getItem("fourthCart")
                      // );

                      // fetch("http://localhost:4000/carts/inserttodb", {
                      //   method: "POST",
                      //   headers: { "Content-Type": "application/json" },
                      //   body: JSON.stringify({
                      //     m_sid: m_sid,
                      //     cart_temp1: cart_temp1,
                      //     cart_temp2: cart_temp2,
                      //     cart_temp3: cart_temp3,
                      //     cart_temp4: cart_temp4,
                      //   }),
                      // })
                      //   .then((r) => r.json())
                      //   .then((obj) => {});

                      // localStorage.setItem("like", JSON.stringify([]));
                      localStorage.removeItem("admin_account");
                      localStorage.removeItem("admin_token");
                      // firstcart.clearCart();
                      // secondcart.clearCart();
                      // thirdcart.clearCart();
                      // fourthcart.clearCart();
                      setAuth(false);
                      setLocalState({ token: false });
                      setShowOut(false);
                    }}
                  >
                    登出
                  </li>
                </ul>
              </div>
            )}
            <a
              href="#/"
              onClick={() => {
                const w = window.open("about:blank");
                w.location.href =
                  "http://localhost:3000/members/modify-member-info#/";
              }}
            >
              <i className="fas fa-heart fixedPosition"></i>
            </a>
            <a href="/carts">
              <i className="fas fa-shopping-cart stan_cartIcon">
                <div
                  className={
                    allcartItems >= 10
                      ? "stan_cartIcon_count_over10"
                      : "stan_cartIcon_count"
                  }
                >
                  {localStorage.getItem("admin_account")
                    ? JSON.parse(localStorage.getItem("admin_account"))
                        .m_sid === 8 ||
                      JSON.parse(localStorage.getItem("admin_account"))
                        .m_sid === 1
                      ? allcartItems
                      : 0
                    : 0}
                </div>
              </i>
            </a>
          </div>
          <div
            className="navbarMenu1"
            onClick={() => {
              click();
              scrollToSection();
              setNav(0);
            }}
          >
            <span>MENU</span>
          </div>
        </div>
      </div>
      <div className="theMenu">
        <div className="delete" onClick={close}>
          <i className="fas fa-minus-circle"></i>
        </div>
        <div className="enterTitle">
          <span>WELCOME</span>
          <span>TO THE ⎯⎯⎯</span>
          <span>WILD JUNGLE</span>
        </div>
        <div className="link" onClick={close}>
          <Link to="/tour">
            <div>Park tour</div>
          </Link>
          <Link to="/activity">
            <div>Activity</div>
          </Link>
          <Link to="/products">
            <div>Commodity</div>
          </Link>
          <Link to="/lodging">
            <div>Lodging</div>
          </Link>
          <Link to="/game">
            <div>Animal Games</div>
          </Link>
          {auth || localState.token ? (
            <Link to="/members/modify-member-info">
              {" "}
              <div>Members</div>
            </Link>
          ) : (
            <Link to="/members">
              {" "}
              <div>Members</div>
            </Link>
          )}
          <Link to="/carts">
            <div>Shopping Cart</div>
          </Link>
          <div className="leftside">
            <div>WILD</div>
            <div>JUNGLE</div>
          </div>
          <div className="leftside2">
            <div>WILD JUNGLE</div>
          </div>
          <div className="allright">
            <span>Wild Jungle .LTD.© All Rights Reserved.</span>
            <div>
              <i className="fas fa-file-signature"></i>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
