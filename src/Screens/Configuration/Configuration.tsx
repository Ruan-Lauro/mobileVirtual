import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import MenuTab from '../../Components/MenuTab';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import styles from './Style';

type ChooseGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Configuration'>;


type Props = {
  navigation: ChooseGroupScreenNavigationProp;
};

export default function Configuration({navigation}:Props) {

  return (
    <View style={styles.allConfiguration}>
        <Text> Configuração</Text>
        <View style={{position:"absolute", width:"100%", bottom: 0, paddingBottom: 20, alignItems:"center", }}>
          <MenuTab navigation={navigation} five/>
        </View>
    </View>
  );
}