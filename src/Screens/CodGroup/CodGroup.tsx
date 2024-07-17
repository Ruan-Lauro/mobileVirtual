import { StyleSheet, Text, View, Vibration, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import React from 'react';
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type CodGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CodGroup'>;

type Props = {
  navigation: CodGroupScreenNavigationProp;
};



export default function CodGroup({navigation}:Props) {

  const [codGroup, setGroup] = useState("")
  const [reject, setReject] = useState(false)
  const [erroComponent, setErroComponent] = useState(false)
  const {authenticationG} = useGetGroup()

  const authenCod = () => {
    if (codGroup !== "") {
      setReject(false)
      const groups = authenticationG()
      const chooseGroup = groups.then((data)=>{
        if(typeof data !== "string"){
          const group = data.filter((value)=> value.groupCode === parseInt(codGroup))
          
          if(group.length !== 0){
            group.map((date)=>{
              navigation.navigate('ChooseCategory', {groupChoose: {id: date.id, name: date.name, created_at: date.created_at, imgGroup: date.imgGroup, groupCode: date.groupCode, userId: date.userId}})
            })
          }else{
            setReject(true)
          }
        }else{
          if(data == "user erro"){
            return
          }else if(data == "servidor erro"){
            setErroComponent(true)
          } 
        }
        
      })
      
    }
  }

  return (
    <View style={styles.allCodGroup}>
     <View style={styles.inforLogo}>
     {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
        <TouchableOpacity onPress={()=>{
          navigation.goBack()
        }}>
        <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
        </TouchableOpacity>
        <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')}/>
      </View>
      <View style={styles.viewCodGroupAdd}>
      <Image style={styles.imgCharactereCod} source={require('../../../assets/cafeteria.png')}/>
      <Text style={styles.textCodGroup}>Insira o código do seu grupo.{'\n'} Para que você entre no mural correto</Text>
      <View style={styles.viewInputCodgroup}>
        <Input placeholder='Código' value={codGroup} onchange={setGroup} type='password' Secure={false} reject={reject} Variant='login'/>
        {reject?(
          <Text style={styles.textRejectCodGrupo}>Código do grupo inválido</Text>
        ):null}
      </View>
      <Buttons textButton='Entrar' Condition={true} authentication={authenCod}/>
      </View>
    </View>
  );
}