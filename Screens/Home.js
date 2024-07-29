import {TouchableOpacity, StyleSheet, Text, View, Touchable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native MCQ Quize</Text>
      <Text style={styles.text}>(You will have to solve 10 Questions in 5 minutes)</Text>
      <TouchableOpacity style={styles.Button} onPress={()=>{navigation.navigate('test')}}>
        <Text style={styles.btn_text}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        height:800,
        padding:20,
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        color:'black',
        // marginTop:100
    },
    text:{
        fontSize:16,
        // marginVertical:20
    },
    Button:{
        paddingVertical:10,
        paddingHorizontal:30,
        backgroundColor:'#242efc',
        borderRadius:6,
        margin:20
    },
    btn_text:{
        fontSize:20,
        fontWeight:'500',
        color:'white',
    }
})