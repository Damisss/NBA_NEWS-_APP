import {GET_NEWS} from '../type'
import axios from 'axios'
export const getNews = ()=>{
    const request = axios('http://localhost:3000/team/getNews')
    .then(res=>{
       return res.data
    }).catch(error=>{
        console.log(error)
    })
  return{
    type: GET_NEWS,
    payload: request
  }
}