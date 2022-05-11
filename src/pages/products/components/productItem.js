import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../carts/utils/useCart";
import Confetti from "react-dom-confetti";
import { Modal, Button } from "react-bootstrap";

function ProductItem(props) {
  const [con, setCon] = useState({ confetti: false });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    ProductSid,
    ProductsName,
    ProductsVendor,
    ProductsType,
    ProductsSpec,
    ProductsLabel,
    ProductsMainPic,
    ProductsPic,
    ProductsReview,
    ProductsPrice,
    ProductsDate,
  } = props.products;
  // const [heart, setHeart] = useState([{ ProductSid: "" }]);
  const { addItem } = useCart();
  let MainPic = `img/product/${ProductsMainPic}`;

  // const click =async function () {
  //  await setHeart([{ProductSid:`${ProductSid}`}])
  //  await  console.log(heart)
  // };

  // useEffect(() => {
  //   const current = JSON.parse(localStorage.getItem("like"));
  //   const alanheart = document.querySelector(".fa-heart")
  //   if (current.includes("" + ProductSid)) {
  //     alanheart.style.color = "#eb5c37";
  //   } else {
  //     alanheart.style.color = "#2d3436";
  //   }
  // }, []);

  const likela = (target) => {
    let current = [];
    if (localStorage.getItem("like")) {
      current = JSON.parse(localStorage.getItem("like"));
    }

    //const alanheart = document.querySelectorAll(".alanheart");
    let item = [...current];
    if (current.includes("" + ProductSid)) {
      let num = item.findIndex((v) => v === "" + ProductSid);
      if (num !== -1) {
        item.splice(num, 1);
      }
      console.log("刪去");
      localStorage.setItem("like", JSON.stringify(item));
      setCon({ confetti: false });
      alert(`您已取消收藏 ${ProductsName}`);
      //alanheart[ProductSid - 1].style.color = "#2d3436";
    } else {
      item.push("" + ProductSid);
      console.log("新增成功");
      localStorage.setItem("like", JSON.stringify(item));
      setCon({ confetti: true });
      fly(target);
      //console.log(ProductSid);
      //alanheart[ProductSid - 1].style.color = "#eb5c37";
    }
  };

  const config = {
    angle: 90,
    spread: 50,
    startVelocity: 40,
    elementCount: 150,
    dragFriction: 0.1,
    duration: 750,
    stagger: 0,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#eb5c37"],
  };

  const fly = (target) => {
    //const alanheart = document.querySelectorAll(".alanheart");
    const savedPosition = document.querySelector(".fixedPosition");
    let scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    let div = document.createElement("div");
    div.setAttribute("class", "heartFly");
    document.body.appendChild(div);
    div.innerHTML = `<i class="flyfly fas fa-heart"></i>`;
    //console.log(scrollTop);
    div.style.top = getOffset(target).top - scrollTop + "px";
    div.style.left = getOffset(target).left + "px";

    div.animate(
      [
        {
          top: getOffset(target).top - scrollTop + "px",
          left: getOffset(target).left + "px",
          opacity: 1,
          offset: 0,
        },
        {
          top: getOffset(savedPosition).top + 20 + "px",
          left: getOffset(savedPosition).left + "px",
          opacity: 0.8,
          offset: 0.85,
        },
        {
          top: getOffset(savedPosition).top + "px",
          left: getOffset(savedPosition).left + "px",
          opacity: 0.5,
          offset: 1,
        },
      ],
      800
    );
    Promise.all(
      div.getAnimations().map((animation) => animation.finished)
    ).then(() => div.remove());
  };

  function getOffset(Node, offset) {
    if (!offset) {
      offset = {};
      offset.top = 0;
      offset.left = 0;
    }
    if (Node === document.body) {
      return offset;
    }
    offset.top += Node.offsetTop;
    offset.left += Node.offsetLeft;
    return getOffset(
      Node.offsetParent === null ? Node.parentNode : Node.offsetParent,
      offset
    );
  }

  return (
    <>
      <div className="productCard">
        <Link to={`/productsdetail?id=${props.products.ProductSid}`}>
          <div className="cardImg">
            <img className="" src={MainPic} alt="" />
          </div>
        </Link>
        <div className="cardName">
          <Link
            className="cardTitle"
            to={`/productsdetail?id=${props.products.ProductSid}`}
          >
            <p>{ProductsName}</p>
            <span>{ProductsVendor}</span>
            <span>${ProductsPrice}</span>
          </Link>
          <div className="cardIcon">
            <Confetti active={con.confetti} config={config} />
            <i
              className="alanheart fas fa-heart"
              onClick={(e) => {
                likela(e.target);
              }}
              style={
                JSON.parse(localStorage.getItem("like")).includes(
                  "" + ProductSid
                )
                  ? { color: "#eb5c37" }
                  : {}
              }
            ></i>
            <i
              className="fas fa-shopping-cart"
              onClick={() => {
                const item = {
                  sid: "" + ProductSid,
                  image: `/img/product/${ProductsMainPic}`,
                  name: ProductsName,
                  price: ProductsPrice,
                  quantity: 1,
                };
                addItem(item);
                console.log(item);
                handleShow();
              }}
            ></i>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className={"alan_modal"}>
        <Modal.Body className={"alan_modalBody"}>
          <svg width="120" height="120">
            <circle
              fill="none"
              stroke="#eb5c37"
              stroke-width="10"
              cx="100"
              cy="100"
              r="50"
              stroke-linecap="round"
              class="alan_circle"
              transform="rotate(-90 60 100)"
            />
            <polyline
              fill="none"
              stroke="#eb5c37"
              stroke-width="10"
              points="30,60 50,85 85,40"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="alan_tick"
            />
          </svg>
           <span>商品已加入購物車</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductItem;
