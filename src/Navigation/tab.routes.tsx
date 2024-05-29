import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Home from '../Screens/Home/Home';
import UserPost from '../Screens/UserPost/UserPost';
import ChooseGroup from '../Screens/ChooseGroup/ChooseGroup';
import Profile from '../Screens/Profile/Profile'
import Configuration from '../Screens/Configuration/Configuration';
import React from 'react';
import First from '../Screens/First/First';


const Tab = createBottomTabNavigator()

export default function TabRoutes(){
    return(
        <Tab.Navigator screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarStyle:{
            alignSelf:"center",
            height: 80,
            width: "88%",
            borderTopWidth: 0,
            borderRadius: 40,
            marginBottom: 20,
        }
        
        }} >
            <Tab.Screen name='ProfileNew' component={Profile} options={{
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return <Image style={{width: 43, height: 43,}} source={require("../../assets/perfil.png")}/>
                    }

                    return <Image style={{width: 35, height: 35}} source={require("../../assets/perfil.png")}/>
                },
            }}/>
            <Tab.Screen name='GroupList' component={ChooseGroup}  options={{
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return <Image style={{width: 66, height: 43}} source={require("../../assets/grupon.png")}/>
                    }

                    return <Image style={{width: 55, height: 35}} source={require("../../assets/grupon.png")}/>
                },
            }}  initialParams={{ initialScreen: "GroupList" }}/>
            <Tab.Screen name='HomeNew' component={Home}  options={{
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return <Image style={{width: 48, height: 48}} source={require("../../assets/Home.png")}/>
                    }
                    return <Image style={{width: 40, height: 40}} source={require("../../assets/Home.png")}/>
                },
            }}/>
            <Tab.Screen name='UserPostNew' component={UserPost}  options={{
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return <Image style={{width: 43, height: 43}} source={require("../../assets/postagens.png")}/>
                    }
                    return <Image style={{width: 35, height: 35}} source={require("../../assets/postagens.png")}/>
                },
            }} />
            <Tab.Screen name='ConfigurationNew' component={Configuration}  options={{
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return <Image style={{width: 43, height: 43}} source={require("../../assets/configuracoes.png")}/>
                    }
                    return <Image style={{width: 35, height: 35}} source={require("../../assets/configuracoes.png")}/>
                } ,
            }}/>
        </Tab.Navigator>
    )
}
