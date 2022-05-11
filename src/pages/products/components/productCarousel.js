import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  GlassMagnifier,
} from "react-image-magnifiers";

const ProductCarousel = (props) => {
  const [current, setCurrent] = useState(0);
  const pic = props.pic;
  // const setPic = props.setPic;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const Sid = searchParams.get("id");

  const pictrueArray = pic.filter((v) => v.ProductsPic === parseInt(Sid));
  const img1 =
    Boolean(pictrueArray[0]) === true
      ? `img/product/${pictrueArray[0].PicName}`
      : "";
  const img2 =
    Boolean(pictrueArray[1]) === true
      ? `img/product/${pictrueArray[1].PicName}`
      : "";
  const img3 =
    Boolean(pictrueArray[2]) === true
      ? `img/product/${pictrueArray[2].PicName}`
      : "";
  const img4 =
    Boolean(pictrueArray[3]) === true
      ? `img/product/${pictrueArray[3].PicName}`
      : "";
  const img5 =
    Boolean(pictrueArray[4]) === true
      ? `img/product/${pictrueArray[4].PicName}`
      : "";

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const change1 = () => {
    setCurrent(0);
  };
  const change2 = () => {
    setCurrent(1);
  };
  const change3 = () => {
    setCurrent(2);
  };
  const change4 = () => {
    setCurrent(3);
  };

  //const img5 = `img/product/${pictrueArray[4].PicName}`;
  // const Type1 = (products, type1) => {
  //   let newProducts = [...products];
  //   if (type1++) {
  //     newProducts = [...newProducts].filter((a) => a.ProductsType === 1);
  //   }
  //   return newProducts;
  // };

  const CarouselData = [
    {
      image: Boolean(`${img1}`) === true ? `${img1}` : " ",
    },
    {
      image: Boolean(`${img2}`) === true ? `${img2}` : " ",
    },
    {
      image: Boolean(`${img3}`) === true ? `${img3}` : " ",
    },
    {
      image: Boolean(`${img4}`) === true ? `${img4}` : " ",
    },
    {
      image: Boolean(`${img5}`) === true ? `${img5}` : " ",
    },
  ];

  if (CarouselData[4].image === " ") {
    CarouselData.pop();
  }
  if (CarouselData[3].image === " ") {
    CarouselData.splice(-1, 1);
  }
  if (CarouselData[2].image === " ") {
    CarouselData.splice(-1, 1);
  }

  const length = CarouselData.length;
  if (!Array.isArray(CarouselData) || CarouselData.length <= 0) {
    return null;
  }

  return (
    <>
      <style jsx="true">{`
        img:not([src]) {
          display: none;
        }
      `}</style>
      <section className="alan_slider">
        <div className="alan_leftbox" onClick={prevSlide}>
          <span className="alan_lefticon material-icons">chevron_left</span>
        </div>
        <div className="alan_rightbox" onClick={nextSlide}>
          <span className="alan_righticon material-icons">chevron_right</span>
        </div>
        {CarouselData.map((slider, index) => {
          return (
            <div key={index}>
              <div
                className={
                  index === current ? "alan_slide active" : "alan_slide"
                }
              >
                {index === current && (
                  <div className="alan_product_imgli">
                    <GlassMagnifier
                      className="alan_products_img"
                      imageSrc={slider.image === "" ? " " : slider.image}
                      imageAlt="Example"
                      allowOverflow={true}
                      magnifierSize={"200px"}
                      largeImageSrc={slider.image === "" ? " " : slider.image}
                    />
                  </div>
                )}
              </div>
              <div className="alan_product_img_icon">
                0{current + 1}/0{index + 1}
              </div>
            </div>
          );
        })}
      </section>
      <ul className="alan_product_img_ul" id="alanull">
        <li className="alan_product_img_li" onClick={change1}>
          <img src={Boolean(img1) === true ? img1 : " "} alt="" />
        </li>
        <li className="alan_product_img_li" onClick={change2}>
          <img src={Boolean(img2) === true ? img2 : " "} alt="" />
        </li>
        <li className="alan_product_img_li" onClick={change3}>
          <img src={Boolean(img3) === true ? img3 : null} alt="" />
        </li>
        <li className="alan_product_img_li" onClick={change4}>
          <img src={Boolean(img4) === true ? img4 : null} alt="" />
        </li>
      </ul>
    </>
  );
};

export default ProductCarousel;
