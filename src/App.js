import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [value, setValue] = useState("");
  const API_key = "d2b84b2890a46da16918b576d28af8c0";

  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_key}&q=${value}`;

  const searchLocation = (event) => {
    if (event.key === "Enter" && value.length > 0) {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setValue("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter country location..."
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="medium">
            <h2>The Country is :</h2>
            <p>{data.sys.country}</p>
          </div>
        )}

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>

            <div className="wind">
              {data.wind.deg ? (
                <p className="bold">{data.wind.deg.toFixed()} DEG</p>
              ) : null}
              <p>Wind Deg</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
