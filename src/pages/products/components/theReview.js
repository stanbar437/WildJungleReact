import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";

function TheReview(props) {
  const review = props.review;
  const member = props.member;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Sid = searchParams.get("id");
  const reviewArray = review.filter((v) => v.ProductsReview === parseInt(Sid));
  const memberchose = member.filter((v) => v.ProductsReview === parseInt(Sid));
  const memberName = memberchose.map((v) => v.m_name);

  const click = () => {};
  //console.log(Array);
  //console.log(memberName);

  //const gogo= `http://localhost:4000/reviewproducts/delete/${Sid}`
  return (
    <>
      {Array.from({ length: reviewArray.length }, (v, i) => (
        <div className="alan_rightReview" key={i}>
          <div className="alan_rightreview1">
            <div>
              來自：{memberName[i]}
              <br />
              評分：{`${reviewArray[i].ReviewStar}`}
              <span style={{ color: "#eb5c37" }}>
                {reviewArray[i].ReviewStar >= 1 ? "\u2605" : "\u2606"}
              </span>
              <span style={{ color: "#eb5c37" }}>
                {reviewArray[i].ReviewStar >= 2 ? "\u2605" : "\u2606"}
              </span>
              <span style={{ color: "#eb5c37" }}>
                {reviewArray[i].ReviewStar >= 3 ? "\u2605" : "\u2606"}
              </span>
              <span style={{ color: "#eb5c37" }}>
                {reviewArray[i].ReviewStar >= 4 ? "\u2605" : "\u2606"}
              </span>
              <span style={{ color: "#eb5c37" }}>
                {reviewArray[i].ReviewStar >= 5 ? "\u2605" : "\u2606"}
              </span>
            </div>
            <div>評論內容:{reviewArray[i].Review}</div>
            <div>評論時間:{reviewArray[i].ReviewDate}</div>
          </div>
          <div>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `確定要刪除這筆留言嗎？`
                  ) === true
                ) {
                  fetch(
                    `http://localhost:4000/reviewproducts/delete/${reviewArray[i].ReviewSid}`,
                    { method: "GET" }
                  )
                    .then((r) => {
                      r.json();
                      console.log(123);
                    })
                    .then(() => {
                      alert("刪除成功");
                      window.location.reload();
                    });
                } else {
                  alert("您已取消刪除");
                }
              }}
            >
              刪除
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default TheReview;
