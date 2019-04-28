import {combineReducers} from 'redux'
import User from './userReducer'
import News from './newsReducer'
import Game from './gameReducer'
import Profile from './profileReducer'
 const rootReducer = combineReducers({
  User,
  News,
  Game,
  Profile
})
export default rootReducer
