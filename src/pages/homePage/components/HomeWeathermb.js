import React, { useState, useEffect } from "react";
import HomeWeatherIcon from "./HomeWeatherIcon";

const HomeWeathermb = () => {
  const [weatherElement, setweatherElement] = useState({
    locationName: "",
    temperature: "",
  });
  useEffect(() => {
    fetchCurrentWeather();
  }, []);

  const fetchCurrentWeather = () => {
    fetch(
        'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-DCFAA10C-7D43-4E6C-A486-B65CECC7024E&locationName=%E5%A4%A7%E5%AE%89%E5%8D%80'
    )
      .then((r) => r.json())
      .then((data) => {
        const locationData = data.records.locations[0].location[0];

        const weatherElements = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (['T'].includes(item.elementName)) {
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
        }));
      });
  };

  return (
    <>
      <div className="ning_weatherbox_mb">
        <div className="ning_weathericon">
        <HomeWeatherIcon 
            currentWeatherCode={weatherElement.weatherCode}
            moment="night"
          />
        </div>
        <p className="ning_weather">{weatherElement.locationName}</p>

        <p className="ning_weatherNumber">
          {Math.round(weatherElement.temperature)}
          <span className="ning_weatherUnit">°C</span>
        </p>
      </div>
    </>
  );
};

export default HomeWeathermb;
