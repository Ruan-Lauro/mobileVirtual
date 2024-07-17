import { FormEvent, useState } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import styles from './Style';
import { useDeletePost } from '../../hooks/useDeletePost';
import LoadingMax from '../LoadingMax/Loading';
import { useDeleteMember } from '../../hooks/useDeleteMember';
import { useGetMembers } from '../../hooks/useGetMembers';

type AuthButtonProps = {

    authentication: () => void,
    idUser: string,
    idGroup: string,
    functioLoading: ()=> void,
}

export default function ExitGroup({authentication, idUser, idGroup, functioLoading}:AuthButtonProps){

    const {authenticationDME} = useDeleteMember()
    const {authenticationGetM} = useGetMembers()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(true)

    const authenDelete = () =>{
        functioLoading
        if(idUser && idGroup){
            const listMember = authenticationGetM()
            listMember.then(value=>{
                if(typeof value !== "string"){
                    value.map(memberValue=>{
                        if(memberValue.userId == idUser && idGroup == memberValue.groupId){
                            const deleteP = authenticationDME(memberValue.id)
                            deleteP.then((valueDelete)=>{
                                if(valueDelete == "Member deleted successfully."){
                                    authentication()
                                    
                                }
                            })
                        }
                    })
                }else{
                    if(value == "user erro"){
                        return
                    }else if("servidor erro"){
                        return
                    }
                }
            })
            }
        
    }

    return(
        <View style={{width:"100%", alignItems:"center", height:"100%", backgroundColor: "#rgba(255, 255, 255, 0.96)", paddingTop:"55%", position:"absolute", zIndex:999,}}>
           
            <View style={{width:"85%", backgroundColor:"white", padding:45, alignItems:"center", borderWidth:1, borderColor:"black", position:"relative"}}>
                {image?(
                    <Image style={{width: 170, height: 170, }} source={require('../../../assets/escolha.png')}/>
                ):null}
                <Text style={{fontSize: 18, textAlign:"justify", width:"90%"}}>Você tem certeza que vai <Text style={{fontWeight:500}}>sair</Text> desse grupo?</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", width:"90%", marginTop: 10,}}>
                    <TouchableOpacity style={styles.buttonDelete} onPress={authentication}>
                        <Text style={styles.textButtonDelete}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete} onPress={authenDelete}>
                        <Text style={styles.textButtonDelete}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
            

        </View>
    );
}