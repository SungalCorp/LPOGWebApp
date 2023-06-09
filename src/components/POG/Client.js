import React from "react";
import Store from "./Store";
import './Client.css';
import ColorKey from "../UI/ColorKey";

const Client = (props) => {
    console.log("stores = ",props.stores)
    
    return (
        <div >
            
            {props.stores && props.stores.map((store,index) => (
                <Store
                    key={index}
                    // clientName={}
                    gondolas={store}
                />
            ))}
        </div>
    );
};
export default Client;

