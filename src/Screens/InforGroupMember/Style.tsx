import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    InforGroupMember:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor:"white",
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
    imgGroupMember:{
        width: 160,
        height: 160,
        borderRadius: 100,
        borderColor: "black",
    },
    inforGroupMemberEnter:{
        alignItems:"center",
        width:"80%",
    },
    textGroupMember:{
        fontSize: 28,
        textAlign:"center",
        marginBottom: 30,
        marginTop: 20,
        
    }
   
})

export default styles