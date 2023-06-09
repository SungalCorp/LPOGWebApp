import React from 'react';

const ToggleNotice = (props) => {
    const condition = props.value ? props.valuelist[0] : props.valuelist[1];
    const color = props.value ? 'green' : 'red';

  const barStyle = {
    marginleft: '1vw',
    color: color,
    float: 'right'
  };
    return <div style={barStyle}>{condition}</div>;
  };
  
  export default ToggleNotice;
  