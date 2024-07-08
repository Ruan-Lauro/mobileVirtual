import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './Style';
import {Text, View, TouchableOpacity, Image, TextInput, Keyboard, Linking, ScrollView, RefreshControl  } from 'react-native';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { createPost, useAddPost} from "../../hooks/useAddPost"
import cloudinary from '../../Services/cloudinary';
import LoadingMax from '../../Components/LoadingMax/Loading';
import TextPost from '../../Components/TextPost/TextPost';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user } from '../../hooks/useRegister';
import { group } from '../../hooks/useGetGroup';
import { useGetGroupUserId } from '../../hooks/useGetGroupUserId';
import { useFeedback } from '../../hooks/useFeedback';
import InforAction from '../../Components/InforAction/InforAction';
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type CodGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

type Props = {
  navigation: CodGroupScreenNavigationProp;
};



export default function Help({navigation}:Props){

    const [imgLogo, setImgLogo] = useState(true)
    const [text, setText] = useState<string>("")
    const [img, setImg] = useState<string>("")
    const [loading,setLoading] = useState(false)
    const [user, setUser] = useState<user>()
    const {authenticationAddG} = useGetGroupUserId()
    const {authenticationFe} = useFeedback()
    const [warning, setWarning] = useState(false)
    const [erroComponent, setErroComponent] = useState(false)

    useEffect(() => {
        setLoading(true)
        AsyncStorage.getItem('@userInfor')
            .then(async (value) => {
                
                const userInfor = JSON.parse(value!)
                const userInformation: user = userInfor.data
                setUser(userInformation)
                if(userInformation?.isAdmin){
                  if(userInformation.isAdmin === true){
                    const groupUser = authenticationAddG(userInformation.id!)
                    groupUser.then((valueGroup)=>{
                     if( typeof valueGroup !== "string"){
                        setImg(valueGroup.imgGroup)
                        setLoading(false)
                      
                     }else{
                        if(valueGroup == "user erro"){
                            setLoading(false)
                            return
                        }else if(valueGroup == "servidor erro"){
                            setLoading(false)
                            setErroComponent(true)
                        }
                     }
                    })
                 }
                }else{
                    if(userInformation?.profile_image){
                        setImg(userInformation?.profile_image!)
                    }
                    setLoading(false)
                }
            })
    }, []);

      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setImgLogo(false)
        }
      );

      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            if(text !== ''){
                setImgLogo(false)
            }else{
                setImgLogo(true)
            }
        }
      );

    const createPost = () =>{
        setLoading(true)
        setImgLogo(false)
       if(user && text){
            const emailFeed = {
                email: user.email,
                name: user.name,
                text
            }
            const emailFeedback = authenticationFe(emailFeed)
            emailFeedback.then((value)=>{
                if(value == "E-mail enviado."){
                    setText("")
                    setLoading(false)
                    setWarning(true)
                }else{
                    if(value == "user erro"){
                        setLoading(false)
                        return
                    }else if(value == "servidor erro"){
                        setLoading(false)
                        setErroComponent(true)
                    }
                }
            })
       }
    }

    return(
        <View style={styles.allDoPosts} >
             {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
            {warning?(
                 <InforAction authentication={()=>{
                    setWarning(false)
                    }} textOne='Seu ' textPrinc='feedback ' textTwo='foi enviado. Aguarde a resposta no e-mail.'/>
            ):null}
            
            <View style={styles.viewPubliPost}>
                <TouchableOpacity onPress={()=>{
                   navigation.goBack()
                }}>
                    <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
                </TouchableOpacity>
                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.buttonClean} onPress={()=>{
                        setText("")
                       
                    }}>
                        <Text style={{fontSize:18}}>Limpar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.buttonPubli} onPress={()=>{
                        createPost()
                    }}>
                        <Text style={{fontSize:18, color:"white"}}>Feedback</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
          
            
            <View style={styles.viewImgUserText}>
                {img !== ""?(
                    <Image source={{ uri: img }} style={{ width: 45, height: 45, borderRadius: 100}}/>
                ):(
                    <Image source={require('../../../assets/pensar.png')} style={{ width: 45, height: 45, borderRadius: 100,borderWidth: 1, borderColor: "black"}} />
                )}
                <View style={{marginLeft: 10,}}>
                    <TextInput style={styles.textDoPosts} placeholder='Faça uma pergunta ou der um feedback para nós.' multiline={true} value={text} onChangeText={setText}></TextInput>
                </View>
               
            </View>

            {imgLogo?(
                <Image source={require('../../../assets/ler.png')} style={{ width: 150, height: 150, alignSelf:"center", marginTop: 130,}} />
            ):null}
            
            {loading?(
                <LoadingMax></LoadingMax>
            ):null}

        </View>
    );
}