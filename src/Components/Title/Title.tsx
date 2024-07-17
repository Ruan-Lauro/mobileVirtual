import styles from './Style';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import {useDeleteMural} from "../../hooks/useDeleteMural";
import React from 'react';

type AuthShowMuralProps = {
    img?: string;
    name: string;
    category: string;
    navigation?: any;
}

export default function Title({ name, img ,category, navigation}: AuthShowMuralProps){

   
   
    return(
        <View style={styles.allTitle}>
            {navigation?(
                <TouchableOpacity style={styles.viewImageTitle} onPress={()=>{
                    navigation.navigate('Profile')
                }}>
                    {img?(
                        <Image  src={img} source={{
                            uri: img,
                            method: 'POST',
                            headers: {
                              Pragma: 'no-cache',
                            },
                            body: 'Your Body goes here',
                          }} style={{ width: 45, height: 45, borderRadius: 100}}/>
                            ):(
                        <Image source={require('../../../assets/pensar.png')} style={{ width: 45, height: 45, borderRadius: 100,borderWidth: 1, borderColor: "black"}} />
                        )}
                        {name && category?(
                            <View style={styles.viewNameTitle}>
                            <Text style={styles.titleOne}>{name}</Text>
                            <Text style={styles.titleTwo}>@{category!.toLowerCase()}</Text>
                        </View>
                    ):null}
                </TouchableOpacity>
            ):(
                <View style={styles.viewImageTitle}>
                    {img?(
                        <Image   src={img} source={{
                            uri: img,
                            method: 'POST',
                            headers: {
                              Pragma: 'no-cache',
                            },
                            body: 'Your Body goes here',
                          }} style={{ width: 45, height: 45, borderRadius: 100}}/>
                            ):(
                        <Image source={require('../../../assets/trabalho.png')} style={{ width: 45, height: 45, borderRadius: 100,borderWidth: 1, borderColor: "black"}} />
                        )}
                        {name && category?(
                            <View style={styles.viewNameTitle}>
                            <Text style={styles.titleOne}>{name}</Text>
                            <Text style={styles.titleTwo}>@{category!.toLowerCase()}</Text>
                        </View>
                    ):null}
                </View>
            )}
            <TouchableOpacity onPress={()=>{

            }} style={styles.imgViewLogo}>
                 <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')} />
            </TouchableOpacity>
        </View>
    );
}