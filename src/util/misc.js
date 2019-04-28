import {AsyncStorage, Platform, Dimensions} from 'react-native'

export const setToken = (val, cb)=>{
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(
      new Date().getTime() + remainingMilliseconds
    );
 AsyncStorage.multiSet([
    ['@nba@App@token', val.token.toString()],
    ['@nba@App@uid', val._id.toString()],
    ['@nba@App@tokenExpiration', expiryDate.toString()]
 ]).then((res)=>{
        cb()
    })
}
export const getToken = (cb)=>{
    AsyncStorage.multiGet([
       '@nba@App@token', 
       '@nba@App@uid',
      '@nba@App@tokenExpiration'
    ]).then((res)=>{
           cb(res)
       })
   }

export const refreshToken = (cb, tokenExpirationDate)=>{
    setTimeout(()=>{
      cb()
    }, tokenExpirationDate)
}
export const deleteToken = (cb)=>{
   AsyncStorage.multiRemove([
    '@nba@App@token',
    '@nba@App@uid',
  '@nba@App@tokenExpiration'
   ]).then((res)=>{
       cb()
   })
}

export const getOrientation = (val)=>{
return Dimensions.get('window').height > val? 'portrait': 'landscape'
}
export const setOrientation = (cb)=>{
    return Dimensions.addEventListener('change', cb)
}
export const removeOrientation = ()=>{
    return Dimensions.removeEventListener('change')
}

export const platform = ()=>{
    if(Platform.OS === 'android'){
        return 'android'
    }else{
        return 'ios'
    }
}