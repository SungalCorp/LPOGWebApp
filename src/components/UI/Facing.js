import React from 'react';
import './Facing.css';
import Tooltip from "../Tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { getPercent } from '../../lib/StyleFunctions';
import { getProductImageStyle } from '../../lib/StyleFunctions';
import { getPercentColor } from '../../lib/StyleFunctions';


const Facing = (props) => {
// console.log(props)
const facing = props.facing 

var prodPercentage = getPercent(facing.state) 

var prodImage = 'https://imgserver.sungalcorp.synology.me/'+facing.productUPC+'.png';

var productImageStyle = getProductImageStyle(facing);
return (

<Tooltip content={facing.productName+"     UPC:"+facing.productUPC}>

      <li className="facing"  >

        <img  
            className="facing_img" 
            src={prodImage} 
            alt = 'ProductImg'
            style={productImageStyle}
            onError={(e) =>
                {
                  e.target.src =
                   "https://imgserver.sungalcorp.synology.me/blackbox.png";
                  e.target.style = {width: '.1vw', height: '.1vw'};
                 
                }
            }
        />

        <div className="percentage-tag" style={{backgroundColor: getPercentColor(prodPercentage)}}>
          {prodPercentage}
        </div>

      </li>

  </Tooltip>
  

);
};
export default Facing;