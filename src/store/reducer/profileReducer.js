import {EDIT_INFO} from '../type'

export  default function(state={}, action){
    switch (action.type) {
        case EDIT_INFO:
            return{
                ...state,
                profile: action.payload
            };
    
        default:
            return state;
    }
}