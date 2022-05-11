import React, { useState, useEffect, useRef } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import jsSHA from "jssha";

const demoDataFromServer = [
  {
    lat: 25.0326049,
    lng: 121.5340312,
    name: "大安森林公園地下停車場",
    CarParkID: "056",
  },
  {
    lat: 25.0327172,
    lng: 121.5387954,
    name: "大安高工地下停車場",
    CarParkID: "037",
  },
  {
    lat: 25.0224801,
    lng: 121.5461995,
    name: "附中公園地下停車場",
    CarParkID: "031",
  },
  {
    lat: 25.0296371,
    lng: 121.529425,
    name: "金華公園地下停車場",
    CarParkID: "024",
  },
  {
    lat: 25.0337836,
    lng: 121.5414,
    name: "龍門國中地下停車場",
    CarParkID: "080",
  },
];

const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const HomeTransportionP = () => {
  const [selectValue, setselectValue] = useState(0);
  const [seatData, setSeatData] = useState([]);
  const [PData, setPData] = useState([]);

  // useEffect(() => {
  //   east0_bus();
  // }, []);

  //停車場資訊https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json

  function Select_P(CarParkID) {
    fetch(
      "https://traffic.transportdata.tw/MOTC/v1/Parking/OffStreet/CarPark/City/Taipei?$&$format=JSON"
    )
      .then((r) => r.json())
      .then((data) => {
        // setData(data);
        const ParksData = data.CarParks;
        const ParksElements = ParksData.reduce((neededElements, item) => {
          if ([CarParkID].includes(item.CarParkID)) {
            neededElements[item.CarParkID] = item;
          }
          return neededElements;
        }, {});
        console.log(data);
        setPData(ParksElements[CarParkID]);
      });

    fetch(
      "https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json"
    )
      .then((r) => r.json())
      .then((data) => {
        const SeatsData = data.data.park;
        const SeatsElements = SeatsData.reduce((neededElements, item) => {
          if ([CarParkID].includes(item.id)) {
            neededElements[item.id] = item;
          }
          return neededElements;
        }, {});
        setSeatData(SeatsElements[CarParkID]);
        
      });
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
    Select_P(demoDataFromServer[selectValue].CarParkID);
  }, [selectValue]);

  // useEffect(() => {setPData(Data.filter((v, i) => { return v["CarParks"]["CarParkID"] ===demoDataFromServer[selectValue].CarParkID}))}, []);

  return (
    <>
      <div className="selectBusBox">
        <select
          className="selectBus"
          value={selectValue}
          onChange={(e) => setselectValue(e.target.value)}
        >
          <option value="0">大安森林公園地下停車場</option>
          <option value="1">大安高工地下停車場</option>
          <option value="2">附中公園地下停車場</option>
          <option value="3">金華公園地下停車場</option>
          <option value="4">龍門國中地下停車場</option>
        </select>
      </div>
      <h3 className="ning_busstopname">
        {demoDataFromServer[selectValue]["name"]}
      </h3>
      <div className="ning_transportionbox">
        <div className="ning_Pbox">
          <div className="ning_PTotalBox">
            <p className="ning_PTotal">總汽車位：</p>
            <span>{PData["Description"]}</span>
          </div>
          <div className="ning_PTotalBox">
            <p className="ning_PTotal">尚有汽車位：</p>
            <span className="ning_PAvailablecar">{seatData["availablecar"]}</span>
          </div>
          <div className="ning_PTotalBox">
            <p className="ning_PTotal">地址：</p>
            <span>{PData["Address"]}</span>
          </div>
          <div className="ning_PTotalBox">
            <p className="ning_PTotal">費率：</p>
            <span>{PData["FareDescription"]}</span>
          </div>
          <div className="ning_PTotalBox">
            <p className="ning_PTotal">電話：</p>
            <span>{PData["Telephone"]}</span>
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

export default HomeTransportionP;
