import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allDoPosts:{
        flex: 1,
        backgroundColor:"white",
        position: "relative",
        paddingTop: 32,
   },
   imgArrow:{
        width: 40,
        height: 30,
        transform: [{ scaleX: -1 }],
        marginLeft: 25,
    },
    viewPubliPost:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
        
    },
    viewButtons:{
        flexDirection: "row",
        alignItems:"center",
        
    },
    buttonPubli:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#1A1A1A",
        width:100,
        height:40,
        borderRadius:10,
        opacity: 0.9,
        marginRight: 25,
        
    },
    buttonClean:{
        alignItems:"center",
        justifyContent:"center",
        width:100,
        height:40,
        marginRight:5,
    },
    viewImgUserText:{
        
        flexDirection:"row",
        borderBottomColor: "#rgba(0, 0, 0, 0.2)",
        borderBottomWidth: 1,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 30,
        paddingBottom:90,
        position:"relative",

    },
    textDoPosts:{
        fontSize: 16,
        width:260,
        
    },
    

})

export default styles