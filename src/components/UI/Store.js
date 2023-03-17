import React from "react";
import Gondola from "./Gondola";
import Card from '../../UI/Card';
import './Store.css';
const Store = (props) => {
    console.log("gondolas = ",props.gondolas)
    var firstFacingInStore = props.gondolas[0][0][0]
    var storeName = firstFacingInStore.storeName
    var storeAddress = firstFacingInStore.storeAddress
    var storeCity = firstFacingInStore.storeCity
    var storeState = firstFacingInStore.storeState
    var storeZipcode = firstFacingInStore.storeZipcode
    
    return (
        
        <div>
            <Card className='Store'>
                <h2>
                    Store:{" "}{storeName}{" "}Location:{" "}{storeAddress}{" "}
                    {storeCity}{" "}{storeState}{" "}{storeZipcode} 
                </h2>
                
                <div style={{height:'50vw', overflow:'auto'}}>
                    {props.gondolas && props.gondolas.map((gondola,index) => (
                            <Gondola
                                key={index}
                                gondola={gondola}
                            />
                        ))
                    }
                </div>

            </Card>
        </div>
    );
};
export default Store;

