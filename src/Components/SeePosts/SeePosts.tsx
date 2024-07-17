import styles from './Style';
import { View, StyleSheet, Text, TouchableOpacity, Linking, ScrollView, TextInput, Modal } from 'react-native';
import { Image } from 'expo-image';
import {useDeleteMural} from "../../hooks/useDeleteMural";
import React, { useEffect, useRef, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import DeletePost from '../DeletePost/DeletePost';

type docum = {
    file: string,
    name: string,
}


type AuthSeePostsProps = {
    img: string;
    authentication: () => void ;
    name: string;
    category: string;
    idPost: string;
    canceled?: boolean;
    data: string | Date;
    text: string;
    media: string[],
    userPost?: string,
    userNow?: string,
    isAdmin: boolean,
    deleteN: () => void;
    editPost: ()=> void;
}

export default function SeePost({img, authentication, name, category, idPost, canceled, data, text, media, deleteN, isAdmin, userNow, userPost, editPost}: AuthSeePostsProps){

    const [image, setImage] = useState<string[]>([])
    const [video, setVideo] = useState<string[]>([])
    const [pdfN, setPdfN] = useState<docum[]>([])
    const [datePost, setDatePost] = useState("")
    const [possibilyPost, setPossibilyPost] = useState(false)
    const videoN = React.useRef(null);
    const scrollViewRef = useRef<ScrollView>(null)
    const [scrollX, setScrollX] = useState(0);
    const [pass, setPass] = useState<number>(0)
    const [contPass, setContPass] = useState<number>(0)
    const [isModalVisible, setModalVisible] = useState(false);
    const [deleteP, setDeleteP] = useState(false)
    const [idPostDeleted, setIdPostDeleted] = useState("")
    const [editPostTrue, setEditPostTrue] = useState(false)
    const [status, setStatus] = React.useState({});

    const calculateTimeDifference = (postDate: string | Date): string => {
        const currentDate = new Date();
        const postDateTime = new Date(postDate);
      
        const timeDifference = currentDate.getTime() - postDateTime.getTime();
      
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
      
        if (years > 0) {
          return `${years} anos`;
        } else if (months > 0) {
          return `${months} mes`;
        } else if (weeks > 0) {
          return `${weeks} sem`;
        } else if (days > 0) {
          return `${days} dias`;
        } else if (hours > 0) {
          return `${hours}h`;
        } else if (minutes > 0) {
          return `${minutes}m`;
        } else {
          return `${seconds}s`;
        }
      }

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
      

        if(userNow == userPost || isAdmin == true){
            setPossibilyPost(true)
        }else{
            setPossibilyPost(false)
        }


        if(data){
            const inforDate =  calculateTimeDifference(data)
            setDatePost(inforDate)
          }
      },[media, data, userPost, userNow])

      const scrollToRight = () => {
        setContPass(contPass! + 1)
        let tV = video.length
        let tI = image.length
        let tP = pdfN.length
    
        let value = tV + tI + tP
        if (scrollX >= (319 * (value - 1))) {
            let valueScroll = 319
            const newScrollX = valueScroll + 319
            scrollViewRef.current?.scrollTo({
                x: newScrollX,
                animated: true,
            });
            setScrollX(0);
        } else {
            let valueScroll = scrollX
            const newScrollX = valueScroll + 319
            scrollViewRef.current?.scrollTo({
                x: newScrollX,
                animated: true,
            });
            setScrollX(Math.min(newScrollX, 319 * (value - 1)))
        }
    }
    
    const scrollToLeft = () => {
        setContPass(contPass! - 1)
        let tV = video.length
        let tI = image.length
        let tP = pdfN.length
    
        let value = tV + tI + tP

        if (scrollX <= 0) {
            const newScrollX = 319; 
            ScrollView.current?.scrollTo({
                x: newScrollX,
                animated: true,
            });
            setScrollX(319*(value - 2))
        } else {
            let valueScroll = scrollX;
            const newScrollX = valueScroll - 319; 
            scrollViewRef.current?.scrollTo({
                x: newScrollX,
                animated: true,
            });
            setScrollX(Math.max(newScrollX, 0)); 
        }
    }

    useEffect(()=>{
      console.log(image)
        let tV = video.length
        let tI = image.length
        let tP = pdfN.length
    
        let value = tV + tI + tP

        setPass(value - 1)
      },[video, pdfN, image])
    
   
    return(
        <View style={styles.allSeePosts}>
            
             {deleteP?(
            <DeletePost authentication={()=>{
                setDeleteP(false)
                authentication()
            }} idPost={idPost} />
          ):null}
            {isModalVisible?(
              <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              
              >
              <View style={styles.modalContentShowPost}>
              <TouchableOpacity style={{flexDirection:"row",alignItems:"center", }}>
                  <Image style={{ width: 25,height: 25, marginLeft: 25,}} source={require('../../../assets/mandar.png')}/>
                  <Text style={styles.modalItemShowPost}>Compartilhar Post</Text>
                </TouchableOpacity>
                {possibilyPost?(
                  <>
                    <TouchableOpacity style={styles.viewModalItem} onPress={()=>{
                      setDeleteP(true)
                      setModalVisible(false)
                      
                    }}>
                  <Image style={styles.imgViewModalItem} source={require('../../../assets/botao-apagar.png')}/>
                  <Text style={styles.modalItemShowPost}>Deletar Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewModalItem}>
                  <Image style={styles.imgViewModalItem} source={require('../../../assets/editar.png')}/>
                  <Text style={styles.modalItemShowPost} onPress={()=>{
                    editPost()
                    setModalVisible(false)
                    authentication()
                  }}>Editar Post</Text>
                </TouchableOpacity>
                  </>
                ):null}
                
                <TouchableOpacity style={styles.viewModalItem} onPress={()=>{
                    setModalVisible(false)
                    }}>
                  <Image style={{ width: 22.5,height: 22.5, marginLeft: 25,}} source={require('../../../assets/sair.png')}/>
                    <Text style={styles.modalItemShowPost}>Sair</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            ):null}
            <View style={{width:"80%"}}>
                <TouchableOpacity onPress={()=>{
                        authentication()
                    }}>
                        <Image style={styles.imgArrow} source={require('../../../assets/seta-direita.png')}/>
                </TouchableOpacity>
                <View style={styles.viewPostSeePost}>
                    <Image  source={{
                      uri: img,
                     
                    }}  style={styles.SeePostImg}/>
                    <View >
                        <View style={styles.viewNameSeePost}>
                            <Text style={styles.userNameSeePost}>{name}</Text>
                            <Text style={styles.dateSeePost}>{datePost}</Text>
                        </View>
                        <Text style={styles.categorySeePost}>{category}</Text>
                    </View>
                </View>
                <ScrollView style={{marginTop:20}} contentContainerStyle={{paddingBottom:150}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.textDoPosts}>{text}</Text>
                    {(video.length!== 0 || image.length!== 0 || pdfN.length !== 0)?(
                        <ScrollView style={styles.viewMedia} horizontal  
                        showsHorizontalScrollIndicator={false}  contentContainerStyle={{  maxHeight:300,}}  ref={scrollViewRef}  scrollEnabled={false}>

                                {image.length!== 0?(
                                    image.map((listImage)=>(
                                        <Image  source={{
                                          uri: listImage,
                                         
                                        }}  style={{width:319, height:300,  }} />
                                    ))
                                ):null}
                                
                                {video.length!==0?(
                                    video.map(listVideo=>(
                                      <Video
                                      ref={videoN}
                                      style={{width: 319, height: 261, backgroundColor:"#353535"}}
                                      source={{
                                        uri: listVideo,
                                      }}
                                      useNativeControls
                                  
                                      isLooping
                                      onPlaybackStatusUpdate={status => setStatus(() => status)}
                                    />
                                    ))
                                ):null}

                                {pdfN.length!==0?(
                                    pdfN.map(listpdf=>(
                                        <TouchableOpacity style={styles.viewPdf} onPress={()=>{
                                            Linking.openURL(listpdf.file)
                                            }}>
                                            <Image style={{width:70, height: 70,}} source={require('../../../assets/pdf.png')}/>
                                            <Text style={{textAlign:"center", width:150}}>{listpdf.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                ):null}
                                    
                        </ScrollView>
                        ):null}
                        {(video.length!== 0 || pdfN.length!== 0 || image.length!== 0) && contPass! < pass!?(
                    <TouchableOpacity style={{position:"absolute", right:1, bottom: 300
                    }} onPress={ scrollToRight}>
                        <Image source={require('../../../assets/passar.png')} style={{ width: 45, height: 45,  transform: [{ rotate: '90deg' }], }} />
                    </TouchableOpacity>
                ):null}
                {(video.length!== 0 || pdfN.length!== 0 || image.length!== 0) && contPass !== 0?(
                    <TouchableOpacity style={{position:"absolute", left:-20, bottom: 300,
                    }} onPress={ scrollToLeft}>
                        <Image source={require('../../../assets/passar.png')} style={{ width: 45, height: 45,  transform: [{ rotate: '270deg' }], marginLeft:20,}} />
                    </TouchableOpacity>
                ):null}
                </ScrollView>
                
            </View>
            <TouchableOpacity style={{position: "absolute", top: 102, right: 15}} onPress={()=>{
              setModalVisible(true)
            }}>
              <Image style={{width:20, height: 20}} source={require('../../../assets/cardapio.png')}/>
          </TouchableOpacity>
        </View>
    );
}