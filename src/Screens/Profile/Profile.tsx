import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { RootStackParamList } from '../type';
import MenuTab from '../../Components/MenuTab';
import styles from './Style';
import { user } from '../../hooks/useRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { group } from '../../hooks/useGetGroup';
import { useGetGroupUserId } from '../../hooks/useGetGroupUserId';

import * as ImagePicker from 'expo-image-picker';
import cloudinary from '../../Services/cloudinary'
import Buttons from '../../Components/Buttons/Buttons';
import { usePutUser } from '../../hooks/usePutUser';
import { useGetUsers } from '../../hooks/useGetUsers';
import LoadingMax from '../../Components/LoadingMax/Loading';
import { setLocalesAsync } from '@expo/config-plugins/build/ios/Locales';
import { putGroup, usePutGroup } from '../../hooks/usePutGroup';
import ErroInternet from '../../Components/erroInternet/ErroInternet';


type ChooseGroupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;


type Props = {
  navigation: ChooseGroupScreenNavigationProp;
};

export default function Profile({navigation}:Props) {

    const [user , setUser] = useState<user>()
    const [userGroup, setUserGroup] = useState<group>()
    const [loading,setLoading] = useState(false)
    const {authenticationAddG} = useGetGroupUserId()
    const [imageUri, setImageUri] = useState("")
    const [editName, setEditName] = useState(false)
    const [editUserName, setEditUserName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [editNameGroup, setEditNameGroup] = useState(false)
    const [menu, setMenu] = useState(true)
    const [erroComponent, setErroComponent] = useState(false)
    const [name, setName] = useState(user?.name)
    const [userName, setUserName] = useState(user?.username)
    const [email, setEmail] = useState(user?.email)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [nameGroup, setNameGroup] = useState("")

    const [alert, setAlert] = useState(false)
    const [textAlert, setTextAlert] = useState("")
    
    const {authenticationPutU} = usePutUser()
    const {authenticationGetU} = useGetUsers()
    const {authenticationPutG} = usePutGroup()

    const [Now, setNow] = useState(false)


    useEffect(() => {
      AsyncStorage.getItem('@userInfor')
          .then(async (value) => {
              
              const userInfor = JSON.parse(value!)
              const userInformation: user = userInfor.data
              setUser(userInformation)
              if(userInformation?.isAdmin){
                if(userInformation.isAdmin === true){
                  const groupUser = authenticationAddG(userInformation.id!)
                  groupUser.then((valueGroup)=>{
                   if(typeof valueGroup !== "string"){
                    setUserGroup(valueGroup)
                   }else{
                    if(valueGroup =="user erro"){
                      return
                    }else if(valueGroup == "servidor erro"){
                      setErroComponent(true)
                    }
                   }
                  })
               }
              }
          })
  }, []);

  useEffect(()=>{
    if(user?.isAdmin){
      const groupUser = authenticationAddG(user.id!)
      
        groupUser.then((valueGroup)=>{
          if(typeof valueGroup !== "string"){
            setUserGroup(valueGroup)
           }else{
            if(valueGroup =="user erro"){
              return
            }else if(valueGroup == "servidor erro"){
              setErroComponent(true)
            }
           }
        })
    }
  },[loading])

 



  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    

    if (!result.canceled) {
      
      setImageUri(result.assets[0].uri)
      
    }
    
  }

  const authenProfile = async () =>{
    if((name || email || userName || password || imageUri || nameGroup) && user){
      setAlert(false)
      setLoading(true)
      if(password){
        if(password.trim().length < 8){
          setAlert(true)
          setLoading(false)
          return  setTextAlert("A senha deve conter 8 caracteres")
        }else if( password !== confirmPassword){
          setAlert(true)
          setLoading(false)
          return  setTextAlert("As senhas estão diferentes")
        }
      }

      if(email){
        if(email.includes("@") == false){
          setAlert(true)
          setLoading(false)
          return  setTextAlert("O email não estar no formato") 
        }
      }

      setAlert(false)

      if(imageUri){
        const response = await cloudinary(imageUri)
        const listUser = {
          id: user?.id!,
          name,
          email,
          password,
          username: userName,
          profile_image: response.url,
      }

      if(user.isAdmin){
        if(nameGroup){
          const listGroup: putGroup = {
            name: nameGroup,
            userId: user.id!,
            imgGroup: response.url,
            id: userGroup?.id!,
          }
  
          const responseGroup = authenticationPutG(listGroup)
          responseGroup.then(responseGroupNew=>{
            if(responseGroupNew == "Group updated successfully."){
              setEditNameGroup(false)
              setImageUri("")
            }
            setImageUri("")
          })
        }else{
          const listGroup: putGroup = {
            name: userGroup?.name,
            userId: user.id!,
            imgGroup: response.url,
            id: userGroup?.id!,
          }
          
          const responseGroup = authenticationPutG(listGroup)
          responseGroup.then(responseGroupNew=>{
       
          })
        }
      }

      const profileNew = authenticationPutU(listUser)
      profileNew.then(valueProfile=>{
        if(valueProfile == "User updated successfully."){
        
          
          const listUsers = authenticationGetU()
          listUsers.then((valueUser)=>{
           if(typeof valueUser !== "string"){
            valueUser.map(async value=>{
              let userVal = user.id
              if(value.id == userVal){
                if(value){
                  const data = {
                    data: value,
                  }
                await AsyncStorage.setItem('@userInfor', JSON.stringify(data))
                .then(() => {
                
                  setUser(value)
                  setLoading(false)
                  setEditEmail(false)
                  setEditName(false)
                  setEditPassword(false)
                  setImageUri("")
                })
                .catch((error) => {
                  console.error('Erro ao armazenar informações do usuário:', error);
                });
                }
              }
            })
           }else{
            if(valueUser =="user erro"){
              setLoading(false)
              return
            }else if(valueUser == "servidor erro"){
              setLoading(false)
              setErroComponent(true)
            }
           }
          })
        } 
      })
    }else{
      const listUser = {
        id: user?.id!,
        name,
        email,
        password,
        username: userName,
    }

    if(user.isAdmin && nameGroup){
      const listGroup: putGroup = {
        name: nameGroup,
        userId: user.id!,
        id: userGroup?.id!,
        imgGroup:userGroup?.imgGroup,
      }
      
      const responseGroup = authenticationPutG(listGroup)
      responseGroup.then(responseGroupNew=>{
          setEditNameGroup(false)
          setImageUri("")
      })
    }

    const profileNew = authenticationPutU(listUser)
    profileNew.then(valueProfile=>{
      if(valueProfile == "User updated successfully."){
        const listUsers = authenticationGetU()
        listUsers.then((valueUser)=>{
          if(typeof valueUser !== "string"){
            valueUser.map(async value=>{
              let userVal = user.id
              if(value.id == userVal){
                if(value){
                  const data = {
                    data: value,
                  }
                await AsyncStorage.setItem('@userInfor', JSON.stringify(data))
                .then(() => {
                 
                  setUser(value)
                  setLoading(false)
                  setEditEmail(false)
                  setEditName(false)
                  setEditPassword(false)
                  setEditNameGroup(false)
                  setImageUri("")
                })
                .catch((error) => {
                  console.error('Erro ao armazenar informações do usuário:', error);
                });
                }
              }
            })
          }else{
            if(valueUser == "user erro"){
              setLoading(false)
              return
            }else if(valueUser == "servidor erro"){
              setLoading(false)
              setErroComponent(true)
            }
          }
        })
      }else{
        setAlert(true)
        setLoading(false)
        return  setTextAlert("O email ou UserName já cadastrado") 
      } 
    })
    }
  }
}

const keyboardDidShowListener = Keyboard.addListener(
  'keyboardDidShow',
  () => {
    setMenu(false)
  }
);

const keyboardDidHideListener = Keyboard.addListener(
  'keyboardDidHide',
  () => {
      setMenu(true)
  }
);





  return (
    <View style={styles.allUserProfile}>
      {loading?(
        <LoadingMax/>
      ):null}
       {erroComponent?(
        <ErroInternet authentication={()=>{
          setErroComponent(false)
        }}/>
       ):null}
      <View style={{width:"70%"}}>
      <TouchableOpacity onPress={()=>{
                   navigation.goBack()
                }}>
                    <Image style={user?.isAdmin?(styles.imgArrowN):(styles.imgArrow)} source={require('../../../assets/seta-direita.png')}/>
                </TouchableOpacity>  
      
      {user !== undefined && user!== null?(
        <ScrollView contentContainerStyle={{ marginTop: 50, paddingBottom: 200, position:"relative" }} decelerationRate={'normal'} showsVerticalScrollIndicator={false}>
        {user?.isAdmin === true?(
            <>
            {imageUri !== ""?(
              <Text style={{ zIndex:999, position:"absolute", top: 5, right: 50, fontSize: 20 }} onPress={()=>{
                setImageUri("")
              }}>X</Text>
            ):null}
            <TouchableOpacity onPress={selectImage} style={styles.imgViewGroup}>
                 {imageUri !== ""?(
                   <Image source={{ uri: imageUri }} style={{ width: 180, height: 180, borderRadius: 100, alignSelf: "center", }} />
                 ):(
                    <Image source={{ uri: userGroup?.imgGroup }} style={{ width: 180, height: 180, borderRadius: 100, alignSelf: "center", }} />
                 )}
             <View style={styles.viewImageCamera}>
               <Image source={require('../../../assets/camera.png')} style={styles.imgGroup}/>
             </View>
         </TouchableOpacity>
            </>
          ):(
           <>
           {imageUri !== ""?(
              <Text style={{ zIndex:999, position:"absolute", top: 5, right: 50, fontSize: 20 }} onPress={()=>{
                setImageUri("")
              }}>X</Text>
            ):null}
           <TouchableOpacity onPress={selectImage} style={styles.imgViewGroup}>
                 
                 {imageUri !== ""?(
                   <Image source={{ uri: imageUri }} style={{ width: 180, height: 180, borderRadius: 100, alignSelf: "center", }} />
                 ):(
                    (user?.profile_image ? (
                      <Image source={{ uri: user?.profile_image }} style={{ width: 180, height: 180, borderRadius: 100, alignSelf: "center", }} />
                  ) : (
                      <Image source={require('../../../assets/pensar.png')} style={{ width: 180, height: 180, borderRadius: 100,borderWidth: 1, borderColor: "black", alignSelf: "center",}} />
                  ))
                 )}
                 <View style={styles.viewImageCamera}>
                   <Image source={require('../../../assets/camera.png')} style={styles.imgGroup}/>
                 </View>
             </TouchableOpacity>

           </>
          )}
            <View style={styles.viewAllTextInfor}>
              <View style={styles.viewTextInfor}>
                  <Text style={styles.textTop}>Nome</Text>
                  {editName?(
                    <Text onPress={()=>{
                      setEditName(false)
                    }} style={styles.exit}>X</Text>
                  ):(
                    <TouchableOpacity onPress={()=>{
                      setEditName(!editName)
                    }}>
                      <Image source={require('../../../assets/editar.png')} style={{ width: 20, height: 20,}} />
                    </TouchableOpacity>
                  )}
              </View>
              {editName?(
                <TextInput style={styles.inforText} placeholder={"Nome"} value={name} onChangeText={setName} >
  
                </TextInput>
              ):(
                <Text style={styles.inforText}>{user?.name}</Text>
              )}
            </View>
            <View style={styles.viewAllTextInfor}>
              <View  style={styles.viewTextInfor}>
                <Text style={styles.textTop}>UserName</Text>
                {editUserName?(
                  <Text onPress={()=>{
                    setEditUserName(false)
                  }} style={styles.exit}>X</Text>
                ):(
                  <TouchableOpacity onPress={()=>{
                    setEditUserName(!editUserName)
                  }}>
                    <Image source={require('../../../assets/editar.png')} style={{ width: 20, height: 20,}} />
                  </TouchableOpacity>
                )}
              </View>
             {editUserName?(
                <TextInput style={styles.inforText} placeholder={"UserName"} value={userName} onChangeText={setUserName} >
  
                </TextInput>
             ):(
              <Text style={styles.inforText}>{user?.username}</Text>
             )}
            </View>
            <View style={styles.viewAllTextInfor}>
              <View  style={styles.viewTextInfor}>
                <Text style={styles.textTop}>E-mail</Text>
                
              </View>
              {editEmail?(
                <TextInput style={styles.inforText} placeholder={"E-mail"} value={email} onChangeText={setEmail}>
  
                </TextInput>
             ):(
              <Text style={styles.inforText}>{user?.email}</Text>
             )}
            </View>
            

            {user.isAdmin?(
              <>
              
              <View style={styles.viewAllTextInfor}>
              <View  style={styles.viewTextInfor}>
                <Text style={styles.textTop}>Nome do grupo</Text>
                {editNameGroup?(
                  <Text onPress={()=>{
                    setEditNameGroup(false)
                  }} style={styles.exit}>X</Text>
                ):(
                  <TouchableOpacity onPress={()=>{
                    setEditNameGroup(!editNameGroup)
                  }}>
                    <Image source={require('../../../assets/editar.png')} style={{ width: 20, height: 20,}} />
                  </TouchableOpacity>
                )}
              </View>
              {editNameGroup?(
                <TextInput style={styles.inforText} placeholder={"Nome do grupo"} value={nameGroup} onChangeText={setNameGroup}>
  
                </TextInput>
             ):(
              <Text style={styles.inforText}>{userGroup?.name}</Text>
             )}
            </View>

            <View style={styles.viewAllTextInfor}>
              <View  style={styles.viewTextInfor}>
                <Text style={styles.textTop}>Código do Grupo</Text>
              </View>
              <Text style={styles.inforText}>{userGroup?.groupCode}</Text>
            </View>
              
              </>
            ):null}

            <View style={styles.viewAllTextInfor}>
              <View  style={styles.viewTextInfor}>
                <Text style={styles.textTop}>IdUser</Text>
              </View>
              <Text style={styles.inforText}>{user?.id}</Text>
            </View>
  
            {alert && (editEmail || editName || editNameGroup || editUserName)?(
              <Text style={{opacity: 0.5,
                marginTop: "4%",
                color: "#C91E2D", marginBottom: 20,}}>{textAlert}</Text>
            ):null}
  
            {editEmail || editName || editPassword || editUserName || imageUri || editNameGroup?(
              <View style={{alignSelf:"center"}}>
                <Buttons textButton='Editar' Condition={true} authentication={authenProfile}/>
              </View>
            ): null}
        </ScrollView>
      ):null}
        
      </View>
      {menu?(
        <View style={{position:"absolute", width:"100%", bottom: 0, paddingBottom: 20, alignItems:"center", }}>
        <MenuTab navigation={navigation} one/>
      </View>
      
      ):null}
    </View>
  )
}