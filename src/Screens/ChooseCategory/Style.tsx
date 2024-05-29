import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allChooseCategory:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"white",
    },
    inforLogo:{
        flexDirection: "row",
        position: "absolute",
        top: 60,
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
    imgChooseCategory:{
        width:150,
        height:150,
        alignSelf:"center",
    },
    choosecategoryselectNew:{
        width:"70%",
        display:"flex",
       
    },
    viewSelectChooseCategory:{
        borderBottomWidth:1,
        borderBottomColor:"rgba(1,1,1,0.5)",
        marginTop:25,
        marginBottom:40,
        width:'90%',
        alignSelf:"center",
    },
    textSelectChooseCategory:{
        fontSize:18,
        textAlign:"center",
        opacity:0.7,
    },
    TextErroMember:{
        fontSize: 16,
        color: "#C91E2D",
        marginLeft: 12,
        marginTop: 10,
    }
   
})

export default styles