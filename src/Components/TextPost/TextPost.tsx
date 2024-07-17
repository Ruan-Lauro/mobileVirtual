import { FormEvent } from 'react';
import styles from './Style';
import {Text, View, TouchableOpacity,} from 'react-native';
import { Image } from 'expo-image';
import React from 'react';

type AuthButtonProps = {

    authentication: () => void ;
}

export default function TextPost({authentication}:AuthButtonProps){
    return(
        <View style={{width:"100%", alignItems:"center", height:"100%", backgroundColor: "#rgba(255, 255, 255, 0.96)", paddingTop:"50%", position:"absolute", zIndex:999,}}>
            <View style={{width:"75%", backgroundColor:"white", padding:50, alignItems:"center", borderWidth:1, borderColor:"black", position:"relative"}}>
                <Text style={{fontSize:40, position:"absolute", right:15}} onPress={()=>{
                    authentication()
                }}>x</Text>
                <Image style={{width: 220, height: 190,  }} source={require('../../../assets/ideia.png')}/>
                <Text style={{fontSize: 18, textAlign:"justify"}}>Para uma postagem é necessário ter um <Text style={{fontWeight:500}}>texto</Text>, assim as informações ficam mais claras.</Text>
            </View>

        </View>
    );
}