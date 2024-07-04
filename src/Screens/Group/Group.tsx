import { StyleSheet, Text, View, Image, Vibration, TouchableOpacity } from 'react-native';

import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import { user } from '../../hooks/useRegister';

import * as ImagePicker from 'expo-image-picker';
import { useAddGroup, createGroup } from '../../hooks/useAddGroup';
import React from 'react';
import cloudinary from '../../Services/cloudinary';
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type GroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Group'>;




type Props = {
  navigation: GroupScreenNavigationProp;
};




export default function Group({navigation}:Props) {

  const [reject, setReject] = useState(false)
  const [nameGroup, setNameGroup] = useState("")
  const [imageUri, setImageUri] = useState<any>();
  const [image, setImage] = useState<string | null>(null);
  const [loadingGroup, setLoadingGroup] = useState(false)
  const [rejectImage, setRejectImage] = useState(false)
  const {authenticationAddG} = useAddGroup()
  const [erroComponent, setErroComponent] = useState(false)

  const autheGroup = () =>{
    setLoadingGroup(true)
    if(nameGroup && nameGroup !== ""){
        AsyncStorage.getItem('@userInfor')
        .then(async (value) => {
          if (value) {
           
            const userInfor = JSON.parse(value);
            const userInformation:user = userInfor.data
            
            if(userInformation.id && userInformation.id!== null && userInformation.id !== ''){
              if(imageUri){
                const response = await cloudinary(imageUri)
                const groupCreate: createGroup = {
                name: nameGroup,
                imgGroup: response!.url,
                userId: userInformation.id,
                }
                const responseGroup = authenticationAddG(groupCreate)
                responseGroup.then((element)=>{
                  if(element === "Group created successfully."){
                    setLoadingGroup(false)
                    navigation.navigate('Mural')
                  }else if(element == "user erro"){
                    return
                  }else if(element == "servidor erro"){
                    setErroComponent(true)
                  }
                })
              }else{
                setLoadingGroup(false)
                setRejectImage(true)
              }
              
              
            }
            
          } else {
            console.log('Nenhuma informação do usuário encontrada.');
          }
        })
        .catch((error) => {
          console.error('Erro ao recuperar informações do usuário:', error);
        });
    }else{
      setReject(true)
      Vibration.vibrate()
      setLoadingGroup(false)
    }
  }

 

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    

    if (!result.canceled) {
      
      setImageUri(result.assets[0].uri)
      
    }
    
  }

  

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  return (
    <View style={styles.allGroup}>
        {loadingGroup?(
          <Loading/>
        ): null}
        {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
        <View style={styles.inforLogoMember}>
            <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')} />
        </View>
        <View style={styles.viewGroup}>
            <View >
            <TouchableOpacity onPress={selectImage} style={styles.imgViewGroup}>
               
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={{ width: 160, height: 160, borderRadius: 100, alignSelf: "center", }} />
                ) : (
                    <Image source={require('../../../assets/trabalho.png')} style={{ width: 160, height: 160, borderRadius: 100,borderWidth: 1, borderColor: "black", alignSelf: "center",}} />
                )}
                <View style={styles.viewImageCamera}>
                  <Image source={require('../../../assets/camera.png')} style={styles.imgGroup}/>
                </View>
            </TouchableOpacity>
                 
            </View>
            <Text style={styles.textGroup}>Coloque a foto do grupo e{"\n"} adicione o seu respectivo nome</Text>
            <Input placeholder='Grupo' value={nameGroup} onchange={setNameGroup} type='name' Secure={false} reject={reject} Variant='login'/>
            {rejectImage?(
              <Text style={{color: "#C91E2D", marginTop: 25, textAlign: "center",}}>Coloque uma imagem</Text>
            ):null}
           <View style={styles.buttonViewGroup}>
            <Buttons textButton='Cadastrar' Condition={true} authentication={autheGroup}/>
           </View>
        
        </View>
     
    </View>
  );
}