import {GET_NEWS} from '../type'
export default function (state={}, action){
       switch (action.type) {
           case GET_NEWS:
                return{
                    ...state,
                    data: action.payload
                };
           default:
              return state;
       }
}