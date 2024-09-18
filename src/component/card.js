import React ,{useState,useEffect} from "react"
import "./card.css"
import axios from "axios";
import apikey from "./apikey";
import Clock from "react-live-clock";
import dateBuilder from "./clock";
import Main from "./main"
import Animation from "./animation";
import Location from "./location";



function Card(){
    const [searchValue,setSearchValue]=useState("");
    const [error, setError] = useState("");
  const [weather, setWeather] = useState([]);
  const temperatureDataByDate = {};
  const getWeatherinfo = (city) => {
    axios
      .get(
        `${apikey.base}weather?q=${
          city != "[object Object]" ? city :searchValue 
        }&units=metric&APPID=${apikey.key}`
      )
      .then((response) => {
       
        setWeather(response.data);
       const receivedTemperature = response.data.main.temp;
     getDailybasisData(city,receivedTemperature);
        setSearchValue("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");

        setSearchValue("");
        getDailybasisData();
        setError({ message: "Not Found", searchValur: searchValue });
       
      });
  };
  
 const getDailybasisData=(city,receivedTemperature)=>{
  axios
    .get(
      `${apikey.base}forecast?q=${city}&units=metric&exclude=current,minutely,hourly&appid=${apikey.key}`
    )
    .then((response) => {
      if (response.data.list) {
        response.data.list.forEach((day) => {
          const date = day.dt_txt.split(" ")[0];
          const temperature = day.main.temp;
          if (!temperatureDataByDate[date]) {
            temperatureDataByDate[date] = [];
          }
        
          temperatureDataByDate[date].push(temperature);
        });       
     console.log(temperatureDataByDate);
     const averageData = Object.keys(temperatureDataByDate).map(date => {
      const temperatures =temperatureDataByDate[date];
      const max = Math.max(...temperatures);
      const min = Math.min(...temperatures);
      return { date, max,min};
    });
    console.log(averageData);
    let maxMaxValue = -Infinity;
    let minMinValue = Infinity;
    let dateWithMaxMaxValue = '';
    let dateWithMinMinValue='';
   
    for (let i = 1; i < averageData.length; i++) {
      const item = averageData[i];
      if (item.max > maxMaxValue) {
        maxMaxValue = item.max;
        dateWithMaxMaxValue = item.date;
      }
      if (item.min < minMinValue) {
        minMinValue = item.min;
        dateWithMinMinValue = item.date;
      
      }
    }
    
    if (dateWithMaxMaxValue !== '' &&  dateWithMinMinValue !=='') {
      const formattedDateforMax = new Date(dateWithMaxMaxValue);
      const formattedDateforMin = new Date(dateWithMinMinValue);
     const mxvalue=Math.round(maxMaxValue-averageData[0].min);
     const mnvalue=Math.round(averageData[0].max -minMinValue);
      if(mxvalue==0 && mnvalue!=0){
         alert(` --WARNING
         :: Today is the MaxTemp 
         :: On ${dateBuilder(formattedDateforMin)} will be MinTemp ${mnvalue}°c`);
      }
      else if(mnvalue==0 && mxvalue!=0){
       alert(` --WARNING
         :: Today is the MinTemp 
         :: On ${dateBuilder(formattedDateforMax)} will be MaxTemp ${mxvalue}°c`);
      }
      else{
           alert(` --WARNING
         :: On ${dateBuilder(formattedDateforMax)} will be MaxTemp ${mxvalue}°c 
         :: On ${dateBuilder(formattedDateforMin)} will be MinTemp ${mnvalue}°c `);
      }
    } else {
      console.log('No data found');
    }
      } else {
        console.log("No 'list' data in the API response.");
      }
    })
    .catch(function (error) {
      console.log(error);
    });  }
     
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
    getWeatherinfo(searchValue);
    }
  };
  
  

    return(
        <>
            <div className="box-container">
            <div className="box">
            {/* box1 started */}
            <div className="box1">
           <div className="location">
                   <Location currentLocation={getWeatherinfo}  />
                  
                  
           </div>
                <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
              {typeof weather.main !="undefined"?(<p>
                {Math.round(weather.main.temp)}°<span>C</span>
                </p>
               ):(
                <span>
                {error.query} {error.message}
                </span>
               )}
                
         </div>
            
          </div>
               
            
          </div>
                 
            {/* box2 started */}
                 <div className="box2">
                 <div className="icon-container">
                {/* <img className="icon" src={icon}></img>  */}
                <div className="animation">
                  <Animation {...weather}/>
                </div>

                </div>
                
                
                
                 {/* input section */}
                
                 <div className="search-box">  
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e)=>
                setSearchValue(e.target.value)}
                value={searchValue}
                onKeyDown={handleEnter}
        /> 
        <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png" 
              onClick={getWeatherinfo} 

              />
          </div></div>
          {/* list of item  */}
            <Main {...weather}/>
                   </div>
                 </div>
                
                 </div>
              
        </>
    )
}
export default Card;