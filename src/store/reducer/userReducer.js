import {USER_SIGNUP, USER_LOGIN, AUTO_SIGNIN, GET_USER} from '../type'

export default function (state={}, action){
    switch(action.type){
        case AUTO_SIGNIN: 
        return {
            ...state,
            data: action.payload
        }
        case GET_USER: 
        return {
            ...state,
            data: action.payload
        }
        case USER_SIGNUP: 
        return {
            ...state,
            data: action.payload
        }
        case USER_LOGIN: 
        return {
            ...state,
            data: action.payload
        }
        default:
       return state
    }
}