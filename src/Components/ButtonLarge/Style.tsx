import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
   button:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#1A1A1A",
    width: width*0.5,
    height: height*0.065,
    borderRadius:10,
    opacity: 0.9,
   },
   
   textButton:{
    color:"white",
    fontSize:20,
   },
   buttonTwo:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"white",
      
      width: width*0.5,
      height: height*0.065,
      borderRadius:10,
      borderWidth: 1,
   },
   textButtonTwo:{
      fontSize:20,
      fontWeight: "500",
   }
   
})

export default styles