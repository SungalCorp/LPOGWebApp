import React from 'react';
import './Shelf.css'
import Facing from './Facing';
import Card from '../../UI/Card';
import ErrorBoundary from '../ErrorBoundary';


const Shelf = (props) => {

  console.log(props);
  return (
    <div>
      <Card className='shelf'>
      <p>S:{props.shelf[0].shelfLevel}</p>
      {props.shelf&&props.shelf.map((facing,index) => (
        <ErrorBoundary key={index}>
        <Facing 
          key={index}
          facing = {facing}
          percentage={facing.state}
          productWidth={facing.productWidth}
          productHeight={facing.productHeight}
          productName={facing.productName}
        />
        </ErrorBoundary>
      ))}
      </Card>
    </div>
  );
};
export default Shelf;



