import { FormEvent } from 'react';
import {Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './Style';

type AuthButtonProps = {

    authentication: () => void ;
    
}

export default function ErroInternet({authentication}:AuthButtonProps){
    return(
        <View style={styles.viewAllErro}>
            <TouchableOpacity onPress={()=>{
                        authentication()
                    }}>
                        <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
            </TouchableOpacity>
            <View style={styles.viewWifi}>
                <Image style={styles.imgCharactere} source={require('../../../assets/rejeitar.png')}/>
                <Image style={styles.imgCharactereW} source={require('../../../assets/wi-fi.png')}/>
            </View>
            <Text style={styles.textErro}>Verifique sua conexão</Text>
            <Text style={styles.textErroTWO}>com a internet!</Text>
        </View>
    );
}

