import React from 'react';
import './Shelf.css'
import Facing from './Facing';
import Card from '../UI/Card';
import ErrorBoundary from '../Containers/ErrorBoundary';
//import ConnectionNotice from '../UI/ConnectionNotice';
import ToggleNotice from '../UI/ToggleNotice';
//import LightingNotice from '../UI/LightingNotice';

const Shelf = (props) => {

  console.log(props);

  return (
    
    <div>
      <Card className='shelf'>

        {/* <ConnectionNotice value={props.shelf[0].shelfIsconnected} />
        <br/>
        <LightingNotice value = {props.shelf[0].shelfIslit} /> */}
        <div className = 'shelfHeader'>
            <span className = "shelfLabel" style={{width:'fit-content'}}>
              Shelf:{props.shelf[0].shelfLevel}
            </span>

            <div className = 'shelfStatus'>    
                           
                <ToggleNotice value = {props.shelf[0].shelfIslit}
                                  valuelist={['Lit','Unlit']} />
                <ToggleNotice value = {true} valuelist={['-','-']} /> 
                <ToggleNotice value={props.shelf[0].shelfIsconnected} 
                              valuelist={['Online','Offline']}/> 
                                                 
            </div>
        </div>
      
      {props.shelf&&props.shelf.map((facing,index) => (
        <ErrorBoundary key={index}>
            <Facing 
              key={index}
              facing = {facing}
              percentage={facing.state}
              productWidth={facing.productWidth}
              productHeight={facing.productHeight}
              productName={facing.productName}
              shelfIsConnected = {props.shelf[0].shelfIsconnected}
              shelfIsLit = {props.shelf[0].shelfIslit}
            />
        </ErrorBoundary>
      ))}
      </Card>
      <Card className='shelfPlate'></Card>
      <Card className='shelfTag'>
            SHELF:{props.shelf[0].shelfLevel   }      
      </Card>
    </div>
    
  );
};
export default Shelf;



