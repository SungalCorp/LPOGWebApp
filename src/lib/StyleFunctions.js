const imageScalerShelfWidth = 1;


export const getPercent = (stateVal) => {
    try {
      let valStr = (stateVal + '-').split('-')[0];
      return (
        Math.round((valStr.split('1').length - 1 / valStr.length) * 10) + '%'
      );
    } catch (err) {
      return ('NA');
    }
  };

export const getPercentColor = (percent) => {
    //alert("percent="+percent)
    percent = percent.replace(/%/g, '');
    let red = '#ff0000';
    let orange = '#ff9900';
    let yellow = '#fdfa06';
    let white = '#ffffff';
    let green = '#00ff00';
    let purple = '#ff00ff';
  
    if (isNaN(percent) || percent > 90){
      
      return white;
    } 
    
    if (percent > 80) {
      
      return purple;
    }
  
    if (percent > 60) {
      
      return green;
    }
  
    if (percent > 40) {
     
      return yellow;
    }
  
    if (percent > 20) {
      
      return orange;
    }
    
    return red;
  };

export const getPercentStyle = (percent) => {
    let styleObj = { backgroundColor: ''
     };
    //alert(getPercentColor(percent))
    styleObj.backgroundColor = getPercentColor(percent);
    return styleObj;
  };

export const getProductImageStyle = (facing) => {
    let styleObj = { width: '', height: ''}
    styleObj.width = (facing.productWidth * imageScalerShelfWidth)+'vw';
    // styleObj.height = 100*(facing.productHeight/imageScalerShelfHeight)+'%';
    return styleObj;
  }


