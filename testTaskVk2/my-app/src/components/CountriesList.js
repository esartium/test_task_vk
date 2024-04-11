import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectCountryAction, selectCityAction } from "../store/productReducer";
import CitiesList from "./CitiesList";



const CountriesList = () => {
    const countries = useSelector(state => state.product.countries)
    // const checkedCity = useSelector(state => state.poduct.checkedCity)
    // const checkedCountry = useSelector(state => state.poduct.checkedCountry)

    const dispatch = useDispatch()

    // let [isChecked, setIsChecked] = useState('')
    let isChecked = false
    

    let checkedCountry = ''
    let checkedCities = []
    let selectedCountry = useSelector(state => state.product.selectedCountry)

    const [citiesListActive, setCitiesListActive] = useState('')

    return (
        <div>
            { countries.length > 0 ?
            
                <form>
                { countries.map(country => 
                    <div key={country.id} >
                    <label>{ country.name }</label>
                    <input className="countryList" type="radio" value={country.name} name="countrySelector"
                    
                    onClick={() => { 
                            console.log(country.name); 
                            checkedCountry = country.name;
                            dispatch(selectCountryAction(checkedCountry))
                            setCitiesListActive(true)
                        }
                    }
                    /> 
                    
                    </div>
                    
            )} 
            <CitiesList active={citiesListActive} setActive={setCitiesListActive}>
            {
                countries.filter(country => country.name === selectedCountry).map(
                    country => <div key={country.id}>
                        {country.cities.map(
                            city => <div key={city.cityId}> 
                            <label> {city.cityName} </label>
                            <input 
                            type="checkbox"
                            onChange={() => { 
                                isChecked = !isChecked;

                                if (isChecked) {
                                console.log(isChecked);
                                console.log(city.cityName); 
                                checkedCities.push(city.cityName);
                                dispatch(selectCityAction(checkedCities))
                                }

                                
                            }
                        }
                            />
                            </div>
                        )}
                    </div>
                )
            }
            </CitiesList>
            </form>
            :
            <div> Для данного товара не предусмотрена доставка </div>
            }
            
            









        </div>
    )
}

export default CountriesList