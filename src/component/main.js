import React,{useEffect,useState} from "react"
function Main(weather){
    return(
        <>
            <ul> {typeof weather.main != "undefined" ? (
            <div className="inputfile">
              {" "}
              <li className="cityHead">
                <p>
                {weather.name}, {weather.sys.country}
               
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
              <div className="temp-icon">
                  <h>°c</h>
                </div>
               Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
              <div className="humidity-icon">
                  <i className={"wi wi-humidity"}></i>
                </div>
                Humidity{" "}
                
                
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              
              <li>
              <div className="visi-icon">
                  <i className={"wi wi-fog"}></i>
                </div>
              
                Visibility{" "}
                
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
              <div className="wind-icon">
                  <i className={"wi wi-strong-wind"}></i>
                </div>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
            ) : (
            <li>
              Data not found
            </li>
          )} 
        </ul>
        </>
    )
}

export default Main;