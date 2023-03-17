import React from "react";
import { getPercentColor } from '../../lib/StyleFunctions';
const ColorKey = (props) => {
    return(
        <div className='percentage-notice-section' style={{padding:'.5vw'}}>
                    
                    <div className="percentage-tag-notice" style={{backgroundColor: getPercentColor('10'),marginRight: '2.5vw'}}>
                        <span style={{ marginLeft: '2vw'}}>{'0%-20%'}</span>
                    </div> 
                    <div className="percentage-tag-notice" style={{backgroundColor: getPercentColor('30'), marginRight: '2.5vw'}}>
                        <span style={{ marginLeft: '2vw' }}>{'20%-40%'}</span>
                    </div> 
                    <div className="percentage-tag-notice" style={{backgroundColor: getPercentColor('50'), marginRight: '2.5vw'}}>
                        <span style={{ marginLeft: '2vw' }}>{'40%-60%'}</span>
                    </div> 
                    <div className="percentage-tag-notice" style={{backgroundColor: getPercentColor('70'), marginRight: '2.5vw'}}>
                        <span style={{ marginLeft: '2vw' }}>{'60%-80%'}</span>
                    </div> 
                    <div className="percentage-tag-notice" style={{backgroundColor: getPercentColor('85'), marginRight: '2.5vw'}}>
                        <span style={{ marginLeft: '2vw' }}>{'80%-90%'}</span>
                    </div> 
                    <div className="percentage-tag-notice" style={{backgroundColor: getPercentColor('99'), marginRight: '2.5vw'}}>
                        <span style={{ marginLeft: '2vw' }}>{'90%-100%'}</span>
                    </div> 
                    
        </div>
    );
}
export default ColorKey;
