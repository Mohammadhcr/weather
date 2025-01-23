import React, { useState } from 'react';

import styles from "./styles/App.module.scss"

const App = () => {

  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const APIKey = "694c95ca28936aae8758e202139f4d9e"
  const BASE_URL = "https://api.openweathermap.org/data/2.5"
  const finalURL = `${BASE_URL}/weather?q=${city}&appid=${APIKey}&units=metric`

  const getAPI = async () => {
      setIsLoading(true)
      const response = await fetch(finalURL)
      const data = await response.json()
      setIsLoading(false)
      setWeatherData(data)
      setCity("")
  }

  const date = new Date();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const {container, searchBar, info, desc, temp, names, enterName, title, general, details, minTemp, maxTemp, dateAndTime} = styles

  return (
    <div className={container}>
      <div className={title}>
        <h1>Weather Mini App</h1>
      </div>
      <div className={searchBar}>
        <input type="text" placeholder='Search...' value={city} onChange={e => setCity(e.target.value)} onKeyDown={event => event.key === "Enter" && getAPI()} />
        <button onClick={getAPI}>GET</button>
      </div>
      { isLoading ? (<p className={enterName}>Searching...</p>) :
        weatherData.cod === "404" ?
        (<p className={enterName}>City not found!</p>) :
          ( <>{weatherData.sys ? (<div className={info}>
              <div className={general}>
                <h2 className={names}>{weatherData.name}, {weatherData.sys.country}</h2>
                <h2 className={temp}>{Math.round(weatherData.main.temp)}°c</h2>
                <h2 className={desc}>{weatherData.weather[0].description.toUpperCase()}</h2>
              </div>
              <div className={details}>
                <h3><i className='bx bxs-thermometer'></i>{Math.round(weatherData.main.feels_like)}</h3>
                <h3><span className={minTemp}><i className='bx bx-down-arrow-alt'></i>{Math.round(weatherData.main.temp_min)}°c</span> | <span className={maxTemp}>{Math.round(weatherData.main.temp_max)}°c<i className='bx bx-up-arrow-alt'></i></span></h3>
                <h3><i className='bx bx-wind'></i> {Math.round(weatherData.wind.speed)} KMph</h3>
              </div>
              <div className={dateAndTime}>
                <h3><i className='bx bx-calendar'></i> {monthNames[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h3>
                <h3><i className='bx bx-time-five'></i> {date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})} </h3>
              </div>
          </div> ) : (<p className={enterName}>Search a City Name</p>)} </> ) }
    </div>
  );
};

export default App;