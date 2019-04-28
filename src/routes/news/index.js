import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';
import {deleteToken} from '../../util/misc'
import {getNews} from '../../store/action/newsAction'
import {connect} from 'react-redux'
import NbaNews  from './nbaNew'
import {getOrientation,
     setOrientation, 
     removeOrientation} from  '../../util/misc'

class News extends Component {
    constructor(props){
        super(props)
       this.state = {
        isLoading: true,
        orientation: getOrientation(500)
    }
    setOrientation(this.onChnageHandler)
    }
    onChnageHandler = ()=>{
        this.setState(prevState=>{
               return{
                   ...prevState,
                   orientation: getOrientation(500)
               }
        })
    }
    componentDidMount(){
        this.props.dispatch(getNews()).then(()=>{
            this.props.News.data?
            this.setState({
                isLoading: false
            })
            :null

        })
       
        // if(this.props.News.data){
        //     .then((res)=>{
        //         this.setState(prevState=>{
        //             return {
        //                 ...prevState,
        //                 news: this.props.News.data.map(elt=>{
        //                     return prevState.news.push(elt)
        //                 }),
        //                 isLoading: false
        //             }
        //         })
        //         console.log(this.props.News.data)
        //      })
        // }
    }
    newsDetailHandler = (data)=>{
       this.props.navigation.navigate('NewsDetails', {
           newsId: data._id,
           content: data.content,
           image: data.image,
           date: data.date,
           title: data.title,
           team: data.team
           
       })
    }
   
    componentWillUnmount(){
        removeOrientation()
    }
    render() {
        if(this.state.isLoading){
            return (
                <View style={styles.activity}>
                <ActivityIndicator color = {'#000033'} size = 'large'/>
            </View>
            )
        }else{
            return (
                <ScrollView style={{backgroundColor: '#f0f0f0'}}
                showsVerticalScrollIndicator = {false}>
                        <View style={styles.container}>
                        <NbaNews items = {this.props.News.data} 
                        newsDetailHandler = {this.newsDetailHandler}
                        orientation = {this.state.orientation}/>
                        </View>
                      
                </ScrollView>
            );
        }
    }
}


const styles = StyleSheet.create({
    contentContainer:{
       // flex: 1,
        backgroundColor: 'lightgrey',
    },
    container: {
        padding: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    activity:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

const mapStateToProps = (state) => {
    return {
        News: state.News
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({getNews}, dispatch)
// }
export default connect(mapStateToProps) (News);
