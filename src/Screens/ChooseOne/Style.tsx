import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
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
        right: 0.0*width,
        bottom: 0.106*height,
        
    },
    ChooseGroupView:{
        alignItems:"center",
        position:"absolute",
        left: -0.02*width,
        bottom: 0.1*height,
       
    },
    ChooseUser:{
        width: width*0.15,
        height: height*0.054,
        resizeMode:"contain",
        zIndex:999,
    },
    Character:{
        width: width*0.77,
        height: height*0.27,
        resizeMode:"contain",
    },
    ChooseGroup:{
        width: width*0.19,
        height: height*0.055,
        resizeMode:"contain",
        zIndex:1000,
    },
    textChoose:{
        fontSize: width*0.085,
        textAlign:"center",
        width:width*0.7,
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