import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Config from "../Config";
import { Modal, Button } from "react-bootstrap";

function AdditionComment(props) {
  const Range = Slider;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  // const [signSuccess, setSignSuccess] = useState("");

  // const [comments, setComments] = useState({
  //   serve: 1,
  //   clean: 1,
  //   comfort: 1,
  //   facility: 1,
  //   cpValue: 1,
  //   commentTextarea: "",
  // });

  // 錯誤訊息狀態
  const [commentsError, setCommentsError] = useState({
    commentTextarea: "",
  });

  // const onInputChange = (e) => {
  //   setComments({...comments, [e.target.name]: e.target.value.trim()});
  // };

  const [servevalue, setServevalue] = useState("1");
  const [cleanvalue, setCleanvalue] = useState("1");
  const [comfortablevalue, setComfortablevalue] = useState("1");
  const [facilityvalue, setFacilityvalue] = useState("1");
  const [CPvalue, setCPvalue] = useState("1");
  const [commentText, setCommentText] = useState("");

  const allClear = function () {
    setServevalue("1");
    setCleanvalue("1");
    setComfortablevalue("1");
    setFacilityvalue("1");
    setCPvalue("1");
    setCommentText("");
  };

  // 填寫錯誤時顯示
  const handleFormInvalid = (e) => {
    e.preventDefault();
    const updateFieldError = {
      ...commentsError,
      [e.target.name]: e.target.validationMessage,
    };

    setCommentsError(updateFieldError);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // 避免傳統方式送出表單

    // props.sendComments({
    //   serve: servevalue,
    //   clean: cleanvalue,
    //   comfort: comfortablevalue,
    //   facility: facilityvalue,
    //   cpValue: CPvalue,
    //   commentTextarea: commentText,
    // });

    // return;
    // const fd = new FormData(e.target);
    // const commentTextarea = fd.get("commentTextarea");
    // if (commentTextarea.trim() === "") {
    //   const updateCommentsError = {
    //     ...commentsError,
    //     name: "請給我們改善的意見，或鼓勵我們！",
    //   };
    //   setCommentsError(updateCommentsError);
    //   return;
    // }

    const sid = JSON.parse(localStorage.getItem("admin_account"));
    
    await fetch(Config.COMMENT_ADD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serve: servevalue,
        clean: cleanvalue,
        comfort: comfortablevalue,
        facility: facilityvalue,
        cpValue: CPvalue,
        commentTextarea: commentText,
        m_sid: sid ? sid["m_sid"] : 1,
        order_sid: props.order[0]["order_sid"],
        order_detail_live_sid:props.order[0]["order_sid"]
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r)
        const apiArray = [
          0,
          Config.COMMENT_OCEANLIST,
          Config.COMMENT_ICELIST,
          Config.COMMENT_NOCTURNALLIST,
          Config.COMMENT_TROPICALLIST,
        ];

        //console.log("apiArray[props.roomSid]", apiArray[props.roomSid]);

        fetch(apiArray[props.roomSid])
          .then((res) => res.json())
          .then((res) => {
            //console.log("res", res);
            props.setData(res);
            props.setClosebtn(true);
            props.setWritecommen(false);
          });
        handleClose()
      });
  };

  return (
    <>
      <form name="form1" onSubmit={handleSubmit} onInvalid={handleFormInvalid}>
        <div className="orderInformationbox">
          <div className="orderInformation">訂購資訊</div>
          <div className="orderList">
            <p className="orderNumber">
            訂單編號 : <span>{(props.order).length===0?"":`A${props.order[0]["order_date"].slice(0,10).split("-").join("")+props.order[0]["order_sid"]}`}</span>
            </p>
            <p className="orderRoom">
              入住房型 : <span>{props.roomName}</span>
            </p>
            <p
              className="orderCheckinDate"
            >
            入住日期 : <span>{(props.order).length===0?"":props.order[0]["start"]}</span>
            </p>
            <p className="orderCheckoutDate">
            退房日期 : <span>{(props.order).length===0?"":props.order[0]["end"]}</span>
            </p>
          </div>
          <div className="commentline"></div>

          <div className="commentScore">各項評分</div>
          <div className="commentScoreList">
            <div className="commentServebox">
              <div className="Serve">
                <p className="ServeText">服務素質</p>
              </div>
              <div className="serveSliderBox">
                {/* <input
                  type="text"
                  id="serve"
                  name="serve"
                  value={comments.serve}
                  onChange={onInputChange}
                ></input> */}
                <Range
                  className="serveslider"
                  min={1.0}
                  max={10}
                  id="serve"
                  name="serve"
                  value={servevalue}
                  onChange={setServevalue}
                  handleStyle={{
                    backgroundColor: "#ffffff",
                    opacity: 1,
                    border: "2px solid #f9b112",
                    boxShadow: "0 0 3px rgba(0, 0, 0, 0.4)",
                    width: "15px",
                    height: "15px",
                  }}
                  railStyle={{
                    height: "5px",
                    backgroundColor: "#ccc",
                  }}
                  trackStyle={{
                    height: "5px",
                    backgroundColor: "#f9b112",
                  }}
                />
                <div className="commentServeScore">{servevalue}</div>
              </div>
            </div>
            <div className="commentCleanbox">
              <div className="Clean">
                <p className="CleanText">清潔程度</p>
              </div>
              <div className="cleanSliderBox">
                {/* <input
                  type="text"
                  id="clean"
                  name="clean"
                  value={comments.clean}
                  onChange={onInputChange}
                ></input> */}
                <Range
                  className="cleanslider"
                  min={1.0}
                  max={10}
                  id="clean"
                  name="clean"
                  value={cleanvalue}
                  onChange={setCleanvalue}
                  handleStyle={{
                    backgroundColor: "#ffffff",
                    opacity: 1,
                    border: "2px solid #f9b112",
                    boxShadow: "0 0 3px rgba(0, 0, 0, 0.4)",
                    width: "15px",
                    height: "15px",
                  }}
                  railStyle={{
                    height: "5px",
                    backgroundColor: "#ccc",
                  }}
                  trackStyle={{
                    height: "5px",
                    backgroundColor: "#f9b112",
                  }}
                />
                <div className="commentCleanScore">{cleanvalue}</div>
              </div>
            </div>
            <div className="commentComfortablebox">
              <div className="Comfortable">
                <p className="ComfortableText">舒適程度</p>
              </div>
              <div className="comfortableSliderBox">
                {/* <input
                  type="text"
                  id="comfort"
                  name="comfort"
                  value={comments.comfort}
                  onChange={onInputChange}
                ></input> */}
                <Range
                  className="comfortableslider"
                  min={1.0}
                  max={10}
                  id="comfort"
                  name="comfort"
                  value={comfortablevalue}
                  onChange={setComfortablevalue}
                  handleStyle={{
                    backgroundColor: "#ffffff",
                    opacity: 1,
                    border: "2px solid #f9b112",
                    boxShadow: "0 0 3px rgba(0, 0, 0, 0.4)",
                    width: "15px",
                    height: "15px",
                  }}
                  railStyle={{
                    height: "5px",
                    backgroundColor: "#ccc",
                  }}
                  trackStyle={{
                    height: "5px",
                    backgroundColor: "#f9b112",
                  }}
                />
                <div className="commentComfortableScore">
                  {comfortablevalue}
                </div>
              </div>
            </div>
            <div className="commentFacilitybox">
              <div className="Facility">
                <p className="FacilityText">設施</p>
              </div>
              <div className="facilitySliderBox">
                {/* <input
                  type="text"
                  name="facility"
                  id="facility"
                  value={comments.facility}
                  onChange={onInputChange}
                ></input> */}
                <Range
                  className="facilityslider"
                  min={1.0}
                  max={10}
                  name="facility"
                  id="facility"
                  value={facilityvalue}
                  onChange={setFacilityvalue}
                  handleStyle={{
                    backgroundColor: "#ffffff",
                    opacity: 1,
                    border: "2px solid #f9b112",
                    boxShadow: "0 0 3px rgba(0, 0, 0, 0.4)",
                    width: "15px",
                    height: "15px",
                  }}
                  railStyle={{
                    height: "5px",
                    backgroundColor: "#ccc",
                  }}
                  trackStyle={{
                    height: "5px",
                    backgroundColor: "#f9b112",
                  }}
                />
                <div className="commentFacilityScore">{facilityvalue}</div>
              </div>
            </div>
            <div className="commentCPValuebox">
              <div className="CPValue">
                <p className="CPValueText">性價比</p>
              </div>
              <div className="CPValueSliderBox">
                {/* <input
                  type="text"
                  id="cpValue"
                  name="cpValue"
                  value={comments.cpValue}
                  onChange={onInputChange}
                ></input> */}
                <Range
                  className="CPValueslider"
                  min={1.0}
                  max={10}
                  id="cpValue"
                  name="cpValue"
                  value={CPvalue}
                  onChange={setCPvalue}
                  handleStyle={{
                    backgroundColor: "#ffffff",
                    opacity: 1,
                    border: "2px solid #f9b112",
                    boxShadow: "0 0 3px rgba(0, 0, 0, 0.4)",
                    width: "15px",
                    height: "15px",
                  }}
                  railStyle={{
                    height: "5px",
                    backgroundColor: "#ccc",
                  }}
                  trackStyle={{
                    height: "5px",
                    backgroundColor: "#f9b112",
                  }}
                />
                <div className="commentCPValueScore">{CPvalue}</div>
              </div>
            </div>
            <div className="nullbox"></div>
          </div>
        </div>
        <div className="commentline"></div>
        <div className="commentTextarea">撰寫評論</div>
        <textarea
          className="form-control ning_commentTextareabox"
          id="commentTextarea"
          name="commentTextarea"
          value={commentText}
          onChange={() => {
            setCommentText(document.querySelector("#commentTextarea").value);
          }}
          rows="5"
          placeholder="請輸入評論..."
        />
        <div className="textareaHelp"></div>
        <div className="commentbtngroup">
        {/* <button type="submit" id="submit" className="btn commentbtn">
        送出
          </button> */}
          <button type="button" className="btn commentbtn" onClick={handleShow}>
            送出
          </button>
          {show && <Modal show={show} onHide={handleClose}>
            <Modal.Header >
              <Modal.Title className="room_ModalTitle">送出</Modal.Title>
            </Modal.Header>
            <Modal.Body className="room_ModalBody">確定要送出這筆評論嗎？</Modal.Body>
            <Modal.Footer>
              <Button
                className="room_ModalAddbtn"
                onClick={handleSubmit}
                type="submit"
                id="submit"
                
              >
                確定
              </Button>
              <Button className="room_ModalnoAddbtn" onClick={handleClose}>
                取消
              </Button>
            </Modal.Footer>
          </Modal>}
          <button type="reset" className="btn cancelbtn" onClick={allClear}>
            清除
          </button>
        </div>
      </form>
    </>
  );
}

export default AdditionComment;
