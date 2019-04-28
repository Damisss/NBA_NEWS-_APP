//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import DefaultInput from '../../util/defaultInput'
import CustomButton from '../../util/customButton'
import Validation from '../../util/validation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {signIn,signup} from '../../store/action/userAction'
import {setToken} from '../../util/misc'
class AuthForm extends Component {
    state={
        type: 'Login',
        action: 'Register',
        hasError: false,
        form:{
         username:{
            value: '',
            valid: false,
            rules:{
                require: true,
                  minChar: 5,
             }
         } ,  
         email:{
             value: '',
             valid: false,
             rules:{
                require: true,
                 isEmail: true,
             }
         },
         password:{
            value: '',
            valid: false,
            rules:{
                require: true,
                minLength: 6,

            }
         },
         confirmPassword:{
            value: '',
            valid: false,
            rules:{
                confirmpass: 'password',
            }
         }
        }
    }
    userAction = ()=>{
        this.setState(prevState=>{
            return {
                ...prevState,
                type: this.state.type === 'Login'? 'Register': 'Login',
                action: this.state.type === 'Register'? 'New user?': 'No login'
            }
        })
    }
    userInputHandler = (name, val)=>{
        this.setState(prevState=>{
            return{
                ...prevState,
                hasError: false
            }
        })
        let copyForm = this.state.form
         copyForm[name].value = val
         let {rules} = copyForm[name]
         this.setState(prevState=>{
            return {
                ...prevState,
                form: copyForm
            }
         })
         let valid = true
         valid = valid && Validation(val, rules, copyForm)
         copyForm[name].valid = valid
        
       // console.log(this.state.form.email.valid)
    }
    onSubmitForm = ()=>{
        const copyForm = this.state.form
        let formTosubmit ={}
        let isFormValid = true
       Object.keys(copyForm).forEach((elt)=>{
            if(this.state.type === 'Login'){
                if(elt !== 'confirmPassword' && elt !== 'email'){
                isFormValid = isFormValid && copyForm[elt].valid    
                formTosubmit[elt]= copyForm[elt].value
                }
                
            }else{
                formTosubmit[elt]= copyForm[elt].value
              isFormValid = isFormValid && copyForm[elt].valid
            }

        })
        if(isFormValid){
            if(this.state.type === 'Login'){
                this.props.signIn(formTosubmit)
                .then(()=>{
                   setToken(this.props.User.data, ()=> this.props.visit())
                }).catch((err)=>{
                    console.log(err)
                })
            }else{
                this.props.signup(formTosubmit).then(()=>{
                    setToken(this.props.User.data, ()=> this.props.visit())
                 }).catch((err)=>{
                     console.log(err)
                 })
            }
        }else{
            this.setState(prevState=>{
                return{
                    ...prevState,
                    hasError: true
                }
            })
        }
    }
    inputFieldHandler = (input, name, secureText, placeholderText)=>(
        this.state.type !== 'Login'? 
        <View style={[styles.textInput, 
            { width: this.props.orientation === 'portrait'?'100%': '70%' }]}>
        <DefaultInput placeholder = {placeholderText}
        onChangeText={(val)=>this.userInputHandler(name, val)}
        value={input}
        secureTextEntry={secureText}/>
      </View>: null   
    )
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.textInput, 
                    { width: this.props.orientation === 'portrait'?'100%': '70%' }]}>
                  <DefaultInput placeholder='Please enter a username'
                  onChangeText={(val)=>this.userInputHandler('username', val)}
                  value={this.state.form.username.value}/>
                </View>
                {
                      this.inputFieldHandler(this.state.form.email.value,
                         'email', false, 'Please enter an email')
                  }
                <View style={[styles.textInput, 
                    { width: this.props.orientation === 'portrait'?'100%': '70%' }]}>
                  <DefaultInput placeholder='Please enter password'
                  onChangeText={(val)=>this.userInputHandler('password', val)}
                  value={this.state.form.password.value}
                  secureTextEntry = {true}/>
                </View>
                  {
                      this.inputFieldHandler(this.state.form.confirmPassword.value, 
                        'confirmPassword', true, 'Please confirm password')
                  }
                <View style={[styles.buttonView, {marginTop: 40}]}>
                  <CustomButton onPress={this.onSubmitForm}>{this.state.type}</CustomButton>
                </View>
                <View style={styles.buttonView}>
                    <CustomButton onPress={this.userAction}>{this.state.action}</CustomButton>
                </View>
                <View style={styles.buttonView}>
                    <CustomButton onPress={this.props.visit}>Visit wihtout register</CustomButton>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        minHeight: 400,
        alignItems: 'center',
    },
    textInput:{
        marginTop: 20,
        marginBottom: 20,
    },
    buttonView:{
     marginTop: 5,
     marginBottom: 5,
     //width: '60%'
    }
});
const mapStateToProps = (state) => {
    return {
        User: state.User
    }
}
const  mapDispatchToProps = (dispatch) => {
    return bindActionCreators({signIn, signup}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps) (AuthForm);
