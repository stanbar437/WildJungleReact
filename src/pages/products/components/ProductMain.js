import React from "react";
import { useEffect, useState } from "react";

function CarouselProduct() {
  const [carouselItemNum, setCarouselItemNum] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let myInterval = null;
    if (!isHover) {
      myInterval = setInterval(() => {
        setIsTransitioning(true);
        setCarouselItemNum(carouselItemNum + 1);
        console.log(carouselItemNum);
      }, 2500);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [carouselItemNum, isHover]);

  function handleHoverCarousel() {
    setIsHover(!isHover);
  }

  function handleClickLi(itemNum) {
    setIsTransitioning(true);
    setCarouselItemNum(itemNum);
  }

  function handleRightClick() {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCarouselItemNum(carouselItemNum + 1);
    }
    console.log(carouselItemNum);
  }
  function handleLeftClick() {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCarouselItemNum(carouselItemNum - 1);
    }
    console.log(carouselItemNum);
  }

  function handleTransitionEnd() {
    setIsTransitioning(false);
    if (carouselItemNum === 4) {
      setCarouselItemNum(1);
    }
    if (carouselItemNum === 0) {
      setCarouselItemNum(3);
    }
  }

  //console.log('start');
  // const [page, setPage] = useState(0);
  // const [iconActive,setIconActive] = useState(0);
  // const [intervalId, setIntervalId] = useState(null);
  // const imgWrap = document.querySelector(".alan_img-wrap");

  // const iconHover = (iconNumber) => {
  //   console.log('iconNumber',iconNumber);
  //   const imgWrap = document.querySelector(".alan_img-wrap");
  //   setIconActive(iconNumber);
  //   setPage(iconNumber);
  //   imgWrap.style.transform = `translateX(${iconNumber * -25}%)`;
  //   //clearInterval(intervalId)
  // };

  // const leftClick = () => {
  //   const newPage = (page -1) < 0? 2:page-1;
  //   console.log(newPage);

  //   const moveX =  newPage * -25;
  //   imgWrap.style.transition = "0.5s";
  //   imgWrap.style.transform = `translateX(${moveX}%)`;

  //   setPage(newPage);
  //   setIconActive(newPage);
  // };

  // const rightClick = () => {
  //   const newPage = (page +1) > 2? 0:page+1;
  //   console.log(newPage);

  //   const moveX =  newPage * -25;
  //   imgWrap.style.transition = "0.5s";
  //   imgWrap.style.transform = `translateX(${moveX}%)`;

  //   setPage(newPage);
  //   setIconActive(newPage);
  // };

  // const resetPage = () => {
  //   if (page === 3 || page > 3) {
  //     console.log('page === 3 reset page' );
  //     imgWrap.style.transition = "none";
  //     imgWrap.style.transform = "translate(0px)";
  //     setPage(0);
  //   }
  // };

  // useEffect(() => {
  //   const imgWrap = document.querySelector(".alan_img-wrap");

  //   imgWrap.addEventListener("transitionend", resetPage);

  //   const changePage = () => {
  //     console.log('change page',intervalId);
  //     const newPage = (page +1) > 2? 0:page+1;
  //     const moveX = newPage * -25;
  //     imgWrap.style.transition = "0.5s";
  //     imgWrap.style.transform = `translateX(${moveX}%)`;
  //     //main[page === 3 ? 0 : page].classList.add("mainRun");
  //     setPage(newPage);
  //     setIconActive(newPage);
  //   }
  //   const myInterval = (setInterval(changePage, 2500)) ;

  //   setIntervalId(myInterval);

  //   //imgWrap.addEventListener("mouseenter", clear);
  //   //imgWrap.addEventListener("mouseleave", startInterval());

  //   return () => {
  //     imgWrap.removeEventListener("transitionend", resetPage);
  //     // imgWrap.removeEventListener("transitionend", reset);
  //     //imgWrap.removeEventListener("mouseleave", startInterval());
  //     //imgWrap.removeEventListener("mouseenter", clear);
  //     console.log('clear page',intervalId);
  //     clearInterval(myInterval);
  //   };

  // }, [page]);

  return (
    <>
      <div
        className="alan_wrap wrap"
        onMouseEnter={handleHoverCarousel}
        onMouseLeave={handleHoverCarousel}
      >
        <ul
          className={`carousel  alan_img-wrap move-left${carouselItemNum} ${
            isTransitioning ? "transitioning" : ""
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          <li className="alan_li ">
            <img className="main" src="img/product/Sliderpic3.jpeg" alt="" />
          </li>
          <li className="alan_li ">
            <img className="main" src="img/product/Sliderpic.jpeg" alt="" />
          </li>
          <li className="alan_li ">
            <img className="main" src="img/product/Sliderpic2.jpeg" alt="" />
          </li>
          <li className="alan_li ">
            <img className="main" src="img/product/Sliderpic3.jpeg" alt="" />
          </li>
          <li className="alan_li">
            <img className="main" src="img/product/Sliderpic.jpeg" alt="" />
          </li>
        </ul>
        <div id="btn-left-area" onClick={handleLeftClick}></div>
        <div id="btn-right-area" onClick={handleRightClick}>
          <i className="alan_right fas fa-chevron-right"></i>
        </div>
      </div>
      <div className="iconGroup">
        <i
          className={`fas fa-circle 
            ${carouselItemNum === 1 || carouselItemNum === 4 ? "active" : ""}
          `}
          onMouseEnter={() => handleClickLi(1)}
        ></i>
        <i
          className={`fas fa-circle 
            ${carouselItemNum === 2 ? "active" : ""}
          `}
          onMouseEnter={() => handleClickLi(2)}
        ></i>
        <i
          className={`fas fa-circle 
            ${carouselItemNum === 3 || carouselItemNum === 0 ? "active" : ""}
          `}
          onMouseEnter={() => handleClickLi(3)}
        ></i>
      </div>
    </>
  );
}

export default CarouselProduct;
