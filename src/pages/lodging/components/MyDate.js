import React, { useEffect, useState } from "react";
import _ from "lodash";

const myYear = 2022;
const myMonth = 5;

const lastMonth =4;

function MyDate(props) {
  const { setCartdate, setCartdate2 } = props;
  // 呈現yearAndMonth
  const now = new Date();
  let dateTime = new Date();
  dateTime = dateTime.setDate(dateTime.getDate() + 1);
  dateTime = new Date(dateTime);

  const [check, setCheck] = useState([
    now.toLocaleDateString(),
    dateTime.toLocaleDateString(),
  ]);

  // 要得到今天的西元年使用Date物件的getFullYear()，要得到月份使用getMonth()(注意回傳為 0~11)
  const nowY = myYear ? myYear : now.getFullYear();

  // nowM =1-12
  const nowM = myMonth ? myMonth : now.getMonth() + 1; //注意回傳為 0~11

  // 上一個月
  const lastM =  lastMonth ? lastMonth : now.getMonth();

  // 呈現標題
  const weekDayList = ["日", "一", "二", "三", "四", "五", "六"];

  // 本月有幾天
  // (上個月的最後一天是幾號)
  const days = new Date(nowY, nowM, 0).getDate();

  // 本月有幾天
  const lastMdays = new Date(nowY, lastM, 0).getDate();

  // 這個月的第一天是星期幾(0-6) (月份為0-11)
  const firstDay = new Date(nowY, nowM - 1, 1).getDay();

  // 上個月的第一天是星期幾(0-6) (月份為0-11)
  const lastMfirstDay = new Date(nowY, lastM - 1, 1).getDay();

  // 本月所有日期的陣列資料
  const daysDataArray = [];

  // 上月所有日期的陣列資料
  const lastMdaysDataArray = [];

  // 補前面的空白資料
  for (let i = 0; i < firstDay; i++) {
    daysDataArray.push("");
  }

  // 補上月前面的空白資料
  for (let i = 0; i < lastMfirstDay; i++) {
    lastMdaysDataArray.push("");
  }

  // 加入本月所有的日期資料
  for (let i = 0; i < days; i++) {
    daysDataArray.push(i + 1);
  }

  // 加入本月所有的日期資料
  for (let i = 0; i < lastMdays; i++) {
    lastMdaysDataArray.push(i + 1);
  }

  // 準備要呈現在網頁上
  const daysDisplayArray = _.chunk(daysDataArray, 7);

  // 準備要呈現上月在網頁上
  const lastMdaysDisplayArray = _.chunk(lastMdaysDataArray, 7);

  //
  const [count, setCount] = useState(0);
  const [checkTime, setcheckTime] = useState([]);
  let colorArr = [];
  function checkDate(e) {
    if (count === 0) {
      let Arr = [...check];
      Arr.splice(0, 2);
      Arr.push(
        new Date(
          new Date(e.target.dataset.value).getTime()
        ).toLocaleDateString()
      );
      setCheck(Arr);
      setcheckTime(new Date(e.target.dataset.value).getTime());
      setCount(1);
      //console.log(Arr);
      //colorArr.push(e.target)
      //e.target.style.backgroundColor = "#f9b112";
    } else if (count === 1) {
      if (new Date(e.target.dataset.value).getTime() > checkTime) {
        let Arr = [...check];
        Arr.push(
          new Date(
            new Date(e.target.dataset.value).getTime()
          ).toLocaleDateString()
        );
        setCheck(Arr);
        setCount(0);
      } else {
        let Arr = [...check];
        Arr.splice(0, 1);
        Arr.push(
          new Date(
            new Date(e.target.dataset.value).getTime()
          ).toLocaleDateString()
        );
        setCheck(Arr);
        setcheckTime(new Date(e.target.dataset.value).getTime());
        setCount(1);
      }
      //colorArr.push(e.target)
    }
    e.target.style.backgroundColor = "#f9b112";
    colorArr.push(e.target.innerHTML);
    //console.log(e.target.dataset.value, check[0]);
  }

  useEffect(() => {
    const set1 = () => {
      setCartdate(check[0]);
    };
    const set2 = () => {
      setCartdate2(check[1]);
    };

    set1();
    set2();
  }, [check, setCartdate, setCartdate2]);

  return (
    <>
      <h2 id="yearAndMonth" className="yearAndMonth">
        <span>入住：</span>
        {check[0]}
        <span> 退房：</span>
        {check[1]}
      </h2>
      <div className="ning_checkbox">
        <div className="ning_lastdatebox">
          <table border="1" className="ning_table">
            <thead id="title">
              <tr className="ning_tr">
                {weekDayList.map(function (v, i) {
                  return (
                    <th key={i} value={i}>
                      {v}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody id="data" className="ning_tbody">
              {lastMdaysDisplayArray.map((v, i) => {
                return (
                  <tr key={i}>
                    {v.map((item, idx) => (
                      <td
                        key={idx}
                        className={item}
                        data-value={`${myYear}/${lastMonth}/` + item}
                        onClick={(e) => checkDate(e)}
                        style={
                          Date.parse(`${myYear}/${lastMonth}/` + item) <
                          new Date().setDate(new Date().getDate() - 1)
                            ? {
                                backgroundColor: "#dddddd",
                                cursor: "not-allowed",
                                pointerEvents: "none",
                              }
                            : Date.parse(`${myYear}/${lastMonth}/` + item) ===
                                Date.parse(check[0]) ||
                              Date.parse(`${myYear}/${lastMonth}/` + item) ===
                                Date.parse(check[1])
                            ? { backgroundColor: "#f9b112" }
                            : Date.parse(`${myYear}/${lastMonth}/` + item) >
                                Date.parse(check[0]) &&
                              Date.parse(`${myYear}/${lastMonth}/` + item) <
                                Date.parse(check[1])
                            ? { backgroundColor: "#ffe8b5" }
                            : { backgroundColor: "white" }
                        }
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="ning_datebox">
          <table border="1" className="ning_table">
            <thead id="title">
              <tr className="ning_tr">
                {weekDayList.map(function (v, i) {
                  return (
                    <th key={i} value={i}>
                      {v}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody id="data" className="ning_tbody">
              {daysDisplayArray.map((v, i) => {
                return (
                  <tr key={i}>
                    {v.map((item, idx) => (
                      <td
                        key={idx}
                        className={item}
                        data-value={`${myYear}/${myMonth}/` + item}
                        onClick={(e) => checkDate(e)}
                        style={
                          Date.parse(`${myYear}/${myMonth}/` + item) <
                          new Date().setDate(new Date().getDate() - 1)
                            ? {
                                backgroundColor: "#dddddd",
                                cursor: "not-allowed",
                                pointerEvents: "none",
                              }
                            : Date.parse(`${myYear}/${myMonth}/` + item) ===
                                Date.parse(check[0]) ||
                              Date.parse(`${myYear}/${myMonth}/` + item) ===
                                Date.parse(check[1])
                            ? { backgroundColor: "#f9b112" }
                            : Date.parse(`${myYear}/${myMonth}/` + item) >
                                Date.parse(check[0]) &&
                              Date.parse(`${myYear}/${myMonth}/` + item) <
                                Date.parse(check[1])
                            ? { backgroundColor: "#ffe8b5" }
                            : { backgroundColor: "white" }
                        }
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MyDate;
