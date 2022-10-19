import React, {useContext, useEffect, useState } from "react";
import CountriesWeatherCtx,{countriesWeatherCtx} from "./context/CountriesWeatherCtx";
import Header from "./components/Header";
import WeatherMonitor from "./components/WeatherMonitor";
import WeatherDisplayer from "./components/WeatherDisplayer";
import Modal from "./components/Modal";
import Loading from "./components/Loading";

// import Page404 from "./components/Page404";
const Page404 = (setPage404Error)=>{
    // const [backToHomePage,setBackToHomePage] = useState(false);
    // useEffect(()=>{
    //     if(backToHomePage){
    //         setPage404Error(false);
    //     }
    // },);
    return(
        <div className="w-100 h-100 page-404 d-flex flex-column align-items-center justify-content-center gap-4">
            <h1 className="big-title display-1 fw-bolder text-capitalize primary-color">
                <span>O</span>opps!
            </h1>
            <strong className="text-capitalize fw-bold fs-1">404-page not found</strong>
            <p className="text-capitalize">
                there is no page with this URL
            </p>
            <button onClick={e=> setPage404Error(true)} className="text-capitalize fw-bold fs-5 p-3">
                back to homepage
            </button>
        </div>
    );
};
const App = ()=>{
    const [page404Error,setPage404Error] = useState(!checkIfInHomePage());
    const countriesWeather = useContext(countriesWeatherCtx);

    function checkIfInHomePage(){
        if(window.location.pathname === "/" && !window.location.hash){
            return true;
        }
        return false;
    }

    function renderHomePageContent(){
        // if(!page404Error){
        //     console.log("not 404");
            return(
                <React.Fragment>
                    <Header />
                    <div className="app-body w-100 position-relative d-flex flex-wrap align-items-center justify-content-between">
                        <WeatherMonitor/>
                        <WeatherDisplayer/>
                    </div>
                    <Modal text="are you sure you want delete {countryName} weather card ?"/>
                </React.Fragment>
            );
        // }
    }
    function renderPage404(){
        if(page404Error){
            console.log("404");
            return Page404(setPage404Error);
        } 
    }

    return(
        <React.Fragment>   
            {/* <Loading/> */}
            <div id="app" className="app vh-100 position-relative">
            <div id="app-container" className="container h-100 py-4 d-flex flex-column justify-content-center align-items-center">
                {renderHomePageContent()}
                {/* {renderPage404()} */}
            </div>
            </div>
            {/* {setTimeout(() => {
                 countriesWeather?.updateBroadCast({startLoading:false,endLoading:true})
            }, 0)} */}
        </React.Fragment>
    );
};

export default App;