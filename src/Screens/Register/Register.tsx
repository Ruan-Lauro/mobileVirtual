
import { StyleSheet, Text, View, Image, Vibration } from 'react-native';
import styles from './Style';
import Input from '../../Components/Inputs/Inputs';
import { useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import React from 'react';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};


export default function Register({navigation}:Props) {



  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [rejectName, setRejectName] = useState(false)
  const [rejectUserName, setRejectUserName] = useState(false)
  const [rejectEmail, setRejectEmail] = useState(false)
  const [rejectPassword, setRejectPassword] = useState(false)
  const [rejectConfirmPassword, setRejectConfirmPassword] = useState(false)

  const [incompleteInput, setIncompleteInput] = useState("Preencha todos os campos")
  const [passwordNo8, setPasswordNo8] = useState("Sua senha tem que ter oito digitos")
  const [passwordDifferent, setPasswordDifferent] = useState("As senhas estão diferentes")
  const [emailDifferent, setEmailDifferent] = useState("Seu email não estar no formato")

  const [textAlert, setTextAlert] = useState("Sua senha deve conter oito digitos")
  const [buttonActive, setButtonActive] = useState(false)

  const authenRegister = () =>{
    setButtonActive(true)
    if(name.trim() === "" && userName.trim()==="" && email.trim() === "" && password.trim() === "" && confirmPassword.trim() === ""){
      setRejectName(true)
      setRejectUserName(true)
      setRejectEmail(true)
      setRejectPassword(true)
      setRejectConfirmPassword(true)
      setTextAlert(incompleteInput)
      Vibration.vibrate()
    }else if(name.trim() === ''){
      setRejectName(true)
      setTextAlert(incompleteInput)
      setRejectUserName(false)
      setRejectEmail(false)
      setRejectPassword(false)
      setRejectConfirmPassword(false)
      Vibration.vibrate()
    }else if(userName.trim() === ""){
      setRejectUserName(true)
      setTextAlert(incompleteInput)
      setRejectName(false)
      setRejectEmail(false)
      setRejectPassword(false)
      setRejectConfirmPassword(false)
      Vibration.vibrate()
    }else if(email.trim() === "" || email.indexOf('@') == -1){
      setRejectEmail(true)
      if(email.indexOf('@') == -1){
        setTextAlert(emailDifferent)
      }else{
        setTextAlert(incompleteInput)
      }
      setRejectName(false)
      setRejectUserName(false)
      setRejectPassword(false)
      setRejectConfirmPassword(false)
      Vibration.vibrate()
    }else if(password.trim() === ""){
      setRejectPassword(true)
      setTextAlert(incompleteInput)
      setRejectName(false)
      setRejectUserName(false)
      setRejectEmail(false)
      setRejectConfirmPassword(false)
      Vibration.vibrate()
    }else if(confirmPassword.trim() === ""){
      setRejectConfirmPassword(true)
      setTextAlert(incompleteInput)
      setRejectName(false)
      setRejectUserName(false)
      setRejectEmail(false)
      setRejectPassword(false)
      Vibration.vibrate()
    }else if(password !== confirmPassword){
      setRejectConfirmPassword(true)
      setRejectPassword(true)
      setTextAlert(passwordDifferent)
      Vibration.vibrate()
    }else if(password.length < 8){
      setRejectPassword(true)
      setTextAlert(passwordNo8)
      Vibration.vibrate()
    }else{
      setRejectName(false)
      setRejectUserName(false)
      setRejectEmail(false)
      setRejectPassword(false)
      setRejectConfirmPassword(false)
      const NewUser = {
        name,
        userName,
        email,
        password,
        confirmPassword
      }

      navigation.navigate('ChooseOne', { NewUser: { name, userName, email, password, confirmPassword } });


    }
  }

  return (
    <View style={styles.allRegister}>
      <Image style={styles.imgRegister} source={require('../../../assets/Imagens.png')}/>
      <View style={styles.inputViewRegister}>
        <Input placeholder='Nome' value={name} onchange={setName} type='name' Secure={false} reject={rejectName} Variant='register'/>
        <Input placeholder='Apelido' value={userName} onchange={setUserName} type='nickname' Secure={false} reject={rejectUserName} Variant='register'/>
        <Input placeholder='Email' value={email} onchange={setEmail} type='emailAddress' Secure={false} reject={rejectEmail} Variant='register'/>
        <Input placeholder='Senha' value={password} onchange={setPassword} type='password' Secure={true} reject={rejectPassword} Variant='register'/>
        <Input placeholder='Confirme sua Senha' value={confirmPassword} onchange={setConfirmPassword} type='password' Secure={true} reject={rejectConfirmPassword} Variant='register'/>
        {buttonActive? (name.trim()!== "" && userName.trim()!=="" && email.trim() !== "" && password.trim() !== "" && confirmPassword.trim()!== "" && password.length >= 8 && password === confirmPassword && email.indexOf("@") !== -1?(
        <Text style={styles.TextInforRegister}>Sua senha deve conter oito digitos</Text>
      ): <Text style={styles.TextInforRegisterAlert}>{textAlert}</Text>):<Text style={styles.TextInforRegister}>Sua senha deve conter oito digitos</Text>}
      </View>
      <Buttons textButton='Cadastrar' Condition={true} authentication={authenRegister}/>
      <Text style={styles.TextButtonBottom} onPress={()=>{
         navigation.navigate("Login")
      }}>Já tem conta? Voltar</Text> 
    </View>
  );
}