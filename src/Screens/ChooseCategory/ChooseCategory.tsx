import { StyleSheet, Text, View, Image, Vibration, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetWallsGroup, wall} from '../../hooks/useGetWallsGroup'
import { useAddMember } from '../../hooks/useAddMember';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import { RouteProp } from '@react-navigation/native';
import { user } from '../../hooks/useRegister';
import React from 'react';
import { useGetMembers } from '../../hooks/useGetMembers';
import { useGetMurals } from '../../hooks/useGetMurals';
import MuralVerification from '../../Components/MuralVerification/MuralVerification';
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type ChooseCategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChooseCategory'>;
type ChooseCategoryScreenRouteProp = RouteProp<RootStackParamList, 'ChooseCategory'>;

type route = {
    params: { id: string;
        name: string;
        created_at: Date;
        imgGroup: string;
        groupCode: number;
        userId: string; };
  }

type Props = {
  navigation: ChooseCategoryScreenNavigationProp;
  route: ChooseCategoryScreenRouteProp;
};

type ChooseOneScreenRouteProp = RouteProp<RootStackParamList, 'ChooseCategory'>;


export default function ChooseCategory({navigation, route}:Props) {

    const { groupChoose } = route.params;
    const [user, setUser] = useState<user>()
    const [group, setGroup] = useState<group>()
    const [selectCategory, setSelectCategory] = useState("")
    const [erroMember, setErroMember] = useState(false)
    const [erroText, setErroText] = useState("")
    const [trueMemberMural, setTrueMemberMural] = useState(false)
    const [idMural, setIdMural] = useState<number>()
    const [erroComponent, setErroComponent] = useState(false)
    const {authenticationWG} = useGetWallsGroup()
    const {authenticationAddM} = useAddMember()
    const {authenticationGetM} = useGetMembers()
    const {authenticationGetMU} = useGetMurals()



    const [walls, setWalls] = useState<wall[]>([])

    useEffect(()=>{
        if(groupChoose){
            AsyncStorage.getItem('@userInfor')
            .then((value) => {
              if (value) {
                const wallsGet = authenticationWG(groupChoose.id)
                wallsGet.then((data:wall[]| string)=>{
                  
                    if(data === "user erro"){
                      setErroMember(true)
                      setErroText("Não tem nenhum mural aqui!")
                    }else if(data == "servidor erro"){
                      setErroComponent(true)
                    }else{
                      if(Array.isArray(data)){
                        setWalls(data)  
                      }
                    }
                    
                }).catch(()=>{
                  
                })
                const userInformation = JSON.parse(value);
                setUser(userInformation.data)
                setGroup(groupChoose)
              } else {
                console.log('Nenhuma informação do usuário encontrada.');
              }
            })
            .catch((error) => {
              console.error('Erro ao recuperar informações do usuário:', error);
            });
        }
    },[groupChoose])

    const authenCategory = () =>{
        if(selectCategory){
            const listMember = authenticationGetM()
            listMember.then(valueListMember=>{
              if(typeof valueListMember !== "string"){
                if(valueListMember.map!== undefined){
                  const memberUser = valueListMember.find(valueMember=> valueMember.userId == user?.id && valueMember.groupId == group?.id)
                  if(!memberUser){
                    const MuralList = authenticationGetMU()
                    const numSelect = parseInt(selectCategory)
                    MuralList.then(valueMuralList=>{
                      if(typeof valueMuralList !== "string"){
                        valueMuralList.map(valueList=>{
                          if(valueList.id == numSelect){
                            if(valueList.isPrivate){
                              setTrueMemberMural(true)
                              setIdMural(valueList.id!)
                            }else{
                             let cod = `${group?.id}!${numSelect}`
                             const res = authenticationAddM(user?.id!, cod)
                             res.then((data)=>{
                               if(data = 'Member created successfully.'){
                                 navigation.navigate('InforGroupMember', {groupChoose: {id: group!.id, name: group!.name, created_at: group!.created_at, imgGroup: group!.imgGroup, groupCode: group!.groupCode, userId: group!.userId}})
                               }else{
                                 if(data == "user erro"){
                                    setErroMember(true)
                                    setErroText("Usuário já cadastrado nesse grupo")
                                 }else if(data == "servidor erro"){
                                    setErroComponent(true)
                                 }
                               }
                             })
                            }
                          }
                        })
                      }else{
                        if(valueMuralList == "user erro"){
                          return
                        }else if(valueMuralList == "servidor erro"){
                          setErroComponent(true)
                        }
                      }
                    })
                   
                  }else{
                    setErroMember(true)
                    setErroText("Usuário já cadastrado nesse grupo")
                  }
                }
              }else{
                if(valueListMember == "user erro"){
                  return 
                }else if( valueListMember == "servidor erro"){
                  setErroComponent(true)
                }
              }
            })
            
        }
    }

    const AuthenMuralPrivate = () =>{
      if(selectCategory){
        const listMember = authenticationGetM()
        listMember.then(valueListMember=>{
          if( typeof valueListMember !== "string"){
            if(valueListMember.map!== undefined){
              const memberUser = valueListMember.find(valueMember=> valueMember.userId == user?.id && valueMember.groupId == group?.id)
              if(!memberUser){
                const numSelect = parseInt(selectCategory)
                let cod = `${group?.id}!${numSelect}`
                           const res = authenticationAddM(user?.id!, cod)
                           res.then((data)=>{
                             if(data = 'Member created successfully.'){
                                navigation.navigate('InforGroupMember', {groupChoose: {id: group!.id, name: group!.name, created_at: group!.created_at, imgGroup: group!.imgGroup, groupCode: group!.groupCode, userId: group!.userId}})
                             }else{
                                if(data == "user erro"){
                                  setErroMember(true)
                                  setErroText("Algum problema na criação")
                                }else if(data == "servidor erro"){
                                    setErroComponent(true)
                                }
                             }
                           })
               
              }else{
                setErroMember(true)
                setErroText("Usuário já cadastrado nesse grupo")
              }
            }
          }else{
            if(valueListMember == "user erro"){
              return
            }else if (valueListMember == "servidor erro"){
              setErroComponent(true)
            }
          }
        })
        
    }
    }
    

  return (
    <View style={styles.allChooseCategory}>
       {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
      {trueMemberMural && idMural?(
        <MuralVerification authentication={()=>{
          AuthenMuralPrivate()
          setTrueMemberMural(false)
        }} idMural={idMural} navigation={()=>{
          setTrueMemberMural(false)
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
      <View style={styles.choosecategoryselectNew}>
        <Text style={{fontSize:40, alignSelf:"center"}}>?</Text>
        <Image style={styles.imgChooseCategory} source={require('../../../assets/ler.png')}/>
        <Text style={styles.textSelectChooseCategory}>Qual categoria você vai escolher destes murais? </Text>
        {Array.isArray(walls) && walls.length > 0? (
        <View style={styles.viewSelectChooseCategory}>
            <RNPickerSelect
          onValueChange={(value) => setSelectCategory(value)}
          value={selectCategory}
          items={walls.map(item => ({ label: item.name, value: item.id }))}
          style={{
            inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                color: 'black',
            },
            inputAndroid: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                color: 'black',
            },
            
          }}
          placeholder={{
            label: 'Selecione uma categoria...',
            value: null,
            color: '#9EA0A4',
            font: 16,
          }}
          
        />
        </View>
      ): null}
      {(erroMember)?(
        <Text style={walls.length == 0?(styles.TextErroMemberN):(styles.TextErroMember)}>{erroText}</Text>
      ):null}
       <View style={{alignSelf:"center", marginBottom:30,}}>
        <Buttons textButton='Entrar' Condition={true} authentication={authenCategory}/>
       </View>
      </View>
     
    </View>
  );
}