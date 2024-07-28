import React, { useState } from "react";

import {
  convertWindSpeedToKmh,
  formatTimestamp,
  getGmtOffsetString,
  getTimeFromTimestamp,
  weatherData,
} from "../../Api/api";

import "./Home.css";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// Data interface and other related types
interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Data {
  base: string;
  clouds: object;
  cod: number;
  coordinate: { lat: number; lon: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind?: { deg?: number; gust?: number; speed?: number };
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Home: React.FC = () => {
  const [bool, setBool] = useState(false);
  const [name, setName] = useState("");
  const [cityName, setCityName] = useState("");
  const [wData, setWData] = useState<Partial<Data>>({});

  const handleName = (e: InputChangeEvent) => {
    if (e.target.value) {
      setName(e.target.value);
    }
  };

  const handleCLick = () => {
    if (name.length) {
      setBool(true);
    } else {
      window.alert("enter your name and try again");
    }
  };
  const handleSearch = async () => {
    if (cityName.length) {
      try {
        const data: Data = await weatherData(cityName);
        console.log(data);
        if (data) {
          setWData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const windSpeed: number = convertWindSpeedToKmh(wData.wind?.speed ?? 0);
  const currDate: string = formatTimestamp(wData.dt ?? 99);
  const timeZone: string = getGmtOffsetString(wData.timezone ?? 99);
  const sunset: string = getTimeFromTimestamp(wData.sys?.sunrise ?? 99);
  const sunrise: string = getTimeFromTimestamp(wData.sys?.sunset ?? 99);

  console.log(windSpeed, currDate, timeZone);
  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">weatherApp</div>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={handleName}
          className="nameInput"
        />
      </nav>
      <div className="randomText">
        checkout the <nav className="smallTxt">weather</nav>of your city ...
      </div>
      <button className="btn" onClick={handleCLick}>
        {name ? ">click>" : "try for free"}
      </button>
      {bool && (
        <div>
          <div className="effect" id="search">
            <input
              type="text"
              placeholder="enter valid City name"
              onChange={(e) => setCityName(e.target.value)}
              className="cityInput"
            />
            <button className="btn smallbtn" onClick={handleSearch}>
              Click
            </button>
          </div>
          {wData.weather !== undefined && (
            <div className="parent">
              <div className="weather">
                <div>
                  {wData.name},{wData.sys?.country}
                </div>
                <div className="timeZone">{timeZone}</div>
                <div>{currDate}</div>
                <div className="degree">
                  <nav className="numDeg">{wData.main?.temp}</nav>
                  <nav>&deg;c</nav>
                </div>
                <div className="weatherTxt">
                  {wData.weather[0].main}, {wData.weather[0].description}
                </div>
                <div className="temp">
                  ⬆ {wData.main?.temp_max}&deg; | {wData.main?.temp_min}&deg;⬇{" "}
                </div>
                <div className="stats">
                  <div>
                    <div>{wData.main?.feels_like}&deg;c</div>
                    <div>Real Feel</div>
                  </div>
                  <div>|</div>
                  <div>
                    <div>↗ {windSpeed}km/hr</div>
                    <div>wind🎐</div>
                  </div>
                  <div>|</div>
                  <div>
                    <div>{wData.visibility}m</div>
                    <div>visible</div>
                  </div>
                </div>
              </div>
              <div className="details">
                <div className="temp">
                  sunRise {sunrise} | sunSet {sunset}
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  className="weatherIcon"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
/*
{wData.weather && wData.weather.length > 0 && (
            <img
              src={`https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          )}

*/
