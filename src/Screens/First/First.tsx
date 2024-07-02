import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Buttons from '../../Components/ButtonLarge/Buttons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from '../Login/Login';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../type';
import TabRoutes from '../../Navigation/tab.routes';




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
        <Image  source={require("../../../assets/PapeisPersonagem.png")} style={{width: 190, height: 130}}/>    
       
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
      <Text style={styles.textFirstBottom}>Ao fazer o <Text style={styles.textStrong}>cadastro</Text>, você estar concordando com <Text style={styles.textStrong}>nossos termos</Text></Text>
      
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
    marginTop:70,
    justifyContent:"space-between", 
    alignItems:"center",
    width:300,
  },
  imgLogo:{
  width: 50,
  height: 45,
  top: 50,
  position: "absolute",
  },
  firstInfor:{
    width: "55%",
    alignItems:"center",
  },
  textFirstInfor:{
    width:"100%",
    display:"flex",
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 40,
  },
  textFirstBottom:{
    position:"absolute",
    bottom:60,
    width: "70%",
    textAlign:"center",
    fontSize:18,
    opacity: 0.55,
  },
  textStrong:{
    fontWeight:"bold",
  },
  textOr:{ 
    letterSpacing: -1,
    fontSize:16,
  },
  viewTextOr:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginTop: 3,
    marginBottom: 3,
  },
  textOrN:{
    fontSize:18,
  },
  
});
