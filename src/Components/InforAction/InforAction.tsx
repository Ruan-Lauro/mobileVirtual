import { FormEvent } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import React from 'react';

type AuthButtonProps = {

    authentication: () => void ;
    textOne: string,
    textTwo: string,
    textPrinc: string,
}

export default function InforAction({authentication, textOne, textPrinc, textTwo}:AuthButtonProps){
    return(
        <View style={{width:"100%", alignItems:"center", height:"100%", backgroundColor: "#rgba(255, 255, 255, 0.96)", paddingTop:"50%", position:"absolute", zIndex:999,}}>
            <View style={{width:"75%", backgroundColor:"white", padding:50, alignItems:"center", borderWidth:1, borderColor:"black", position:"relative"}}>
                <Text style={{fontSize:40, position:"absolute", right:15}} onPress={()=>{
                    authentication()
                }}>x</Text>
                <Image style={{width: 180, height: 180,  }} source={require('../../../assets/investigacao.png')}/>
                <Text style={{fontSize: 18, textAlign:"center", }}>{textOne}<Text style={{fontWeight:500}}>{textPrinc}</Text>{textTwo}</Text>
            </View>

        </View>
    );
}