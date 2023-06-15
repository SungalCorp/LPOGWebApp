import React from 'react';

const LightingNotice = ({ value }) => {
    const condition = value ? 'Lit' : 'Notlit';

    const color = value ? 'light green' : 'red';

  const barStyle = {
    marginleft: '1vw',
    color: color,
    float: 'right'
  };
  
    return <div style={barStyle}>{condition}</div>;
  };
  
  export default LightingNotice;
  