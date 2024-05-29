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
  const { NewUser } = route.params;

  const {authenticationR} = useRegister()
  const {authenticationE} = useAuthLogin()
  const [rejectRegister, setRejectRegister] = useState(false)

  const [loading, setLoading] = useState(false)

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
            if(data === "Não passou"){
              setLoading(false)
              console.log("Não passou")
              
            }else{
              AsyncStorage.setItem('@userInfor', JSON.stringify(data))
              .then(() => {
                setLoading(false)
                console.log('Informações do usuário armazenadas com sucesso.');
                navigation.navigate('Group')
              })
              .catch((error) => {
                setLoading(false)
                console.error('Erro ao armazenar informações do usuário:', error);
              });
              
            }
          })
        }else{
          setLoading(false)
          setRejectRegister(true)

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
        console.log(data)
        if(data == "User created successfully."){
          setRejectRegister(false)
          const res = authenticationE(NewUser!.email!, NewUser!.password!)
          res.then((data) =>{
            if(data === "Não passou"){
              setLoading(false)
              console.log("Não passou")
              
            }else{
              
              AsyncStorage.setItem('@userInfor', JSON.stringify(data))
              .then(() => {
                console.log('Informações do usuário armazenadas com sucesso.');
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
          setLoading(false)
          setRejectRegister(true)

        }
        
      })
    }
  }
  
  return (
    <View style={styles.allChooseOne}>
      {loading?(
        <Loading/> 
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
          <Buttons textButton='Selecionar' Condition={true} authentication={selectOption}/>
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