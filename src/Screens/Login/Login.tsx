import { StyleSheet, Text, View, Vibration } from 'react-native';
import { Image } from 'expo-image';
import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useAuthLogin } from '../../hooks/useAuthLogin';
import Loading from '../../Components/Loading/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import React from 'react';
import { user } from '../../hooks/useRegister';
import EmailVerification from '../../Components/EmailVerification/EmailVerification';
import { usePostEmailCode } from '../../hooks/usePostEmailCode';
import SendEmail from '../../Components/SendEmail/SendEmail';
import ErroInternet from '../../Components/erroInternet/ErroInternet';
import {registerForPushNotificationsAsync} from "../../Services/Notification";
type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};



export default function Login({navigation}:Props) {

  const {authenticationE} = useAuthLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inforUser, setInforUser] = useState()
  const [reject, setReject] = useState(false)
  const [load, setLoad] = useState(false)
  const [trueCodEmail, setTrueCodEmial] = useState(false)
  const [erroComponent, setErroComponent] = useState(false)

  const authenLogin = () =>{
    setLoad(true)
    const res = authenticationE(email, password)
    res.then(async (data) =>{
      if(data == "user erro"){
        setLoad(false)
        Vibration.vibrate()
        setReject(true)
      }else if(data == "servidor erro"){
       
        setLoad(false)
        setErroComponent(true)
      }else{
        console.log("Aqui Tome:")
        console.log(data.data.id)
        await registerForPushNotificationsAsync(data.data.id)
        setLoad(false)
        setReject(false)
        setInforUser(data)
        await AsyncStorage.setItem('@userInfor', JSON.stringify(data))
        .then(() => {
         
          navigation.navigate('Home')
        })
        .catch((error) => {
          console.error('Erro ao armazenar informações do usuário:', error);
        })
      }
    })
    
  }

  useEffect(()=>{
    AsyncStorage.getItem('@userInfor')
            .then(async (value) => {
              const userInfor = JSON.parse(value!);
              const userInformation:user = userInfor.data
              if(userInformation !== undefined && userInformation!== null){
                registerForPushNotificationsAsync(userInformation.id!)
                navigation.navigate('Home')
              }
                
            })
            .catch((error) => {
              console.error('Erro ao recuperar informações do usuário:', error);
            });
  },[])



  return (
    <View style={styles.allLogin}>
       {trueCodEmail?(
        <SendEmail navigation={()=>{
          setTrueCodEmial(false)
         
        }} functionEmail={()=>{
          setTrueCodEmial(false)
        }}/>
       ):null}
       {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
      <Image style={styles.imgLogin} source={require('../../../assets/Imagens.png')}/>
      
      <View style={styles.inputView}>
        <Input placeholder='Email' value={email} onchange={setEmail} type='emailAddress' Secure={false} reject={reject} Variant='login'/>
        <Input placeholder='Senha' value={password} onchange={setPassword} type='password' Secure={true} reject={reject} Variant='login'/>
        <Text style={styles.inputViewText} onPress={()=>{
          setTrueCodEmial(true)
        }}>Esqueceu a senha?</Text>
        {reject?(
        <Text style={styles.textReject}>E-mail ou senha incorreta</Text>
      ):null}
      
      </View>
      
      <Buttons textButton='Login' Condition={true} authentication={authenLogin}/>
      <Text style={styles.TextButtonBottom} onPress={()=>{
         navigation.navigate('Register')
      }}>Cadastre-se</Text>
      {load?(
        <Loading/>
      ):null}
    </View>
  );
}