import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, TouchableOpacity, Platform, Keyboard, RefreshControl, Modal } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import styles from './Style';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user } from '../../hooks/useRegister';
import Title from '../../Components/Title/Title';
import { group, useGetGroup } from '../../hooks/useGetGroup';
import { wall } from '../../hooks/useGetWallsGroup';
import { member, useGetMembers } from '../../hooks/useGetMembers';
import { useGetGroupUserId } from '../../hooks/useGetGroupUserId';
import { posts, useGetPostsMural } from '../../hooks/useGetPostMural';
import ShowPosts from '../../Components/ShowPosts/ShowPosts';
import { useGetUsers } from '../../hooks/useGetUsers';
import LoadingMax from '../../Components/LoadingMax/Loading';
import MenuTab from '../../Components/MenuTab';
import DoPosts from '../../Components/DoPosts/DoPosts';
import DeletePost from '../../Components/DeletePost/DeletePost';
import SeePost from '../../Components/SeePosts/SeePosts';
import ChooseCategory from '../ChooseCategory/ChooseCategory';
import EditPost from '../../Components/EditPost/EditPost';
import ShowMural from '../../Components/ShowMural/ShowMural';

type PostsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChooseMember'>;

type  PostsScreenRouteProp = RouteProp<RootStackParamList, 'Posts'>;

type Props = {
  navigation: PostsScreenNavigationProp;
  route: PostsScreenRouteProp;
};
export default function Posts({navigation, route}:Props) {

    const { muralChoose } = route.params;
    const [user, setUser] = useState<user>()
    const [muralGroup, setMuralGroup] = useState<group>()
    const [mural, setMural] = useState<wall>()
    const [searchText, setSearchText] = useState("")
    const [listUsers, setListUsers] = useState<user[]>([])
    const [listMembersAlf, setListMemberAlf] = useState<user[]>()
    const [tabMenu, setTabMenu] = useState(true)
    const [loading, setLoading] = useState(true)
    const [atualiz, setAtualiz] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [pesqTrue, setPesqTrue] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [userChoose, setUserChoose] = useState<user>()

    const {authenticationGetM} = useGetMembers()
    const {authenticationG} = useGetGroup()
    const {authenticationGetU} = useGetUsers()
    
    
    const onRefresh = () => {
        setRefreshing(true);
        setAtualiz(!atualiz)
        
    };

    useEffect(() => {
        AsyncStorage.getItem('@userInfor')
            .then(async (value) => {
                setLoading(true);
                const userInfor = JSON.parse(value!);
                const userInformation: user = userInfor.data;
                setUser(userInformation);
                if (muralChoose) {
                    setMural(muralChoose);
    
                    const groupMural = authenticationG();
                    groupMural.then(cod => {
                        const foundGroup = cod.find(codValue => codValue.id === muralChoose.groupId);
                        if (foundGroup) {
                            setMuralGroup(foundGroup);
                        }
                    });
    
                    
                }
            })
            .catch((error) => {
                console.error('Erro ao recuperar informações do usuário:', error);
            });
    }, []);

    function FirstLetter(string:string) {
        if (string.length === 0) {
          return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function capitalizeFirstLetter(string:string) {
        if (string.length === 0) {
          return string;
        }
        return string.charAt(0).toLowerCase() + string.slice(1);
      }
    

      useEffect(()=>{
        if(mural){
           
            if(searchText !== ""){
                setListUsers([])
                const memberList = authenticationGetM()
                const listUser = authenticationGetU()
                memberList.then((valueMemberList)=>{
                    valueMemberList.map(value=>{
                        if(value.groupId === muralGroup?.id && value.category == mural.category){
                            
                            listUser.then((valueListUser)=>{
                                valueListUser.map(valueUser=>{
                                    if(valueUser.id == value.userId){
                                        
                                        let letterUp: string = FirstLetter(searchText)
                                        let letterDown: string = capitalizeFirstLetter(searchText)
                                        if((valueUser.name.includes(searchText) || valueUser.name.includes(letterUp) || valueUser.name.includes(letterDown)) ||(valueUser.username.includes(searchText) || valueUser.username.includes(letterUp) || valueUser.username.includes(letterDown)) ){
                                            
                                            setListUsers(prevList => [...prevList, valueUser])
                                        }else{
                                            
                                        }
                                    }
                                })
                            })
                        }
                    }) 
                    setRefreshing(false)
                    setLoading(false)
                })
            }else{
                setListUsers([])
                const memberList = authenticationGetM()
                const listUser = authenticationGetU()
                memberList.then((valueMemberList)=>{
                    valueMemberList.map(value=>{
                        if(value.groupId === muralGroup?.id && value.category == mural.category){
                            
                            listUser.then((valueListUser)=>{
                                valueListUser.map(valueUser=>{
                                    if(valueUser.id == value.userId){
                                        setListUsers(prevList => [...prevList, valueUser])
                                        
                                    }
                                })
                            })
                        }
                    }) 
                    setRefreshing(false)
                    setLoading(false)
                })
                
                
            }
        }
      },[mural, atualiz, muralGroup, pesqTrue])


      useEffect(()=>{
        setListMemberAlf([])
        if(listUsers.map!== undefined && listUsers.length!==0){
            listUsers.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
            });
            setListMemberAlf(listUsers)
        }

      },[listUsers])
      
      

      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setTabMenu(false)
        }
      );
  
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setTabMenu(true)
        }
      );



  return (
    <View style={styles.allPosts}>  
        
        {loading?(
         <LoadingMax/>
       ): null}

            {isModalVisible?(
              <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              
              >
              <View style={styles.modalContentShowPost}>
              <TouchableOpacity style={{flexDirection:"row",alignItems:"center", }} onPress={()=>{
                
                setModalVisible(false)
              }}>
                  <Image style={{ width: 25,height: 25, marginLeft: 25,}} source={require('../../../assets/botao-apagar.png')}/>
                  <Text style={styles.modalItemShowPost}>Deletar Mural</Text>
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

      { muralGroup?(
          <>
            <Title name={muralGroup?.name!} category={muralChoose?.name!} img={muralGroup?.imgGroup}/>
          </>
        ):null}
        <View style={styles.viewPostFilter}>
            <View style={styles.viewPesqShowPost}>
                <Image style={styles.imgPesqShowPost} source={require('../../../assets/lupa1.png')}/>
                <TextInput
                        placeholder="Pesquisar"
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.inputShowPost}
                    />
            </View>
            <TouchableOpacity onPress={()=>{
                setPesqTrue(!pesqTrue)
            }}>
                <Image style={styles.imgfilterShowPost} source={require('../../../assets/entrar.png')}/>
            </TouchableOpacity>
        </View>
        
        <ScrollView   style={styles.viewShowPost} contentContainerStyle={{ paddingBottom: 500 }} decelerationRate={'normal'} key={1} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

            {listMembersAlf !== undefined?(
                <>
                    {listMembersAlf!.map!== undefined?(
                listMembersAlf!.map(VUser=>(
                    <ShowMural authentication={()=>{
                        setModalVisible(true)
                        setUserChoose(VUser)
                    }} canceled={user?.isAdmin!} idMural={VUser.id!} img={VUser.profile_image || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} name={VUser.username} category={VUser.name}/>
                ))
            ):null}
                </>
            ):null}
                
        </ScrollView>

        {tabMenu?(
            <View style={{position:"absolute", width:"100%", bottom: 0, paddingBottom: 20, alignItems:"center", }}>
            <MenuTab navigation={navigation} five/>
          </View>
        ):null}
        
    </View>
  );
}


//