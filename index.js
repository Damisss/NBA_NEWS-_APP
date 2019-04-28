import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './src/store/reducer';


let connectDebugger = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const storeConfig = createStore(rootReducer, 
    connectDebugger(applyMiddleware(promiseMiddleware)))
const connectRedux =()=> (
    <Provider store ={storeConfig}>
     <App/>
    </Provider>
)
AppRegistry.registerComponent(appName, () => connectRedux );
