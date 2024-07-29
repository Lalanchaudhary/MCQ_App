import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import QuestionScreen from './Screens/QuestionScreen'
import Home from './Screens/Home'
import Result from './Screens/Result'
const App = () => {
  const Stack=createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='test' component={QuestionScreen} />
        <Stack.Screen name='result' component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})