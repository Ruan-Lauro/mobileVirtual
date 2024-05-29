import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   allSeeMural:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
   },
   inforLogo:{
    flexDirection: "row",
    position: "absolute",
    top: 40,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
},
imgArrow:{
    width: 40,
    height: 30,
    transform: [{ scaleX: -1 }],
    marginLeft: 20,
},
imgMural:{
    width: 45,
    height: 40,
    marginRight: 20,
},
SeeMural:{
    width:"100%",
},
SeeMuralGroup:{
    
},
TextGroupMural:{
    fontSize: 22,
    fontWeight: "500",
    textAlign:"center",
},
TextGroupMuralCod:{
    fontSize: 18,
    fontWeight: "400",
    textAlign:"center",
    marginBottom: 40,
},
SeeMuralInfor:{
    width:"100%",
    borderTopColor: "#rgba(0, 0, 0, 0.2)",
    borderTopWidth: 1,
},
modalShowPost: {
        
},
modalContentShowPost: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
    position:"absolute",
    bottom:0,
    width:"100%",
},
modalItemShowPost: {
    fontSize: 18,
    padding: 10,
    
},
viewModalItem:{
    flexDirection:"row",
    alignItems:"center",

},
imgViewModalItem:{
    width: 20, 
    height: 20,
    marginLeft: 25,
},
   
})

export default styles