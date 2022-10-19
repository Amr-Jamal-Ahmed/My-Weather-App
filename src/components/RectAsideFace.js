import React,{useState,useEffect,useContext} from "react";
import {countriesWeatherCtx} from "../context/CountriesWeatherCtx";
function rotateRectTo0Deg(e) {
    e.stopPropagation();
  
    // const id = e.currentTarget.dataset.target;
    document.getElementById(`rectangle`).classList.add("rotateY-0-deg");
    document.getElementById(`rectangle`).classList.remove("rotateY-minus-90-deg");
}

function handleAddBtnOnClick(e,{active,setActive},countriesWeatherCtx,data,setError) {
    e.stopPropagation();
    if(!e.currentTarget.classList.contains("active")){
        if(data){
            // setError(false);
            setActive(true);
            countriesWeatherCtx.addNewItem(data);
            countriesWeatherCtx.updateBroadCast({addNewCard:true});
        }else{
            setError(true);
        }
    }
}

const RectAsideFace = ({fetcedData})=> {
    const countriesWeather = useContext(countriesWeatherCtx); 
    // console.log("countryWeather",data);
    const data = fetcedData;

    const [active,setActive] = useState(false);
    const [error,setError] = useState(false);
    useEffect(()=>{
        setTimeout(()=> setActive(false),600);
    },[active]);

    return(
        <div className="rectangle-face aside-face">
            <div className="wrapper position-relative pt-3 px-3">
                <button onClick={rotateRectTo0Deg} type="button" className="arrow left-arrow primary-color" data-target="rectangle">
                  <i className="fa-solid fa-angles-left"></i>
                </button>
                <div className="entry">
                    <h2 id="title" className="title fs-4 my-3 text-capitalize">{data? "Last Recent Entry" : "There Is No Entry Yet"}</h2>
                    <div id="entry-holder" className="entry-holder w-100 d-flex flex-column gap-2">
                        <div id="date" className={`date pb-2 ms-auto d-flex align-items-center gap-2 ${data?'':'empty'}`}>
                            <i className="fa-solid fa-calendar-days"></i>
                            <span className="text-content">{data?.date}</span>
                        </div>
                        <h5 id="countryName" className="country-name pb-2 m-0 me-auto text-capitalize" name="countryName">{data?.countryName}</h5>
                        <div className={`desc-holder w-100 d-flex align-items-center justify-content-between gap-2 ${data?'':'empty'}`}>
                            <span className={`weather-icon ${data?'':'empty'}`}>
                                <img className="" src={`http://openweathermap.org/img/w/${data?.icon}.png`} alt="sorry,we couldnot find it" />
                            </span>
                            <div id="content" className="content">
                                <span className="text-content fs-5">{data?.desc}</span>
                            </div>
                        </div>
                        <div className={`w-100 d-flex flex-column align-items-center justify-content-between gap-1 ${data?'':'empty'}`}>
                            <label htmlFor="tempHolder" className="w-100 text-start">Temprature</label>
                            <div id="tempHolder" className="temp-holder w-100 ps-2 pb-2 d-flex justify-content-between align-items-center">
                                <div id="minTemp" className="temp min-temp d-flex flex-column align-items-center">
                                    <span className="temp-title">minor</span>
                                    <span className="text-content">{data?.temp?.minor}</span>
                                    <span className="icon deg-icon"><sup>o</sup>c</span>
                                </div>
                                <div id="temp" className="temp d-flex flex-column align-items-center">
                                    <span className="temp-title">actual</span>
                                    <span className="text-content">{data?.temp?.actual}</span>
                                    <span className="icon deg-icon"><sup>o</sup>c</span>
                                </div>
                                <div id="maxTemp" className="temp max-temp d-flex flex-column align-items-center">
                                    <span className="temp-title">great</span>
                                    <span className="text-content">{data?.temp?.great}</span>
                                    <span className="icon deg-icon"><sup>o</sup>c</span>
                                </div>
                            </div>
                        </div>
                        <div className={`w-100 d-flex align-items-center justify-content-between gap-5 ${data?'':'empty'}`}>
                            <div className="w-25 h-100 d-inline-flex flex-column align-items-center justify-content-between gap-1">
                                <label htmlFor="tempHolder" className="w-100 text-start">humidity</label>
                                <div id="humidity" className="temp-holder w-100 ps-2 pb-2">
                                    <span className="text-content">{data?.humidity}</span>
                                </div>
                            </div>
                            <div className="w-75 d-flex flex-column align-items-center justify-content-between gap-1">
                                <label htmlFor="tempHolder" className="w-100 text-start">Wind</label>
                                <div id="wind" className="temp-holder w-100 ps-2 pb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                        <span className="text-content">{data?.wind?.speed}</span>
                                        <span className="icon">km/h</span>
                                    </div>
                                    <div>
                                        <span className="text-content">{data?.wind?.deg}</span>
                                        <span className="icon">deg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={(e)=> handleAddBtnOnClick(e,{active,setActive},countriesWeather,data,setError)} type="button" className={`add position-absolute top-0 end-0 px-3 fs-5 overflow-hidden d-flex align-items-center justify-content-center ${active?"active":""} ${(error && !data)?"error":""}`}>
                    <span className={`overflow-hidden mx-auto fs-6 text-capitalize text-nowrap`}>{(error && !data)?"not found entry to add":"add to weather monitor"}</span>
                    <div className="d-flex align-items-center justify-content-center position-relative fs-5 ms-2">
                        <i className={`fa-solid fa-check position-absolute ${active?"show":"rotateZ-hide"}`}></i>
                        <i className={`fa-solid fa-plus position-absolute ${active?"rotateZ-hide":"show"}`}></i>
                    </div>
                </button>
            </div>
        </div>
    );
};
export default RectAsideFace;