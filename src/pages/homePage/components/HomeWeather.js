import React, { useState, useEffect } from "react";
import HomeWeatherIcon from "./HomeWeatherIcon";



const HomeWeather = () => {
  const [weatherElement, setweatherElement] = useState({
    locationName: "",
    temperature: "",
    weatherCode:0,
  });
  useEffect(() => {
    fetchCurrentWeather();
  }, []);


  const fetchCurrentWeather = () => {
    fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-DCFAA10C-7D43-4E6C-A486-B65CECC7024E&locationName=%E5%A4%A7%E5%AE%89%E5%8D%80"
    )
      .then((r) => r.json())
      .then((data) => {
        const locationData = data.records.locations[0].location[0];
        

        const weatherElements = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (["T","Wx"].includes(item.elementName)) {
              neededElements[item.elementName] = item.time[0];
            }
            return neededElements;
          },
          {}
        );
        setweatherElement((prevState) => ({
          ...prevState,
          locationName: locationData.locationName,
          temperature: weatherElements.T.elementValue[0].value,
          weatherCode: weatherElements.Wx.elementValue[1].value
        }));
      });
  };

  return (
    <>
      <div className="ning_weatherbox">
        <div className="ning_weatherboxIcon">
          <HomeWeatherIcon 
            currentWeatherCode={weatherElement.weatherCode}
            moment="night"
          />
          <p className="ning_weather">{weatherElement.locationName}</p>
        </div>
        <div className="ning_weatherCout">
          <div className="ning_weatherNumber">{weatherElement.temperature}</div>
          <p className="ning_weatherUnit">°C</p>
        </div>
      </div>
    </>
  );
};

export default HomeWeather;
