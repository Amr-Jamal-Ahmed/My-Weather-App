import React, { useEffect, useState } from "react";

const Page404 = ({setPage404Error})=>{
    const [backToHomePage,setBackToHomePage] = useState(false);
    useEffect(()=>{
        if(backToHomePage){
            setPage404Error(false);
        }
    },);
    return(
        <div className="vw-100 vh-100 p-3 page-404 vh-100 d-flex flex-column align-items-center justify-content-center gap-4">
            <h1 className="big-title display-1 fw-bolder text-capitalize primary-color">
                <span>O</span>opps!
            </h1>
            <strong className="text-capitalize fw-bold fs-1">404-page not found</strong>
            <p className="text-capitalize">
                there is no page with this URL
            </p>
            <button onClick={e=> setBackToHomePage(true)} className="text-capitalize fw-bold fs-5 p-3">
                back to homepage
            </button>
        </div>
    );
};
export default Page404;