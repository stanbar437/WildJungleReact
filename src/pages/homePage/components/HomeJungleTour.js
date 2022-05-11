import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const HomeJungleTour = () => {
  /* 換照片 */
  const tourmap = useRef();

  return (
    <>
      <div className="ning_bgcblack">
        <div className="container">
          <div className="ning_JungleTour">
            <h1 className="ning_TitleEn">Jungle Tour</h1>
            <h2 className="ning_TitleCh">園區分類一覽</h2>
          </div>
        </div>
        <div className="ning_JungleTourmapbox">
          <div className="ning_JungleTourmap">
            <img src="/img/home/tropicalmap.svg" alt="" ref={tourmap} />
          </div>
          <div className="ning_Jungletourimgbox">
            {/* <div className="ning_Jungle"> */}
              {/* <Link to="/tour"> */}
                <div className="ning_Jungletropical" style={{width:"25%"}}>
                  <div className="ning_tourboxhd">
                    <img
                      className="ning_Jungletropicalimg"
                      src="/img/home/tropical.jpg"
                      alt=""
                      onMouseMove={() => {
                        tourmap.current.src = "/img/home/tropicalmap.svg";
                      }}
                    />
                  </div>
                  <p>熱帶雨林館</p>
                </div>
              {/* </Link> */}
              {/* <Link to="/tour"> */}
                <div className="ning_JungleOcean" style={{width:"25%" }}>
                  <div className="ning_tourboxhd">
                    <img
                      className="ning_JungleOceanimg"
                      src="/img/home/Ocean.jpg"
                      alt=""
                      onMouseMove={() => {
                        tourmap.current.src = "/img/home/Oceanmap.svg";
                      }}
                    />
                  </div>
                  <p>海底世界館</p>
                </div>
              {/* </Link> */}
              {/* <Link to="/tour"> */}
                <div className="ning_Junglenocturnal" style={{width:"25%"}}>
                  <div className="ning_tourboxhd">
                    <img
                      className="ning_Junglenocturnalimg"
                      src="/img/home/nocturnal.jpg"
                      alt=""
                      onMouseMove={() => {
                        tourmap.current.src = "/img/home/nocturnalmap.svg";
                      }}
                    />
                  </div>
                  <p>夜行動物館</p>
                </div>
              {/* </Link> */}
              {/* <Link to="/tour"> */}
                <div className="ning_Jungleice" style={{width:"25%" }}>
                  <div className="ning_tourboxhd">
                    <img
                      className="ning_Jungleiceimg"
                      src="/img/home/ice.jpg"
                      alt=""
                      onMouseMove={() => {
                        tourmap.current.src = "/img/home/icemap.svg";
                      }}
                    />
                  </div>
                  <p>冰原歷險館</p>
                </div>
              {/* </Link> */}
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default HomeJungleTour;
