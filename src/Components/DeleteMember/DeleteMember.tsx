import { FormEvent, useState } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import styles from './Style';
import { useDeletePost } from '../../hooks/useDeletePost';
import LoadingMax from '../LoadingMax/Loading';
import { useDeleteMember } from '../../hooks/useDeleteMember';
import { useGetMembers } from '../../hooks/useGetMembers';

type AuthButtonProps = {

    authentication: () => void ;
    idUser: string,
    idGroup: string,
}

export default function DeleteMember({authentication, idUser, idGroup}:AuthButtonProps){

    const {authenticationDME} = useDeleteMember()
    const {authenticationGetM} = useGetMembers()
    const [loading, setLoading] = useState(false)

    const authenDelete = () =>{
        setLoading(true)
        if(idUser && idGroup){
            const listMember = authenticationGetM()
            listMember.then(value=>{
                value.map(memberValue=>{
                    if(memberValue.userId == idUser && idGroup == memberValue.groupId){
                        const deleteP = authenticationDME(memberValue.id)
                        deleteP.then((valueDelete)=>{
                            if(valueDelete == "Member deleted successfully."){
                                authentication()
                                setLoading(false)
                                
                            }
                        })
                    }
                })
            })
            }
        
    }

    return(
        <View style={{width:"100%", alignItems:"center", height:"100%", backgroundColor: "#rgba(255, 255, 255, 0.96)", paddingTop:"55%", position:"absolute", zIndex:999,}}>
            {loading?(
                <LoadingMax/>
            ):null}
            <View style={{width:"85%", backgroundColor:"white", padding:45, alignItems:"center", borderWidth:1, borderColor:"black", position:"relative"}}>
                <Image style={{width: 170, height: 170,  }} source={require('../../../assets/escolha.png')}/>
                <Text style={{fontSize: 18, textAlign:"justify", width:"90%"}}>Você tem certeza que irar <Text style={{fontWeight:500}}>deletar</Text> esse membro?</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", width:"90%", marginTop: 10,}}>
                    <TouchableOpacity style={styles.buttonDelete} onPress={authentication}>
                        <Text style={styles.textButtonDelete}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete} onPress={authenDelete}>
                        <Text style={styles.textButtonDelete}>Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            

        </View>
    );
}