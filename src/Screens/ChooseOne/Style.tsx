import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allChooseOne:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
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
    chooseOneOptions:{
        width:"85%",
        alignItems: "center",
    },
    chooseOneCharacter:{
        position:"relative",
        marginBottom: 50,
    },
    ChooseUserView:{
        alignItems:"center",
        position:"absolute",
        right: 0,
        bottom: 90,
    },
    ChooseGroupView:{
        alignItems:"center",
        position:"absolute",
        left: 0,
        bottom: 84,
    },
    ChooseUser:{
        width: 40,
        height: 45,
        
    },
    Character:{
        width: 320,
        height: 240,
    },
    ChooseGroup:{
        width: 70,
        height: 45,
        
    },
    textChoose:{
        fontSize: 28,
        textAlign:"center",
        width:"70%",
        fontWeight:"bold",
        marginBottom:30,

    },
    ButtomChoose:{
        marginLeft: 12,
    },
    rejectRegister:{
        fontSize: 16,
        color: "#C91E2D",
        marginLeft: 12,
        marginTop: 10,
    }
   
})

export default styles