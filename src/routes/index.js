
import React from 'react'
import {createStackNavigator, 
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer} from 'react-navigation'
import Start from './start'
import Game from './game'
import News from './news'
import Profile from './profile'
import NewsDetails from './news/newsDeatils'
import Logo from '../logo/logo'
import WatchGame from './game/watchGame'
import EditInfo from './profile/editInfo'
import Icons from 'react-native-vector-icons/Ionicons'

const HEADERCONF = {
    headerLayoutPreset: 'center',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: '#1d428a' ,
        },
        headerTintColor: 'white',
        headerTitle: Logo 
    }
}
const TABCONF = {
    defaultNavigationOptions:{
        tabBarOptions:{
            style:{
                backgroundColor: '#1d428a' ,
            },
            activeBackgroundColor: '#1d428a',
            inactiveBackgroundColor: '#000033'
            
        }
    }
}
const appRoot = createStackNavigator({
     Start
}, {
    initialRouteName: 'Start',
    headerMode: 'none',
})
const newsStack = createStackNavigator({
    News,
    NewsDetails
}, HEADERCONF)
const gameStack = createStackNavigator({
    Game,
    WatchGame
}, HEADERCONF)
const profileStack = createStackNavigator({
    Profile,
    EditInfo
   
}, { headerMode: 'none'})

const appTabs = createBottomTabNavigator({
    News: newsStack,
    Game: gameStack,
    Profile: profileStack
}, 
{
tabBarOptions:{
        style:{
            backgroundColor: '#1d428a' ,
        },
        activeBackgroundColor: '#1d428a',
        inactiveBackgroundColor: '#000033',
        showLabel: false
    }, 
    defaultNavigationOptions: ({navigation})=>({
        tabBarIcon: ({focused, horizontal, tintColor})=>{
           const { routeName } = navigation.state;
           let iconName;
           switch(routeName){
               case 'News':
                iconName= 'ios-basketball'
               break
               case 'Game':
               iconName= 'md-tv'
               break
               case 'Profile':
               iconName= 'ios-person'
               break
               default:
               null
           }
        //    if(routeName === 'News'){
        //        iconName= 'ios-basketball'
        //    }
           return <Icons name={iconName} size={20}  color={tintColor}/>
        }
    })   
 })

export const RootNavigation = ()=>{ 
    return createAppContainer(createSwitchNavigator({
        Auth: appRoot,
        App: appTabs,
    },{
        initialRouteName: 'Auth'
    }))
}