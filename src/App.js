import React, { useState } from 'react';

import styles from "./styles/App.module.scss"

const App = () => {

  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")

  const APIKey = "694c95ca28936aae8758e202139f4d9e"
  const BASE_URL = "https://api.openweathermap.org/data/2.5"
  const finalURL = `${BASE_URL}/weather?q=${city}&appid=${APIKey}&units=metric`

  const getAPI = () => {
      fetch(finalURL)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      setCity("")
      }

    const date = new Date();

  const {container, searchBar, info, desc, temp, names, enterName, title, general, details, minTemp, maxTemp, dateAndTime} = styles

  return (
    <div className={container}>
      <div className={title}>
        <h1>Weather</h1>
      </div>
      <div className={searchBar}>
        <input type="text" placeholder='Search...' value={city} onChange={e => setCity(e.target.value)} />
        <button onClick={getAPI}>GET</button>
      </div>
      {weatherData.cod === "404" ?
        (<p className={enterName}>City not found!</p>) :
          ( <>{weatherData.sys ? (<div className={info}>
              <div className={general}>
                <h2 className={names}>{weatherData.name}, {weatherData.sys.country}</h2>
                <h2 className={temp}>{Math.round(weatherData.main.temp)}°c</h2>
                <h2 className={desc}>{weatherData.weather[0].description.toUpperCase()}</h2>
              </div>
              <div className={details}>
                <h3><i class='bx bxs-thermometer'></i> {Math.round(weatherData.main.feels_like)}</h3>
                <h3><span className={minTemp}><i class='bx bx-down-arrow-alt'></i>{Math.round(weatherData.main.temp_min)}°c</span> | <span className={maxTemp}>{Math.round(weatherData.main.temp_max)}°c<i class='bx bx-up-arrow-alt'></i></span></h3>
                <h3><i className='bx bx-wind'></i> {Math.round(weatherData.wind.speed)} KMph</h3>
              </div>
              <div className={dateAndTime}>
                <h3><i class='bx bx-calendar'></i> {date.getMonth()}/{date.getDate()}/{date.getFullYear()}</h3>
                <h3><i class='bx bx-time-five'></i> {date.getHours()}:{date.getMinutes()}</h3>
              </div>
          </div> ) : (<p className={enterName}>Enter a city name</p>) } </> ) }
    </div>
  );
};

export default App;