import React ,{useEffect,useState}from "react"
import ReactAnimatedWeather from "react-animated-weather";

function Animation(weather){
    const [props,setProps]=useState(" ");
    
    
      const getData=(val)=>{
        switch (val) {
            case "Haze":
              setProps({ icon: "CLEAR_DAY" });
              break;
            case "Clouds":
                setProps({ icon: "CLOUDY" });
              break;
            case "Rain":
                setProps({ icon: "RAIN" });
              break;
            case "Snow":
                setProps({ icon: "SNOW" });
              break;
            case "Dust":
                setProps({ icon: "WIND" });
              break;
            case "Drizzle":
                setProps({ icon: "SLEET" });
              break;
            case "Fog":
                setProps({ icon: "FOG" });
              break;
            case "Smoke":
            setProps({ icon: "FOG" });
              break;
            case "Tornado":
              setProps({ icon: "WIND" });
              break;
            default:
              setProps({ icon: "CLEAR_DAY" });
          };
        
      }
      useEffect(() => {
        if (typeof weather.main !== "undefined") {
          getData(weather.weather[0].main);
        }
        else{
          <span>
      error 
      </span>
        }
      }, [weather]);
    
      
   
    

     
     const defaults = {
        color: "white",
        size: 112,
        animate: true,
      };

   return (
    <>
    <div className="mb-icon">
              {" "}
              <ReactAnimatedWeather
                icon={props.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
            
            </div>
         
    </>
   )
    };

export default Animation;