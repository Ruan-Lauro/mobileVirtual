import { StyleSheet, Text, View, Image, Vibration, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import LoadingMax from '../../Components/LoadingMax/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetWallsGroup, wall } from '../../hooks/useGetWallsGroup';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import { user } from '../../hooks/useRegister';
import Title from '../../Components/Title/Title';

import React from 'react';
import TabRoutes from '../../Navigation/tab.routes';
import ShowMural from '../../Components/ShowMural/ShowMural';
import { useGetGroupUserId } from '../../hooks/useGetGroupUserId';
import { useGetMembers, member } from '../../hooks/useGetMembers';
import Routes from '../../Navigation/routes';
import MenuTab from '../../Components/MenuTab';

type ChooseGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChooseGroupMember'>;

type Props = {
  navigation: ChooseGroupScreenNavigationProp;
};

export default function ChooseGroupMember({ navigation }: Props) {
  const { authenticationWG } = useGetWallsGroup();
  const { authenticationAddG } = useGetGroupUserId();
  const { authenticationGetM } = useGetMembers();
  const { authenticationG } = useGetGroup();

  const [loading, setLoading] = useState(true);
  const [listGroup, setListGroup] = useState<group[]>([]);
  const [user, setUser] = useState<user>();

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          
          const value = await AsyncStorage.getItem('@userInfor');
          if (value !== null) {
            const userInfor = JSON.parse(value)
            const userInformation: user = userInfor.data
            setListGroup([])
            setUser(userInformation)
            if (userInformation.isAdmin) {
              const group = await authenticationAddG(userInformation.id!);
              console.log(group)
              setListGroup(prevList => [...prevList, group]);
            } else {
              const listMurais = await authenticationGetM();
              for (const valueMural of listMurais) {
                if (valueMural.userId == userInformation.id) {
                  const groupsList = await authenticationG();
                  for (const groupValue of groupsList) {
                    if (groupValue.id == valueMural.groupId) {
                      console.log(groupValue)
                      setListGroup(prevList => [...prevList, groupValue])
                    }
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error('Erro ao recuperar informações do usuário:', error)
        } finally {
          setLoading(false)
        }
      };

      loadData();
    }, [])
  )

  return (
    <View style={styles.allChooseGroup}>
      {loading ? <LoadingMax /> : null}
      {user && listGroup.length !== 0 ? (
        <>
          {user.isAdmin ? (
            <Title name={listGroup[0].name} category={"Grupo"} img={listGroup[0].imgGroup} />
          ) : (
            <Title name={user?.username!} category={user?.username!} img={user.profile_image}  navigation={navigation}/>
          )}
        </>
      ) : null}
      <View style={styles.viewMuraisChooseGroup}>
        <Text style={styles.textMuraisChooseGroup}>MEMBRO GRUPOS</Text>
        <ScrollView style={styles.viewShowMuraisChooseGroup} pagingEnabled contentContainerStyle={{ paddingBottom: 150 }} decelerationRate={'normal'}>
          {listGroup && listGroup.length !== 0 ? (
            listGroup.map((valueListGroup) => (
              <TouchableOpacity key={valueListGroup.id} onPress={() => {
                navigation.navigate('ChooseMuralMember', { groupChoose: { id: valueListGroup!.id, name: valueListGroup!.name, created_at: valueListGroup!.created_at, imgGroup: valueListGroup!.imgGroup, groupCode: valueListGroup!.groupCode, userId: valueListGroup!.userId } });
              }}>
                <ShowMural authentication={() => { }} name={valueListGroup.name} img={valueListGroup.imgGroup} idMural={valueListGroup.id} canceled={false} />
              </TouchableOpacity>
            ))
          ) : null}
          
        </ScrollView>
      </View>
      <View style={{ position: "absolute", width: "100%", bottom: 0, paddingBottom: 20, alignItems: "center" }}>
        <MenuTab navigation={navigation} five />
      </View>
    </View>
  );
}
