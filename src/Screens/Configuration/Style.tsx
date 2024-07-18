import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
   allConfiguration:{
    flex: 1,
    maxWidth:"100%",
    backgroundColor: "white",
   },
   imgArrow:{
      width: 40,
      height: 30,
      transform: [{ scaleX: -1 }],
      marginLeft: 25,
      marginRight: 20,
  },
  viewConfigurationBack:{
      flexDirection:"row",
      borderBottomColor: "#rgba(0, 0, 0, 0.2)",
      borderBottomWidth: 1,
      alignItems:"center",
      paddingBottom: 20,
      paddingTop: 20,
      marginBottom: 20,
  },
  ConfigurationBackText:{
      fontSize: 23,

  },
  viewConfiguration:{
      marginLeft:25,
      marginRight:25,
  },
  viewImgConfiguration:{
      marginBottom: 30,
      alignItems:"center",
      flexDirection:"row",
  },
  imgConfiguration:{
      width:50,
      height: 50,
      marginRight: 10,
  },
  imgConfigurationN:{
   width:45,
   height: 45,
   marginRight: 10,
},
  textPrinConfiguration:{
    marginRight:0,
   fontSize:18,
   fontWeight:"500",
   marginBottom: -2,
  },
  textSecoConfiguration:{
   fontSize:16,
   opacity: 0.6,
   width:width*0.8,
   marginRight:0,
  },
   
})

export default styles