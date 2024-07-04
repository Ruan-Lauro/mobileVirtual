import { FormEvent, useState } from 'react';
import styles from './Style';
import {Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Buttons from '../Buttons/Buttons';
import { useDeletePost } from '../../hooks/useDeletePost';
import LoadingMax from '../LoadingMax/Loading';
import { useDeleteMural } from '../../hooks/useDeleteMural';
import ErroInternet from '../erroInternet/ErroInternet';

type AuthButtonProps = {

    authentication: () => void ;
    idMural: number,
}

export default function DeleteMural({authentication, idMural}:AuthButtonProps){

    const {authenticationRM} = useDeleteMural()
    const [loading, setLoading] = useState(false)
    const [erroComponent, setErroComponent] = useState(false)
    const authenDelete = () =>{
        setLoading(true)
        const deleteP = authenticationRM(idMural)
        deleteP.then((valueDelete)=>{
            if(valueDelete == "user erro"){
                return
            }else if(valueDelete == "servidor erro"){
                setErroComponent(true)
                setLoading(false)
            }else{
                authentication()
                setLoading(false)
            }
        })
    }

    return(
        <View style={{width:"100%", alignItems:"center", height:"100%", backgroundColor: "#rgba(255, 255, 255, 0.96)", paddingTop:"55%", position:"absolute", zIndex:999,}}>
            {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
            {loading?(
                <LoadingMax/>
            ):null}
            <View style={{width:"85%", backgroundColor:"white", padding:45, alignItems:"center", borderWidth:1, borderColor:"black", position:"relative"}}>
                <Image style={{width: 170, height: 170,  }} source={require('../../../assets/escolha.png')}/>
                <Text style={{fontSize: 18, textAlign:"justify", width:"90%"}}>Você tem certeza que irar <Text style={{fontWeight:500}}>deletar</Text> esse Mural?</Text>
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