import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const customButton =(props)=>{
        return (
                <TouchableOpacity onPress={props.onPress}>
                    <View style={[styles.textContainer, props.style]}>
                      <Text style={[styles.buttonText, props.style]}>{props.children}</Text>
                    </View>
                 </TouchableOpacity>
        );
}
const styles = StyleSheet.create({
    textContainer:{
         width: '100%',
         backgroundColor: 'white',
         borderRadius: 5,
         borderColor: 'grey' ,
         height: 30,
         alignItems: 'center',

    },
    buttonText: {
        fontSize: 20,
        color: 'black',
        padding: 5,
    },
});

export default customButton;
