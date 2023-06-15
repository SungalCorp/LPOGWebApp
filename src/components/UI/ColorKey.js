import React from "react";
import { getPercentColor } from '../../lib/StyleFunctions';
import './ColorKey.css';

const ColorKey = (props) => {
    return(
        <div className='colorkeySection'>
                     <div className="colorkeyItem">
                        <div className="colorkey" style={{backgroundColor: getPercentColor('10').backgroundColor}}/> 
                        <span >{'0%-20%'}</span>
                    </div>
                
                    <div className="colorkeyItem">
                        <div className="colorkey" style={{backgroundColor: getPercentColor('30').backgroundColor}}/>
                        <span>{'21%-50%'}</span>
                    </div>

                    <div className="colorkeyItem">
                        <div className="colorkey" style={{backgroundColor: getPercentColor('60').backgroundColor}}/>
                        <span>{'51%-80%'}</span>
                    </div>

                    <div className="colorkeyItem">
                        <div className="colorkey" style={{backgroundColor: getPercentColor('90').backgroundColor}}/>
                        <span>{'81%-100%'}</span>
                    </div> 
                    
                    <div className="colorkeyItem">
                        <img 
                            className="colorkey"
                            src = {require('../../imgs/bubble.png')}
                            style={{visibility:true}}
                            alt='BubbleImage'
                        />
                        <span>{'Product Misplacement/Gap'}</span>
                    </div>
        

                    {/* <div className="colorkeyItem">
                        <div className="colorkey" style={{backgroundColor: getPercentColor('85').backgroundColor}}/>
                        <span>{'81%-90%'}</span>
                    </div>

                    <div className="colorkeyItem">
                        <div className="colorkey" style={{backgroundColor: getPercentColor('99').backgroundColor}}/>
                        <span>{'91%-100%'}</span>
                    </div> */}
        </div>
    );
}
export default ColorKey;
