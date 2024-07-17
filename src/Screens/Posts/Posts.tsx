import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Platform, Keyboard, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
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
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type PostsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Posts'>;

type  PostsScreenRouteProp = RouteProp<RootStackParamList, 'Posts'>;

type Props = {
  navigation: PostsScreenNavigationProp;
  route: PostsScreenRouteProp;
};
export default function Posts({navigation, route}:Props) {

    const { muralChoose } = route.params;
    const [user, setUser] = useState<user>()
    const [userGroup, setUserGroup] = useState<group>()
    const [userMember, setUserMember] = useState<member>()
    const [muralGroup, setMuralGroup] = useState<group>()
    const [posts, setPosts] = useState<posts[]>([])
    const [mural, setMural] = useState<wall>()
    const [searchText, setSearchText] = useState("")
    const [listUsers, setListUsers] = useState<user[]>()
    const [listMembers, setListMember] = useState<member[]>()
    const [tabMenu, setTabMenu] = useState(true)
    const [loading, setLoading] = useState(true)
    const [DoPost, setDoPost] = useState(false)
    const [postDo, setPostDo] = useState(false)
    const [atualiz, setAtualiz] = useState(true)
    const [seePost, setSeePost] = useState<posts>()
    const [userSeePost, setUserSeePost] = useState<user>()
    const [trueSeePost, setTruePost] = useState(false)
    const [editPostTrue, setEditPostTrue] = useState(false)
    const [erroComponent, setErroComponent] = useState(false)
    const {authenticationGetM} = useGetMembers()
    const {authenticationAddG} = useGetGroupUserId()
    const {authenticationG} = useGetGroup()
    const {authenticationGetPM} = useGetPostsMural()
    const {authenticationGetU} = useGetUsers()
    const [refreshing, setRefreshing] = useState(false);
    const [deleteP, setDeleteP] = useState(false)
    const [idPostDeleted, setIdPostDeleted] = useState("")
    const [pesqTrue, setPesqTrue] = useState(false)
    
    const onRefresh = () => {
        setRefreshing(true);
        setAtualiz(!atualiz)
        
    };

    useEffect(() => {
        AsyncStorage.getItem('@userInfor')
            .then(async (value) => {
                setLoading(true)
                const userInfor = JSON.parse(value!)
                const userInformation: user = userInfor.data
                setUser(userInformation)
                setUser(userInformation)
                const listUserAll = authenticationGetU()
                listUserAll.then(value=>{
                  if(typeof value !== "string"){
                    setListUsers(value)
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
                if (muralChoose) {
                    const userlist = authenticationGetU();
                    userlist.then((userValue) => {
                        if( typeof userValue !== "string"){
                            setListUsers(userValue)
                        }else{
                            if(userValue == "user erro"){
                                setLoading(false)
                                return 
                            }else if(userValue == "servidor erro"){
                                setLoading(false)
                                setErroComponent(true)
                            }
                        }
                    })
                    setMural(muralChoose);
    
                    const groupMural = authenticationG()
                    groupMural.then(cod => {
                        if(typeof cod !== "string"){
                            const foundGroup = cod.find(codValue => codValue.id === muralChoose.groupId);
                            if (foundGroup) {
                                setMuralGroup(foundGroup)
                            }
                        }else{
                            if(cod == "user erro"){
                                setLoading(false)
                                return
                            }else if(cod =="servidor erro"){
                                setErroComponent(true)
                                setLoading(false)
                            }
                        }
                    })
    
                    if (userInformation.isAdmin) {
                        setDoPost(true);
                        const group = authenticationAddG(userInformation.id!);
                        group.then(value => {
                            if(typeof value !== "string"){
                                setUserGroup(value)
                            }else {
                                if(value == "user erro"){
                                    setLoading(false)
                                    return
                                }else if(value == "servidor erro"){
                                    setLoading(false)
                                    setErroComponent(true)
                                }
                            }
                            
                        })
                    } else {
                        const member = authenticationGetM();
    
                        member.then((memberValue) => {
                           if(typeof memberValue !== "string"){
                            setListMember(memberValue)
                            const foundMember = memberValue.find(memberList => memberList.userId === userInformation.id && memberList.category === muralChoose.category);
                            if (foundMember) {
                                setUserMember(foundMember)
                                setDoPost(true)
                            } else {
                                const foundMemberInGroup = memberValue.find(memberList => memberList.userId === userInformation.id && muralChoose.groupId === memberList.groupId);
                                if (foundMemberInGroup) {
                                    setUserMember(foundMemberInGroup)
                                }
                            }
                           }else{
                            if(memberValue == "user erro"){
                                setLoading(false)
                                return
                            }else if(memberValue == "servidor erro"){
                                setLoading(false)
                                setErroComponent(true)
                            }
                           }
                        })
                    }
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
                const postSelection = authenticationGetPM(mural.id)
                postSelection.then(value=>{
                if(typeof value !== "string"){
                    const list:posts[] = []
                    value.map(searchValue=>{
                       if(listUsers?.map!==undefined){
                        let letterUp: string = FirstLetter(searchText)
                        let letterDown: string = capitalizeFirstLetter(searchText)
                        if(searchValue.content.includes(searchText) || searchValue.content.includes(letterUp) || searchValue.content.includes(letterDown) ){
                          
                          list.push(searchValue)
                        }else{
                          listUsers.map(valueUser=>{
                            if(searchValue.memberId == valueUser.id && ((valueUser.name.includes(searchText) || valueUser.name.includes(letterUp) || valueUser.name.includes(letterDown)) ||(valueUser.username.includes(searchText) || valueUser.username.includes(letterUp) || valueUser.username.includes(letterDown)))){
                                list.push(searchValue)
                            }
                          })
                        }
                       }
                    })
                    setPosts(list.reverse())
                    setRefreshing(false)
                    setLoading(false)
                }else{
                    if(value == "user erro"){
                        setLoading(false)
                        setErroComponent(true)
                    }else if(value == "servidor erro"){
                        setLoading(false)
                        setErroComponent(true)
                    }
                }
            })
            }else{
                setPosts([])
                const postSelection = authenticationGetPM(mural.id)
                postSelection.then(value=>{
                    if(typeof value !== "string"){
                        if(value.map !== undefined && value.length!== 0){
                            setPosts([])
                            const sortedPosts: posts[] = value.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                            setPosts(sortedPosts.reverse())
                            setRefreshing(false)
                            setLoading(false)
                        }else{
                            setRefreshing(false);
                            setLoading(false);
                        }
                    }else{
                        if(value == "user erro"){
                            setLoading(false)
                            return
                        }else if(value == "servidor  erro"){
                            setLoading(false)
                            setErroComponent(true)
                        }
                    }
                })
                
                
            }
        }
      },[mural, atualiz, deleteP, postDo, trueSeePost, pesqTrue, editPostTrue])

      
      

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

    const exitDoPost = () =>{
        setPostDo(false)
    }


  return (
    <View style={styles.allPosts}>
         {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
        {editPostTrue?(
            <>
                {userSeePost?.isAdmin == true?(
                    <EditPost  context={seePost?.content!} exit={()=>{
                        setEditPostTrue(false)
                    }} idPost={seePost?.id!} media={seePost?.media!} img={muralGroup?.imgGroup || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} />
                ):(
                    <EditPost  context={seePost?.content!} exit={()=>{
                        setEditPostTrue(false)
                    }} idPost={seePost?.id!} media={seePost?.media!} img={userSeePost!.profile_image! || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"}/>
                )}
            </>
        ):null}
        {trueSeePost && seePost!== undefined && userSeePost !== undefined ?(
            <>
                {userSeePost.isAdmin === true?(
                    <SeePost  authentication={()=>{
                        setTruePost(false)
                    }} name={muralGroup!?.name} category={"@grupo"} data={seePost.created_at} idPost={seePost.id} isAdmin={user?.isAdmin!} text={seePost.content} media={seePost.media} img={muralGroup!.imgGroup} deleteN={()=>{
        
                    }} userNow={user?.id} userPost={userSeePost.id} editPost={()=>{
                        setEditPostTrue(true)
                    }} />
                ):(
                    <SeePost  authentication={()=>{
                        setTruePost(false)
                    }} name={userSeePost?.username} category={"@"+muralChoose?.category!} data={seePost.created_at} idPost={seePost.id} isAdmin={user?.isAdmin!} text={seePost.content} media={seePost.media} img={userSeePost.profile_image! || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} deleteN={()=>{
        
                    }} userNow={user?.id} userPost={userSeePost.id} editPost={()=>{
                        setEditPostTrue(true)
                    }}/>
                )}
            </>
        ):null}
         {deleteP?(
            <DeletePost authentication={()=>{
                setDeleteP(false)
            }} idPost={idPostDeleted}/>
          ):null}
        {postDo?(
            <>
                {user?.isAdmin == true?(
                    <DoPosts memberId={user?.id!} muralId={muralChoose?.id!} exit={exitDoPost} img={muralGroup!.imgGroup} category={muralChoose?.category!}/>
                ):(
                    <DoPosts memberId={user?.id!} muralId={muralChoose?.id!} exit={exitDoPost} img={user?.profile_image} category={muralChoose?.category!}/>
                )}
            </>
        ):null}
        {loading?(
         <LoadingMax/>
       ): null}
      {user || userGroup?(
          <>
            {user!.isAdmin?(
              <Title name={userGroup?.name!} category={"Grupo"} img={userGroup?.imgGroup}  navigation={navigation}/>
            ):(
              <Title name={user?.username!} category={userMember?.category! || ""} img={user!.profile_image!} navigation={navigation}/>
            )}
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
        
        <ScrollView   style={styles.viewShowPost} contentContainerStyle={{ paddingBottom: 110 }} decelerationRate={'normal'} key={1} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

                {posts.map !== undefined && posts != undefined && listUsers?(
                    posts.map(VPost =>(
                    <>
                        {listUsers.map !== undefined && listUsers !== undefined?(
                            listUsers?.map(VUser=>(
                                <>
                                    {VUser.id ==  VPost.memberId?(
                                        <>
                                            {VUser.isAdmin == true && muralGroup?(
                                                <TouchableOpacity key={VPost.id} onPress={()=>{
                                                   setSeePost(VPost)
                                                   setUserSeePost(VUser)
                                                   setTruePost(true)
                                                }}>
                                                    <ShowPosts authentication={()=>{}} name={muralGroup?.name} category={"grupo"} data={VPost.created_at} img={muralGroup.imgGroup || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} idPost={VPost.id} text={VPost.content} canceled={false} media={VPost.media} userNow={user?.id!} userPost={VUser.id} isAdmin={user?.isAdmin!} deleteN={()=>{
                                                        setIdPostDeleted(VPost.id)
                                                        setDeleteP(true)
                                                    }} editPostN={()=>{
                                                        setSeePost(VPost)
                                                        setUserSeePost(VUser)
                                                        setEditPostTrue(true)
                                                    }}/>
                                                </TouchableOpacity>
                                            ):(
                                                <TouchableOpacity key={VPost.id} onPress={()=>{
                                                    setSeePost(VPost)
                                                    setUserSeePost(VUser)
                                                    setTruePost(true)
                                                }}>
                                                    <ShowPosts authentication={()=>{
                                                         
                                                    }} name={VUser.username} category={muralChoose?.category!} data={VPost.created_at} img={VUser.profile_image || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} idPost={VPost.id} text={VPost.content} canceled={false} media={VPost.media} userNow={user?.id!} userPost={VUser.id} isAdmin={user?.isAdmin!} deleteN={()=>{
                                                        setIdPostDeleted(VPost.id)
                                                        setDeleteP(true)
                                                    }} editPostN={()=>{
                                                        setSeePost(VPost)
                                                        setUserSeePost(VUser)
                                                        setEditPostTrue(true)
                                                    }}/>
                                                </TouchableOpacity>
                                            )}
                                        </>
                                    ):null}
                                </>    
                            ))
                        ):null}
                    </>
                    ))
                ):null}
                
            </ScrollView>
        {DoPost?(
            <TouchableOpacity style={{width:70, height: 70, position:"absolute", bottom: 145, right: 20, backgroundColor:"#1A1A1A", borderRadius: 50, alignItems:"center", justifyContent:"center"}} onPress={()=>{
                setPostDo(true)
            }}>
                <Image style={{width:40, height: 40}} source={require('../../../assets/caneta-de-pena.png')}/>
            </TouchableOpacity>
        ):null}

        {tabMenu?(
            <View style={{position:"absolute", width:"100%", bottom: 0, paddingBottom: 20, alignItems:"center", }}>
            <MenuTab navigation={navigation} two/>
          </View>
        ):null}
        
    </View>
  );
}


//