import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   allUserProfile:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
   },
   imgArrow:{
      width: 40,
      height: 30,
      transform: [{ scaleX: -1 }],
      marginTop:30,
  },
  imgArrowN:{
   width: 40,
   height: 30,
   transform: [{ scaleX: -1 }],
   marginTop:60,
   marginBottom: -20,
},
   viewAllTextInfor:{
      marginBottom: 10,
   },
   viewTextInfor:{
      width:"100%",
      justifyContent:"space-between",
      flexDirection:"row",
   },
   textTop:{
      fontSize:18,
      marginLeft: 10,
   },
   inforText:{
      width:"100%",
      flex:1,
      fontSize:18,
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderWidth: 1,
      borderColor:"black",
      borderRadius: 15,
   },
   viewImageCamera:{
      position: "absolute",
      left: 175,
      top: 115,
      borderWidth: 1,
      borderRadius: 100,
      borderColor: "black",
      backgroundColor: "white",
      padding: 10,
  },
  imgViewGroup:{
   position: "relative",
  },
  imgGroup:{
   width: 35,
   height: 35,
},
exit:{
   fontSize: 20,
   marginRight: 5,
},
   
   
})

export default styles