// import React, { useState, useEffect, useRef } from "react";

// function Accommodation() {
//   return (
//     <>
//       <div class="accommodation_container">
//         <div class="accommodation_card">
//           {/* <div class="bar">
//             <div class="emptybar"></div>
//             <div class="filledbar"></div>
//           </div> */}
//           <img src="img/home/oceanroom.jpeg" alt="" />
//           <h2>Ocean Style</h2>
//         </div>
//         <div class="accommodation_card">
//           {/* <div class="bar">
//             <div class="emptybar"></div>
//             <div class="filledbar"></div>
//           </div> */}
//           <img src="img/home/icefieldroom.jpeg" alt="" />
//           <h2>Ice Style</h2>
//         </div>
//         <div class="accommodation_card">
//           {/* <div class="bar">
//             <div class="emptybar"></div>
//             <div class="filledbar"></div>
//           </div> */}
//           <img src="img/home/nocturnalroom.jpeg" alt="" />
//           <h2>Nocturnal Style</h2>
//         </div>
//         <div class="accommodation_card">
//           {/* <div class="bar">
//             <div class="emptybar"></div>
//             <div class="filledbar"></div>
//           </div> */}
//           <img src="img/home/tropicalroom.jpg" alt="" />
//           <h2>Tropical Style</h2>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Accommodation;
import React, { useState, useRef, useEffect } from "react";

function Accommodation() {
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  //your images
  const images = [
    { imgUrl: "img/home/oceanroom.jpeg", msg: "Ocean" },
    { imgUrl: "img/home/icefieldroom.jpeg", msg: "Ice" },
    { imgUrl: "img/home/nocturnalroom.jpeg", msg: "Nocturnal" },
    { imgUrl: "img/home/tropicalroom.jpg", msg: "Tropical" },
  ];

  const Carousel = (props) => {
    const { images } = props;
    const len = images.length;
    const [activeIndex, setActive] = useState(0);

    //Autoplay
    useInterval(() => {
      setActive((activeIndex + 1) % len);
    }, 5000);

    //Return style according to index
    const getStyle = (idx) => {
      //Counting from the left, the distance between idx and currentKey
      const distance_left = idx - activeIndex;
      //Counting from the right, the distance between idx and currentKey
      const distance_right =
        distance_left > 0 ? distance_left - len : distance_left + len;
      //Select the distance with the smallest absolute value
      const distance =
        Math.abs(distance_left) > Math.abs(distance_right)
          ? distance_right
          : distance_left;

      const styleObj = {};

      if (distance === 0) {
        //activeIndex
        styleObj.left = "25%";
        styleObj.zIndex = 3;
        styleObj.opacity = 1;
        styleObj.transform = "scale(1)";
      } else {
        styleObj.left = distance > 0 ? `${0 + distance}%` : `${50 + distance}%`;
      }

      //The distance is not less than 2, hide
      if (Math.abs(distance) >= 2) {
        styleObj.opacity = 0;
        styleObj.transform = "scale(0)";
      }

      return styleObj;
    };

    return (
      <div className="ning_carousel">
        <div className="ning_card-container">
          {images.map(({ imgUrl, msg }, index) => (
            <div
              className="ning_card"
              key={index}
              onClick={() => setActive(index)}
              style={getStyle(index)}
            >
              <img src={imgUrl} />
              <p>{msg}</p>
            </div>
          ))}
        </div>
        <div className="ning_rects">
          {images.map((value, index) => (
            <div
              key={index}
              className={
                activeIndex === index ? "ning_rect active" : "ning_rect"
              }
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <Carousel images={images} />
    </>
  );
}

export default Accommodation;
