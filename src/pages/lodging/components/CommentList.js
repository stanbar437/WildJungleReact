import React from "react";
import CommentItem from "./CommentItem";

function CommentList(props)  {
  const { comments , order,setData,roomSid} = props;
  return (
    <>
      <div className="guestCommentwrap">
        {comments.map((comment, i) => {
          return <CommentItem key={comment.sid} comment={comment} order={order} setData={setData} roomSid={roomSid}/>;
        })}
      </div>
    </>
  );
};

export default CommentList;
