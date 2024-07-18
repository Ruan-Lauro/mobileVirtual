import styles from './Style';
import { View, StyleSheet,  Text, TouchableOpacity, Linking, Modal } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import {useDeleteMural} from "../../hooks/useDeleteMural";
import React, { useEffect, useRef, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import DeletePost from '../DeletePost/DeletePost';
import EditPost from '../EditPost/EditPost';
import{ shareContent } from '../../Services/Share';

type docum = {
  file: string,
  name: string,
}


type AuthShowMuralProps = {
    img: string;
    authentication: () => void ;
    name: string;
    category: string;
    idPost: string;
    canceled: boolean;
    data: string | Date;
    text: string;
    media: string[],
    userPost?: string,
    userNow?: string,
    isAdmin: boolean,
    deleteN: () => void,
    editPostN: ()=>void,
}

export default function ShowMural({img, authentication, name, category, idPost, canceled, data, text, media, userPost, userNow, isAdmin, deleteN, editPostN}: AuthShowMuralProps){


    const [datePost, setDatePost] = useState("")
    const [vide, setVide] = useState<string>();
    const [image, setImage] = useState<string>();
    const [docum, setDocum] = useState<docum>();
    const [isModalVisible, setModalVisible] = useState(false);
    const [possibilyPost, setPossibilyPost] = useState(false)
   
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [deleteP, setDeleteP] = useState(false)
  

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

        if(media){
            if(media[0] == "img"){
                setImage(media[0+1])
            }else if(media[0] == "video"){
                setVide(media[0+1])
            }else if(media[0] == "doc"){
                const pdf = media[1].split(",")
                const doc:docum = {
                  name: pdf[1],
                  file: pdf[0]
                }
                setDocum(doc)
                
            }
        }

        if(userPost === userNow || isAdmin === true ){
          
          setPossibilyPost(true)
        }else{
          setPossibilyPost(false)
        }


        if(data){
            const inforDate =  calculateTimeDifference(data)
            setDatePost(inforDate)
          }
      },[media, data, userPost, userNow, isAdmin])
    
   
    return(
        <View style={styles.allShowPost}>
           {isModalVisible?(
              <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              
              >
              <View style={styles.modalContentShowPost}>
              <TouchableOpacity style={{flexDirection:"row",alignItems:"center", }} onPress={()=>{
                 shareContent({message:text, media: media})
              }}>
                  <Image style={{ width: 25,height: 25, marginLeft: 25,}} source={require('../../../assets/mandar.png')}/>
                  <Text style={styles.modalItemShowPost}>Compartilhar Post</Text>
                </TouchableOpacity>
                {possibilyPost ?(
                  <>
                    <TouchableOpacity style={styles.viewModalItem} onPress={()=>{
                      deleteN()
                      setModalVisible(false)
                    }}>
                  <Image style={styles.imgViewModalItem} source={require('../../../assets/botao-apagar.png')}/>
                  <Text style={styles.modalItemShowPost}>Deletar Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewModalItem} onPress={()=>{
                  editPostN()
                  setModalVisible(false)
                }}>
                  <Image style={styles.imgViewModalItem} source={require('../../../assets/editar.png')}/>
                  <Text style={styles.modalItemShowPost}>Editar Post</Text>
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
            <Image source={{ uri: img }}  style={styles.ShowPostImg}/>
            <View style={styles.viewInforShowPost}>
                <View style={styles.viewTextDate}>
                    <Text style={styles.textNameShowPost}>
                        {name}
                    </Text>
                    <View style={styles.viewEdit}>
                      <Text style={styles.textDateShowPost}>
                          {datePost}
                      </Text>
                       
                    </View>
                </View>
                {category?(
                  <Text style={styles.textCategoryShowPost}>
                  @{category.toLowerCase()}
                </Text>
                ):null}
                <Text style={styles.textInforShowPost} numberOfLines={8} ellipsizeMode="tail">
                    {text}
                </Text>
                {image?(
                     <Image  source={{
                      uri: image,
                      
                    }}style={{width:260, height:260, marginTop: 10,}}/>
                    
                ):(
                    <View>
                        {vide?(
                             <Video
                             ref={video}
                             style={{width: 260, height: 260,  marginTop:20, backgroundColor:"#353535"}}
                             source={{
                               uri: vide,
                             }}
                             useNativeControls
                             resizeMode={ResizeMode.CONTAIN}
                             isLooping
                             onPlaybackStatusUpdate={status => setStatus(() => status)}
                           />
                        ):(
                            <View>
                                {docum?(
                                     <TouchableOpacity onPress={()=>{
                                        Linking.openURL(docum.file);
                                     }}>
                                        <Image style={{width:50, height: 50, alignSelf: "center", marginTop: 15}} source={require('../../../assets/pdf.png')}/>
                                        <Text style={{textAlign:"center"}}>{docum.name}</Text>
                                     </TouchableOpacity>      
                                ): null}
                            </View>
                        )}
                    </View>
                )}
            </View>
            
            <TouchableOpacity style={{position: "absolute", top: 22, right: 15}} onPress={()=>{
                setModalVisible(true)
            }}>
              <Image style={{width:20, height: 20}} source={require('../../../assets/cardapio.png')}/>
          </TouchableOpacity>
           
        </View>
    );
}