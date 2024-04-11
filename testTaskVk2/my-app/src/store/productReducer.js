

const defaultState = {
    products: [
        {
            id: 1,
            name: 'гараж',
            price: 1000000,
            count: 1
        },
        {
            id: 2,
            name: 'диван',
            price: 5000,
            count: 100
        },
        {
            id: 3,
            name: 'собака',
            price: 20000,
            count: 5
        }

    ],
    currentId: null,
    currentName: null,
    currentEmail: null,
    currentPrice: null,
    currentCount: null,
    countries: [
        {
            id: 1,
            name: 'Россия',
            cities: [
                {
                    cityId: 11,
                    cityName: 'Москва'
                },
                {
                    cityId: 12,
                    cityName: 'Санкт-Петербург',
                },
                {
                    cityId: 13,
                    cityName: 'Воронеж', 
                },
                {
                    cityId: 14,
                    cityName: 'Липецк'
                } 
            ],
        },
        {
            id: 2,
            name: 'Китай',
            cities: [
                {
                    cityId: 21,
                    cityName: 'Шанхай',
                },
                {
                    cityId: 22,
                    cityName: 'Пекин',
                },
                {
                    cityId: 23,
                    cityName: 'Гуанчжоу' 
                },
            ],
        },
        {
            id: 3,
            name: 'США',
            cities: [
                {
                    cityId: 31,
                    cityName: 'Нью-Йорк',
                },
                {
                    cityId: 32,
                    cityName: 'Филадельфия',
                },
                {
                    cityId: 33,
                    cityName: 'Хьюстон'
                },
            ],
        }
    ],
    selectedCountry: '',
    selectedCities: []
}

const ADD_PRODUCT = "ADD_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"
const EDIT_PRODUCT = "EDIT_PRODUCT"
const GET_ID = "GET_ID"
const GET_NAME = "GET_NAME"
const GET_EMAIL = "GET_EMAIL"
const GET_PRICE = "GET_PRICE"
const GET_COUNT = "GET_COUNT"

const GET_COUNTRIES = "GET_COUNTRIES"

const SELECT_COUNTRY = "SELECT_COUNTRY"
const SELECT_CITY = "SELECT_CITY"

export const productReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_PRODUCT:
        
        return {...state, products: [...state.products, action.payload]}
                    
        case DELETE_PRODUCT:
            return {...state, products: state.products.filter(product => product.id !== action.payload)}
        case EDIT_PRODUCT:
            return {...state, products: state.products.map(
                product => product.id === action.payload.id ?
                {
                    ...product,
                    name: action.payload.name,
                    price: action.payload.price,
                    count: action.payload.count
                }
                :
                product
            )}
        case GET_ID:
            return {...state, currentId: action.payload}
        case GET_NAME:
            return {...state, currentName: action.payload}
        case GET_EMAIL:
            return {...state, currentEmail: action.payload}
        case GET_PRICE:
                return {...state, currentPrice: action.payload}
        case GET_COUNT:
            return {...state, currentCount: action.payload}
        case GET_COUNTRIES:
            return {...state, countries: [...state.countries, action.payload]}
        case SELECT_COUNTRY:
            return {...state, selectedCountry: action.payload}
        case SELECT_CITY:
            return {...state, selectedCities: [...state.selectedCities, action.payload]}

        default:
            return state
    }

}

export const addProductAction = (payload) => ({type: ADD_PRODUCT, payload})
export const deleteProductAction = (payload) => ({type: DELETE_PRODUCT, payload}) 
export const editProductAction = (payload) => ({type: EDIT_PRODUCT, payload}) 
export const getIdAction = (payload) => ({type: GET_ID, payload})
export const getNameAction = (payload) => ({type: GET_NAME, payload})
export const getEmailAction = (payload) => ({type: GET_EMAIL, payload})
export const getPriceAction = (payload) => ({type: GET_PRICE, payload})
export const getCountAction = (payload) => ({type: GET_COUNT, payload})

export const getCountriesAction = (payload) => ({type: GET_COUNTRIES, payload})

export const selectCountryAction = (payload) => ({type: SELECT_COUNTRY, payload})
export const selectCityAction = (payload) => ({type: SELECT_CITY, payload})

