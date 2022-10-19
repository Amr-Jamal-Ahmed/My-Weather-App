import React, { useState } from "react";
import RectFrontFace from "./RectFrontFace";
import RectAsideFace from "./RectAsideFace";
import LastActiveEleCtx from "./LastActiveEleCtx";

const Rect = ()=> {
    const [fetchedData,setFetchedData] = useState();
    return(
        <div id="rectangle" className="rectangle d-flex align-items-center h-100 w-100 rotateY-0-deg">
            <LastActiveEleCtx>
                <RectFrontFace setFetchedData={setFetchedData}/>
            </LastActiveEleCtx>
            <RectAsideFace fetcedData={fetchedData}/>
        </div>
    );
};
export default Rect;