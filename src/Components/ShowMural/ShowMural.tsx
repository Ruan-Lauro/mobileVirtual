import styles from './Style';
import { View, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import {useDeleteMural} from "../../hooks/useDeleteMural";
import React from 'react';
import { TouchableOpacity } from 'react-native';

type AuthShowMuralProps = {
    img: string;
    authentication: () => void ;
    name: string;
    idMural: number | string;
    canceled: boolean;
    category?: string,
    textSecond?: boolean,
}

export default function ShowMural({img, authentication, name, idMural, canceled, category, textSecond}: AuthShowMuralProps){
   
    return(
        <View style={styles.ShowMural}>
            <View style={styles.ShowMuralInfor}>
                <Image source={{ uri: img }} style={styles.ShowMuralImg}/>
                <View style={styles.ShowMuralViewText}>
                    <Text style={styles.ShowMuralText}>{name}</Text>
                    {name!== undefined?(
                        
                        <>
                            {category!== undefined?(
                               <>
                                 {textSecond?(
                                     <Text style={styles.ShowMuralTextSecond} >ID:{category.toLowerCase()}</Text>
                                 ):(
                                     <Text style={styles.ShowMuralTextSecond} >@{category.toLowerCase()}</Text>
                                 )}
                               </>
                            ):(
                                <Text style={styles.ShowMuralTextSecond} >@{name.toLowerCase()}</Text>
                            )}
                        </>
                    ):null}
                </View>
            </View>
            {canceled?(
                <TouchableOpacity onPress={()=>{
                    
                    authentication()
                }}>
                    <Image source={require('../../../assets/cardapio.png')} style={{ width: 20, height: 20, marginRight: 15}} />
                </TouchableOpacity>
            ): null}
        </View>
    );
}