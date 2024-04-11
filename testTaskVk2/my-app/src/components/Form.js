import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductAction, deleteProductAction} from "../store/productReducer";
import '../style/App.css'
import CountriesList from "./CountriesList";

export const Form = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [price, setPrice] = useState('')
    const [count, setCount] = useState('')
    
    let [isDeliveryExist, setIsDeliveryExist] = useState('')

    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [priceTouched, setPriceTouched] = useState(false)
    const [countTouched, setCountTouched] = useState(false)

    const [nameError, setNameError] = useState('Введите название товара')
    const [emailError, setEmailError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [countError, setCountError] = useState('')

    const blurHandler = (event) => {
        switch (event.target.name) {
            case 'name':
                setNameTouched(true)
                break;
            case 'email':
                setEmailTouched(true)
                break;
            case 'count':
                setCountTouched(true)
                break;
        }
    }

    const emailHandler = (event) => {
        setEmail(event.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setEmailError('Неверный формат email')
        } else {
            setEmailError('')
        }
    }
    const nameHandler = (event) => {
        setName(event.target.value);
        if (String(event.target.value).length > 15) {
            setNameError('Недопустимый формат названия товара')
        } else {
            setNameError('')
        }
    }
    const countHandler = (event) => {
        setCount(event.target.value);
        const re = /^\d+$/ 
        if (!re.test(String(event.target.value).toLowerCase())) {
            setCountError('Недопустимый формат')
        } else {
            setCountError('')
        }
    }

    const products = useSelector(state => state.product.products)

  const addProduct = (name,price,count) => {
    const product = {
        id: Date.now(),
        name,
        price,
        count,
        isDeliveryExist
    }
    dispatch(addProductAction(product))
}



let checkbox = document.getElementById("isDeliveryExist");


  return (

    <form className="addProduct">
                <br /> <label htmlFor="name"> Название товара </label>
                    { (nameTouched && nameError) && <div className="errorMsg">{nameError}</div> }
                    <br /> <input 
                    name="name"
                    placeholder="name" id="name"
                    value={name}
                    onBlur={event => blurHandler(event)}
                    onChange={event => nameHandler(event)}
                    />
                <br /> <label htmlFor="email"> email </label>
                    { (emailError) && <div className="errorMsg">{emailError}</div> }
                    <br /> <input 
                    name="email"
                    placeholder="email" id="email"
                    value={email}
                    onBlur={event => blurHandler(event)}
                    onChange={event => emailHandler(event)}
                    />
                <br /> <label htmlFor="price"> Цена </label>
                    <br /> <input 
                    name="price"
                    placeholder="price" id="price"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                    />
                <br /> <label htmlFor="count"> Количество </label>
                    { (countTouched && countError) && <div className="errorMsg">{countError}</div> }
                    <br /> <input 
                    name="count"
                    placeholder="count" id="count"
                    value={count}
                    onChange={event => countHandler(event)}
                    onBlur={event => blurHandler(event)}
                    />
                <br /> <label htmlFor="delivery"> Доставка </label>
                    <br /> <input 
                    name="delivery"
                    type="checkbox"
                    placeholder="delivery" id="isDeliveryExist"
                    value={isDeliveryExist}
                    onChange={event => setIsDeliveryExist(checkbox.checked)}
                    />

                {isDeliveryExist ?
                <div>
                    <CountriesList />
                </div>
                :
                <div> Для данного товара доставка недоступна </div>
                
                }
               
               <br /> <button type="button" className="modalButton" onClick={() => addProduct(name,price,count)} > Сохранить </button>
                
            </form>
  )
}

