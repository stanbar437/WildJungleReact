import React, { useState, useEffect, useMemo } from "react";
import { ReactComponent as DaySun } from "../images/weather_icon/sun-solid.svg";
import { ReactComponent as DayBolt } from "../images/weather_icon/bolt-solid.svg";
import { ReactComponent as RainBolt } from "../images/weather_icon/thunderstorm.svg";
import { ReactComponent as Cloud } from "../images/weather_icon/cloud-solid.svg";
import { ReactComponent as NightRain } from "../images/weather_icon/thunderstorm.svg";
import { ReactComponent as NightCloud } from "../images/weather_icon/cloud-solid.svg";
import { ReactComponent as NightSun } from "../images/weather_icon/sun-solid.svg";
import { ReactComponent as DayRain } from "../images/weather_icon/cloud-showers-heavy-solid.svg";
import { ReactComponent as DaySunRain } from "../images/weather_icon/cloud-sun-rain-solid.svg";
import { ReactComponent as DaySunCloud } from "../images/weather_icon/cloud-sun-solid.svg";

//設置天氣代碼對應天氣型態

const weatherTypes = {
  isSun: [1],
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isCloudySun: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isSunRain: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
};

const weatherIcons = {
  day: {
    isSun: <DaySun />,
    isThunderstorm: <RainBolt />,
    isCloudySun: <DaySunCloud />,
    isCloudy: <Cloud />,
    isSunRain: <DayRain />,
  },
  night: {
    isSun: <NightSun />,
    isThunderstorm: <RainBolt />,
    isCloudySun: <NightCloud />,
    isCloudy: <Cloud />,
    isSunRain: <NightRain />,
  },
};

// STEP 2：把 weatherCode2Type 函式搬到組件外
const weatherCode2Type = weatherCode =>
  Object.entries(weatherTypes).reduce(
    (currentWeatherType, [weatherType, weatherCodes]) =>
      weatherCodes.includes(Number(weatherCode))
        ? weatherType
        : currentWeatherType,
    '',
  );

const HomeWeatherIcon = ({ currentWeatherCode, moment }) => {
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState('isClear');

    // STEP 3：透過 useMemo 保存計算結果，記得要在 dependencies 中放入 currentWeatherCode
    const theWeatherIcon = useMemo(() => weatherCode2Type(currentWeatherCode), [
      currentWeatherCode,
    ]);
  
    // STEP 4：在 useEffect 中去改變 currentWeatherIcon
    useEffect(() => {
      setCurrentWeatherIcon(theWeatherIcon);
    }, [theWeatherIcon]);
  return (
    <>
      <div className="ning_weathericon">
        <span className="material-icons weathericon">{weatherIcons[moment][currentWeatherIcon]}</span>
      </div>
    </>
  );
};

export default HomeWeatherIcon;
