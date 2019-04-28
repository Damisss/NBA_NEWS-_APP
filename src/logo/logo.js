import React from 'react';
import { View, Image} from 'react-native';
import imagelogo  from './nba_login_logo.png'
const logo = ()=> {
        return (
            <View>
                <Image source={ imagelogo}
                style={{width:70, height: 35}}
                resizeMode={"contain"}/>
            </View>
        );
}
export default logo;
