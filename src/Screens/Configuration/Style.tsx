import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   allConfiguration:{
    flex: 1,
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
   fontSize:18,
   fontWeight:"500",
   marginBottom: -2,
  },
  textSecoConfiguration:{
   fontSize:16,
   opacity: 0.6,
   width:"85%",
  },
   
})

export default styles