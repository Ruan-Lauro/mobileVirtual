import { StyleSheet, Text, View, Image, Vibration, TouchableOpacity } from 'react-native';
import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user } from '../../hooks/useRegister';
import { usePostEmailCode } from '../../hooks/usePostEmailCode';
import EmailVerification from '../../Components/EmailVerification/EmailVerification';
import { usePutUser } from '../../hooks/usePutUser';
import { useGetUsers } from '../../hooks/useGetUsers';
import LoadingMax from '../../Components/LoadingMax/Loading';
import { useAuthLogin } from '../../hooks/useAuthLogin';
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type CodGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccessKey'>;

type Props = {
  navigation: CodGroupScreenNavigationProp;
};



export default function AccessKey({navigation}:Props) {

 const [user, setUser] = useState<user>()
 const [email, setEmail] = useState("")
 const [trueEmail, setTrueEmail] = useState(false)
 const [newEmail, setNewEmail] = useState("")
 const [codEmail, setCodEmail] = useState("")
 const [trueCodEmail, setTrueCodEmial] = useState(false)
 const [password, setPassword] = useState("")
 const [truePassword, setTruePassword] = useState(false)
 const [newPassword, setNewPassword] = useState("")
 const [confirmNewPassword, setConfirmNewPassword] = useState("")
 const [reject, setReject] = useState(false)
 const [textReject, setTextReject] = useState("")
 const [loading,setLoading] = useState(false)
 const [text, setText] = useState("º A senha deve conter oito caracteres")
 const [erroComponent, setErroComponent] = useState(false)

 const {authenticationPEV} = usePostEmailCode()
 const {authenticationPutU} = usePutUser()
 const {authenticationGetU} = useGetUsers()
 const {authenticationE} = useAuthLogin()

  useEffect(() => {
    AsyncStorage.getItem('@userInfor')
        .then(async (value) => {
            const userInfor = JSON.parse(value!)
            const userInformation: user = userInfor.data
            setUser(userInformation)
        })
}, []);

  const authenCod = () => {
    setReject(false)
    if(email){
        if(email === user?.email){
           if(newEmail){
                if(newEmail !== email){
                    const codEmail = authenticationPEV(newEmail)
                    codEmail.then(value=>{
                        setCodEmail(value)
                        setTrueCodEmial(true)
                        setReject(false)
                    })
                   
                }else{
                    setReject(true)
                    setTextReject("Emails iguais!")
                    setLoading(false)
                }
           }else{
            setReject(true)
            setTextReject("Escreva o novo email")
            setLoading(false)
           }
        }else{
            setReject(true)
            setTextReject("E-mail incorreto")
            setLoading(false)
        }
    } else if(password){
        if(newPassword){
            if(confirmNewPassword){
                if(newPassword === confirmNewPassword){
                    const res = authenticationE(user!.email, password)
                    res.then(async (data) =>{
                        if(data == "user erro"){
                            setReject(true)
                            setTextReject("Senha não condiz")
                        }else if(data == "servidor erro"){
                            setErroComponent(true)
                        }else{
                            if(newPassword !== password){
                                const userNew = {
                                    id: user?.id!,
                                    password: newPassword!
                                }
                        
                                const profileNew = authenticationPutU(userNew)
                                profileNew.then((valueP)=>{
                                    if(valueP == "User updated successfully."){
                                        setLoading(false)
                                        setTruePassword(false)
                                        setPassword("")
                                        setConfirmNewPassword("")
                                        setNewPassword("")
                                        setText("Senha modificada")
                                    }
                                })
                            }else{
                                setReject(true)
                                setTextReject("Senha já usada")
                                setLoading(false)
                            }
                        }
                      })
                   
                }else{
                    setReject(true)
                    setTextReject("O confirmar a nova senha estar diferente")
                    setLoading(false)
                }
            }else{
                setReject(true)
                setTextReject("Confirme a nova senha")
                setLoading(false)
            }
        }else{
            setReject(true)
            setTextReject("Escreva a nova senha")
            setLoading(false)
        }
    }
  }

  const emailConfirm = () =>{
    if(email && password){
        if(newPassword){
            if(confirmNewPassword){
                if(newPassword === confirmNewPassword){
                    const res = authenticationE(user!.email, password)
                    res.then(async (data) =>{
                        if(data == "user erro"){
                            setReject(true)
                            setTextReject("Senha não condiz")
                        }else if(data == "servidor erro"){
                            setErroComponent(true)
                        }else{
                            if(newPassword !== password){
                                const userNew = {
                                    id: user?.id!,
                                    password: newPassword!,
                                    email: newEmail
                                }
                        
                                const profileNew = authenticationPutU(userNew)
                                profileNew.then((valueP)=>{
                                    if(valueP == "User updated successfully."){
                                        const listUsers = authenticationGetU()
                                        listUsers.then((valueUser)=>{
                                            if(typeof valueUser !== "string"){
                                                valueUser.map(async value=>{
                                                    let userVal = user!.id
                                                    if(value.id == userVal){
                                                    if(value){
                                                        const data = {
                                                        data: value,
                                                        }
                                                    await AsyncStorage.setItem('@userInfor', JSON.stringify(data))
                                                    .then(() => {
                                                        setUser(value)
                                                        setLoading(false)
                                                        setTrueEmail(false)
                                                        setEmail("")
                                                        setNewEmail("")
                                                        setText("Senha e email modificados")
                                                        setLoading(false)
                                                        setTruePassword(false)
                                                        setPassword("")
                                                        setConfirmNewPassword("")
                                                        setNewPassword("")
                                                        
                                                    })
                                                    .catch((error) => {
                                                        console.error('Erro ao armazenar informações do usuário:', error);
                                                    });
                                                    }
                                                    }
                                                })
                                            }else{
                                                if(valueUser == "user erro"){
                                                    setLoading(false)
                                                    return
                                                }else if(valueUser == "servidor erro"){
                                                    setLoading(false)
                                                    setErroComponent(true)
                                                }
                                            }
                                        })
                                        
                                    }
                                })
                            }else{
                                setReject(true)
                                setTextReject("Senha já usada")
                                setLoading(false)
                            }
                        }
                      })
                   
                }else{
                    setReject(true)
                    setTextReject("O confirmar a nova senha estar diferente")
                    setLoading(false)
                }
            }else{
                setReject(true)
                setTextReject("Confirme a nova senha")
                setLoading(false)
            }
        }else{
            setReject(true)
            setTextReject("Escreva a nova senha")
            setLoading(false)
        }
    }else{
        const userNew = {
            id: user?.id!,
            email: newEmail!
        }

        const profileNew = authenticationPutU(userNew)
        profileNew.then((valueP)=>{
            if(valueP == "User updated successfully."){
                const listUsers = authenticationGetU()
                listUsers.then((valueUser)=>{
                    if(typeof valueUser !== "string"){
                        valueUser.map(async value=>{
                            let userVal = user!.id
                            if(value.id == userVal){
                            if(value){
                                const data = {
                                data: value,
                                }
                            await AsyncStorage.setItem('@userInfor', JSON.stringify(data))
                            .then(() => {
                                setUser(value)
                                setLoading(false)
                                setTrueEmail(false)
                                setEmail("")
                                setNewEmail("")
                                setText("Email modificado")
                            })
                            .catch((error) => {
                                console.error('Erro ao armazenar informações do usuário:', error);
                            });
                            }
                            }
                        })
                    }else{
                        if(valueUser == "user erro"){
                            setLoading(false)
                            return
                        }else if(valueUser == "servidor erro"){
                            setLoading(false)
                            setErroComponent(true)
                        }
                    }
                })
            }
        })

    }
  }



  return (
    <View style={styles.allCodGroup}>
        {trueCodEmail && codEmail?(
        <EmailVerification authentication={()=>{
          emailConfirm()
          setTrueCodEmial(false)
        }} emailCod={codEmail} navigation={()=>{
            setTrueCodEmial(false)
        }}/>
      ):null}
       {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
      {loading?(
        <LoadingMax/>
      ):null}

     <View style={styles.inforLogo}>
        <TouchableOpacity onPress={()=>{
          navigation.goBack()
        }}>
        <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
        </TouchableOpacity>
        <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')}/>
      </View>
      <View style={styles.viewCodGroupAdd}>
      <Image style={styles.imgCharactereCod} source={require('../../../assets/investigacao.png')}/>
      <Text style={styles.textCodGroup}>Edite sua senha, e-mail ou só um.{'\n'} Deixe em branco o que não for editar </Text>
      <View style={styles.viewInputCodgroup}>
        <Input placeholder='E-mail' value={email} onchange={setEmail} type='password' Secure={false} reject={reject} Variant='register' onPress={()=>{
            setTrueEmail(true)
        }}/>
        {trueEmail?(
            <Input placeholder='E-mail novo' value={newEmail} onchange={setNewEmail} type='password' Secure={false} reject={reject} Variant='register'/>
        ):null}
        <Input placeholder='Senha' value={password} onchange={setPassword} type='password' Secure={true} reject={reject} Variant='register' onPress={()=>{
            setTruePassword(true)
        }} />
       {truePassword?(
        <>
             <Input placeholder='Nova senha' value={newPassword} onchange={setNewPassword} type='password' Secure={true} reject={reject} Variant='register'/>
             <Input placeholder='Confirme a nova senha' value={confirmNewPassword} onchange={setConfirmNewPassword} type='password' Secure={true} reject={reject} Variant='register'/>
        </>
       ):null}
        {reject?(
          <Text style={styles.textRejectCodGrupo}>{textReject}</Text>
        ):(
            <Text style={{marginTop: 10,   opacity: 0.6,}}>{text}</Text>
        )}
      </View>
      <Buttons textButton='Editar' Condition={true} authentication={authenCod}/>
      </View>
    </View>
  );
}