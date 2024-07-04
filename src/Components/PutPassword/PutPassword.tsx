import { StyleSheet, Text, View, Image, Vibration, TouchableOpacity } from 'react-native';
import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import { useGetUsers } from '../../hooks/useGetUsers';
import React from 'react';
import { usePutUser } from '../../hooks/usePutUser';
import LoadingMax from '../LoadingMax/Loading';
import InforAction from '../InforAction/InforAction';
import ErroInternet from '../erroInternet/ErroInternet';

type emailVerification = {
    email: string,
    navigation: ()=>void,
    authentication: ()=>void;
}



export default function PutPassword({email, navigation, authentication}:emailVerification) {

 const [password, setPassword] = useState("")
 const [confirmPassword, setConfirmPassword] = useState("")
 const [text, setText] = useState("")
 const [inforShow, setInforShow] = useState(false)
 const [textShow, setTextShow] = useState("A senha deve ter oito caracteres")
 const [reject, setReject] = useState(false)
 const {authenticationGetU} = useGetUsers()
 const [loading, setLoading] = useState(false)
 const {authenticationPutU} = usePutUser()
 const [erroComponent, setErroComponent] = useState(false)
 
  const authenCod = () => {
    const userList = authenticationGetU()
    userList.then(value=>{
        if(typeof value !== "string"){
            value.map(valueUser=>{
                if(valueUser.email===email){
                    if(password){
                        if(confirmPassword){
                            if(password === confirmPassword){
                                const userNew = {
                                    id: valueUser?.id!,
                                    password: password!
                                }
                        
                                const profileNew = authenticationPutU(userNew)
                                profileNew.then((valueP)=>{
                                    if(valueP == "User updated successfully."){
                                        setLoading(false)
                                        setPassword("")
                                        setConfirmPassword("")
                                        setTextShow("Senha modificada")
                                        setInforShow(true)
                                    }else if(valueP == "user erro"){
                                        setLoading(false)
                                        return
                                    }else if(valueP == "servidor erro"){
                                        setLoading(false)
                                        setErroComponent(true)
                                    }
                                })
                               
                            }else{
                                setReject(true)
                                setText("O confirmar a nova senha estar diferente")
                                setLoading(false)
                            }
                        }else{
                            setReject(true)
                            setText("Confirme a nova senha")
                            setLoading(false)
                        }
                    }else{
                        setReject(true)
                        setText("Escreva a nova senha")
                        setLoading(false)
                    }
                }
            })
        }else{
            if(value == "user erro"){
                return
            }else if(value == "servidor erro"){
                setErroComponent(true)
            }
        }
    })
  }

  return (
    <View style={styles.allCodGroup}>
        {loading ? <LoadingMax /> : null}
        {erroComponent?(
            <ErroInternet authentication={()=>{
                setErroComponent(false)
                }}/>
            ):null}
        {inforShow?(
            <InforAction authentication={()=>{
                authentication()
            }} textOne='Atualizamos a sua ' textTwo=' Use para login.' textPrinc='senha.'/>
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
      <Image style={styles.imgCharactereCod} source={require('../../../assets/newTra.png')}/>
      <Text style={styles.textCodGroup}>Insira o código {'\n'} que chegou no seu e-mail</Text>
      <View style={styles.viewInputCodgroup}>
        <Input placeholder='Senha' value={password} onchange={setPassword} type='name' Secure={true} reject={reject} Variant='login'/>
        <Input placeholder='Confirmar Senha' value={confirmPassword} onchange={setConfirmPassword} type='name' Secure={true} reject={reject} Variant='login'/>
        {reject?(
          <Text style={styles.textRejectCodGrupo}>{text}</Text>
        ):(
          <Text style={{marginTop: 10,   opacity: 0.6,}}>{textShow}</Text>
        )}
      </View>
      <Buttons textButton='Entrar' Condition={true} authentication={authenCod}/>
      </View>
    </View>
  );
}