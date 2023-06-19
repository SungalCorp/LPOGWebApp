import * as globals from '../lib/Globals.js';
const imageScalerShelfWidth = 1.1;
const imageScalerShelfHeight = 1.1;

export const getPercent = (stateVal) => {
    try {
      let valStr = (stateVal + '-').split('-')[0];
      return (
        Math.round(((valStr.split('1').length - 1) / valStr.length) * 100) + '%'
      );
    } catch (err) {
      return ('NA');
    }
  };

  // export const getPercentTest = (stateVal) => {
  //   console.log("in PERCENT TEST")
  //   try {
  //     let valStr = (stateVal + '-').split('-')[0];
  //     // console.log("valStr=",valStr)
  //     // console.log("valStr.split('1').length - 1 = ",valStr.split('1').length - 1)
  //     // console.log("valStr.length=",valStr.length)
  //     // console.log("(valStr.split('1').length - 1) / valStr.length=",(valStr.split('1').length - 1) / valStr.length)
  //     // console.log("Math.round((valStr.split('1').length - 1 / valStr.length)=",Math.round((valStr.split('1').length - 1 / valStr.length)))
  //     return (
  //       Math.round((valStr.split('1').length - 1 / valStr.length) * 100) + '%'
  //     );
  //   } catch (err) {
  //     return ('NA');
  //   }
  // };

export const getPercentColor = (percent) => {
    //var retVal = {backgroundColor:'',color:''}
    
    let keyColorsOption = globals.KEY_COLORS_OPTION; //"keycolors3";
    
    percent = percent.replace(/%/g, '');
    let lightRed = '#E5151E'
    let orange = '#ff9900';
    let yellow = '#fdfa06';  
   
    let darkBlue = '#0000CD';
    let white = '#FFFFFF';
    let black = '#000000';
     
    // this is for gradient green to red
    let greenToRed_1 = "#00FF00";
    let greenToRed_2 = "#55AA00";
    let greenToRed_3 = "#AA5500";
    let greenToRed_4 = "#FF0000";

    // this is for gradient green to red
    let blueToRed_1 = "#4472C4";
    let blueToRed_2 = "#ED7D31";
    let blueToRed_3 = "#FFD966";
    let blueToRed_4 = "#C23649";
    
    //let increment = 0x55; 

    let keyColorList = {"keycolors1": [{
                                      "backgroundColor": darkBlue,
                                      "color": white
                                    },
                                    {
                                      "backgroundColor": yellow,
                                      "color": black
                                    },
                                    {
                                      "backgroundColor": orange,
                                      "color": black
                                    },
                                    {
                                      "backgroundColor": lightRed,
                                      "color": white
                                    }
                                  ],
                        "keycolors2": [{
                                      "backgroundColor": greenToRed_1,
                                      "color": white
                                    },
                                    {
                                      "backgroundColor": greenToRed_2,
                                      "color": white
                                    },
                                    {
                                      "backgroundColor": greenToRed_3,
                                      "color": white
                                    },
                                    {
                                      "backgroundColor": greenToRed_4,
                                      "color": white
                                    }
                                    ],
                        "keycolors3": [{
                                      "backgroundColor": blueToRed_1,
                                      "color": white
                                    },
                                    {
                                      "backgroundColor": blueToRed_2,
                                      "color": white
                                    },
                                    {
                                      "backgroundColor": blueToRed_3,
                                      "color": black
                                    },
                                    {
                                      "backgroundColor": blueToRed_4,
                                      "color": white
                                    }
                                  ]
                        }
    
    let getReturnColors = (keyColorsOption,index) => {
      let retVal={}
      retVal.backgroundColor = keyColorList[keyColorsOption][index-1].backgroundColor
      retVal.color = keyColorList[keyColorsOption][index-1].color
      return retVal
    }   

    if (isNaN(percent) || percent > 80){
        return getReturnColors(keyColorsOption, 1);
    } 
    
    if (percent > 50) {
      return getReturnColors(keyColorsOption, 2);
    }
  
    if (percent > 20) {
      return getReturnColors(keyColorsOption, 3);
    }
  
    // this is for 20% and under
    return getReturnColors(keyColorsOption, 4);
  };

export const getPercentStyle = (percent) => {
    // let styleObj = { backgroundColor: ''
    //  };
    // //alert(getPercentColor(percent))
    // styleObj.backgroundColor = getPercentColor(percent);
    return getPercentColor(percent);
  };

export const getProductImageStyle = (facing) => {
    let styleObj = { width: '', height: ''}
    styleObj.width = (facing.productWidth * imageScalerShelfWidth)+'vw';
    styleObj.height = 100*(facing.productHeight/imageScalerShelfHeight)+'%';
    return styleObj;
  }

 export const getBubbleVisibilityStyle = (facing) => {
  let isVisible = 'hidden'
  if (facing.facingDetectedUPC !== globals.DEFAULT_DETECTED_UPC && 
      facing.productUPC !== facing.facingDetectedUPC
    ){
      isVisible = 'visible'
    }
  let styleObj = {visibility:isVisible}
  return styleObj

 } 


