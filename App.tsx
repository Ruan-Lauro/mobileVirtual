import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Main from './src/Screens/Main/Main';
import { useEffect } from 'react';



export default function App() {
  
  return <Main />;
}
