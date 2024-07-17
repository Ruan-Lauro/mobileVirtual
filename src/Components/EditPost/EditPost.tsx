import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './Style';
import {Text, View, TouchableOpacity, TextInput, Keyboard, Linking, ScrollView, RefreshControl  } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { createPost, useAddPost} from "../../hooks/useAddPost"
import cloudinary from '../../Services/cloudinary';
import TextPost from '../TextPost/TextPost';
import LoadingMax from '../LoadingMax/Loading';
import { usePutPost } from '../../hooks/usePutPost';
import ErroInternet from '../erroInternet/ErroInternet';
import { Alert } from 'react-native';

type AuthButtonProps = {
    img?: string,
    exit: () => void,
    media: string[],
    context: string,
    idPost: string,
}

type docum = {
    file: string,
    name: string,
}

export default function EditPost({idPost, exit, img, media, context}:AuthButtonProps){

    const [imgLogo, setImgLogo] = useState(true)
    const [text, setText] = useState<string>(context)
    const [video, setVideo] = useState<string[]>([])
    const [image, setImage] = useState<string[]>([])
    const [pdfN, setPdfN] = useState<docum[]>([])
    const videoN = React.useRef(null);
    const scrollViewRef = useRef<ScrollView>(null)
    const [scrollX, setScrollX] = useState(0);
    const [pass, setPass] = useState<number>(0)
    const [contPass, setContPass] = useState<number>(0)
    const {authenticationPutP} = usePutPost()
    const [mediaPostN, setMediaPostN] = useState<string[]>([])
    const [errorN, setErrorN] = useState(false)
    const [loading,setLoading] = useState(false)
    const [erroComponent, setErroComponent] = useState(false)

    const pickPdf =  async () =>{
        let result = await DocumentPicker.getDocumentAsync({
            type:"application/pdf",
            copyToCacheDirectory: true,
        })

        const Doc = {
            file: result.assets![0].uri,
            name: result.assets![0].name,
        }

        setPdfN(prevList => [...prevList, Doc ])
        
    }
    
    // const pickImage = async () =>{
    //     let result = await DocumentPicker.getDocumentAsync({
    //         type:"image/*",
    //         copyToCacheDirectory: true,
    //     })

    //     setImage(prevList => [...prevList, result.assets![0].uri])
       
    // }

    const pickVideo = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
            setVideo(prevList => [...prevList, result.assets[0].uri])
        }
      };

      useEffect(()=>{
        if(text !== "" || (video.length!== 0 || pdfN.length!==0 || image.length!==0)){
            setImgLogo(false)
        }else{
            setImgLogo(true)
        }
      },[text, video, pdfN, image],)

      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setImgLogo(false)
        }
      );

      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            if(text !== '' || (video.length!== 0 || pdfN.length!==0 || image.length!==0)){
                setImgLogo(false)
            }else{
                setImgLogo(true)
            }
        }
      );
  
      const scrollToRight = () => {
        setContPass(contPass! + 1)
        let tV = video.length
        let tI = image.length
        let tP = pdfN.length
    
        let value = tV + tI + tP
        if (scrollX >= (250 * (value - 1))) {
            let valueScroll = 250
            const newScrollX = valueScroll + 250;
            scrollViewRef.current?.scrollTo({
                x: newScrollX,
                animated: true,
            });
            setScrollX(0);
        } else {
            let valueScroll = scrollX
            const newScrollX = valueScroll + 250;
            scrollViewRef.current?.scrollTo({
                x: newScrollX,
                animated: true,
            });
            setScrollX(Math.min(newScrollX, 250 * (value - 1)))
        }
    }
    
    const scrollToLeft = () => {
        setContPass(contPass! - 1)
        let tV = video.length
        let tI = image.length
        let tP = pdfN.length
    
        let value = tV + tI + tP

        if (scrollX <= 0) {
            const newScrollX = 250; 
            scrollViewRef.current?.scrollTo({
                x: newScrollX,
                animated: true,
            });
            setScrollX(250*(value - 2))
        } else {
            let valueScroll = scrollX;
            const newScrollX = valueScroll - 250; 
            scrollViewRef.current?.scrollTo({
                x: newScrollX,
                animated: true,
            });
            setScrollX(Math.max(newScrollX, 0)); 
        }
    }
    

      useEffect(()=>{
        let tV = video.length
        let tI = image.length
        let tP = pdfN.length
    
        let value = tV + tI + tP

        setPass(value - 1)
      },[video, pdfN, image])


    const createPost = () =>{
        setLoading(true)
        if(text.trim() !== "" && (video.length!== 0 || pdfN.length!==0 || image.length!==0)){
            
            if(video.length!== 0){
                video.map(async vid =>{
                    if(vid.includes("cloudinary")){
                        setMediaPostN(prevList => [...prevList, "video"])
                        setMediaPostN(prevList => [...prevList, vid])
                    }else{
                        const response = await cloudinary(vid)
                        setMediaPostN(prevList => [...prevList, "video"])
                        setMediaPostN(prevList => [...prevList, response!.url])
                    }
                    
                })
            }

            if(image.length!== 0){
                image.map(async img=>{
                    if(img.includes("cloudinary")){
                        setMediaPostN(prevList => [...prevList, "img"])
                        setMediaPostN(prevList => [...prevList, img])
                    }else{
                        const response = await cloudinary(img)
                        setMediaPostN(prevList => [...prevList, "img"])
                        setMediaPostN(prevList => [...prevList, response!.url])
                    }
                   
                })
            }

            if(pdfN.length!== 0){
                pdfN.map(async pdf=>{
                    if(pdf.file.includes("cloudinary")){
                        setMediaPostN(prevList => [...prevList, "doc"])
                        setMediaPostN(prevList => [...prevList, pdf.file+","+pdf.name])
                    }else{
                        const response = await cloudinary(pdf.file)
                        setMediaPostN(prevList => [...prevList, "doc"])
                        setMediaPostN(prevList => [...prevList, response!.url+","+pdf.name])
                    }
                    
                })
            }

        }else if(text.trim()!== ""){
           const newPost = {
            idPost,
            content: text,
            media:[],
           }

           const resp = authenticationPutP(newPost)
           resp.then((valueResp)=>{
                if(valueResp == "user erro"){
                    setLoading(false)
                    return
                }else if(valueResp == "servidor erro"){
                    setErroComponent(true)
                    setLoading(false)
                }else{
                    setText("")
                    setLoading(false)
                    exit()
                }
           })
            
        } else if(video.length!== 0 || pdfN.length!==0 || image.length!==0){
           setErrorN(true)
        }
    }

    useEffect(()=>{
        if(mediaPostN.length !== 0){
            
           
            if((mediaPostN.length/2) == (pass + 1)){
                const newPost = {
                    idPost,
                    content: text,
                    media: mediaPostN,
                   }
                 
                   const resp = authenticationPutP(newPost)
                   resp.then((valueResp)=>{
                        if(valueResp == "user erro"){
                            setLoading(false)
                            return
                        }else if(valueResp == "servidor erro"){
                            setLoading(false)
                            setErroComponent(true)
                        }else{
                            setLoading(false)
                            exit()
                        }
                   })
            }
        }
    },[mediaPostN])

    useEffect(()=>{

        if (media) {
            for (let i = 0; i < media.length; i++) {
                const mediaValue = media[i]
                const mediaLink = media[i + 1]
        
                if (mediaValue === "img") {
                    setImage(prevList => [...prevList, mediaLink])
                } else if (mediaValue === "video") {
                    setVideo(prevList => [...prevList, mediaLink])
                } else if (mediaValue === "doc") {
                    let pdf = mediaLink.split(",")
                    const pdfList = {
                        name: pdf[1],
                        file: pdf[0],
                    }
                    setPdfN(prevList => [...prevList, pdfList])
                }
                i++
            }
        }

        
      },[media])

      const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua câmera e biblioteca de mídia.')
            return false
        }
        return true
    }

    const pickImage = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;
    
        Alert.alert(
            'Selecionar Imagem',
            'Escolha uma opção',
            [
                {
                    text: 'Tirar Foto',
                    onPress: async () => {
                        let result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            quality: 1,
                        });
    
                        if (!result.canceled) {
                            setImage(prevList => [...prevList, result.assets![0].uri])
                        }
                    },
                    style:"cancel",
                },
                {
                    text: 'Escolher da Galeria',
                    onPress: async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            quality: 1,
                        });
    
                        if (!result.canceled) {
                            setImage(prevList => [...prevList, result.assets![0].uri])
                        }
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        )
    }
      


    return(
        <ScrollView style={styles.allDoPosts} >
            {loading?(
                <LoadingMax type={true}></LoadingMax>
            ):null}
            {erroComponent?(
            <ErroInternet authentication={()=>{
                setErroComponent(false)
                }}/>
            ):null}
            {errorN?(
                <TextPost authentication={()=>{
                    setErrorN(false)
                    setLoading(false)
                }}/>
            ):null}
            
            <View style={styles.viewPubliPost}>
                <TouchableOpacity onPress={()=>{
                    exit()
                }}>
                    <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
                </TouchableOpacity>
                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.buttonClean} onPress={()=>{
                        setText("")
                        setImage([])
                        setVideo([])
                        setPdfN([])
                    }}>
                        <Text style={{fontSize:18}}>Limpar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.buttonPubli} onPress={()=>{
                        createPost()
                    }}>
                        <Text style={{fontSize:18, color:"white"}}>Editar</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
          
            
            <View style={styles.viewImgUserText}>
                {img?(
                    <Image source={{ uri: img }} style={{ width: 45, height: 45, borderRadius: 100}}/>
                ):(
                    <Image source={require('../../../assets/trabalho.png')} style={{ width: 45, height: 45, borderRadius: 100,borderWidth: 1, borderColor: "black"}} />
                )}
                <View style={{marginLeft: 10,}}>
                    <TextInput style={styles.textDoPosts} placeholder='Faça uma nova publicação' multiline={true} value={text} onChangeText={setText}></TextInput>

                    {loading == false && (video.length!== 0 || image.length!== 0 || pdfN.length !== 0)?(
                       <ScrollView style={styles.viewMedia} horizontal  pagingEnabled
                       showsHorizontalScrollIndicator={false} ref={scrollViewRef} contentContainerStyle={{paddingRight:120}} snapToInterval={250} snapToAlignment={'start'} scrollEnabled={false}>

                            {image.length!== 0?(
                                image.map((listImage)=>(
                                    <View style={{position:"relative"}}>
                                        <Image source={{ uri: listImage}} style={{width:260, height:260,}} />
                                        <Text style={{fontSize:20, position:"absolute", right: 20}} onPress={()=>{
                                            const newImage = image.filter((value)=> value !== listImage)
                                            setImage(newImage)
                                        }}>
                                            x
                                        </Text>
                                    </View>
                                ))
                            ):null}
                            
                            {video.length!==0?(
                                video.map(listVideo=>(
                                    <View style={{position:"relative"}}>
                                        <Video
                                        ref={videoN}
                                        style={{width: 260, height: 260, alignSelf:"center"}}
                                        source={{
                                        uri: listVideo,
                                        }}
                                        useNativeControls
                                       
                                        />
                                        <Text style={{fontSize:20, position:"absolute", right: 20}} onPress={()=>{
                                            const newVideo = video.filter((value)=> value !== listVideo)
                                            setVideo(newVideo)
                                        }}>
                                            x
                                        </Text>
                                    </View>
                                ))
                            ):null}

                            {pdfN.length!==0?(
                                pdfN.map(listpdf=>(
                                <View style={{position:"relative"}}>
                                    <TouchableOpacity style={styles.viewPdf} onPress={()=>{
                                    Linking.openURL(listpdf.file)
                                    }}>
                                    <Image style={{width:50, height: 50, }} source={require('../../../assets/pdf.png')}/>
                                    <Text style={{textAlign:"center"}}>{listpdf.name}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:20, position:"absolute", right: 20}} onPress={()=>{
                                    const newPdf = pdfN.filter((value)=> value !== listpdf)
                                    setPdfN(newPdf)
                                }}>
                                 x
                                </Text>
                                </View>
                                ))
                            ):null}
                                
                        
                       </ScrollView>
                    ):null}
                </View>
                {(video.length!== 0 || pdfN.length!== 0 || image.length!== 0) && contPass! < pass!?(
                    <TouchableOpacity style={{position:"absolute", right:1, bottom: 190
                    }} onPress={ scrollToRight}>
                        <Image source={require('../../../assets/passar.png')} style={{ width: 45, height: 45,  transform: [{ rotate: '90deg' }], }} />
                    </TouchableOpacity>
                ):null}
                {(video.length!== 0 || pdfN.length!== 0 || image.length!== 0) && contPass !== 0?(
                    <TouchableOpacity style={{position:"absolute", left:1, bottom: 190
                    }} onPress={ scrollToLeft}>
                        <Image source={require('../../../assets/passar.png')} style={{ width: 45, height: 45,  transform: [{ rotate: '270deg' }], marginLeft:20,}} />
                    </TouchableOpacity>
                ):null}
            </View>
            
            <View style={imgLogo?({flexDirection:"row", marginTop: 10, alignItems:"center",}):({flexDirection:"row", marginTop: 10, alignItems:"center", paddingBottom: 500})}>
                <TouchableOpacity onPress={()=>{
                    pickImage()
                }}>
                    <Image source={require('../../../assets/imagem.png')} style={{ width: 41, height: 41, marginLeft: 25, }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    pickVideo()
                }}>
                    <Image source={require('../../../assets/reprodutor-de-video.png')} style={{ width: 31, height: 30, marginLeft: 5, }} />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>{
                    pickPdf()
                }}>
                    <Image source={require('../../../assets/pdfn.png')} style={{ width: 33, height: 33, marginLeft: 8,}} />
                </TouchableOpacity>
            </View>
            
            

            {imgLogo?(
                <Image source={require('../../../assets/pensar.png')} style={{ width: 180, height: 160, alignSelf:"center", marginTop: 130,}} />
            ):null}

        </ScrollView>
    );
}