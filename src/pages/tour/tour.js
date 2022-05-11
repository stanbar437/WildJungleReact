import React from "react";
import "./tour.scss";
import CarouselShow from "./components/CarouselShow1";

function tour(){
    return(<>
<div className="tourbackground">
    <div className="tourback"></div>
    <img src="/img/home/homebgcblack.svg" alt="" />
</div>
    <div className="tourContainer">
        <CarouselShow/>
        <div className="tourLife">
        </div>  
    </div>
    </>)
}

export default tour