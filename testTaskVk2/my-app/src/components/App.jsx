import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductAction, deleteProductAction, editProductAction } from "../store/productReducer";
import Modal from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import { EditForm } from "./EditForm";
import '../style/App.css'
import { Form } from "./Form";
import { getIdAction, getCountAction, getNameAction, getPriceAction, getEmailAction } from "../store/productReducer";
import ModalDelete from "./ModalDelete";
import CountriesList from "./CountriesList";

const App = () => {
  

  const [modalActive, setModalActive] = useState('')
  const [modalActive2, setModalActive2] = useState('')
  const [modalActiveDelete, setModalActiveDelete] = useState('')

  const dispatch = useDispatch()

  const products = useSelector(state => state.product.products)

  const countries = useSelector(state => state.product.countries)


  const addProduct = (name,price,count) => {
    const product = {
        id: Date.now(),
        name,
        price,
        count
    }

    dispatch(addProductAction(product))
  }

  const deleteProduct = (product) => {
      dispatch(deleteProductAction(product.id))
  }

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  return (
    <div className="App">
      <div>
        { products.length > 0 ? 
          <div id="productsTable">  
            <table>
                <thead> 
                  <tr> 
                    <th> Название товара </th> 
                    <th> Цена </th> 
                    <th> Количество </th> 
                    <th> Опции </th> 
                </tr> 
                </thead>
            { products.map( product => <tr key={product.id}> 
                <td> {product.name} </td> 
                <td> {USDollar.format(product.price)} </td> 
                <td> {product.count} </td> 
                <td><button onClick={() => {setModalActiveDelete(true)}} id="deleteButton"> Удалить товар </button> 

                <button onClick={() => { setModalActive2(true); dispatch(getIdAction(product.id)); dispatch(getNameAction(product.name)); dispatch(getEmailAction(product.email)); dispatch(getPriceAction(product.price)); dispatch(getCountAction(product.count)); }} id="editButton"> Редактировать товар </button></td> 

                <ModalDelete active={modalActiveDelete} setActive={setModalActiveDelete}>
                  <br id="msg" />Вы уверены, что хотите удалить данный товар?
                  <br /> <button className="modalButton" onClick={() => { deleteProduct(product)} }> delete </button> 
                </ModalDelete>



                </tr> )}
            </table>

              </div> 
              : 
              <div> Товаров нет </div>}
              </div>
                <div>
                  <button onClick={() => { setModalActive(true); }} className="button"> Добавить новый товар </button>
                  
                </div>


      <Modal active={modalActive} setActive={setModalActive}>
              <Form />
      </Modal>

      <ModalEdit active={modalActive2} setActive={setModalActive2}> 
              <EditForm />
      </ModalEdit>

    </div>
  );
}

export default App;
