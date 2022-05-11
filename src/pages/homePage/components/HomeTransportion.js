import React, { useState, useEffect, useRef } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import jsSHA from "jssha";

const demoDataFromServer = [
  {
    lat: 25.03335,
    lng: 121.5439,
    name: "捷運大安站(信義)",
    StopID: "2282",
  },
  {
    lat: 25.0343027,
    lng: 121.5436188,
    name: "捷運大安站(復興)",
    StopID: "6995",
  },
  {
    lat: 25.0333694,
    lng: 121.5421572,
    name: "師大附中",
    StopID: "2281",
  },
  {
    lat: 25.03328,
    lng: 121.54623,
    name: "信義大安路口",
    StopID: "2113",
  },
  {
    lat: 25.03245,
    lng: 121.54345,
    name: "大安高工",
    StopID: "6996",
  },
];

const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const HomeTransportion = () => {
  const [selectValue, setselectValue] = useState(0);
  const [busData, setBusData] = useState([]);
  const [bustimeData, setBustimeData] = useState([]);
  const [busgostopData, setBusgostopData] = useState([]);
  const [busbackstopData, setBusbackstopData] = useState([]);
  const [busgotimeData, setBusgotimeData] = useState([]);
  const [busbacktimeData, setBusbacktimeData] = useState([]);
  const [smallbusname, setSmallbusname] = useState("");
  const [busInfo, setbusInfo] = useState(false);
  // useEffect(() => {
  //   east0_bus();
  // }, []);

  //停車場資訊https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json

  function clickbtn() {
    setbusInfo(!busInfo);
  }

  function Select_stop(StopID) {
    fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/PassThrough/Station/${StopID}?%24format=JSON`,
      {
        type: "GET",
        dataType: "json",
        headers: GetAuthorizationHeader(),
      }
    )
      .then((r) => r.json())
      .then((data) => {
        setBusData(data);
      });

    // https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/${v}?%24format=JSON
  }

  function getBusAllstop(v) {
    console.log("v", v);
    setbusInfo(!busInfo);
    setSmallbusname(v);
    fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/Taipei/${v}?%24format=JSON`,
      {
        type: "GET",
        dataType: "json",
        headers: GetAuthorizationHeader(),
      }
    )
      .then((r) => r.json())
      .then((data) => {
        setBusgostopData(data[0]["Stops"]);
        setBusbackstopData(data[1]["Stops"]);
      });

    fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/${v}?%24format=JSON`,
      {
        type: "GET",
        dataType: "json",
        headers: GetAuthorizationHeader(),
      }
    )
      .then((r) => r.json())
      .then((data) => {
        setBustimeData(data);
        // {key:value}
        const timeDataObj = {};

        for (let i = 0; i < data.length; i++) {
          const key = data[i].Direction + data[i].StopID;
          const value = data[i].EstimateTime;
          timeDataObj[key] = value;
        }

        console.log("timeDataObj", timeDataObj);
        setBusgotimeData(timeDataObj);

        // setBusgotimeData(data.filter((v) => v["Direction"] === 0));
        // setBusbacktimeData(data.filter((v) => v["Direction"] === 1));
      });
  }

  function GetAuthorizationHeader() {
    var AppID = "b9ac9c283de045cc8641b8824169d3a5";
    var AppKey = "UHKIgsSeTXUgt2FAKeKbVxyTGsw";

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + GMTString);
    var HMAC = ShaObj.getHMAC("B64");
    var Authorization =
      'hmac username="' +
      AppID +
      '", algorithm="hmac-sha1", headers="x-date", signature="' +
      HMAC +
      '"';

    return {
      Authorization: Authorization,
      "X-Date": GMTString /*,'Accept-Encoding': 'gzip'*/,
    }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
  }

  const mapRef = useRef();

  function handleFlyTo() {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    map.flyTo(
      [
        demoDataFromServer[selectValue]["lat"],
        demoDataFromServer[selectValue]["lng"],
      ],
      18,
      {
        duration: 0.5,
      }
    );
  }

  useEffect(() => {
    handleFlyTo();
  }, [selectValue]);

  useEffect(() => {
    Select_stop(demoDataFromServer[selectValue].StopID);
  }, [selectValue]);

  // useEffect(() => {
  //   setBusgotimeData(bustimeData.filter((v) => v["Direction"] === 0));
  //   setBusbacktimeData(bustimeData.filter((v) => v["Direction"] === 1));
  // }, [bustimeData]);

  return (
    <>
      <div className="selectBusBox">
        <select
          className="selectBus"
          value={selectValue}
          onChange={(e) => setselectValue(e.target.value)}
        >
          <option value="0">捷運大安站(信義)</option>
          <option value="1">捷運大安站(復興)</option>
          <option value="2">師大附中</option>
          <option value="3">信義大安路口</option>
          <option value="4">大安高工</option>
        </select>
      </div>
      <h3 className="ning_busstopname">
        {demoDataFromServer[selectValue]["name"]}
      </h3>
      <div className="ning_transportionbox">
        <div
          className="ning_busbox"
          style={{ display: busInfo === true && "none" }}
        >
          {busData.map((v, i) => {
            const a =
              v["StopStatus"] === 0
                ? v["EstimateTime"] <= 120
                  ? "將到站"
                  : `${parseInt(v["EstimateTime"] / 60)}<span>分鐘</span>`
                : "未發車";
            return (
              <div className="ning_bus" key={i}>
                <p
                  className="ning_bustime"
                  dangerouslySetInnerHTML={{ __html: a }}
                  style={{
                    color: a === "將到站" && "#f9b112",
                    borderColor: a === "將到站" && "#f9b112",
                  }}
                />
                <p
                  className="ning_busname"
                  onClick={() => getBusAllstop(v["RouteName"]["Zh_tw"])}
                >
                  {v["RouteName"]["Zh_tw"]}
                  <br />
                  <span>{v["Direction"] === 0 ? "去程" : "返程"}</span>
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="ning_smallbusInfo"
          style={{ display: busInfo === false && "none" }}
        >
          <div className="ning_smallbusBox">
            <span className="businfoClose material-icons" onClick={clickbtn}>
              close
            </span>

            <div className="ning_smallbusGo">
              <h3 className="ning_smallbusname">{smallbusname}</h3>
              <h4>去程</h4>
              {busgostopData.map((v, i) => {
                const a = busgotimeData[0 + v.StopID]
                  ? busgotimeData[0 + v.StopID] <= 180
                    ? "將到站"
                    : parseInt(busgotimeData[0 + v.StopID] / 60) + "分鐘"
                  : "未發車";
                return (
                  <React.Fragment key={i}>
                    <div className="ning_smallbusStop">
                      <div
                        className={
                          a==="將到站"
                            ? "pulsing-animation"
                            : "pulsing"
                        }
                      ></div>
                      <p className="ning_smallbusStopname">
                        {v["StopName"]["Zh_tw"]}
                      </p>
                      <p
                        className="ning_smallbusStopTime"
                        dangerouslySetInnerHTML={{ __html: a }}
                        style={{
                    color: a === "將到站" && "#eb5c37",
                    borderColor: a === "將到站" && "#eb5c37",
                  }}
                      >
                        {/* {busgotimeData[0 + v.StopID]
                          ? busgotimeData[0 + v.StopID] <= 120
                            ? "將到站"
                            : parseInt(busgotimeData[0 + v.StopID] / 60) + "分鐘"
                          : "未發車"} */}
                      </p>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="ning_smallbusBack">
              <h3 className="ning_no"></h3>
              <h4>返程</h4>
              {busbackstopData.map((v, i) => {
                const a = busgotimeData[1 + v.StopID]
                  ? busgotimeData[1 + v.StopID] <= 180
                    ? "將到站"
                    : parseInt(busgotimeData[1 + v.StopID] / 60) + "分鐘"
                  : "未發車";
                return (
                  <React.Fragment key={i}>
                    <div className="ning_smallbusStop">
                      <div className={
                          a==="將到站"
                            ? "pulsing-animation"
                            : "pulsing"
                        }></div>
                      <p className="ning_smallbusStopname">
                        {v["StopName"]["Zh_tw"]}
                      </p>
                      <p
                        className="ning_smallbusStopTime"
                        dangerouslySetInnerHTML={{ __html: a }}
                        style={{
                    color: a === "將到站" && "#eb5c37",
                    borderColor: a === "將到站" && "#eb5c37",
                  }}
                      >
                        {/* {busgotimeData[1 + v.StopID]
                          ? busgotimeData[1 + v.StopID] <= 120
                            ? "將到站"
                            : parseInt(busgotimeData[1 + v.StopID] / 60) + "分鐘"
                          : "未發車"} */}
                      </p>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ning_busmap">
          <LeafletMap
            ref={mapRef}
            center={[25.0330456, 121.5436104]}
            zoom={16}
            style={{ height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />

            {demoDataFromServer.map(({ lat, lng, name }, index) => (
              <Marker position={[lat, lng]} icon={customMarker} key={index}>
                <Popup>{name}</Popup>
              </Marker>
            ))}
          </LeafletMap>
        </div>
      </div>
    </>
  );
};

export default HomeTransportion;
