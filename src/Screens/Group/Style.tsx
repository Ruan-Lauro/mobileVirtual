import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   allGroup:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
    viewGroup:{
        width: "80%",
       
    },
    viewImageCamera:{
        position: "absolute",
        left: 195,
        top: 109,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: "black",
        backgroundColor: "white",
        padding: 5,
    },
    imgGroup:{
        width: 35,
        height: 35,
    },
    imgViewGroup:{
     position: "relative",
    },
    textGroup:{
        fontSize: 18,
        opacity: 0.7,
        textAlign: "center",
        marginTop: 10,
    },
    buttonViewGroup:{
        alignSelf: "center",
        marginTop: 35,
    }
   
})

export default styles