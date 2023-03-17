import React from "react";
import { getPercentColor } from "./StyleFunctions";

export const colorBarNotice =(percent) => {
    const barStyle = {


        backgroundColor: getPercentColor(percent),
        height: '10vw',
        width: `30vw`
    };
  
    return (


      <div className="percentage-tag-notice" style={barStyle}>
      <span style={{ marginLeft: '100px' }}>{'<20'}%</span>
      </div> 


      // <div style={{ display: 'flex', alignItems: 'center' }}>
      //   <div style={barStyle}></div>
      //   <span style={{ marginLeft: '2vw' }}>{percent}%</span>
      // </div>
    );
  }
  