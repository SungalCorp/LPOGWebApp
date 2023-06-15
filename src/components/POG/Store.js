import React, {useState} from "react";
import Gondola from "./Gondola";
import Card from '../UI/Card';
import './Store.css';


const Store = (props) => {

  

    const gondolas = props.gondolas;

    var firstFacingInStore = props.gondolas[0][0][0]
    var storeName = firstFacingInStore.storeName
    var storeAddress = firstFacingInStore.storeAddress
    var storeCity = firstFacingInStore.storeCity
    var storeState = firstFacingInStore.storeState
    var storeZipcode = firstFacingInStore.storeZipcode
    
    return (
        
        <div>
            <Card className='Store'>
                <div style={{display: "flex"}}>
                    <h2 style={{width: "50vw"}}>
                        Store:{" "}{storeName}{" "}Location:{" "}{storeAddress}{" "}
                        {storeCity}{" "}{storeState}{" "}{storeZipcode} 
                    </h2>
                
                </div>    
                
                <div>
                <div className="gondola-container">
                    {gondolas.map((gondola,index) => (
                            <Gondola
                                key={index}
                                gondola={gondola}
                                // style={gondolaStyle}
                            />
                        ))
                    }
                </div>
                </div>


            </Card>
        </div>
    );
};
export default Store;

