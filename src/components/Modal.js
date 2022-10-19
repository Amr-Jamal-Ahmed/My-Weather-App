import React, { useContext,useEffect,useState } from "react";
import { countriesWeatherCtx } from "../context/CountriesWeatherCtx";
const Modal = ({text})=>{
    const countriesWeather = useContext(countriesWeatherCtx);
    const [active,setActive] = useState(false);
    const [data,setData] = useState(null);
    const handleDelBtnOnClick = (e,setActive)=>{
        e.stopPropagation();
        console.log("keyName",data.delCard.countryName);
        countriesWeather.deleteItemByKeyName(data.delCard.countryName);
        setTimeout(e => setActive(false),0);
    };
    useEffect(()=>{
        countriesWeather.childrenStates.push({state:data,setState:setData,updateWhen:{"updateBroadCast":true}});
    },);
    useEffect(()=>{
        if(data?.delCard){
            // console.log("modalUpdate",data?.delCard);
            setActive(true);      
        }
    },[data]);

    return(
        <div id="modal" onFocus={e => setActive(false)} tabIndex="0" className={`modal position-fixed top-0 start-0 vw-100 vh-100 d-flex align-items-center justify-content-center ${active?"active":""}`}>
            <div onFocus={function(e){if(e.target === e.currentTarget)e.stopPropagation();}} tabIndex="0" className="confirm-message container h-100 d-flex flex-wrap align-items-center justify-content-center align-content-center gap-4 p-3">
                <div className="w-100 text-center fs-4 fw-bold">{(data)?text.replace("{countryName}",data?.delCard?.countryName):""}</div>
                <button onFocus={e=>e.stopPropagation()} onClick={e=>handleDelBtnOnClick(e,setActive)} id="delBtn" className="d-flex align-items-center justify-content-center text-capitalize">delete</button>
                <button onFocus={e=>e.stopPropagation()} onClick={e=> setTimeout(e => setActive(false),300)} id="backBtn" className="d-flex align-items-center justify-content-center text-capitalize">back</button>
            </div>
        </div>
    );
};
export default Modal;