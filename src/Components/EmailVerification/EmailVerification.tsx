import { StyleSheet, Text, View, Vibration, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import React from 'react';

type emailVerification = {
    emailCod: string,
    navigation: ()=>void,
    authentication: ()=>void;
}



export default function EmailVerification({emailCod, navigation, authentication}:emailVerification) {

 const [codEmail, setEmail] = useState("")
 const [reject, setReject] = useState(false)

  const authenCod = () => {
    if(codEmail === emailCod){
        authentication()
    }else{
        setReject(true)
    }
  }

  return (
    <View style={styles.allCodGroup}>
     <View style={styles.inforLogo}>
        <TouchableOpacity onPress={()=>{
          navigation()
        }}>
        <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
        </TouchableOpacity>
        <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')}/>
      </View>
      <View style={styles.viewCodGroupAdd}>
      <Image style={styles.imgCharactereCod} source={require('../../../assets/preguicoso.png')}/>
      <Text style={styles.textCodGroup}>Insira o código {'\n'} que chegou no seu e-mail</Text>
      <View style={styles.viewInputCodgroup}>
        <Input placeholder='Código' value={codEmail} onchange={setEmail} type='name' Secure={false} reject={reject} Variant='login'/>
        {reject?(
          <Text style={styles.textRejectCodGrupo}>Código invalido</Text>
        ):null}
      </View>
      <Buttons textButton='Entrar' Condition={true} authentication={authenCod}/>
      </View>
    </View>
  );
}