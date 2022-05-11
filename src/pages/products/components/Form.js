import React, { useState } from "react";
import StarRating from "./starRating";
import { useLocation } from "react-router-dom";

function Form(props) {
  const [selection, setSelection] = useState("");

  const [reviewvalue, setReviewvalue] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Sid = searchParams.get("id");

  const textareado = function (e) {
    setReviewvalue(e.target.value);
  };
  const checkForm = function (event) {
    event.preventDefault();

    fetch("http://localhost:4000/reviewproducts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductsReview: Sid,
        ReviewStar: selection,
        Review: reviewvalue,
        memberSid: 2,
      }),
    })
      .then((r) => {
        r.json();
        console.log(123);
      })
      .then(() => {
        alert("留言成功！感謝您寶貴的意見");
        window.location.reload();
      });
  };
  return (
    <>
      <form name="form1" className="alan_LeftInputGroup" onSubmit={checkForm}>
        <div className="alan_left1">
          <span>
            選擇分數:
            {selection === 0 || selection === "" ? "請選擇" : `${selection}星`}
          </span>
          <StarRating
            setSelection={setSelection}
            value={`${selection}`}
            name="ReviewStar"
          />
          <input
            type="hidden"
            value={Sid}
            onChange={setSelection}
            name="ProductsReview"
            id="ProductsReview"
          />
          <input
            type="hidden"
            value={`${selection}`}
            onChange={setSelection}
            name="ReviewStar"
            id="ReviewStar"
          />
        </div>
        <div className="alan_left2">
          <span>輸入內容:</span>
          <textarea
            id="Review"
            name="Review"
            placeholder="請輸入評論內容"
            value={reviewvalue}
            onChange={textareado}
            rows="5"
          />
        </div>
        <button type="submit" value="Submit">
          確認送出
        </button>
      </form>
    </>
  );
}

export default Form;
