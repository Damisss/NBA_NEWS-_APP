import {GET_GAMES} from '../type'
export default function(state={}, action){
    switch (action.type) {
        case GET_GAMES:
           return{
               ...state,
               data: action.payload
           }
        default:
            return state;
    }
}