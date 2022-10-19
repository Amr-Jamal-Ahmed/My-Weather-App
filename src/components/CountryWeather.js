import React, { useContext } from "react";
import {Link, useParams} from "react-router-dom"
import {countriesWeatherCtx} from "../context/CountriesWeatherCtx";
import Time from "./Time";
const CountryWeather = ({weather,newCardClass})=> {
    const countriesWeather = useContext(countriesWeatherCtx);
    const handleDelBtnOnClick = (e,countriesWeather,weather)=>{
        e.stopPropagation();
        countriesWeather.updateBroadCast({delCard:{countryName:weather.countryName}});
        // countriesWeather.delete(weather.countryName);
    }
    // console.log("paramparam",params);
    return(
        <div className={`card-box col-12 w-100 mx-auto position-relative ${newCardClass}`}>
            <div className="card w-100 p-2 position-relative">
                <div className="w-100 d-flex align-items-center justify-content-end gap-2">
                    <div className="date fs-6 d-flex align-items-center gap-2 mb-2">
                        <i className="fa-solid fa-calendar-days secondry-color"></i>
                        <span className="text-content">{weather?.date}</span>
                    </div>
                    <button onClick={(e)=> handleDelBtnOnClick(e,countriesWeather,weather)} className="del-card fs-5 d-flex align-items-center justify-content-center">
                        {/* <Link to="login"> */}
                        <i className="fa-solid fa-trash-arrow-up secondry-color"></i>
                        {/* </Link> */}
                    </button>
                </div>
                <h3 className="card-title fs-4 m-0">{weather?.countryName}</h3>
                <div className="card-body fs-6 pt-2 ps-3 pe-2 pb-3 d-flex flex-column gap-2">
                    <div id="card-desc" className="desc d-flex flex-wrap align-items-center justify-content-between">
                        <span className={`icon ${weather?'':'empty'}`}>
                            <img className="" src={`http://openweathermap.org/img/w/${weather?.icon}.png`} alt="sorry,we couldnot find it" />
                        </span>
                        <span className="text-content ms-2 fs-5">{weather?.desc}</span>
                    </div>
                    <div className="temp-holder">
                        <span className="sup-title card-temp fs-5 text-capitalize">temp</span>
                        <div className="temp ps-2 py-2 d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex flex-column align-items-center">
                                <span>minor</span>
                                <div>
                                    <span className="num">{weather?.temp?.minor}</span>
                                    <span className="icon deg-icon fs-6 secondry-color"><sup>o</sup>c</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <span>actual</span>
                                <div>
                                    <span className="num">{weather?.temp?.actual}</span>
                                    <span className="icon deg-icon fs-6 secondry-color"><sup>o</sup>c</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <span>great</span>
                                <div>
                                    <span className="num">{weather?.temp?.great}</span>
                                    <span className="icon deg-icon fs-6 secondry-color"><sup>o</sup>c</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center align-items-lg-start justify-content-between gap-3">
                        <div className="humidity d-flex flex-column gap-1 w-50">
                            <span className="sup-title fs-5 w-100 text-capitalize">humidity</span>
                            <span className="text-content ps-2 py-2 num fs-6">
                                {weather?.humidity}
                                <span className="icon fs-6 secondry-color">%</span>
                            </span>
                        </div>
                        <div className="wind w-100 d-flex flex-column gap-1">
                            <span className="sup-title w-100 fs-5 text-capitalize">wind</span>
                            <div className="w-100 ps-2 py-2 d-flex align-items-center justify-content-between gap-2">
                                <div className="d-flex flex-lg-column align-items-center fs-6">
                                    <span className=" num">{weather?.wind?.speed}</span>
                                    <span className="icon secondry-color">km/h</span>
                                </div>
                                <div className="d-flex flex-lg-column align-items-center fs-6">
                                    <span className=" num">{weather?.wind?.deg}</span>
                                    <span className="icon secondry-color">deg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryWeather;