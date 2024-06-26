import styles from './Style';
import { View, StyleSheet, Image, Text } from 'react-native';
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
}

export default function ShowMural({img, authentication, name, idMural, canceled, category}: AuthShowMuralProps){
   
    return(
        <View style={styles.ShowMural}>
            <View style={styles.ShowMuralInfor}>
                <Image source={{ uri: img }} style={styles.ShowMuralImg}/>
                <View style={styles.ShowMuralViewText}>
                    <Text style={styles.ShowMuralText}>{name}</Text>
                    {name!== undefined?(
                        <>
                            {category!== undefined?(
                                <Text style={styles.ShowMuralTextSecond} >@{category.toLowerCase()}</Text>
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