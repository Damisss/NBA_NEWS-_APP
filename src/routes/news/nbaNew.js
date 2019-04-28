import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import moment from 'moment'
//import console = require('console');
const nbaNews = (props) => {
     const news = (param)=>(
         <View style={styles.news}>
             <View>
                 <Image source={{uri: `http://192.168.0.59:3000/${param.image}`}} 
                 style={{width: '100%', height: 200}}/>
             </View >
             <View style={{marginBottom: 5}}>
               <View style={{padding: 10}}>
                  <View style={{borderBottomColor: 'lightgrey', borderBottomWidth: .5}}>
                     <Text style={styles.title}>{param.title}</Text>
                  </View>
               </View>
                <View style={{flexDirection: 'row', padding: 10 }}>
                  <Text style ={{fontWeight: '900', fontFamily: 'Roboto-Black', fontSize: 16}}>{param.team}</Text>
                  <Text style ={[styles.date, {marginLeft: 10, color: 'lightgrey'}]}>Posted at {moment(param.date).format('D MMM Y') }</Text>
                </View>
             </View>
         </View>
     )
     const displayNewsHandler = ()=>(
       props.items.map((elt, i)=>(
            <TouchableOpacity onPress={()=>props.newsDetailHandler(elt)} key={i}>
               {news(elt)}
           </TouchableOpacity> 
       ))
     )
        return (
             
            <View style={{width: props.orientation === 'portrait'? '100%': '80%',}}>
                {
                    displayNewsHandler()
                }
            </View>
        );
}

const styles = StyleSheet.create({
    // container: {
    //    width: props.orientation === 'portrait'? '100%': '80%',
    // },
    news:{
        shadowColor: 'black',
       shadowOffset: {width: 2 ,height: 2},
       shadowOpacity: .3,
       borderRadius: 10,
       backgroundColor: 'white',
       marginBottom: 15,
    },
    title:{
        fontFamily: 'CrimsonText-Bold',
        fontSize: 20,
        paddingLeft: 5, 
    },
    date:{
        fontFamily: 'Roboto-Black',
        fontSize: 16,
        paddingLeft: 5, 
    },
    date:{
        fontFamily: 'YanoneKaffeesatz-Bold',
        fontSize: 16,
       // color: 'red'
    }
});
export default nbaNews;
