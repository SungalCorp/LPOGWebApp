import React from 'react';
//import ConnectionNotice from '../UI/ConnectionNotice';
import Card from '../UI/Card';
import './Gondola.css';
import Shelf from './Shelf';

const Gondola = (props) => {
  var firstFacingInGondola = props.gondola[0][0];
  return (
    <div>
      <Card className='Gondola'>
        <h3>
          Gondola: {firstFacingInGondola.displayfixtureIDForUser}
          {' '}
          Location: {firstFacingInGondola.displayfixtureLocation}
        </h3>

        {props.gondola && props.gondola.map((shelf, index) => {
          return (
            <div key={index}>
              <Shelf shelf={shelf} />
            </div>
          );
        })}
     
      </Card>
    </div>
  );
};

export default Gondola;
