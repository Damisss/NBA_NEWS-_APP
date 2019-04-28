//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import CustomButton from '../../util/customButton'
import NBA from '../../logo/nba_login_logo.png'
import {connect} from 'react-redux'
import{deleteToken,
     getToken, setToken,
      getOrientation, 
      setOrientation,
       removeOrientation} from '../../util/misc'
import {autoSignin, getUser} from '../../store/action/userAction'
import Icon from 'react-native-vector-icons/Ionicons'

// create a component
class Profil extends Component {
    constructor(props){
        super(props)
        this.state ={
            isAuth: false,
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
    let userData
       getToken(val=>{
           if(val[0][1]=== null){
            this.setState({
                isAuth: false
            }) 
           }else{
               this.props.dispatch(autoSignin(val[0][1])).then(()=>{
                setToken(this.props.User.data, ()=>{
                    if(!this.props.User){
                       this.setState({
                           isAuth: false
                       })  
                    }else{
                       userData= this.props.User.data
                       this.setState({
                           isAuth: true,
                           image: userData.profileImage,
                           email: userData.email,
                           username: userData.username,
                           team: userData.team
                
                       }) 
                    }
              })
               })
                    
                 
           }
       })
   }
 
   onLogoutHandler =()=>{
       deleteToken(()=>{
          this.props.navigation.navigate('Auth')
       })
   } 
   notAuthHandler = ()=>{
    this.props.navigation.navigate('Auth')
   }
   buttonhandler = (fn, info, name)=>(
      <View>
             <Icon.Button name={name} backgroundColor="white"
             iconStyle={{color: 'grey'}} borderRadius= {30} size={30}
            onPress={fn}/>
             <Text style={[styles.textStyle, {fontSize: 12, marginTop: 5}]}>{info}</Text>
      </View>
   )
   onEditInfo = ()=>{
       const userId = this.props.User.data._id
       this.props.dispatch(getUser(userId)).then(()=>{
        this.props.navigation.push('EditInfo', {
            ...this.props.User.data
        })  
       })
    //    this.props.navigation.push('EditInfo', {
    //     ...this.props.User.data
    // })
       
   }
   onUpdateProfile = ()=>{
    let newData = this.props.Profile.profile?this.props.Profile.profile: null
    return (<View>
              <View style={{marginBottom: 15,}}>
                  <Text style={[styles.textStyle]}>
                  username: {newData ? newData.username : this.state.username}
                  </Text>
              </View>
              <View style={{marginBottom: 10,}}>
                  <Text style={[styles.textStyle, {fontSize: 16}]}>
                  Email: {newData ? newData.email : this.state.email}
                  </Text>
              </View>
              <View style={{marginBottom: 10,}}>
                  <Text style={[styles.textStyle, {fontSize: 16}]}>
                  Team :{newData ? newData.team : this.state.team}
                  </Text>
              </View >
    </View>)
   }
   componentWillUnmount() {
    removeOrientation()
  
   }
    render() {
           if(!this.state.isAuth){
               return(<View style={[styles.container, {justifyContent: 'center'},]}>
                     <View style={[styles.header, {position: 'absolute' ,top:0,
                     height: this.state.orientation === 'portrait'? 200: 100}]}>
                       <Image source={NBA} style={{width: this.state.orientation === 'portrait'? 150: 70,
                        height: this.state.orientation === 'portrait'? 150: 70,}} resizeMode={'contain'}/>
                     </View>
                        <View >
                            <Text>
                            Please login or register in order to see your profile.
                            </Text> 
                        </View>
                        <View style={{marginTop: 15}}>
                            <CustomButton onPress={this.notAuthHandler} 
                            style={styles.button}>
                            Login/Register
                            </CustomButton>
                        </View>
                    </View>
                    )
           }else{
            return (
                <View style={styles.container}>
                <View style={styles.header}>
                   <View style={{ marginTop: 50,}}>
                   <Image source={NBA} style={{width: 100, height: 100}}
                   resizeMode={'contain'}/>
                   </View>
                </View>
              <View style={styles.imageContainer}>
                 <Image source={{uri:`http://192.168.0.59:3000/${!this.props.Profile.profile?
                 this.state.image: this.props.Profile.profile.profileImage
                 }`}}
                 style={{ width: 100, height: 100, borderRadius: 50}} resizeMode={'cover'}/>
              </View>
                <View style={{zIndex: 2}}>
               {
                  this.onUpdateProfile()
               }
              <View style={{marginBottom: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                   {
                       this.buttonhandler(this.onLogoutHandler, 'log out', 'md-create')
                   }

                   {
                        this.buttonhandler(this.onEditInfo, 'edit info', 'md-create')
                   }
              </View>
                </View>
                <View style={{borderBottomLeftRadius: 400 ,borderBottomRightRadius: 400,
                     borderColor: 'lightgrey' , borderWidth: 3, backgroundColor: '#f0f0f0',
                     width: '100%', height: 350, borderTopColor: '#f0f0f0',
                     position: 'absolute', top: 200}} >
                 </View>
              </View>
       );
           }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    imageContainer:{
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        borderColor: 'black',
        borderWidth: 1,
        // position: 'absolute',
         zIndex: 2,
         top: -30,
         alignItems: 'center'
    },
    textStyle:{
        fontFamily: 'Roboto-Black',
        color: 'black',
        fontSize: 26,
    }, 
    button:{
        backgroundColor: '#1d428a',
        color: 'white'
    },
    header:{
        width: '100%',
        // height: 200, 
        backgroundColor: '#1d428a',
         alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        User: state.User,
        Profile: state.Profile
    }
}
export default connect(mapStateToProps) (Profil);
