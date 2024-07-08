import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import styles from './Style';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import Buttons from '../../Components/Buttons/Buttons';
import { useState } from 'react';
import { useRegister, user } from '../../hooks/useRegister';
import { useAuthLogin } from '../../hooks/useAuthLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../Components/Loading/Loading';
import React from 'react';
import { usePostEmailCode } from '../../hooks/usePostEmailCode';
import EmailVerification from '../../Components/EmailVerification/EmailVerification';
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type ChooseOneScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChooseOne'>;

type ChooseOneScreenRouteProp = RouteProp<RootStackParamList, 'ChooseOne'>;

type route = {
  params: { name: string; userName: string; email: string; password: string; confirmPassword: string; };
  
}

type Props = {
  navigation: ChooseOneScreenNavigationProp;
  route: ChooseOneScreenRouteProp;
};

const ChooseOne = ({route, navigation}:Props) =>{

  const [chooseUser, setChosseUser] = useState(false)
  const [chooseGroup, setChosseGroup] = useState(false)
  const [codEmail, setCodEmail] = useState("")
  const { NewUser } = route.params;
  const [trueCodEmail, setTrueCodEmial] = useState(false)

  const {authenticationR} = useRegister()
  const {authenticationE} = useAuthLogin()
  const {authenticationPEV} = usePostEmailCode()
  const [rejectRegister, setRejectRegister] = useState(false)
  const [erroComponent, setErroComponent] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectVerification = () =>{
    setLoading(true)
    const code = authenticationPEV(NewUser?.email!)
    code.then((valueCod)=>{
      if(valueCod == "servidor erro"){
        setLoading(false)
        setErroComponent(true)
      }else if(valueCod == "user erro"){
        return
      }
      else{
        setLoading(false)
        setCodEmail(valueCod)
        setTrueCodEmial(true) 
      } 
      
    })
  }


  const selectOption = () =>{
    setLoading(true)
    if(chooseGroup){
      const user:user = {
        name : NewUser?.name!,
        username: NewUser?.userName!,
        email: NewUser?.email!,
        password: NewUser?.password!,
        confirmPassword: NewUser?.confirmPassword!,
        isAdmin: true,
      }
      
      const res = authenticationR(user)
      
      res.then((data) =>{
        if(data == "User created successfully."){
          setRejectRegister(false)
          const res = authenticationE(NewUser!.email!, NewUser!.password!)
          res.then((data) =>{
            if(data === "user erro"){
              setLoading(false)
            }else if(data == "servidor erro"){
              setLoading(false)
              setErroComponent(true)
            }else{
              AsyncStorage.setItem('@userInfor', JSON.stringify(data))
              .then(() => {
                setLoading(false)
              
                navigation.navigate('Group')
              })
              .catch((error) => {
                setLoading(false)
                console.error('Erro ao armazenar informações do usuário:', error);
              });
              
            }
          })
        }else{
          if(data == "user erro"){
            setLoading(false)
            setRejectRegister(true)
          }else if(data == "servidor erro"){
            setErroComponent(true)
            setLoading(false)
          }

        }
      })
    }else if(chooseUser){
      const user:user = {
        name : NewUser?.name!,
        username: NewUser?.userName!,
        email: NewUser?.email!,
        password: NewUser?.password!,
        confirmPassword: NewUser?.confirmPassword!,
        isAdmin: false,
      }
      
      const res = authenticationR(user)
      
      res.then((data) =>{
     
        if(data == "User created successfully."){
          setRejectRegister(false)
          const res = authenticationE(NewUser!.email!, NewUser!.password!)
          res.then((data) =>{
            if(data === "user erro"){
              setLoading(false)
            }else if(data == "servidor erro"){
              setLoading(false)
              setErroComponent(true)
            }else{
              AsyncStorage.setItem('@userInfor', JSON.stringify(data))
              .then(() => {
              
                setLoading(false)
                navigation.navigate('CodGroup')
              })
              .catch((error) => {
                setLoading(false)
                console.error('Erro ao armazenar informações do usuário:', error);
              });
              
            }
          })
        }else{
          if(data == "user erro"){
            setLoading(false)
            setRejectRegister(true)
          }if(data == "servidor erro"){
            setErroComponent(true)
            setLoading(false)
            
          }

        }
        
      })
    }
  }
  
  return (
    <View style={styles.allChooseOne}>
      {loading?(
        <Loading/> 
      ):null}
      {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
      {trueCodEmail && codEmail?(
        <EmailVerification authentication={()=>{
          selectOption()
          setTrueCodEmial(false)
        }} emailCod={codEmail} navigation={()=>{
            setTrueCodEmial(false)
        }}/>
      ):null}
      
      <View style={styles.inforLogo}>
        <TouchableOpacity onPress={()=>{
          navigation.goBack()
        }}>
        <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
        </TouchableOpacity>
        <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')}/>
      </View>
      <View style={styles.chooseOneOptions}>
        <Text style={styles.textChoose}>Como você quer se cadastrar?</Text>
        <View style={styles.chooseOneCharacter}>
         
          <Image style={styles.Character} source={require('../../../assets/EscolhaUm.png')}/>
          <TouchableOpacity onPress={() => {
            setChosseUser(true) 
            setChosseGroup(false)
          }}>
            <View style={styles.ChooseUserView}>
              <Text>Usuário</Text>
              {chooseUser ? (
                <Image style={styles.ChooseUser} source={require('../../../assets/perfilPintado.png')}/>
              ) : (
                <Image style={styles.ChooseUser} source={require('../../../assets/perfil.png')}/>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            setChosseUser(false) 
            setChosseGroup(true)
          }}>
            <View  style={styles.ChooseGroupView} >
              <Text>Grupo</Text>
              {chooseGroup?(
                <Image style={styles.ChooseGroup} source={require('../../../assets/GrupoPreto.png')}/>
              ):(
                <Image style={styles.ChooseGroup} source={require('../../../assets/grupon.png')}/>
              )}
            </View>
          </TouchableOpacity>
          
        </View>
        {chooseGroup || chooseUser?(
          <View style={styles.ButtomChoose}>
          <Buttons textButton='Selecionar' Condition={true} authentication={selectVerification}/>
         </View>
         
        ):null}
        {rejectRegister?(
          <Text style={styles.rejectRegister}>Usuário já existente</Text>
        ):null}
      </View>
    </View>
  );
}

export default ChooseOne