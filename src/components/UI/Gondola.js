import React from 'react';

import Card from '../../UI/Card';
import './Gondola.css'
import Shelf from './Shelf';
// import GondolaFilter from './GondolaFilter';

const Gondola = (props) => {
  var firstFacingInGondola = props.gondola[0][0]
  return (
    <div>
      <Card className='Gondola'  >
      <h3>
        Gondola: {firstFacingInGondola.displayfixtureIDForUser} 
        {' '}
        Location:  {firstFacingInGondola.displayfixtureLocation}
      </h3>
      {/* <h3>Location: {firstFacingInGondola.displayfixtureLocation}</h3> */}

        {/* <GondolaFilter selected={filteredGondola} onChangeFilter={filterChangeHandler} /> */}
        {/* {filteredShelfs[0] && filteredShelfs[0].map((item,index) => ( */}
        {props.gondola && props.gondola.map((shelf,index) => {
        return(
          <div>
            <Shelf
              key={index}
              shelf={shelf}
            />
            <div style={{borderStyle:'double',borderColor:'white',borderWidth:'1vw',width:'70vw',height:'2vw'}}></div>
          </div>
        )
        
        })}

        
      </Card>

    </div>
  );
};
export default Gondola;



