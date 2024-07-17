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
import { useGetWallsGroup, wall } from '../../hooks/useGetWallsGroup';
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
import ChooseGroup from '../../Components/ChooseGroup/ChooseGroup';
import { useGetMurals } from '../../hooks/useGetMurals';
import { useGetPosts } from '../../hooks/useGetPosts';
import ErroInternet from '../../Components/erroInternet/ErroInternet';

type PostsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserPost'>;



type Props = {
  navigation: PostsScreenNavigationProp;
  
};
export default function UserPost({navigation}:Props) {

    const [user, setUser] = useState<user>()
    const [userGroup, setUserGroup] = useState<group>()
    const [userMember, setUserMember] = useState<member>()
    const [muralGroup, setMuralGroup] = useState<group>()
    const [posts, setPosts] = useState<posts[]>([])
    const [postsTeste, setPostsTeste] = useState<posts[]>([])
    const [mural, setMural] = useState<wall>()
    const [searchText, setSearchText] = useState("")
    const [listUsers, setListUsers] = useState<user[]>()
    const [listMembers, setListMember] = useState<member[]>()
    const [listMurals, setListMUrals] = useState<wall[]>([])
    const [listMuralForGroup, setListMuralsForGroup] = useState<wall[]>()
    const [listGroup, setListGroup] = useState<group[]>([])
    const [tabMenu, setTabMenu] = useState(true)
    const [loading, setLoading] = useState(true)
    const [DoPost, setDoPost] = useState(false)
    const [postDo, setPostDo] = useState(false)
    const [atualiz, setAtualiz] = useState(true)
    const [seePost, setSeePost] = useState<posts>()
    const [userSeePost, setUserSeePost] = useState<user>()
    const [trueSeePost, setTruePost] = useState(false)
    const [editPostTrue, setEditPostTrue] = useState(false)
    const [muralChoose, setMuralChoose] = useState("")
    const [erroComponent, setErroComponent] = useState(false)
    const {authenticationGetM} = useGetMembers()
    const {authenticationGetMU} = useGetMurals()
    const {authenticationAddG} = useGetGroupUserId()
    const {authenticationG} = useGetGroup()
    const {authenticationGetP} = useGetPosts()
    const {authenticationGetU} = useGetUsers()
    const [refreshing, setRefreshing] = useState(false);
    const [deleteP, setDeleteP] = useState(false)
    const [idPostDeleted, setIdPostDeleted] = useState("")
    const [pesqTrue, setPesqTrue] = useState(false)

    const [listGroupUser, setListGroupUser] = useState<group[]>([])
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

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
                if(userInformation.isAdmin){
                  const groupUser = authenticationAddG(userInformation.id!)
                  groupUser.then(valueGroupUser=>{
                    if(typeof valueGroupUser !== "string"){
                      setUserGroup(valueGroupUser)
                      setMuralGroup(valueGroupUser)
                    }else{
                      if(valueGroupUser == "user erro"){
                        setLoading(false)
                        return
                      }else if(valueGroupUser == "servidor erro"){
                        setErroComponent(true)
                        setLoading(false)
                      }
                    }
                  })
                }else{
                    const MemberAll = authenticationGetM()
                    const groupAll = authenticationG()
                    MemberAll.then(valueUserMember=>{
                      if(typeof valueUserMember !== "string"){
                        const memberValue = valueUserMember.find(userMemberNow => userMemberNow.userId == userInformation.id)
                      setUserMember(memberValue)
                      
                      if(memberValue){
                        groupAll.then(valueGroupAll=>{
                          if(typeof valueGroupAll !== "string"){
                            const groupUserNow = valueGroupAll.find((valueGroup)=> valueGroup.id == memberValue.groupId)
                          if(groupUserNow){
                            setUserGroup(groupUserNow)
                            setMuralGroup(groupUserNow)
                          }
                          }else{
                            if(valueGroupAll == "user erro"){
                              return
                            }else if(valueGroupAll == "servidor erro"){
                              setErroComponent(true)
                            }
                          }
                        }) 
                      }
                      }else{
                        if(valueUserMember == "user erro"){
                          return
                        }else if(valueUserMember == "servidor erro"){
                          setErroComponent(true)
                        }
                      }
                    })
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
        setPosts([])
        const listUserAll = authenticationGetU()
          listUserAll.then(value=>{
            if(typeof value !== "string"){
              setListUsers(value)
            }else{
              if(value == "user erro"){
                return
              }else if(value == "servidor erro"){
                setErroComponent(true)
              }
            }
          })
        const listGroupN = authenticationG()
        listGroupN.then(valueGroup=>{
          if(typeof valueGroup !== "string"){
            setListGroup(valueGroup)
          }else{
            if(valueGroup == "user erro"){
              return
            }else if(valueGroup == "servidor erro"){
              setErroComponent(true)
            }
          }
        })
        const listMemberAll = authenticationGetM()
        const listMural = authenticationGetMU()
        listMural.then(valueListMural=>{
         if(typeof valueListMural !== "string"){
          setListMuralsForGroup(valueListMural)
         }else{
          if(valueListMural == "user erro"){
            return
          }else if(valueListMural == "servidor erro"){
            setErroComponent(true)
          }
         }
        })
        listMemberAll.then(valueMember=>{
          if(typeof valueMember !== "string"){
            setListMUrals([])
          setListMember(valueMember)
          valueMember.map((member)=>{
            listMural.then((valueMural)=>{
              if(typeof valueMural !== "string"){
                valueMural.map(murals=>{
                  if(member.userId == user?.id && member.groupId == murals.groupId){
                    setListMUrals(prevList => [...prevList, murals])
                  }
                })
              }else{
                if(valueMural == "user erro"){
                  return
                }else if(valueMural == "servidor erro"){
                  setErroComponent(true)
                }
              }
            })
          })
          }else{
            if(valueMember == "user erro"){
              return
            }else if(valueMember == "servidor erro"){
              setErroComponent(true)
            }
          }

        })

        if(searchText !== ""){
          setPostsTeste([])
          if(userGroup){
            const postAll = authenticationGetP()
  
            postAll.then((PostMuralNew)=>{
              if(typeof PostMuralNew !== "string"){
                if(PostMuralNew.map !== undefined){
                  PostMuralNew.map(value=>{
                    if(value.memberId === user?.id){
                      let letterUp: string = FirstLetter(searchText)
                      let letterDown: string = capitalizeFirstLetter(searchText)
                      if(value.content.includes(searchText) || value.content.includes(letterUp) || value.content.includes(letterDown) ){
                        setPostsTeste(prevList => [...prevList, value])
                      }
                    }
                  })
                }
              }else{
                if(PostMuralNew == "user erro"){
                  return
                }else if(PostMuralNew == "servidor erro"){
                  setErroComponent(true)
                }
              }
            })
            
            }
      //     
      }else{
          setPostsTeste([])
          if(userGroup){
            const postAll = authenticationGetP()
  
            postAll.then((PostMuralNew)=>{
              if(typeof PostMuralNew !== "string"){
                if(PostMuralNew.map !== undefined){
                  PostMuralNew.map(value=>{
                    if(value.memberId === user?.id){
                      setPostsTeste(prevList => [...prevList, value])
                    }
                  })
                }
              }else{
                if(PostMuralNew == "user erro"){
                  return
                }else if(PostMuralNew == "servidor erro"){
                  setErroComponent(true)
                }
              }
            })
            
            }
          
      }
        
      },[ userGroup, atualiz, deleteP, postDo, trueSeePost, pesqTrue, editPostTrue])

      useEffect(()=>{
        
        if(postsTeste.length!==0){
          const sortedPosts: posts[] = postsTeste.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
          const seenIds = new Set()
          const uniquePosts = sortedPosts.filter(post => {
            if (seenIds.has(post.id)) {
                return false
            } else {
                seenIds.add(post.id)
                return true
            }
        })
          setPosts(uniquePosts.reverse())
          setRefreshing(false)
          setLoading(false)
          
        }else{
          setRefreshing(false);
          setLoading(false);
        }
      },[postsTeste])

     
      

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
                    }} name={userSeePost?.username} category={"@"+muralChoose!} data={seePost.created_at} idPost={seePost.id} isAdmin={user?.isAdmin!} text={seePost.content} media={seePost.media} img={userSeePost.profile_image! || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} deleteN={()=>{
        
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
        
        {loading?(
         <LoadingMax/>
       ): null}
      {user && userGroup?(
          <>
            {user!.isAdmin?(
              <Title name={userGroup?.name!} category={"Grupo"} img={userGroup?.imgGroup} navigation={navigation}/>
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

                {posts.map !== undefined && listUsers !== undefined?(
                    posts.map(VPost =>(
                    <>
                        {listUsers!.map !== undefined && listUsers !== undefined && listUsers.length !== 0?(
                            listUsers?.map(VUser=>(
                                <>
                                    {VUser.id ==  VPost.memberId?(
                                        <>
                                            {VUser.isAdmin == true && muralGroup?(
                                                <>
                                                  {listMuralForGroup?.map!== undefined?(
                                                    listMuralForGroup.map(VMural=>(
                                                      <>
                                                        {VMural.groupId == muralGroup.id && VPost.muralId == VMural.id?(
                                                          <TouchableOpacity key={VPost.id} onPress={()=>{
                                                            setSeePost(VPost)
                                                            setUserSeePost(VUser)
                                                            setTruePost(true)
                                                         }}>
                                                             <ShowPosts authentication={()=>{}} name={muralGroup?.name} category={VMural.name} data={VPost.created_at} img={muralGroup.imgGroup || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} idPost={VPost.id} text={VPost.content} canceled={false} media={VPost.media} userNow={user?.id!} userPost={VUser.id} isAdmin={user?.isAdmin!} deleteN={()=>{
                                                                 setIdPostDeleted(VPost.id)
                                                                 setDeleteP(true)
                                                             }} editPostN={()=>{
                                                                 setSeePost(VPost)
                                                                 setUserSeePost(VUser)
                                                                 setEditPostTrue(true)
                                                             }}/>
                                                         </TouchableOpacity>
                                                        ):null}
                                                      </>
                                                    ))
                                                  ):null}
                                                </>
                                            ):(
                                                <>
                                                  {listMembers!.map!== undefined?(
                                                    listMembers?.map(valueMember=>(
                                                     <>
                                                      {listMurals.map!== undefined?(
                                                        listMurals.map(VMural=>(
                                                          <>
                                                          {valueMember.userId === VUser.id && VMural.category == valueMember.category && VPost.muralId == VMural.id?(
                                                            <>
                                                              {listGroup.map!==undefined?(
                                                                listGroup.map((VGroup)=>(
                                                                  <>
                                                                    {VGroup.id == VMural.groupId?(
                                                                      <TouchableOpacity key={VPost.id} onPress={()=>{
                                                                        setSeePost(VPost)
                                                                        setUserSeePost(VUser)
                                                                        setTruePost(true)
                                                                        setMuralChoose(valueMember.category)
                                                                    }}>
                                                                        <ShowPosts authentication={()=>{
                                                                             
                                                                        }} name={VUser.username} category={VGroup.name} data={VPost.created_at} img={VUser.profile_image || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} idPost={VPost.id} text={VPost.content} canceled={false} media={VPost.media} userNow={user?.id!} userPost={VUser.id} isAdmin={user?.isAdmin!} deleteN={()=>{
                                                                            setIdPostDeleted(VPost.id)
                                                                            setDeleteP(true)
                                                                        }} editPostN={()=>{
                                                                            setSeePost(VPost)
                                                                            setUserSeePost(VUser)
                                                                            setEditPostTrue(true)
                                                                        }}/>
                                                                    </TouchableOpacity>
                                                                    ):null}
                                                                  </>
                                                                ))
                                                              ):null}
                                                            </>
                                                          ):null}
                                                        </>
                                                        ))
                                                      ):null}
                                                     </>
                                                    ))
                                                  ):null}
                                                </>
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

        {tabMenu?(
            <View style={{position:"absolute", width:"100%", bottom: 0, paddingBottom: 20, alignItems:"center", }}>
            <MenuTab navigation={navigation} four/>
          </View>
        ):null}
        
    </View>
  );
}