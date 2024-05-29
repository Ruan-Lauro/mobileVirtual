import { FormEvent } from 'react';
import styles from './Style';
import {Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

type AuthButtonProps = {
    textButton: string;
    authentication: () => void ;
    id?: string;
    Condition: boolean;
  }

export default function Buttons({textButton, authentication, Condition}:AuthButtonProps){
    return(
        <View >
           <TouchableOpacity
                style={Condition ? styles.button : styles.buttonTwo}
                onPress={()=>{
                    authentication()
                }}
                >
                <Text style={Condition ? styles.textButton : styles.textButtonTwo}>{textButton}</Text>
            </TouchableOpacity>
        </View>
    );
}