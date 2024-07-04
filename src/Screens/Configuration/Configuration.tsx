import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import MenuTab from '../../Components/MenuTab';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import styles from './Style';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChooseGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Configuration'>;


type Props = {
  navigation: ChooseGroupScreenNavigationProp;
};

export default function Configuration({navigation}:Props) {

    const data = {

    }

   const exit = async () =>{
    await AsyncStorage.setItem('@userInfor', JSON.stringify(data))
        .then(() => {
          console.log('Informações do usuário armazenadas com sucesso.');
          navigation.navigate('First')
        })
        .catch((error) => {
          console.error('Erro ao armazenar informações do usuário:', error);
        });
   }

  return (
    <View style={styles.allConfiguration}>
        <View style={styles.viewConfigurationBack}>
          <TouchableOpacity onPress={()=>{
                          navigation.goBack()
                      }}>
              <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
          </TouchableOpacity>
          <Text style={styles.ConfigurationBackText}>Configurações</Text>
        </View>
        <View style={styles.viewConfiguration}>
          <TouchableOpacity style={styles.viewImgConfiguration} onPress={()=>{
              navigation.navigate('ChooseGroupMember')
          }}>
            <Image style={styles.imgConfiguration} source={require('../../../assets/grupoE.png')}/>
            <View>
              <Text style={styles.textPrinConfiguration}>Membro</Text>
              <Text style={styles.textSecoConfiguration}>Aqui você vai encontrar seus colegas.</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewImgConfiguration} onPress={()=>{
            navigation.navigate('AccessKey')
          }}>
            <Image style={styles.imgConfiguration} source={require('../../../assets/privacidade.png')}/>
            <View>
              <Text style={styles.textPrinConfiguration}>Chave de acesso</Text>
              <Text style={styles.textSecoConfiguration}>Aqui você vai modificar seu email e senha.</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewImgConfiguration} onPress={()=>{
            navigation.navigate('Help')
          }}>
            <Image style={styles.imgConfigurationN} source={require('../../../assets/atencao.png')}/>
            <View>
              <Text style={styles.textPrinConfiguration}>Ajuda</Text>
              <Text style={styles.textSecoConfiguration}>Aqui você vai conseguir tirar suas dúvidas.</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewImgConfiguration} onPress={()=>{
            exit()
          }}>
            <Image style={styles.imgConfiguration} source={require('../../../assets/sairN.png')}/>
            <View>
              <Text style={styles.textPrinConfiguration}>Sair</Text>
              <Text style={styles.textSecoConfiguration}>Aqui você se desconectar da sua conta.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{position:"absolute", width:"100%", bottom: 0, paddingBottom: 20, alignItems:"center", }}>
          <MenuTab navigation={navigation} five/>
        </View>
    </View>
  );
}