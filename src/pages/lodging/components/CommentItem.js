import React, { useState } from "react";
import Config from "../Config";
import { Modal, Button } from "react-bootstrap";

function CommentItem(props) {
  const [navigation, setNavigation] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { order } = props;
  const clickNav = () => {
    setNavigation(!navigation);
  };
  const m_sid = JSON.parse(localStorage.getItem("admin_account"));
  const {
    sid,
    service_score,
    clean_score,
    comfort_score,
    facility_score,
    cpValue_score,
    comments,
    m_name,
    start,
    end,
  } = props.comment;
  return (
    <>
      <div className="guestbox">
        <div className="guestCommentbox">
          <div className="guestInformation">
            <div className="guestimg">
              <img src="img/home/star_eagle.png" alt="" />
            </div>
            <div className="guestNameDate">
              <div className="guestName">{m_name}</div>
              <div className="cleckinDate">
                <span className="DateIcon material-icons">date_range</span>
                <p
                // onClick={console.log(m_sid["m_name"])}
                >
                  {Math.abs(new Date(end) - new Date(start)) /
                    (1000 * 3600 * 24)}
                  晚・<span>{start}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="guestCommentTextbox">
            <p className="guestCommentText">{comments}</p>
          </div>
          <p
            className="guestScore"
            // style={{ display: navigation === true && "none" }}
          >
            {Math.ceil(
              (service_score +
                clean_score +
                comfort_score +
                facility_score +
                cpValue_score) /
                5
            )}
          </p>
        </div>

        <div
        // className={navigation ? "navigation active" : "navigation"}
          className="navigation active"
          onClick={clickNav}
          style={{ display: m_sid["m_name"] !== m_name && "none" }}
        >
          <span>
            <i className="far fa-edit" ></i>
          </span>

          <span>
            <i className="far fa-trash-alt" onClick={handleShow}></i>
            {show && (
              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title className="room_ModalTitle">刪除</Modal.Title>
                </Modal.Header>
                <Modal.Body className="room_ModalBody">
                  確定要刪除入住時間為{start}這筆評論嗎？
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="room_Modaldeletbtn"
                    onClick={async (e) => {
                      console.log(sid);
                      await fetch(Config.COMMENT_DELETE + sid, {
                        method: "GET",
                      })
                        .then((r) => r.json())
                        .then((obj) => {
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
                            });
                          handleClose();
                        });
                    }}
                  >
                    確定
                  </Button>
                  <Button className="room_Modalnodeletbtn" onClick={handleClose}>
                    取消
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default CommentItem;
