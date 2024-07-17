import { StyleSheet, Text, View, Vibration, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import React from 'react';
import { usePostEmailCode } from '../../hooks/usePostEmailCode';
import EmailVerification from '../EmailVerification/EmailVerification';
import PutPassword from '../PutPassword/PutPassword';

type sendEmailVerification = {
    navigation: ()=>void,
    functionEmail : ()=>void,
}



export default function SendEmail({ navigation, functionEmail, }:sendEmailVerification) {

 const [codEmail, setCodEmail] = useState("")
 const [email, setEmail] = useState("")
 const [reject, setReject] = useState(false)
 const [trueCodEmail, setTrueCodEmial] = useState(false)
 const [truePassword, setTruePassword] = useState(false)
 const {authenticationPEV} = usePostEmailCode()

  const authenCod = () => {
    const cod = authenticationPEV(email)
    cod.then(value=>{
        if(value == "Não passou"){
            setReject(true)
        }else{
            setCodEmail(value)
            setTrueCodEmial(true)
        }
    })
  }


  


  return (
    <View style={styles.allCodGroup}>
     {trueCodEmail && codEmail?(
        <EmailVerification authentication={()=>{
          setTruePassword(true)
          setTrueCodEmial(false)
        }} emailCod={codEmail} navigation={()=>{
          setTrueCodEmial(false)
        }}/>
      ):null}

      {truePassword && email?(
        <PutPassword authentication={()=>{
          functionEmail()
        }} navigation={()=>{
          setTruePassword(false)
        }} email={email}/>
      ):null}

     <View style={styles.inforLogo}>
        <TouchableOpacity onPress={()=>{
          navigation()
        }}>
        <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
        </TouchableOpacity>
        <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')}/>
      </View>
      <View style={styles.viewCodGroupAdd}>
      <Image style={styles.imgCharactereCod} source={require('../../../assets/manha.png')}/>
      <Text style={styles.textCodGroup}>Insira o seu email {'\n'} para que receba o código</Text>
      <View style={styles.viewInputCodgroup}>
        <Input placeholder='Email' value={email} onchange={setEmail} type='name' Secure={false} reject={reject} Variant='login'/>
        {reject?(
          <Text style={styles.textRejectCodGrupo}>Email invalido</Text>
        ):null}
      </View>
      <Buttons textButton='Entrar' Condition={true} authentication={authenCod}/>
      </View>
    </View>
  );
}