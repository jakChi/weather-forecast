//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
const API = {
  key: "bd6f49096363d24424efceadcdf4add0",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [ searchTxt, setSearchTxt ] = useState("");
  const [ query, setQuery ] = useState("");
  const [ weather, setWeather ] = useState({});

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Monday", "Tuesday", "Wendesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay() - 1];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getUTCFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();

    return `${day} ${date} ${month} ${year} ${hour}:${minute}`;
  }


  const getWeather = (e) => {
    if(e.key === "Enter") {
      setQuery(e.target.value);
      setSearchTxt("");
    }
  }

  const handleChange = (e) => {
    setSearchTxt(e.target.value);
  }


  useEffect(() => {
    fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data)
      })
  }, [query])
 
  return (
    <div className={
      typeof weather.main != "undefined" 
        ? Math.round(weather.main.temp) >= 15 
          ? "App warm" 
          : "App" 
        : "App"
        }>
      <main>
        <div className='search-box'>
          <input 
          type='text'
          className='search-bar'
          value={searchTxt}
          onChange={handleChange}
          onKeyDown={getWeather}
          />
        </div>

        {
          typeof weather.main !== "undefined" ? (
            <div className='success'>
              <div className='location-box'>
                <p className='location'>{weather.name}</p>
                <p className='date'>{dateBuilder(new Date())}</p>
              </div>

              <div className='weather-box'>
                <p className='temp'>{Math.round(weather.main.temp)}C</p>
                <p className='weather'>{weather.weather[0].description}</p>  
              </div>
            </div> 
          ) : (
            <div className='failure'>
              <p>{weather.message}</p>
            </div>
          )
        }
      </main>
    </div>
  );
}

export default App;
