import { StyleSheet, Text, View, Image, Vibration, TouchableOpacity } from 'react-native';

import Input from '../../Components/Inputs/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { user } from '../../hooks/useRegister';

import * as ImagePicker from 'expo-image-picker';
import { useAddGroup, createGroup } from '../../hooks/useAddGroup';
import React from 'react';
import cloudinary from '../../Services/cloudinary';
import { putMural, usePutMural } from '../../hooks/usePutMural';
import { createMural } from '../../hooks/useAddMural';
import ErroInternet from '../erroInternet/ErroInternet';


type editMural ={
    idMural: number,
    authentication: ()=>void,
    imageMural: string,
    name: string,
    category: string,
}

export default function EditMural({idMural, authentication, imageMural, name, category}: editMural) {

  const [reject, setReject] = useState(false)
  const [nameMural, setNameMural] = useState(name)
  const [imageUri, setImageUri] = useState<string>(imageMural);
  const [image, setImage] = useState<string | null>(null);
  const [loadingGroup, setLoadingGroup] = useState(false)
  const [rejectImage, setRejectImage] = useState(false)
  const {authenticationPutM} = usePutMural()
  const [erroComponent, setErroComponent] = useState(false)
  const autheGroup = () =>{
    setLoadingGroup(true)
    if(nameMural && nameMural !== ""){
        AsyncStorage.getItem('@userInfor')
        .then(async (value) => {
          if (value) {
           
            const userInfor = JSON.parse(value);
            const userInformation:user = userInfor.data
            
            if(userInformation.id && userInformation.id!== null && userInformation.id !== ''){
               
              if(imageUri.includes("file")){
                const response = await cloudinary(imageUri)
                if(response.url){
                const muralUpdate: putMural = {
                    name: nameMural,
                    imgMural: response!.url,
                    category: category,
                    id: idMural!,
                    }
                const responseGroup = authenticationPutM(muralUpdate)
                responseGroup.then((element)=>{
                    if(element == "user erro"){
                      setLoadingGroup(false)
                      return
                    }else if(element == "servidor erro"){
                      setLoadingGroup(false)
                      setErroComponent(true)
                    }else{
                      setLoadingGroup(false)
                      authentication()
                    }
                })
                }
              }else{
                const muralUpdate: putMural = {
                    name: nameMural,
                    imgMural: imageMural,
                    category: category,
                    id: idMural!,
                    }
                   
                    const responseGroup = authenticationPutM(muralUpdate)
                    responseGroup.then((element)=>{
                        if(element == "user erro"){
                          setLoadingGroup(false)
                          return
                        }else if(element=="servidor erro"){
                          setLoadingGroup(false)
                          setErroComponent(true)
                        }else{
                          setLoadingGroup(false)
                          authentication()
                          setRejectImage(true)
                        }
                    })
                    
              }
              
              
            }
            
          } else {
            
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
            <Text style={styles.textGroup}>Coloque a foto do mural e{"\n"} adicione o seu respectivo nome</Text>
            <Input placeholder='Grupo' value={nameMural} onchange={setNameMural} type='name' Secure={false} reject={reject} Variant='login'/>
            {rejectImage?(
              <Text style={{color: "#C91E2D", marginTop: 25, textAlign: "center",}}>Coloque uma imagem</Text>
            ):null}
           <View style={styles.buttonViewGroup}>
            <Buttons textButton='Cancelar' Condition={true} authentication={authentication}/>
            <Buttons textButton='Alterar' Condition={true} authentication={autheGroup}/>
           </View>
        
        </View>
     
    </View>
  );
}