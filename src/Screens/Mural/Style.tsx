import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   allMural:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
   },
   inforLogoMember:{
    display:"flex",
    flexDirection: "row",
    position: "absolute",
    top: 60,
    width: "100%",
    justifyContent:"flex-end",
    },
    imgMural:{
        marginRight:20,
        width: 45,
        height: 40,
    },
    textMural:{       
        fontSize: 18,
        opacity: 0.7,
        textAlign: "center",
        marginTop: 30,

    },
    viewInputImageMural:{
        display:"flex",
        flexDirection: "row",
        alignItems: "baseline",
    },
    viewImgCamera:{
        backgroundColor:"white",
        borderRadius: 50,
        borderWidth: 1,
        padding: 5,
    },
    imgCamera:{
        width: 35,
        height: 35,
    },
    
   
})

export default styles