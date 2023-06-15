import React from 'react';
import {slide as BmMenu} from 'react-burger-menu';
import './LPOGMenu_1.css';

const LPogMenu1 = (props) => {
    
    return (

        // <div> HAMBURGER MENU
            <BmMenu>
                <a className="menu-item" href="/">Home</a>
                <a className="menu-item" href="/about">About</a>
                <a className="menu-item" href="/contact">Contact</a>
            </BmMenu>
        // </div>
    );
};
export default LPogMenu1;


