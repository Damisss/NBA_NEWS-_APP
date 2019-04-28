import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment'

const nbaGames =(props)=> {
  const gameHandler = ()=>(
      props.items.map((item, i)=>(
          <TouchableOpacity key={i} onPress={()=>props.watchGameHandler(item)}>
              <View style={styles.gameCard}>
                   <View style={{justifyContent: 'center'}}>
                      <Image source={{uri:`http://192.168.0.59:3000/${item.awayLogo}`}}
                      style={{width: 80, height: 80}} resizeMode={'contain'}/>
                       <Text style={styles.team} >{item.localTeam}</Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text>{item.time}</Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                       <Image source={{uri: `http://192.168.0.59:3000/${item.awayLogo}`}}
                        style={{width: 80, height: 80}} resizeMode={'contain'}/>
                          <Text style={styles.team} >{item.localTeam}</Text>
                    </View>
              </View>
          </TouchableOpacity>
      ))
  )
        return (
            <View style={[styles.container,
             {width: props.orientation === 'portrait'? '100%': '80%', 
              alignSelf: 'center'} ]}>
               {
                   gameHandler()
               }
            </View>
        );
}


const styles = StyleSheet.create({
    container: {
     padding: 10
    },
   gameCard:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    height: 120,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: .3,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 20,

   },
   team:{
       alignSelf: 'center',
       fontFamily: 'Roboto-Black',
       fontSize: 16,
   }
});

export default nbaGames;
