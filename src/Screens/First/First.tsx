import { StyleSheet, Text, View, Button } from 'react-native';
import { Image } from 'expo-image';
import Buttons from '../../Components/ButtonLarge/Buttons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from '../Login/Login';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import TabRoutes from '../../Navigation/tab.routes';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};



export default function First({navigation}:Props) {

  return (
    <View style={styles.container}>
      
      <Image  source={require('../../../assets/LogoMural.png')} style={styles.imgLogo}/>    
    
      <View style={styles.firstInfor}>
        <Text style={styles.textFirstInfor}>A informação é a chave do sucesso para que tudo cresça.</Text>
        <Image  source={require("../../../assets/PapeisPersonagem.png")} style={{width: width*0.5, height: height*0.17, resizeMode: 'contain',}}/>    
       
      </View>
      
      <View style={styles.viewbutton}>
        <Buttons textButton='Cadastrar' Condition={false} authentication={()=>{
           navigation.navigate('Register')
        }}/>
       
        <View style={styles.viewTextOr}>
          <Text style={styles.textOr}>------------------------- <Text style={styles.textOrN}>ou</Text> ------------------------</Text>
        </View>
        <Buttons textButton='Login' Condition={true} authentication={()=>{
           navigation.navigate('Login')
        }}/>
      </View>
      <Text style={styles.textFirstBottom}>Ao fazer o <Text style={styles.textStrong}>cadastro</Text>, você está concordando com <Text style={styles.textStrong}>nossos termos</Text></Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative",
  },
  viewbutton:{
    display:"flex",
    marginTop:height*0.05,
    justifyContent:"space-between", 
    alignItems:"center",
    width: width*0.6,
  },
  imgLogo:{
    width: width*0.13,
    height: height*0.07,
    marginBottom: height*0.02,
    resizeMode:"contain",
  },
  firstInfor:{
    width: width*0.55,
    alignItems:"center",
  },
  textFirstInfor:{
    width:"100%",
    display:"flex",
    fontSize: width*0.08,
    fontWeight: "bold",
    marginBottom: 40,
  },
  textFirstBottom:{
   marginTop: "10%",
    width: width*0.7,
    textAlign:"center",
    fontSize:width*0.043,
    opacity: 0.55,
  },
  textStrong:{
    fontWeight:"bold",
  },
  textOr:{ 
    letterSpacing: -1,
    fontSize:width*0.033,
  },
  viewTextOr:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginTop: 3,
    marginBottom: 3,
  },
  textOrN:{ 
    fontSize:width*0.043,
  },
  
});
