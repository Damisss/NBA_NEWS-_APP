import {USER_SIGNUP,USER_LOGIN,  AUTO_SIGNIN, EDIT_INFO, GET_USER} from '../type'
import axios from 'axios'
//import console = require('console');
export const signup = (data)=>{
    const request = axios({
        url: `http://192.168.0.59:3000/user/signup`,
        method: 'POST',
        data: data,
        headers:{
           "Content-Type" : "application/json"
        }
    }).then((res)=>{
        return res.data
    }).catch(()=>{
        return false
    })
    return {
        type: USER_SIGNUP,
        payload: request
    }
}
export const signIn = (data)=>{
    const request = axios({
        url: `http://localhost:3000/user/signin`,
        method: 'POST',
        data: data,
        headers:{
           "Content-Type" : "application/json"
        }
    }).then((res)=>{
        return res.data
    }).catch(()=>{
        return false
    })
    return {
        type: USER_LOGIN,
        payload: request
    }
}

export const autoSignin = (token)=>{
    const request = axios({
        url: `http://localhost:3000/user/refreshToken/?token=${token}`,
        method: 'POST',
        headers:{
           "Content-Type" : "application/json",
        }
    }).then((res)=>{
       // console.log(res.data)
       return res.data
    }).catch((err)=>{
        return false
    })
    //console.log(request)
    return {
        type: AUTO_SIGNIN,
        payload: request,
    }
}

export const editInfo = (data, userId)=>{
    const formData= new FormData()
    formData.append('profileImage',data.profileImage )
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('team',data.team )
   const request = axios({
       url: `http://localhost:3000/user/editProfile/${userId}`,
       method: 'POST',
       data: formData,
    //    headers:{
    //     "Content-Type" : "application/json",
    //    }
   }).then((res)=>{
       return res.data
   }).catch((err)=>{
       console.log(err)
   })
   return {
       type: EDIT_INFO,
       payload: request
   }
}

export const getUser = (userId)=>{
    const request = axios(`http://localhost:3000/user/getInfo/${userId}`)
    .then(res => {return res.data})
    .catch(err=> false)
    return{
        type: GET_USER,
        payload: request
    }
}