import React from "react";
import Rect from "./Rect";
const WeatherDisplayer = ()=>{
    
    return(
        <div id="weatherSearcher" className="weather-displayer h-100 overflow-hidden position-md-relative position-absolute end-0 bottom-0">
            {/* rectangle shap  */}
            <Rect/>
        </div>
    );
}
export default WeatherDisplayer;