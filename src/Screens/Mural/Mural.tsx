import { StyleSheet, Text, View, Vibration, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import InputEdit from '../../Components/InputEdit/Inputs';
import styles from './Style';
import { useEffect, useState } from 'react';
import Buttons from '../../Components/Buttons/Buttons';
import { useGetGroup, group } from '../../hooks/useGetGroup';
import Loading from '../../Components/Loading/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import { user } from '../../hooks/useRegister';
import cloudinary from '../../Services/cloudinary';
import * as ImagePicker from 'expo-image-picker';
import { useGetGroupUserId } from '../../hooks/useGetGroupUserId';
import {useAddMural} from '../../hooks/useAddMural'
import React from 'react';
import ErroInternet from '../../Components/erroInternet/ErroInternet';


type MuralScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Mural'>;




type Props = {
  navigation: MuralScreenNavigationProp;
};


export default function Mural({navigation}:Props) {

  const [nameMural, setNameMural] = useState("")
  const [loadingMural, setLoading] = useState(false)
  const [reject, setReject] = useState(false)
  const {authenticationAddG} = useGetGroupUserId()
  const {authenticationAddM} = useAddMural()
  const [imageGroup, setImageGroup] = useState("")
  const [nameGroup, setNameGroup] = useState("NOME")
  const [imageUri, setImageUri] = useState("");
  const [muralAdd, setMuralAdd] = useState(false)
  const [groupMural, setGroupMural] = useState<group>()
  const [isPrivate, setIsPrivate] = useState(false)
  const [erroComponent, setErroComponent] = useState(false)

  useEffect(()=>{
    AsyncStorage.getItem('@userInfor')
        .then(async (value) => {
            const userInfor = JSON.parse(value!);
            const userInformation:user = userInfor.data
           
            const group = authenticationAddG(userInformation.id!)
            group.then((element) =>{
              if(typeof element !== "string"){
                setImageGroup(element.imgGroup)
                setNameGroup(element.name)
                setGroupMural(element)
              }else{
                if(element == "user erro"){
                  return
                }else if(element == "servidor erro"){
                  setErroComponent(true)
                }
              }
            })
        })
        .catch((error) => {
          console.error('Erro ao recuperar informações do usuário:', error);
        });
  },[])

  const autheMural = async () =>{
    setLoading(true)
    if(nameMural && nameMural !== "" && imageUri ){
      const response = await cloudinary(imageUri)
        const muralAdd ={
          name: nameMural,
          groupId: groupMural?.id!,
          imgMural: response.secure_url,
          category: nameMural,
          isPrivate: isPrivate,
        }
        const mural = authenticationAddM(muralAdd)
        mural.then((value)=>{
          if(value == "Mural created successfully."){
            setMuralAdd(true)
            setImageUri("")
            setNameMural(" ")
            setIsPrivate(false)
            setLoading(false)
          }else if(value == "user erro"){
            return
          }else if(value == "servidor erro"){
            setErroComponent(true)
          }
        })
    }else{
      setLoading(false)
      setReject(true)
      Vibration.vibrate()
     
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
      setMuralAdd(false)
    }
    
  };

 

  return (
    <View style={styles.allMural}>
      {loadingMural?(
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
       <View style={{width: "80%"}}>
            <View>
                {imageGroup?(
                   <Image source={{ uri: imageGroup }} style={{ width: 180, height: 180, borderRadius: 100, alignSelf: "center", }}/>  
                
                ):(
                  <Image source={require('../../../assets/trabalho.png')} style={{ width: 160, height: 160, borderRadius: 100,borderWidth: 1, borderColor: "black", alignSelf: "center",}} />
                )}
                <Text style={{fontSize: 20, textAlign: "center", marginTop: 5, fontWeight: "400"}}>{nameGroup}</Text>
            </View>
            <Text style={styles.textMural}>Coloque a foto do mural e coloque o nome do mural</Text>
            <View style={styles.viewInputImageMural}>
                <TouchableOpacity onPress={selectImage} >
                   {imageUri?(
                     <Image source={{uri: imageUri}} style={{width: 45, height: 45, borderRadius: 100, }}/>
                   ):(
                    <View style={styles.viewImgCamera}>
                    <Image source={require('../../../assets/camera.png')} style={styles.imgCamera}/>
                    </View>
                   )}
                </TouchableOpacity>
                <InputEdit placeholder='Mural' value={nameMural} onchange={setNameMural} type='name' Secure={false} reject={reject} Variant='login'/>
            </View>
            <View style={{flexDirection:"row", marginLeft: 15, marginTop: 10}}>
                <TouchableOpacity style={isPrivate?{borderWidth:1, borderRadius: 100, width: 20, marginRight: 10, backgroundColor:"#1a1a1a"}:{borderWidth:1, borderRadius: 100, width: 20, marginRight: 10}} onPress={()=>{
                  setIsPrivate(!isPrivate)
                }}></TouchableOpacity>
                <Text>Mural Privado</Text>
            </View>
            {muralAdd?(
                  <Text style={{fontSize: 16, opacity: 0.8, marginTop: 10,}}>Mural adicionado com sucesso!</Text>
                ):null}
            <View style={{alignSelf:"center",marginTop: 45, flexDirection:"row", justifyContent: "space-around", width:"90%"}}>
            <Buttons textButton='Adicionar' Condition={true} authentication={autheMural}/>
            <Buttons textButton='Próximo' Condition={true} authentication={()=>{
               navigation.navigate('SeeMurals')
            }}/>
           </View>
       </View>
    </View>
  );
}