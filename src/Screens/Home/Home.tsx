import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, TouchableOpacity, Platform, Keyboard, RefreshControl } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import styles from './Style';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
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
import ErroInternet from '../../Components/erroInternet/ErroInternet';
import { setLocalesAsync } from '@expo/config-plugins/build/ios/Locales';

type PostsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;



type Props = {
  navigation: PostsScreenNavigationProp;
  
};
export default function Home({navigation}:Props) {

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
    const [listGroup, setListGroup] = useState<group[]>()
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
    const {authenticationAddG} = useGetGroupUserId()
    const {authenticationG} = useGetGroup()
    const {authenticationGetPM} = useGetPostsMural()
    const {authenticationGetU} = useGetUsers()
    const {authenticationWG} = useGetWallsGroup()
    const [refreshing, setRefreshing] = useState(false);
    const [deleteP, setDeleteP] = useState(false)
    const [idPostDeleted, setIdPostDeleted] = useState("")
    const [pesqTrue, setPesqTrue] = useState(false)

    const [listGroupUser, setListGroupUser] = useState<group[]>([])
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
    const [lengthPost, setLengthPost] = useState<number>(0)

    const onRefresh = () => {
        setRefreshing(true);
        setAtualiz(!atualiz)
        
    }

    useFocusEffect(
      React.useCallback(() => {
        const loadData = async () => {
          try {
            AsyncStorage.getItem('@userInfor')
            .then(async (value) => {
                setLoading(true)
                const userInfor = JSON.parse(value!)
                const userInformation: user = userInfor.data
                setUser(userInformation)
                const listUserAll = authenticationGetU()
                listUserAll.then(value=>{
                 
                  if(typeof value == "string"){
                    if(value == "user erro"){
                      setLoading(false)
                      return
                    }else if(value == "servidor erro"){
                      setErroComponent(true)
                      setLoading(false)
                    }
                  }else{
                    setListUsers(value)
                  }
                })
                if(userInformation.isAdmin){
                  const groupUser = authenticationAddG(userInformation.id!)
                  groupUser.then(valueGroupUser=>{
                    if(typeof valueGroupUser !== "string"){
                      setUserGroup(valueGroupUser)
                      setMuralGroup(valueGroupUser)
                      setLoading(false)
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
                      if(typeof valueUserMember == "string"){
                        if(valueUserMember == "user erro"){
                          return 
                        }else if(valueUserMember == "servidor erro"){
                         
                          setErroComponent(true)
                          setLoading(false)
                        }
                      }else{
                        const memberValue = valueUserMember.find(userMemberNow => userMemberNow.userId == userInformation.id)
                     
                      
                      if(memberValue){
                        setUserMember(memberValue)
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
                              setLoading(false)
                            }
                          }
                        }) 
                      }else{
                        navigation.navigate("CodGroup")
                      }
                      }

                      
                    })
                }

            })
            .catch((error) => {
                console.error('Erro ao recuperar informações do usuário:', error)
            })
            
          } catch (error) {
            console.error('Erro ao recuperar informações do usuário:', error)
          } finally {
           
          }
        };
  
        loadData();
      }, [])
    )

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
        const listUserAll = authenticationGetU()
          listUserAll.then(value=>{
            if(typeof value == "string"){
              if(value == "user erro"){
                return
              }else if(value == "servidor erro"){
                setLoading(false)
                setErroComponent(true)
              }
            }else{
              setListUsers(value)
            }
          })
        const listGroupAll = authenticationG()
        listGroupAll.then(valueGroup=>{
          if(typeof valueGroup!=="string"){
            setListGroup(valueGroup)
          }else{
            if(valueGroup == "user erro"){
              return
            }else if(valueGroup == "servidor erro"){
              setLoading(false)
              setErroComponent(true)
            }
          }
        })
        const listMemberAll = authenticationGetM()
        listMemberAll.then(valueMember=>{
          if(typeof valueMember !== "string"){
            setListMember(valueMember)
          }else{
            if(valueMember == "user erro"){
              return
            }else if(valueMember == "servidor erro"){
              setLoading(false)
              setErroComponent(true)
            }
          }
        })
        if(searchText !== ""){
          setPostsTeste([])
          if(userGroup){
            const muralAll = authenticationWG(userGroup.id)
            muralAll.then((valueMural)=>{
              if(typeof valueMural !== "string"){
                if(valueMural.map !== undefined){
                  valueMural.map(muralsNew=>{
                    const postMural = authenticationGetPM(muralsNew.id)
                    postMural.then((PostMuralNew)=>{
                      if(typeof PostMuralNew !== "string"){
                        if(PostMuralNew.map !== undefined){
                          PostMuralNew.map(value=>{
                            
                            if(listUsers?.map!==undefined){
                              let letterUp: string = FirstLetter(searchText)
                                let letterDown: string = capitalizeFirstLetter(searchText)
                                if(value.content.includes(searchText) || value.content.includes(letterUp) || value.content.includes(letterDown) ){
                                  
                                  setPostsTeste(prevList => [...prevList, value])
                                }else{
                                  if(listUsers.map !== undefined){
                                    listUsers.map(valueUser=>{
                                      if(value.memberId == valueUser.id && ((valueUser.name.includes(searchText) || valueUser.name.includes(letterUp) || valueUser.name.includes(letterDown)) ||(valueUser.username.includes(searchText) || valueUser.username.includes(letterUp) || valueUser.username.includes(letterDown)))){
                                        setPostsTeste(prevList => [...prevList, value])
                                      }
                                    })
                                  }
                                }
                               
                            }
                          })
                        }
                      }else{
                        if(PostMuralNew == "user erro"){
                          return
                        }else if(PostMuralNew == "servidor erro"){
                          setLoading(false)
                          setErroComponent(true)
                        }
                      }
                    })
                    
                  })
                }
              }else{
                if(valueMural == "user erro"){
                  return
                }else if(valueMural == "servidor erro"){
                  setLoading(false)
                  setErroComponent(true)
                }
              }
              
              
            })
            }
      //     
      }else{
          setPostsTeste([])
          if(userGroup){
            const muralAll = authenticationWG(userGroup.id)
            
            muralAll.then((valueMural)=>{
              if(typeof valueMural !== "string"){
                if(valueMural.map !== undefined){
                  const list:posts[] = []
                  valueMural.map(muralsNew=>{
                    const postMural = authenticationGetPM(muralsNew.id)
                    postMural.then((PostMuralNew)=>{
                      if(typeof PostMuralNew !== "string"){
                        if(PostMuralNew.map !== undefined){
                     
                          PostMuralNew.map(value=>{
                            setPostsTeste(prevList => [...prevList, value])
    
                          })
                        }else{
                          setPosts([])
                          setRefreshing(false)
                          setLoading(false)
                        }
                      }else{
                        if(PostMuralNew == "user erro"){
                          return
                        }else if(PostMuralNew == "servidor erro"){
                          setLoading(false)
                          setErroComponent(true)
                        }
                      }
                    })
                    
                  })
                }else{
                  setRefreshing(false)
                  setLoading(false)
                }
                
              }else{
                if(valueMural == "user erro"){
                  return
                }else if(valueMural == "servidor erro"){
                  setLoading(false)
                  setErroComponent(true)
                }
              }
            })
            }
          
      }
        
      },[ userGroup, atualiz, pesqTrue])

      useEffect(()=>{
        
        if(postsTeste.length!==0){
          const sortedPosts: posts[] = postsTeste.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
          setPosts(sortedPosts.reverse().filter(value=>value.id))
          setRefreshing(false)
          setLoading(false)
        }
      },[postsTeste])

      useEffect(()=>{
        if(user?.isAdmin){
          setListGroupUser([])
          if(userGroup){
            setListGroupUser(prevList => [...prevList, userGroup])
            setSelectedGroupId(userGroup.id!)
          }
        }else{
          setListGroupUser([])
          const memberList = authenticationGetM()
          const groupList = authenticationG()
          memberList.then(value=>{
            if(typeof value !== "string"){
              if(value.map!== undefined){
                value.map(valueMember=>{
                  if(valueMember.userId == user?.id){
                    groupList.then(valueGroup=>{
                      if(typeof valueGroup !== "string"){
                        if(valueGroup.map!== undefined){
                          valueGroup.map((groupUser)=>{
                            if(valueMember.groupId == groupUser.id){
                              setListGroupUser(prevList => [...prevList, groupUser])
                              if(userGroup?.id === groupUser.id){
                                setSelectedGroupId(groupUser.id!)
                                setUserMember(valueMember)
                              }
                            } 
                          })
                        }
                      }else{
                        if(valueGroup == "user erro"){
                          return
                        }else if(valueGroup == "servidor erro"){
                          setLoading(false)
                          setErroComponent(true)
                        }
                      }
                    })
                  }
                })
              }
            }else{
              if(value == "user erro"){
                return
              }else if(value == "servidor erro"){
                setLoading(false)
                setErroComponent(true)
              }
            }
          })
        }
      },[userGroup])

      

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
                        setAtualiz(!atualiz)
                    }} idPost={seePost?.id!} media={seePost?.media!} img={muralGroup?.imgGroup || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} />
                ):(
                    <EditPost  context={seePost?.content!} exit={()=>{
                        setEditPostTrue(false)
                        setAtualiz(!atualiz)
                    }} idPost={seePost?.id!} media={seePost?.media!} img={userSeePost!.profile_image! || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"}/>
                )}
            </>
        ):null}
        {trueSeePost && seePost!== undefined && userSeePost !== undefined ?(
            <>
                {userSeePost.isAdmin === true?(
                    <SeePost  authentication={()=>{
                        setTruePost(false)
                        setAtualiz(!atualiz)
                    }} name={ userGroup!?.name} category={"@grupo"} data={seePost.created_at} idPost={seePost.id} isAdmin={user?.isAdmin!} text={seePost.content} media={seePost.media} img={userGroup!!.imgGroup} deleteN={()=>{
        
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
                setAtualiz(!atualiz)
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
        <View style={user?.isAdmin?(styles.viewPostFilterN):(styles.viewPostFilter)}>
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
        {user?.isAdmin == false?(
          <View style={{flexDirection:"row", marginBottom: 20, marginLeft: 25, marginRight: 25}}>
          {listGroupUser.map!== undefined?(
            listGroupUser.map((listgroup=>(
              <ChooseGroup
                key={listgroup.id}
                placeholder={listgroup.name}
                selected={selectedGroupId === listgroup.id}
                onchange={() => {
                  setSelectedGroupId(listgroup.id)
                  setUserGroup(listgroup)

                  setLoading(true)
                }}
              />
            )))
          ):null}
      </View>
        ):null}
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
                                                <TouchableOpacity key={VPost.id} onPress={()=>{
                                                   setSeePost(VPost)
                                                   setUserSeePost(VUser)
                                                   
                                                   setTruePost(true)
                                                }}>
                                                    <ShowPosts authentication={()=>{}} name={userGroup!?.name} category={"grupo"} data={VPost.created_at} img={userGroup!.imgGroup || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} idPost={VPost.id} text={VPost.content} canceled={false} media={VPost.media} userNow={user?.id!} userPost={VUser.id} isAdmin={user?.isAdmin!} deleteN={()=>{
                                                        setIdPostDeleted(VPost.id)
                                                        setDeleteP(true)
                                                    }} editPostN={()=>{
                                                        setSeePost(VPost)
                                                        setUserSeePost(VUser)
                                                        setEditPostTrue(true)
                                                    }} key={VPost.id}/>
                                                </TouchableOpacity>
                                            ):(
                                                <>
                                                  {listMembers!.map!== undefined?(
                                                    listMembers?.map(valueMember=>(
                                                      <>
                                                        {valueMember.userId === VUser.id  && valueMember.groupId == userGroup?.id?(
                                                          <TouchableOpacity key={VPost.id} onPress={()=>{
                                                            setSeePost(VPost)
                                                            setUserSeePost(VUser)
                                                            setTruePost(true)
                                                            setMuralChoose(valueMember.category)
                                                        }}>
                                                            <ShowPosts authentication={()=>{
                                                                 
                                                            }} name={VUser.username} category={valueMember.category} data={VPost.created_at} img={VUser.profile_image || "https://res.cloudinary.com/dfmdiobwa/image/upload/v1715644955/wtnyvouucw0rlu1o9f1f.png"} idPost={VPost.id} text={VPost.content} canceled={false} media={VPost.media} userNow={user?.id!} userPost={VUser.id} isAdmin={user?.isAdmin!} deleteN={()=>{
                                                                setIdPostDeleted(VPost.id)
                                                                setDeleteP(true)
                                                            }} editPostN={()=>{
                                                                setSeePost(VPost)
                                                                setUserSeePost(VUser)
                                                                setEditPostTrue(true)
                                                            }} key={VPost.id}/>
                                                        </TouchableOpacity>
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
            <MenuTab navigation={navigation} three/>
          </View>
        ):null}
        
    </View>
  );
}
