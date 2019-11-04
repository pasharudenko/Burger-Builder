import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const initIngredients = () => {
    return dispatch => {

        axios.get('https://test-d4636.firebaseio.com/ingredients.json').then(response => {
        
            
            dispatch({
                type: actionTypes.SET_INGREDIENTS,
                ingredients: response.data
            });


        }).catch(error => {
            dispatch({
                type: actionTypes.FETCH_INGREDIENTS_FAILED
            })
        })

        
    }
}