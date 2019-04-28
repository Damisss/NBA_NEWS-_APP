
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Video from 'react-native-video'
import {connect} from 'react-redux'
import  {getToken, setToken,
     getOrientation,
      setOrientation, 
      removeOrientation} from '../../util/misc'
import {autoSignin} from '../../store/action/userAction'
import CustomButton from '../../util/customButton'
class WacthGame extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAuth: true,
            isLoading: true,
            orientation: getOrientation(500)
        }
        setOrientation(this.orientationHandler)
    }
    orientationHandler = ()=>{
        this.setState(prevState=>{
            return {
                ...prevState,
                orientation: getOrientation(500)
            }
        })
    }
    onManageState = (isAuth, isLoading)=>{
        this.setState({
            isAuth,
            isLoading
        })
    }
    componentDidMount(){
        getToken((value)=>{
            if(value[0][1]=== null){
               this.onManageState(false, false)
            }else{
                this.props.dispatch(autoSignin(value[0][1]))
                .then(()=>{
                    if(!this.props.User.data.token){
                        this.onManageState(false, false)
                    }else{
                      setToken(this.props.User.data, ()=>{
                        this.onManageState(true, false)
                      })
                    }
                }).catch((error)=>console.log(error))
            }
        })
    }
    isNotAuthHandler = ()=>{
        this.props.navigation.navigate('Auth')
    }
    render() {
        const params = this.props.navigation.state.params
        if(this.state.isLoading){
            return(
                <View style={styles.activity}>
                <ActivityIndicator color= '#000033' size={'large'}/>
               </View>
            )
        }else{
            return (
               <View>
                   {
                   this.state.isAuth? 
                    <Video source={{uri:`http://192.168.0.59:3000/${params.play}` }}
                    paused={true}
                    controls={true}
                    fullscreen={true}
                    style={{width: '100%', height: 400}}/>
                   :<View style={styles.container}>
                    <Text>In order to watch the video, you need to login or register</Text>
                    <CustomButton onPress={this.isNotAuthHandler}>
                     {`Login/Register`}</CustomButton>
                   </View>
               }
               </View>
            );
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    activity:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        User: state.User
    }
}
export default connect(mapStateToProps) (WacthGame);
