import React from 'react';
import './Facing.css';
 
import Tooltip from "../Containers/Tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { getPercent } from '../../lib/StyleFunctions';
import { getProductImageStyle } from '../../lib/StyleFunctions';
import { getBubbleVisibilityStyle } from '../../lib/StyleFunctions';
import { getPercentColor } from '../../lib/StyleFunctions';
import * as globals from '../../lib/Globals.js';

const Facing = (props) => {
// console.log(props)
const facing = props.facing 

var prodPercentage = getPercent(facing.state) 

var prodImage = globals.PRODUCT_IMAGE_URL + facing.productUPC + '.png';

console.log("facing.productHeight=" + facing.productHeight)
var productImageStyle = getProductImageStyle(facing);
var getBubbleStyle = getBubbleVisibilityStyle(facing);
var helpContent = facing.productName + 
                  " SKU: " + (facing.productSKUNumber ? facing.productSKUNumber : "No Entry") + 
                  " UPC: "+facing.productUPC+"-fID="+facing.facingID

const opacitySetting = () => {
                  // we want to make the items on the shelf look disabled when the shelf is disconnected or the lighting is off
                  if (!props.shelfIsConnected || !props.shelfIsLit){
                    return {opacity:.2}  // make items transparent
                  }
                  return {opacity:1}     //shelf is active and operating, full opacity

}
const facingImageStyle = { ...opacitySetting(), ...productImageStyle };
const facingPercentageStyle = {...opacitySetting(), ...getPercentColor(prodPercentage)}

return (

<Tooltip content={helpContent}>

      <li className="facing"  >
        <img 
            className="bubble_condition_img"
            src = {require('../../imgs/bubble.png')}
            style={getBubbleStyle}
            alt='BubbleImage'
            />
        <img  
            className="facing_img"
            style={facingImageStyle} 
            src={prodImage} 
            alt = 'ProductImg'
            //style={productImageStyle}
            onError={(e) =>
              {
                //alert("ERROR ERROR ERROR")
                
                //e.target.style = {width: '.1vw', height: '.1vw'};  //{facingImageStyle} //
                e.target.style.width = facingImageStyle.width
                e.target.style.height = facingImageStyle.height
                e.target.src =
                globals.PRODUCT_IMAGE_URL + "blackbox.png";
                
               
              }
            }
        />

        <div className="percentage-tag" style={facingPercentageStyle}>
          {prodPercentage}
        </div>

      </li>

  </Tooltip>

);
};
export default Facing;