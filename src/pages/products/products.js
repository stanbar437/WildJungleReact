import React, { useEffect, useRef, useState } from "react";
import "./scss/products.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Productsbackground from "./components/productsbackground";
import ProductMain from "./components/ProductMain";
import EmailControl from "./components/theEmailControl";
import ProductsCard from "./components/productCard";
import SortbarPrice from "./components/SortbarPrice";
import SortbarType from "./components/SortbarType";
import SortbarVendor from "./components/SortbarVendor";
import SearchBar from "./components/Searchbar";
import * as Scroll from "react-scroll";
import { animateScroll as scroll, scroller } from "react-scroll";
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
} from "react-share";
import { EmailIcon, FacebookIcon, LineIcon, TwitterIcon } from "react-share";


function Products(props) {
  // 產品用的資料
  // 1. 從伺服器來的原始資料
  const [products, setProducts] = useState([]);
  // 2. 用於網頁上經過各種處理(排序、搜尋、過濾)後的資料
  const [displayProducts, setDisplayProducts] = useState([]);

  const [sortbarPrice, setSortbarPrice] = useState("");
  // const [sortbarType, setSortbarType] = useState("");
  const [sortbarVendor, setSortbarVendor] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const [rangevalue, setRangevalue] = useState([0, 6000]);
  const [isLoading, setIsLoading] = useState(false);
  const [type1, setType1] = useState(0);
  const [type2, setType2] = useState(0);
  const [type3, setType3] = useState(0);
  const [type4, setType4] = useState(0);
  const [type5, setType5] = useState(0);
  const [type6, setType6] = useState(0);

  
  //const refresh = function(){ window.location.reload()};
  const Allreset = function () {
    setType1(0);
    setType2(0);
    setType3(0);
    setType4(0);
    setType5(0);
    setType6(0);
    setRangevalue([0, 6000]);
    setSortbarPrice("");
    props.setSortbarType("");
    setSortbarVendor("");
    setSearchWord("");
  };

  const reset1 = function () {
    setType1(0);
  };
  const reset2 = function () {
    setType2(0);
  };
  const reset3 = function () {
    setType3(0);
  };
  const reset4 = function () {
    setType4(0);
  };
  const reset5 = function () {
    setType5(0);
  };
  const reset6 = function () {
    setType6(0);
  };

  const scrollToSection = () => {
    scroller.scrollTo("productgroup", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
  };
  useEffect(() => {
    const scrollToSection = () => {
      scroller.scrollTo("productgroup", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -100,
      });
    };
    if (props.sortbarType > 0) {
      scrollToSection();
    }
  }, [props.sortbarType]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  const handleSearch = (products, searchWord) => {
    let newProducts = [...products];

    if (searchWord.length) {
      newProducts = products.filter((products) => {
        return products.ProductsName.includes(searchWord);
      });
    }
    return newProducts;
  };

  const priceSlice = (products, rangevalue) => {
    let newProducts = [...products];
    if (newProducts) {
      newProducts = [...newProducts].filter(
        (a) => parseInt(rangevalue[0]) <= a.ProductsPrice
      );

      newProducts = [...newProducts].filter(
        (a) => a.ProductsPrice <= parseInt(rangevalue[1])
      );
    }
    return newProducts;
  };

  const handleSort = (products, sortbarPrice) => {
    let newProducts = [...products];
    if (sortbarPrice === "1") {
      newProducts = [...newProducts].sort(
        (a, b) => a.ProductsPrice - b.ProductsPrice
      );
    }
    if (sortbarPrice === "2") {
      //為什麼不能console.log
      newProducts = [...newProducts].sort(
        (a, b) => b.ProductsPrice - a.ProductsPrice
      );
    }
    if (sortbarPrice === "" && newProducts.length > 0) {
      newProducts = [...newProducts].sort(
        (a, b) => a.ProductSid - b.ProductSid
      );
    }
    return newProducts;
  };

  const Type1 = (products, type1) => {
    let newProducts = [...products];
    if (type1++) {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 1);
    }

    return newProducts;
  };
  const Type2 = (products, type2) => {
    let newProducts = [...products];
    if (type2++) {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 2);
    }

    return newProducts;
  };
  const Type3 = (products, type3) => {
    let newProducts = [...products];
    if (type3++) {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 3);
    }

    return newProducts;
  };
  const Type4 = (products, type4) => {
    let newProducts = [...products];
    if (type4++) {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 4);
    }

    return newProducts;
  };
  const Type5 = (products, type5) => {
    let newProducts = [...products];
    if (type5++) {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 5);
    }

    return newProducts;
  };
  const Type6 = (products, type6) => {
    let newProducts = [...products];
    if (type6++) {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 6);
    }
    return newProducts;
  };

  const sortType = (products, sortbarType) => {
    let newProducts = [...products];
    if (sortbarType === "1") {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 1);
      setType2(0);
      setType3(0);
      setType4(0);
      setType5(0);
      setType6(0);
    }
    if (sortbarType === "2") {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 2);
      setType1(0);
      setType3(0);
      setType4(0);
      setType5(0);
      setType6(0);
    }
    if (sortbarType === "3") {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 3);
      setType1(0);
      setType2(0);
      setType4(0);
      setType5(0);
      setType6(0);
    }
    if (sortbarType === "4") {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 4);
      setType1(0);
      setType2(0);
      setType3(0);
      setType5(0);
      setType6(0);
    }
    if (sortbarType === "5") {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 5);
      setType1(0);
      setType2(0);
      setType3(0);
      setType4(0);
      setType6(0);
    }
    if (sortbarType === "6") {
      newProducts = [...newProducts].filter((a) => a.ProductsType === 6);
      setType1(0);
      setType2(0);
      setType3(0);
      setType4(0);
      setType5(0);
    }
    if (sortbarType === "" && newProducts.length > 0) {
      newProducts = [...newProducts].sort(
        (a, b) => a.ProductSid - b.ProductSid
      );
    }
    return newProducts;
  };

  const sortVendor = (products, sortbarVendor) => {
    let newProducts = [...products];

    if (sortbarVendor === "1") {
      newProducts = [...newProducts].filter(
        (a) => a.ProductsVendor === "AnimalMoco"
      );
    }
    if (sortbarVendor === "2") {
      newProducts = [...newProducts].filter(
        (a) => a.ProductsVendor === "100+1"
      );
    }
    if (sortbarVendor === "3") {
      newProducts = [...newProducts].filter(
        (a) => a.ProductsVendor === "WildLife"
      );
    }
    if (sortbarVendor === "4") {
      newProducts = [...newProducts].filter(
        (a) => a.ProductsVendor === "HappyHorse"
      );
    }
    if (sortbarVendor === "5") {
      newProducts = [...newProducts].filter((a) => a.ProductsVendor === "mimi");
    }
    if (sortbarVendor === "6") {
      newProducts = [...newProducts].filter(
        (a) => a.ProductsVendor === "Bisque"
      );
    }
    if (sortbarVendor === "7") {
      newProducts = [...newProducts].filter(
        (a) => a.ProductsVendor === "BabtBites"
      );
    }
    if (sortbarVendor === "" && newProducts.length > 0) {
      newProducts = [...newProducts].sort(
        (a, b) => a.ProductSid - b.ProductSid
      );
    }
    return newProducts;
  };

  useEffect(() => {
    fetch("http://localhost:4000/products", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setDisplayProducts(data);
        console.log("成功獲得資料");
      })
      .catch((error) => {
        console.log("錯誤了", error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let newProducts = [...products];
    newProducts = handleSearch(products, searchWord);
    newProducts = sortType(newProducts, props.sortbarType);
    newProducts = sortVendor(newProducts, sortbarVendor);
    newProducts = handleSort(newProducts, sortbarPrice);
    newProducts = priceSlice(newProducts, rangevalue);
    newProducts = Type1(newProducts, type1);
    newProducts = Type2(newProducts, type2);
    newProducts = Type3(newProducts, type3);
    newProducts = Type4(newProducts, type4);
    newProducts = Type5(newProducts, type5);
    newProducts = Type6(newProducts, type6);
    setDisplayProducts(newProducts);
  }, [
    searchWord,
    props.sortbarType,
    sortbarVendor,
    products,
    sortbarPrice,
    rangevalue,
    type1,
    type2,
    type3,
    type4,
    type5,
    type6,
  ]);

  const spinner = (
    <>
      <div className="alan_spinner">
        <div className="alan_deer">
          <img src="img/product/820.gif" alt="" />
        </div>
      </div>
    </>
  );

  // useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     //SDK loaded, initialize it
  //     window.FB.init({
  //       xfbml: true,
  //       version: "v12.0",
  //     });
  //     //JS SDK initialized
  //     window.FB.XFBML.parse();
  //   };

  //   //load the JavaScript SDK
  //   (function (d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = "//connect.facebook.net/zh_TW/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");

  //   if (window.FB) {
  //     window.FB.XFBML.parse();
  //   }
  // }, []);

  
  return (
    <>
      <Productsbackground />
      <div className="productContainer">
        <div className="slider">
          <div className="mainPic">
            <div className="triangle">
              <div className="adTitle">
                <p>
                  <span className="alan_letter">2</span>
                  <span className="alan_letter">0</span>
                  <span className="alan_letter">2</span>
                  <span className="alan_letter">2</span>
                  <span className="alan_letter">.</span>
                  <span className="alan_letter">春</span>
                  <span className="alan_letter">季</span>
                  <span className="alan_letter">重</span>
                  <span className="alan_letter">新</span>
                  <span className="alan_letter">販</span>
                  <span className="alan_letter">售</span>
                  <span className="alan_letter">！</span>
                </p>
                <span>Bisque Design</span>
                <span className="titlespan">極佳觸感.親膚材質</span>
              </div>
              <img
                className="white"
                src={require("./imgs/Sliderpic1.png")}
                alt=""
              />
            </div>
            <ProductMain />
            {/* <img className="main" src="img/product/Sliderpic.jpeg" alt="" /> */}
            <div className="adNew">
              <div className="firstSpan">
                <span className="span-1">WH</span>
                <span className="span-2">AT's</span>
              </div>
              <div className="secondSpan">
                <span className="span-2">N</span>
                <span className="span-1">EW</span>
              </div>
            </div>
          </div>
          <div className="sliderButtom">
            <button>
              <span>View More</span>
              <span className="span2">⟶</span>
            </button>
          </div>
        </div>
        <div className="typeGroup">
          <div className="typeTitle">
            <h2>依種類選擇</h2>
          </div>
          <div className="typeSelect">
            <div
              className="type type1"
              value={type1}
              onClick={() => {
                props.setSortbarType("");
                reset2();
                reset3();
                reset4();
                reset5();
                reset6();
                scrollToSection();
                setType1(type1 + 1);
              }}
            >
              <div className="typeimg typeimg2"></div>
              <span>絨毛玩具</span>
            </div>
            <div
              className="type"
              value={type2}
              onClick={() => {
                props.setSortbarType("");
                reset1();
                reset3();
                reset4();
                reset5();
                reset6();
                scrollToSection();
                setType2(type2 + 1);
              }}
            >
              <div className="typeimg typeimg3"></div>
              <span>擬真模型</span>
            </div>
            <div
              className="type type1"
              value={type3}
              onClick={() => {
                props.setSortbarType("");
                reset1();
                reset2();
                reset4();
                reset5();
                reset6();
                scrollToSection();
                setType3(type3 + 1);
              }}
            >
              <div className="typeimg"></div>
              <span>嬰兒背巾</span>
            </div>
            <div
              className="type"
              value={type4}
              onClick={() => {
                props.setSortbarType("");
                reset1();
                reset2();
                reset3();
                reset5();
                reset6();
                scrollToSection();
                setType4(type4 + 1);
              }}
            >
              <div className="typeimg typeimg5"></div>
              <span>文具用品</span>
            </div>
            <div
              className="type type1"
              value={type5}
              onClick={() => {
                props.setSortbarType("");
                reset1();
                reset2();
                reset3();
                reset4();
                reset6();
                scrollToSection();
                setType5(type5 + 1);
              }}
            >
              <div className="typeimg typeimg4"></div>
              <span>填充布偶</span>
            </div>
            <div
              className="type"
              value={type6}
              onClick={() => {
                props.setSortbarType("");
                reset1();
                reset2();
                reset3();
                reset4();
                reset5();
                scrollToSection();
                setType6(type6 + 1);
              }}
            >
              <div className="typeimg typeimg1"></div>
              <span>兒童衣飾</span>
            </div>
          </div>
        </div>
        <div className="productItem">
          <div className="filter">
            <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
            <div className="selectGroup">
              <SortbarPrice
                sortbarPrice={sortbarPrice}
                setSortbarPrice={setSortbarPrice}
              />
              <SortbarType
                sortbarType={props.sortbarType}
                setSortbarType={props.setSortbarType}
              />
              <SortbarVendor
                sortbarVendor={sortbarVendor}
                setSortbarVendor={setSortbarVendor}
              />
            </div>
            <div className="dragableinput">
              <span>
                價格 ${rangevalue[0]}～ ${rangevalue[1]} 間
              </span>
              <Slider
                range
                className="alanslider"
                marks={{
                  1: `$ 1`,
                  6000: `$ 6000`,
                }}
                min={1}
                max={6000}
                defaultValue={[`${rangevalue[0]}`, `${rangevalue[1]}`]}
                value={[`${rangevalue[0]}`, `${rangevalue[1]}`]}
                onChange={setRangevalue}
                //onAfterChange={setRangevalue}
                handleStyle={{
                  backgroundColor: "#eb5c37",
                  opacity: 1,
                  border: "0",
                  boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
                }}
                railStyle={{
                  height: "5px",
                  backgroundColor: "gray",
                }}
                trackStyle={{
                  height: "5px",
                  backgroundColor: "black",
                }}
                dotStyle={{
                  border: "0",
                  backgroundColor: "#eb5c37",
                }}
              />
            </div>
            <div className="alan_resetfilter">
              <button onClick={Allreset}>重設篩選</button>
            </div>
            <div className="filterIcon">
              <a href="#/">
                <FacebookShareButton
                  url={"https://github.com/Lnhngx/WildJungleReact"}
                  quote={"我在WildJungle發現好東西！"}
                  hashtag={"#WildJungle"}
                  description={"aiueo"}
                >
                  <FacebookIcon size={24} />
                </FacebookShareButton>
              </a>
              <a href="#/">
                <LineShareButton
                  url={"https://github.com/Lnhngx/WildJungleReact"}
                  title={"我在WildJungle發現好東西！"}
                >
                  <LineIcon size={24} />
                </LineShareButton>
              </a>
              <a href="#/">
                <EmailShareButton
                  url={"https://github.com/Lnhngx/WildJungleReact"}
                  body={"我在WildJungle發現好東西！"}
                  subject={"#WildJungle"}
                >
                  <EmailIcon size={24} />
                </EmailShareButton>
              </a>
              <a href="#/">
                <TwitterShareButton
                  url={"https://github.com/Lnhngx/WildJungleReact"}
                >
                  <TwitterIcon size={24} />
                </TwitterShareButton>
              </a>
            </div>
          </div>
          <div className="productgroup">
            {isLoading ? spinner : <ProductsCard products={displayProducts} />}
          </div>
        </div>
      </div>
      <EmailControl />
    </>
  );
}

export default Products;
