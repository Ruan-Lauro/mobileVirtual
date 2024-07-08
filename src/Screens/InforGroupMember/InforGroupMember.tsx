import { StyleSheet, Text, View, Image, Vibration, TouchableOpacity } from 'react-native';

import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetWallsGroup, wall} from '../../hooks/useGetWallsGroup'
import { useAddMember } from '../../hooks/useAddMember';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import { RouteProp } from '@react-navigation/native';
import { user } from '../../hooks/useRegister';
import React from 'react';

type InforGroupMemberScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InforGroupMember'>;
type InforGroupMemberScreenRouteProp = RouteProp<RootStackParamList, 'InforGroupMember'>;

type route = {
    params: { id: string;
        name: string;
        created_at: Date;
        imgGroup: string;
        groupCode: number;
        userId: string; };
}

type Props = {
  navigation: InforGroupMemberScreenNavigationProp;
  route: InforGroupMemberScreenRouteProp;
};



export default function InforGroupMember({navigation, route}:Props) {
    
    const { groupChoose } = route.params;
    const [groupMember, setGroupMember] = useState<group>()

    useEffect(()=>{
        if(groupChoose){
           setGroupMember(groupChoose)
          
        }
    },[groupChoose])

    const EnterHome = () =>{
      navigation.navigate('Home')
    }

  return (
    <View style={styles.InforGroupMember}>
        <View style={styles.inforLogoMember}>
          <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')} />
        </View>
        <View style={styles.inforGroupMemberEnter}>
            {groupMember?.imgGroup !== undefined?(
              <Image style={styles.imgGroupMember} source={{ uri: groupMember!.imgGroup }}/>
            ): (
              <Image source={require('../../../assets/trabalho.png')} style={{ width: 160, height: 160, borderRadius: 100,borderWidth: 1, borderColor: "black", alignSelf: "center",}} />
            )}
            <Text style={styles.textGroupMember}>   Bem-Vindo {'\n'}  ao grupo do(a) {groupMember?.name}!</Text>
            <Buttons textButton='Entrar' Condition={true} authentication={EnterHome}/>
        </View>
     
    </View>
  );
}