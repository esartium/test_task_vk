import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductAction, deleteProductAction, editProductAction} from "../store/productReducer";
import '../style/App.css'

import CountriesList from "./CountriesList";

export const EditForm = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [price, setPrice] = useState('')
    const [count, setCount] = useState('')

    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [countTouched, setCountTouched] = useState(false)

    const [nameError, setNameError] = useState('Введите название товара')
    const [emailError, setEmailError] = useState('')
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

let currentId = useSelector(state => state.product.currentId)
let currentName = useSelector(state => state.product.currentName)
let currentEmail = useSelector(state => state.product.email)
let currentPrice = useSelector(state => state.product.currentPrice)
let currentCount = useSelector(state => state.product.currentCount)

const editProduct = () => {
    
    const product = {
      id: currentId,
      name,
      price,
      count
  }

    dispatch(editProductAction(product))
  }

  let checkbox = document.getElementById("isDeliveryExist2");
  let [isDeliveryExist2, setIsDeliveryExist2] = useState('')
  
  return (

    <form className="addProduct">
                <br /> <label htmlFor="name"> Название товара </label>
                    { (nameTouched && nameError) && <div className="errorMsg">{nameError}</div> }
                    <br /> <input 
                    placeholder={currentName} id="name"
                    name="name"
                    value={name}
                    onChange={event => nameHandler(event)}
                    onBlur={event => blurHandler(event)}
                    />
                <br /> <label htmlFor="email"> email </label>
                    { (emailTouched && emailError) && <div сlassName="errorMsg">{emailError}</div> }
                    <br /> <input 
                    name="email"
                    placeholder={currentEmail} id="email"
                    value={email}
                    onChange={event => emailHandler(event)}
                    onBlur={event => blurHandler(event)}
                    />
                <br /> <label htmlFor="price"> Цена </label>
                    <br /> <input 
                    placeholder={currentPrice} id="price"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                    />
                <br /> <label htmlFor="count"> Количество </label>
                    { (countTouched && countError) && <div сlassName="errorMsg">{countError}</div> }
                    <br /> <input 
                    placeholder={currentCount} id="count"
                    value={count}
                    name="count"
                    onChange={event => countHandler(event)}
                    onBlur={event => blurHandler(event)}
                    />

                <br /> <label htmlFor="delivery"> Доставка </label>
                <br /> <input 
                type="checkbox"
                placeholder="delivery" id="isDeliveryExist2"
                value={isDeliveryExist2}
                onChange={event => setIsDeliveryExist2(checkbox.checked)}
                />
                {isDeliveryExist2 ?
                <div>
                    <CountriesList />
                </div>
                :
                <div> Для данного товара доставка недоступна </div>
                
                }
               
               <br /> <button type="button" className="modalButton" onClick={() => editProduct(name,price,count)} > Сохранить </button>
                
            </form>
  )
}