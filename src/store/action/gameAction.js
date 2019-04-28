import axios from 'axios'
import {GET_GAMES} from '../type'

export const getAllGames = ()=>{
    const request = axios(`http://localhost:3000/game/getGame`)
    .then(res=>{
        return res.data
    }).catch(err=>{
        return false
    })
    return{
        type: GET_GAMES,
        payload: request
    }
}