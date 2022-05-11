import { React, useState } from "react";
import { Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import {
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { useCart } from "../../src/pages/carts/utils/useCart";

const FixedRight = (props) => {
  const [open, setOpen] = useState(false);

  const [adultcount, setAdultcount] = useState(0);
  const [studentcount, setStudentcount] = useState(0);
  const [lovecount, setLovecount] = useState(0);

  const tickeBtn = () => {
    setOpen(!open);
  };

  const addAdultcount = () => {
    setAdultcount(adultcount + 1);
  };
  const redAdultcount = () => {
    if (adultcount > 0) {
      setAdultcount(adultcount - 1);
    }
  };

  const addstudentcount = () => {
    setStudentcount(studentcount + 1);
  };
  const redstudentcount = () => {
    if (studentcount > 0) {
      setStudentcount(studentcount - 1);
    }
  };

  const addlovecount = () => {
    setLovecount(lovecount + 1);
  };
  const redlovecount = () => {
    if (lovecount > 0) {
      setLovecount(lovecount - 1);
    }
  };
  const { addItem } = useCart();

  return (
    <>
      <div
        className="ning_buyticketBox"
        style={{
          right: open === true && "0px",
          zIndex: open === true && "8889",
        }}
      >
        <div className="ning_buyticket">
          <div className="ning_buyticketicon" onClick={tickeBtn}>
            <span className="material-icons">confirmation_number</span>
            <p>立即訂票</p>
          </div>
        </div>
        <div className="ticketForm">
          <h2>入園門票</h2>
          <div className="ticketType">
            <div className="AdultTicket">
              <h4>全票</h4>
              <h4 className="AdultTicketprice">$50</h4>
            </div>
            <div className="AdultTicketBtn">
              <button className="btn redBtn" onClick={redAdultcount}>
                <i className="fas fa-minus"></i>
              </button>
              <input
                type="text"
                readOnly
                value={adultcount}
                className="AdultTicketvalue"
              />
              <button className="btn addBtn" onClick={addAdultcount}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="studentTicket">
              <h4>學生票</h4>
              <h4 className="studentTicketprice">$30</h4>
            </div>
            <div className="studentTicketBtn">
              <button className="btn redBtn" onClick={redstudentcount}>
                <i className="fas fa-minus"></i>
              </button>
              <input
                type="text"
                readOnly
                value={studentcount}
                className="studentTicketvalue"
              />
              <button className="btn addBtn" onClick={addstudentcount}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="loveTicket">
              <h4>愛心票</h4>
              <h4 className="loveTicketprice">$20</h4>
            </div>
            <div className="loveTicketBtn">
              <button className="btn redBtn" onClick={redlovecount}>
                <i className="fas fa-minus"></i>
              </button>
              <input
                type="text"
                value={lovecount}
                className="loveTicketvalue"
                readOnly
              />
              <button className="btn addBtn" onClick={addlovecount}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <Link to="/carts">
              <button
                className="btn goPay"
                onClick={() => {
                  const temp_arr123 = [
                    {
                      sid: 998,
                      image: "/zooTicket.jpg",
                      name: "動物園門票:成人",
                      price: 50,
                      quantity: adultcount,
                    },
                    {
                      sid: 999,
                      image: "/zooTicket.jpg",
                      name: "動物園門票:學生",
                      price: 30,
                      quantity: studentcount,
                    },
                    {
                      sid: 1000,
                      image: "/zooTicket.jpg",
                      name: "動物園門票:愛心",
                      price: 20,
                      quantity: lovecount,
                    },
                  ];
                  let template = temp_arr123.filter((v) => v.quantity !== 0);
                  template.forEach((v) => {
                    addItem(v);
                  });
                }}
              >
                立即結帳
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="ning_rightflex">
        <div
          className="ning_game"
          onClick={() => {
            let top = window.pageYOffset + 60;
            document.querySelector(".lottery_container").style.top = top + "px";
            // 由右邊訂選欄的按鈕先判別使用者是否為會員，是的話，才可以玩
            if (localStorage.admin_account !== undefined) {
              const storage = localStorage.getItem("received");
              const expireTime = JSON.parse(storage);
              let nextTime = expireTime === null ? 0 : expireTime.expire;
              if (storage === undefined) {
                props.setToggleLottery(true);
              } else {
                if (new Date().getTime() > nextTime) {
                  localStorage.removeItem("received");
                  props.setToggleLottery(true);
                } else {
                  props.setModalTitle("遊戲規則通知");
                  props.setModalText("一天只能玩一次，先玩玩別的小遊戲吧!");
                  props.setModalBtn("到遊戲頁");
                  props.setShow(true);
                }
              }
            } else {
              props.setModalTitle("尚未登入通知");
              props.setModalText("請先進行登入才可以玩哦~");
              props.setModalBtn("前往登入");
              props.setShow(true);
            }
          }}
        >
          <div className="ning_gameicon">
            <span className="material-icons">sports_esports</span>
            <p>刮刮樂遊戲</p>
          </div>
        </div>
      </div>
      <div className="backToTop">
        <button
          onClick={() =>
            scroll.scrollToTop({
              duration: 500,
              delay: 0,
              smooth: "easeInOutQuart",
            })
          }
        >
          <span className="span1">Click </span>
          <span className="span2">To </span>
          <span className="span3">
            Top <i className="fas fa-angle-double-up"></i>
          </span>
        </button>
      </div>
    </>
  );
};

export default FixedRight;
