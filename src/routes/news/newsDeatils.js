import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Moment from 'moment'


const newsDtails =(props) =>{
       
            const team =  props.navigation.getParam('team')
            const  content=  props.navigation.getParam('content')
            const title =  props.navigation.getParam('title')
            const date =  props.navigation.getParam('date')
            const image =  props.navigation.getParam('image')
            
            return (
                <View style={styles.container}>
                    <View style={{marginBottom: 5}}>
                        <Image source={{uri: `http://localhost:3000/${image}`}}
                        style={{width: '100%', height: 300}}/>
                    </View>
                    <View>
                       <View style={{marginBottom: 10, paddingLeft: 5}}>
                          <Text style={styles.title}>{title} </Text>
                       </View>
                       <View style={{marginBottom: 10, flexDirection: 'row',paddingLeft: 5}}>
                            <Text  style ={{fontWeight: '900', fontFamily: 'Roboto-Black', fontSize: 16}}>{team} </Text>
                            <Text style ={[styles.date, {marginLeft: 10, color: 'lightgrey'}]}>Posted at {Moment(date).format('D MMM Y')} </Text>
                          </View>
                          <View style={{marginTop: 20}}>
                            <Text style={styles.content}> {content}</Text>
                          </View>
                    </View>
                </View>
            );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    title:{
        fontFamily: 'Roboto-BlackItalic',
        fontSize: 22,
        fontWeight: 'bold',
    },
    content:{
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    date:{
        fontFamily: 'YanoneKaffeesatz-Bold',
        fontSize: 16,
        color: 'lightgrey'
    }
});

export default newsDtails;
