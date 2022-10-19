import React, { useContext, useState } from "react";
import { countriesWeatherCtx } from "../context/CountriesWeatherCtx";
const Loading = ()=>{
    const [data,setData] = useState({startLoading:true,endLoading:false});
    const countriesWeather = useContext(countriesWeatherCtx);
    countriesWeather.childrenStates.push({state:data,setState:setData,updateWhen:{"updateBroadCast":true}});
    console.log("in Loading components");
    return(
        <div className={`loading-box vw-100 vh-100 position-fixed fixed-top d-flex align-items-center justify-content-center ${(data?.startLoading && !data?.endLoading)?"start-loading":"end-loading"}`}>
            <button type="button" className="arrow right-arrow primary-color">
                <i className="fa-solid fa-angles-right"></i>
            </button>
        </div>
    );
}
export default Loading;