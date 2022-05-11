import React from "react";
import { createGlobalStyle } from "styled-components";

function NotFoundPage(props) {
  const GlobalStyles = createGlobalStyle`
 .NotPage{
   height:40vw;
   padding-top:60px;
   width :100%;
   display:flex;
   flex-direction: column;
   align-items: center;
 }
 .NotPageImg{
   width:60%;
 }
`;

  return (
    <>
    <GlobalStyles />
      <div className="NotPage">
        <img className="NotPageImg" src={require("./404.jpeg")} alt="" />
      </div>
    </>
  );
}

export default NotFoundPage;
