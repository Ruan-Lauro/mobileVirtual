import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    allRegister:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        backgroundColor:"white",
    },
    imgRegister:{
        width: width * 0.8, 
        height: height * 0.065,
        resizeMode: "contain",
    },
    inputViewRegister:{
        display:"flex",
        width:"75%",
        marginTop: "7%",
        marginBottom: '10%',
    },
    TextButtonBottom:{
        opacity: 0.5,
        marginTop: "2.5%",
    },
    TextInforRegister:{
        opacity: 0.5,
        marginTop: "4%",
    },
    TextInforRegisterAlert:{
        opacity: 0.5,
        marginTop: "4%",
        color: "#C91E2D",
    }
})

export default styles