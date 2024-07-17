import { StyleSheet, Text, View,Vibration, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';

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
import { useGetGroupUserId } from '../../hooks/useGetGroupUserId';
import {useAddMural} from '../../hooks/useAddMural'
import ShowMural from '../../Components/ShowMural/ShowMural';
import { useGetWallsGroup, wall } from '../../hooks/useGetWallsGroup';
import React from 'react';
import DeleteMural from '../../Components/DeleteMural/DeleteMural';
import EditMural from '../../Components/EditMural/EditMural';
import { Position } from '@cloudinary/url-gen/qualifiers';
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type MuralScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Mural'>;


type Props = {
  navigation: MuralScreenNavigationProp;
};


export default function SeeMural({navigation}:Props) {
 
    const [imgGroup, setImgGroup] = useState("")
    const [codGroup, setCodGroup] = useState("01234567")
    const [nameGroup, setNameGroup] = useState("Grupo")
    const {authenticationAddG} = useGetGroupUserId()
    const {authenticationWG} = useGetWallsGroup()
    const [Murals, setMurals] = useState<wall[]>()
    const [isModalVisible, setModalVisible] = useState(false)
    const [possibilyPost, setPossibilyPost] = useState(false)
    const [deleteMuralN, setDeleteMuralN] = useState(false)
    const [muralIdDelete, setMuralIdDelete] = useState<wall>()
    const [editMural, setEditMural] = useState(false)
    const [update, setUpdate] = useState(false)
    const [erroComponent, setErroComponent] = useState(false)

    useEffect(()=>{
        AsyncStorage.getItem('@userInfor')
            .then(async (value) => {
                const userInfor = JSON.parse(value!);
                const userInformation:user = userInfor.data
                
                const group = authenticationAddG(userInformation.id!)
                group.then((element) =>{
             
                    if(typeof element !== "string"){
                    setImgGroup(element.imgGroup)
                    setNameGroup(element.name)
                    setCodGroup(element.groupCode+"")
                    
                    const muralGet = authenticationWG(element.id)
                    muralGet.then((data)=>{
                        if(typeof data !== "string"){
                            setMurals(data)
                        }else{
                            if(data == "user erro"){
                                return
                            }else if(data == "servidor erro"){
                                setErroComponent(true)
                            }
                        }
                    
                    })
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
      },[update])

      

  return (
    <View style={styles.allSeeMural}>
        {editMural?(
            <View style={{position:"absolute", width:"100%", height:"100%", zIndex:999}}>
                <EditMural authentication={()=>{
                setUpdate(!update)
                setEditMural(false)
            }} idMural={muralIdDelete?.id!} imageMural={muralIdDelete?.imgMural!} name={muralIdDelete?.name!}  category={muralIdDelete?.category!}/>
            </View>
        ):null}
        {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
        {deleteMuralN?(
            <DeleteMural authentication={()=>{
                setUpdate(!update)
                setDeleteMuralN(false)
                setModalVisible(false)
            }} idMural={muralIdDelete!.id!}/>
        ):null}
         {isModalVisible?(
              <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              
              >
              <View style={styles.modalContentShowPost}>
              <TouchableOpacity style={{flexDirection:"row",alignItems:"center", }} onPress={()=>{
                setDeleteMuralN(true)
                setModalVisible(false)
              }}>
                  <Image style={{ width: 25,height: 25, marginLeft: 25,}} source={require('../../../assets/botao-apagar.png')}/>
                  <Text style={styles.modalItemShowPost}>Deletar Mural</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.viewModalItem} onPress={()=>{
                    setEditMural(true)
                    setModalVisible(false)
                }}>
                <Image style={styles.imgViewModalItem} source={require('../../../assets/editar.png')}/>
                <Text style={styles.modalItemShowPost}>Editar Mural</Text>
            </TouchableOpacity>      
                
                <TouchableOpacity style={styles.viewModalItem} onPress={()=>{
                    setModalVisible(false)
                    }}>
                  <Image style={{ width: 22.5,height: 22.5, marginLeft: 25,}} source={require('../../../assets/sair.png')}/>
                    <Text style={styles.modalItemShowPost}>Sair</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            ):null}
        <View style={styles.inforLogo}>
            <TouchableOpacity onPress={()=>{
                navigation.goBack()
            }}>
                <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
            </TouchableOpacity>
            <Image style={styles.imgMural} source={require('../../../assets/LogoMural.png')}/>
      </View>
      <View style={styles.SeeMural}>
            <View style={styles.SeeMuralGroup}>
                {imgGroup?(
                    <Image source={{ uri: imgGroup }} style={{ width: 180, height: 180, borderRadius: 100, alignSelf: "center", }}/>
                ):(
                    <Image source={require('../../../assets/trabalho.png')} style={{ width: 160, height: 160, borderRadius: 100,borderWidth: 1, borderColor: "black", alignSelf: "center",}} />
                )}
                <Text style={styles.TextGroupMural}>{nameGroup}</Text>
                <Text style={styles.TextGroupMuralCod}>Cod: {codGroup}</Text>
            </View>
            <View style={styles.SeeMuralInfor}>
                {Murals?.map!==undefined?(
                    Murals.map((value)=>(
                        <ShowMural authentication={()=>{
                            setModalVisible(true)
                            setMuralIdDelete(value)
                        }} img={value.imgMural} name={value.name} idMural={value.id} key={value.id} canceled={true} category={""+value.id
                            
                        } textSecond={true}/>
                    ))
                ): null}
            </View>
            <View style={{alignSelf:"center", marginTop: 35}}>
                <Buttons textButton='Cadastrar' Condition={true} authentication={()=>{
                    navigation.navigate('Home')
                }}/>
            </View>

      </View>
    </View>
  );
}