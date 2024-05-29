import { StyleSheet, Text, View, Image, Vibration, TouchableOpacity, ScrollView } from 'react-native';


import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import LoadingMax from '../../Components/LoadingMax/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetWallsGroup, wall} from '../../hooks/useGetWallsGroup'

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import { user } from '../../hooks/useRegister';
import Title from '../../Components/Title/Title'

import React from 'react';
import TabRoutes from '../../Navigation/tab.routes';
import ShowMural from '../../Components/ShowMural/ShowMural';
import { useGetGroupUserId } from '../../hooks/useGetGroupUserId';
import {useGetMembers, member} from '../../hooks/useGetMembers'
import { RouteProp } from '@react-navigation/native';
import MenuTab from '../../Components/MenuTab';

type ChooseMuralScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChooseGroup'>;

type  InforGroupMemberScreenRouteProp = RouteProp<RootStackParamList, 'InforGroupMember'>;

type route = {
    params: { id: string;
        name: string;
        created_at: Date;
        imgGroup: string;
        groupCode: number;
        userId: string; };
}

type Props = {
  navigation: ChooseMuralScreenNavigationProp;
  route: InforGroupMemberScreenRouteProp;
};


export default function ChooseMural({navigation, route}:Props) {

  const {authenticationWG} = useGetWallsGroup()
  const {authenticationGetM} = useGetMembers()

  const [loading, setLoading] = useState(true)
  const [listMurais, setListMurais] = useState<wall[]>([])
  const [user , setUser] = useState<user>()
  const [userMember, setUserMember] = useState<member>()
  const [userGroup, setUserGroup] = useState<group>()

  const { groupChoose } = route.params;

  useEffect(()=>{
    AsyncStorage.getItem('@userInfor')
        .then(async (value) => {
          
            const userInfor = JSON.parse(value!);
            const userInformation:user = userInfor.data
            setUser(userInformation)
            
            if(groupChoose){
                setUserGroup(groupChoose)
                const listMural = authenticationWG(groupChoose.id)
                listMural.then(value=>{
                    setListMurais(value)
                    const ListMember = authenticationGetM()
                    if(userInformation){
                      console.log("Aqui")
                      if(userInformation.isAdmin){
                        setLoading(false)
                    }else{
                       if(value.map !== undefined){
                        value.map(valueMural =>{
                          ListMember.then(valueMember => {
                              if(valueMember.map !== undefined){
                                valueMember.map(valueMemberList =>{
                                  if(groupChoose.id == valueMemberList.groupId && valueMural.category == valueMemberList.category && valueMemberList.userId == userInformation.id){
                                      console.log(valueMemberList)
                                      setUserMember(valueMemberList)
                                      setLoading(false)
                                  }   
                              })
                              }
                          })
                      })
                       }
                    }
                    }
                })
            }
            
        })
        .catch((error) => {
          console.error('Erro ao recuperar informações do usuário:', error);
        });
  },[])

    

  return (
    <View style={styles.allChooseMural}>
       {loading?(
         <LoadingMax/>
       ): null}
        {user && userGroup && listMurais.length!== 0 && listMurais.map !== undefined?(
          <>
            {user.isAdmin?(
              <Title name={userGroup?.name!} category={"Grupo"} img={userGroup?.imgGroup}/>
            ):(
              <Title name={user?.username!} category={userMember?.category! || ""} img={user.profile_image}/>
            )}
          </>
        ):null}
        <View style={styles.viewMuraisChooseMural}>
          <Text style={styles.textMuraisChooseMural}>MURAIS</Text>
          <ScrollView style={styles.viewShowMuraisChooseMural} pagingEnabled contentContainerStyle={{ paddingBottom: 150 }}>
            
              {listMurais.map !== undefined && listMurais !== undefined?(
                listMurais.map((valueListGroup)=>(
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('Posts', {muralChoose:{
                      id:valueListGroup.id, category: valueListGroup.category, created_at: valueListGroup.created_at, groupId: valueListGroup.groupId, imgMural: valueListGroup.name, name: valueListGroup.name
                    }})
                  }} key={valueListGroup.id}>
                      <ShowMural authentication={()=>{
                        }} name={valueListGroup.name} img={valueListGroup.imgMural} idMural={valueListGroup.id} canceled={false}/>
                  </TouchableOpacity>
                )
                )
              ):null}
              {user?.isAdmin== true?(
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('Mural')
                }}>
                    <ShowMural authentication={()=>{
                      }} name={"Adicionar Mural"} img={"https://res.cloudinary.com/dfmdiobwa/image/upload/v1716926877/fyypxugvsc6g3m3pkget.png"} idMural={1} canceled={false}/>
              </TouchableOpacity>
              ):null}
            
          </ScrollView>
        </View>
        <View style={{position:"absolute", width:"100%", bottom: 0, paddingBottom: 20, alignItems:"center", }}>
          <MenuTab navigation={navigation} two/>
        </View>
    </View>
  );
}