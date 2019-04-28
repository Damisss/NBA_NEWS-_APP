import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Logo from '../../logo/nba_login_logo.png'
import AuthForm from './auth'
import {getToken, 
    setToken, 
    getOrientation,
     setOrientation,
      removeOrientation,
    platform,
refreshToken} from '../../util/misc'
import {autoSignin} from '../../store/action/userAction'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
class Start extends Component {
    constructor(props){
        super(props)
        this.state ={
            loading: true,
            orientation: getOrientation(500),
            platform: platform()
        }
        setOrientation(this.getchange)
    }
    getchange = ()=>{
        this.setState(prevState=>{
            return {
                ...prevState,
                orientation: getOrientation(500)
            }
        })
    }

    
    componentDidMount = ()=>{
      getToken((res)=>{
          if(res[0][1] === null){
            this.setState({
                loading: false
            })
          }else{
            this.props.autoSignin(res[0][1]).then(()=>{
                //console.log(this.props.User.data)
                if(!this.props.User.data.token){
                    this.setState({
                        loading: false
                    })
                }else{
                    setToken(this.props.User.data, ()=>{
                        //refreshToken(res[2][1])
                        this.props.navigation.navigate('App')
                    })
                }
            })
          }
      })
    }
    componentWillUnmount(){
        removeOrientation()
    }
    render() {
        console.log(this.state.orientation)
        if(this.state.loading){
         return (
            <View style={styles.loading}>
            <ActivityIndicator size= 'large' color = "#0000ff"/>
        </View>
         )
        }else{
            return (
                <View style={styles.container}>
                    <View style={{ marginTop: this.state.orientation === 'portrait' ? 20 : 10}}>
                        <Image source={Logo} resizeMode={'contain'}
                         style={{width: this.state.orientation === 'portrait' ? 170 : 70, 
                         height: this.state.orientation === 'portrait'? 150: 70,}}/>
                    </View>
                    <View style={{width: '80%', marginTop: this.state.orientation === 'portrait' ? 30: null}}>
                       <AuthForm visit={()=>this.props.navigation.navigate('App')}
                       orientation={this.state.orientation}/>
                    </View>
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d428a',
        alignItems: 'center'
    },
    loading:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
const mapStateToProps = (state) => {
    return {
        User: state.User
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({autoSignin}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Start);
