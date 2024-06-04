import { View, StyleSheet, Image, Text, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';




type AuthShowMuralProps = {
    navigation: any,
    one?: boolean,
    two?: boolean,
    three?: boolean,
    four?: boolean
    five?: boolean,
}

export default function MenuTab({navigation, one, two, three, four, five}: AuthShowMuralProps){

   
    return(
        <View style={{
            flexDirection:"row",
            height: 80,
            backgroundColor:"white",
            width: "88%",
            borderRadius: 40,
            alignItems:"center",
            justifyContent:"space-around",
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            paddingRight: 25,
            paddingLeft: 25,

        }}>
            {/* <TouchableOpacity onPress={()=>{
                navigation.navigate('Profile')
            }}>
                {one?(
                    <Image style={{width: 43, height: 43,}} source={require("../../assets/perfil.png")}/>
            ):(
                    <Image style={{width: 35, height: 35}} source={require("../../assets/perfil.png")}/>
                )}
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>{
                navigation.navigate('ChooseGroup')
            }}>
                {two?(
                    <Image style={{width: 55, height: 35}} source={require("../../assets/gruponblack.png")}/>
                ):(
                    <Image style={{width: 55, height: 35}} source={require("../../assets/grupon.png")}/>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Home')
            }}>
                {three?(
                    <Image style={{width: 40, height: 40}} source={require("../../assets/homeBlack.png")}/>
                ):(
                    <Image style={{width: 40, height: 40}} source={require("../../assets/Home.png")}/>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('UserPost')
            }}>
               {four?(
                     <Image style={{width: 35, height: 35}} source={require("../../assets/postagensblack.png")}/>
               ):(
                <Image style={{width: 35, height: 35}} source={require("../../assets/postagens.png")}/>
               )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Configuration')
            }}>
                {five?(
                    <Image style={{width: 35, height: 35}} source={require("../../assets/configuracoesblack.png")}/>
                ):(
                    <Image style={{width: 35, height: 35}} source={require("../../assets/configuracoes.png")}/>
                )}
            </TouchableOpacity>
        </View>
    );
}