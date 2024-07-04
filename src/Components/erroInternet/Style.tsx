
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    viewAllErro:{
        width:"100%", 
        height:"100%", 
        backgroundColor: "#rgba(255, 255, 255, 0.96)", 
        paddingTop:"15%", 
        position:"absolute", 
        zIndex:999,
    },
    imgArrow:{
        width: 40,
        height: 30,
        transform: [{ scaleX: -1 }],
        marginLeft: 25,
    },
    imgCharactere:{
        width: 200,
        height: 200,
        
    },
    imgCharactereW:{
        width: 150,
        height: 150,
        marginTop: 30,
        opacity: 0.8,
    },
    viewWifi:{
      flexDirection:"row",  
      alignSelf:"center",
      marginTop:150,
    },
    textErro:{
        marginTop: 30,
        fontSize: 25,
        fontWeight:"400",
        textAlign: "center",
    },
    textErroTWO:{
        fontSize: 25,
        fontWeight:"400",
        textAlign: "center",
    },

})

export default styles