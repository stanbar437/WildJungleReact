import React, { useState, useEffect } from "react";
import "./ning.scss";
import "./homepage.scss";
import HomeCarousel from "./components/HomeCarousel";
// import Homevideo from "./components/Homevideo";
// import HomeWeather from "./components/HomeWeather";
// import HomeWeathermb from "./components/HomeWeathermb";
import Accommodation from "./components/Accommodation";
import HomeJungleTour from "./components/HomeJungleTour";
import HomeJungleStar from "./components/HomeJungleStar";
import HomeTransportion from "./components/HomeTransportion";
import HomeTransportionP from "./components/HomeTransportionP";
import { CarouselData } from "./components/CarouselData";
import { Link } from "react-router-dom";

function HomePage() {
  const [transportionbtn, setTransportionbtn] = useState(true);
  const [popularEvent, setPopularEvent] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularevents")
      .then((r) => r.json())
      .then((obj) => {
        setPopularEvent(obj);
      });
  }, []);

  // const renderPopularEvents = () => {
  //   console.log("第30行：", popularEvent);

  //   <>
  //     {popularEvent.map((v, i) => {
  //       return (
  //         <div key={i} className="col-4">
  //           <div className="ning_eventsbox">
  //             <p className="ning_eventsday">{v.actDate}</p>
  //             <p className="ning_eventsyear">2022</p>
  //             <div className="ning_eventsdateline"></div>
  //             <p className="ning_eventstour">{v.actLocation}</p>
  //             <div className="ning_eventsimg">
  //               <img src={v.actImage} alt="" />
  //             </div>
  //             <div className="ning_eventsboxbottom">
  //               <p className="ning_eventstext">{v.actIntroduce}</p>
  //               <div className="ning_eventsgo">
  //                 <span className="material-icons">east</span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </>;
  // };

  return (
    <>
      <HomeCarousel slides={CarouselData} />


      <HomeJungleTour />

      <div className="container">
        <div className="ning_PopularEvents">
          <h1 className="ning_TitleEnblack">Popular Events</h1>
          <h2 className="ning_TitleChblack">熱門活動一覽</h2>
        </div>
        <div className="ning_eventContainer">
          <div className="ning_eventWrap">
            <div className="row">
              {popularEvent.map((v, i) => {
                return (
                  <div key={i} className="col-1">
                    <div className="ning_eventsbox">
                      <p className="ning_eventsday">
                        {v.actDate.substring(5, 10)}
                      </p>
                      <p className="ning_eventsyear">2022</p>
                      <div className="ning_eventsdateline"></div>
                      <p className="ning_eventstour">{v.actLocation}</p>
                      <div className="ning_eventsimg">
                        <img src={v.actImage} alt="" />
                      </div>
                      <div className="ning_eventsboxbottom">
                        <p className="ning_eventstext">{v.actIntroduce}</p>
                        <div className="ning_eventsgo">
                          <span className="material-icons">east</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ning_buttonbox">
          <Link to="/activity">
            <button className="btn ning_viewmorebtn">
              <p className="ning_viewmorebtntext">View More</p>
              <p className="ning_viewmoreicon">⟶</p>
            </button>
          </Link>
        </div>
        
      </div>

      {/* 明星動物認養 */}

      <HomeJungleStar />

      <div className="container">
        <h1 className="ning_TitleEnblack">Transportion</h1>
        <h2 className="ning_TitleChblack">交通</h2>
        <div className="ning_transportionButton">
          <button
            className="ning_busButton btn"
            onClick={() => setTransportionbtn(true)}
          >
            公車即時
          </button>
          <button
            className="ning_PButton btn"
            onClick={() => setTransportionbtn(false)}
          >
            停車場
          </button>
          {/* <HomeTransportion /> */}
          {transportionbtn === true ? (
            <HomeTransportion />
          ) : (
            <HomeTransportionP />
          )}
          {/* <HomeTransportionP /> */}
        </div>
      </div>
    </>
  );
}
export default HomePage;
