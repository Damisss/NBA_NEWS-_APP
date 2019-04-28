//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import DefaultInput from '../../util/defaultInput'
import CustomButton from '../../util/customButton'
import Validation from '../../util/validation'
import {connect} from 'react-redux'
import {autoSignin, editInfo} from '../../store/action/userAction'
import {getToken, setToken, platform} from '../../util/misc'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
class EditInfo extends Component {
    state={
        isAuth: true,
        hasError: false,
        platform: platform(),
        image: null,
        form:{
            username:{
               value: '',
               valid: false,
               rules:{
                   require: true,
                   minChar: 5,
               }
            },
            email:{
                value: '',
               valid: false,
               rules:{
                   require: true,
                   isEmail: true
               }
            },
            team:{
               value: '',
               valid: false,
               rules:{
                   require: true,
               }
            }
        }
    }
   componentDidMount(){
       let userData = this.props.navigation.state.params
       this.setState(prevState=>{
           return{
               ...prevState,
               image: `http://192.168.0.59:3000/${userData.profileImage}`,
               form:{
                username:{
                    ...prevState.form.username,
                    value: userData.username,
                 },
                 email:{
                    ...prevState.form.email,
                     value: userData.email,
                 },
                 team:{
                    ...prevState.form.team,
                    value: userData.team,
                 }
               }
           }
       })
   }
   imageHandler = ()=>{
    ImagePicker.showImagePicker({title: 'Add a profile image'}, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          //const source = { uri: response};
          this.setState(prevState=>{
              return{
                  ...prevState,
                    image: response
                  
              }
          })  
   }
})
}
    userInputhandler = (name, value)=>{
      let copyForm = this.state.form
      copyForm[name].value = value
      let rule = copyForm[name].rules
      let valid = Validation(value, rule) 
      copyForm[name].valid = valid
      this.setState(prevState=>{
          return {
              ...prevState,
              form: copyForm
          }
      })
    }
   onSubmithandler = ()=>{
       const params = this.props.navigation.state.params._id
       //console.log(params.)
       let isValid = true
       let copyForm = this.state.form
       let formToSubmit = {}
       Object.keys(copyForm).forEach(key=>{
        formToSubmit[key] = copyForm[key].value
        isValid = copyForm[key].valid && isValid
       })
        formToSubmit['profileImage'] =  {
            name: this.state.image.fileName,
            type: this.state.image.type,
            uri: this.state.platform === 'android'? this.state.image.uri:
           this.state.image.uri.replace("file://", "")
        }
    
       if(isValid){
         this.props.dispatch(editInfo(formToSubmit, params)).then(()=>{
            this.setState({
                isAuth: true,
                hasError: false
            })
            this.props.navigation.navigate('Profile',{
              updateProfile: true,
              username: formToSubmit.username
            })
         })
       }
   }
  
    render() {
        let imageUrl
        if(this.state.image && this.state.image.uri){
            imageUrl = {uri: this.state.image.uri}
        }else if(this.props.User.data && this.state.image !== null ){
            imageUrl = {uri: this.state.image}
        }
        //else if(this.state.image && this.state.image.uri){
        //     imageUrl = {uri: this.state.image.uri}
        // }
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image source={imageUrl} style={{width:120, height: 170}}
                    resizeMode={'contain'}/>
                    <TouchableWithoutFeedback onPress={this.imageHandler}>
                   <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: 'red',
                alignItems: 'center', justifyContent: 'center', position:'absolute', bottom: -4, right: -4}}>
                      <Icon name={'md-create'} size={20}/>
                   </View>
                   </TouchableWithoutFeedback>
                </View>
                <View style={styles.textInput}>
                    <DefaultInput value={this.state.form.username.value}
                    onChangeText={(val)=>this.userInputhandler('username', val)}/>
                </View>
                <View style={styles.textInput}>
                    <DefaultInput value={this.state.form.email.value}
                    onChangeText={(val)=>this.userInputhandler('email', val)}/>
                </View>
                <View style={styles.textInput}>
                    <DefaultInput value={this.state.form.team.value}
                    onChangeText={(val)=>this.userInputhandler('team', val)}/>
                </View>
                <View style={styles.buttonView}>
                <CustomButton  onPress={this.onSubmithandler}>Submit</CustomButton>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        minHeight: 500,
        justifyContent: 'center'
    },
    buttonView:{
        marginTop: 20,
        marginBottom: 5,
        //width: '60%'
       },
    textInput:{
        marginTop: 20,
        marginBottom: 20,
    },
    inputField:{
        width: '80%'
    },
    image: {
        width: 120, 
        height: 170,
         backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginBottom: 20,
        }
});
const mapStateToProps = (state) => {
    return {
        User: state.User,
        Profile: state.Profile
    }
}
//make this component available to the app
export default connect(mapStateToProps) (EditInfo);
