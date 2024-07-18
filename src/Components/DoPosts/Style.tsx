import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    allDoPosts:{
        position: "absolute",
        backgroundColor:"white",
        zIndex: 999,
        width:"100%",
        height:"100%",
        paddingTop: 30,
        flex: 1,
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
        position:"relative"
    },
    textDoPosts:{
        fontSize: 16,
        width:width*0.7,
        height:"auto"
    },
    viewMedia:{
        marginTop: 20,
        flexDirection: 'row',
        
    },
    viewPdf:{
        alignSelf: "center",
        alignItems:"center",
        justifyContent: 'center',
        width:width*0.65,
        height:height*0.3
        
    }

})

export default styles