import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allCodGroup:{
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
    viewCodGroupAdd:{
        alignItems:"center",
        width: "80%",
        marginBottom: 20,
    },
    imgCharactereCod:{
        width:140,
        height:140,
    },
    textCodGroup:{
        textAlign:"center",
        width:"90%",
        fontSize:16.5,
        opacity: 0.7,
    },
    viewInputCodgroup:{
        width:"85%",
        marginBottom: 45,
        marginTop:10,
    },
    textRejectCodGrupo:{
        fontSize: 16,
        marginTop: 5,
        color: "#C91E2D",
    }

})

export default styles