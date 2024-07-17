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
    idMural: number,
    navigation: ()=>void,
    authentication: ()=>void;
}



export default function MuralVerification({idMural, navigation, authentication}:emailVerification) {

 const [codMural, setCodMural] = useState("")
 const [reject, setReject] = useState(false)

  const authenCod = () => {
    if(codMural === idMural+""){
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
      <Text style={styles.textCodGroup}>Insira o ID do mural {'\n'} para entrar no mural selecionado</Text>
      <View style={styles.viewInputCodgroup}>
        <Input placeholder='Código' value={codMural} onchange={setCodMural} type='name' Secure={false} reject={reject} Variant='login'/>
        {reject?(
          <Text style={styles.textRejectCodGrupo}>ID invalido</Text>
        ):null}
      </View>
      <Buttons textButton='Entrar' Condition={true} authentication={authenCod}/>
      </View>
    </View>
  );
}