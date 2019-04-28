//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// create a component
const defaultInput = (props)=> {
  
        return (
            <View style={{flex: 1}}>
               <TextInput placeholder={props.placeholder}
                style={[styles.textInput, props.style]}
                onChangeText={props.onChangeText}
                value={props.value}
                underlineColorAndroid ={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                caretHidden={false}
               // secureTextEntry={props.secureTextEntry}
                {...props}/>
            </View>
        );
   
}

// define your styles
const styles = StyleSheet.create({
    textInput: {
     borderBottomColor: 'black',
     borderBottomWidth: .3,
     backgroundColor: 'white',
     height: 35,
     shadowColor: 'black',
     shadowOffset: {width: 2, height: 2},
     shadowOpacity: .3,
     borderRadius: 5,
    },
});

//make this component available to the app
export default defaultInput;
