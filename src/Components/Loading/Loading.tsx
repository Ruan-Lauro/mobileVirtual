import React from 'react';
import styles from './Style';
import { View, StyleSheet, ActivityIndicator } from 'react-native';


export default function Loading(){

    return(
        <View style={styles.container}>
            <ActivityIndicator size={55} color="#000000"/>
        </View>
    );
}