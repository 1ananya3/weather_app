import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const onCityChange = (e) => {
    // console.log("city", e.target.value);
    setCity(e.target.value);
  };
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getWeather?city=${city}`);
      setWeather(response.data);
      // console.log("response data", response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);
  return (
    <div className="col-md-12 justify-content-center d-flex mt-5">
      <div className="col-md-4 border border-dark rounded">
        {/* header */}
        
          <div>
            <div className="col-md-12 d-flex bg-info fw-semibold text-primary-emphasis justify-content-center align-items-center rounded">
             {weather && weather.name} Weather
            </div>
            {/* body */}
            <div className="col-md-11 my-3 ms-4 form-floating d-flex justify-content-center">
              <input
                type="city"
                className="form-control"
                id="floatingInput"
                placeholder="Search City"
                value={city}
                onChange={onCityChange}
              />
              <label htmlFor="floatingInput">Search City</label>
            </div>
            {weather ? (
            <div className="col-md-12 mx-4">
              <div className="row">
                <div className="col-md-4">
                  <div className="fw-semibold">Description</div>
                  <span>{weather.weather[0].description}</span>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="fw-semibold">Temp</div>
                      <span>{weather.main.temp}</span>
                    </div>
                    <div className="col-md-6">
                      <div className="fw-semibold">Feels Like</div>
                      <span>{weather.main.feels_like}</span>
                    </div>
                    <div className="col-md-6">
                      <div className="fw-semibold">pressure</div>
                      <span>{weather.main.pressure}</span>
                    </div>
                    <div className="col-md-6">
                      <div className="fw-semibold">humidity</div>
                      <span>{weather.main.humidity}</span>
                    </div>
                    <div className="col-md-6">
                      <div className="fw-semibold">visibility</div>
                      <span>{weather.visibility}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="fw-semibold">wind</div>
                    <div className="row">
                    <div className="col-md-3">
                      <div className="fw-semibold">deg</div>
                      <span>{weather.wind.deg}</span>
                    </div>
                    <div className="col-md-3">
                      <div className="fw-semibold">speed</div>
                      <span>{weather.wind.speed}</span>
                    </div>
                      </div> 
                  </div>
                </div>
              </div>
            </div>
          
        ) : (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
