
import React from 'react';
import '../style/CitiesList.css'
import { useSelector } from 'react-redux';

const CitiesList = ({active, children}) => {
    return (
        <div className={active ? "citiesList active" : "citiesList"}>
            <div className={active ? "citiesList__content active" : "citiesList__content"} onClick={event => event.stopPropagation()}>
                {children} 
            </div>
        </div>
    )
}

export default CitiesList;