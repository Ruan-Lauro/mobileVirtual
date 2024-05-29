import React from 'react';
import styles from './Style';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

type loading ={
    type?: boolean;
}

export default function LoadingMax({type}:loading){

    return(
        <View style={(styles.container)}>
            <ActivityIndicator size={55} color="#000000"/>
        </View>
    );
}