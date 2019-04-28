import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAllGames} from '../../store/action/gameAction'
import NbaGames from './nbaGames'
import {setOrientation, getOrientation, removeOrientation} from '../../util/misc'
class Game extends Component {
    constructor(props){
        super(props)
        this.state ={
            games: [],
            noInternet: true,
            orientation: getOrientation(500)
        }
        setOrientation(this.onOrientationHandler)
    }
    onOrientationHandler = ()=>{
        this.setState(prevState=>{
           return{
               ...prevState,
               orientation: getOrientation(500)
           }
        })
    }
    componentDidMount(){
     this.props.getAllGames().then(res=>{
        this.setState({
            games: this.props.Game.data,
            noInternet: false
        })
     })
    }
    watchGameHandler = (data)=>{
        this.props.navigation.navigate('WatchGame', {
          play: data.play
        })
    }
    componentWillUnmount(){
        removeOrientation()
    }
    render() {
          if(this.state.noInternet){
             return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                   <Text style={{fontFamily:'Roboto-Black', fontSize: 18,}}>
                   There is no internet connexion!!!!
                   </Text>
                </View>
             )
          }else{
            return (
                <ScrollView style={{backgroundColor: '#f0f0f0'}}
                showsVerticalScrollIndicator = {false}>
                    <View >
                        <NbaGames items= {this.state.games}
                        watchGameHandler={this.watchGameHandler}
                        orientation={this.state.orientation}/>
                   </View>
                </ScrollView>
                
            );
          }
    }
}


const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: 'lightgrey',
    },
});

const mapStateToProps = (state) => {
    return {
        Game: state.Game
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllGames}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);
