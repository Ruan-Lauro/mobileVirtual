import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    allPosts:{
        flex: 1,
        backgroundColor:"white",
        position: "relative",
    },
    viewPostFilter:{
        marginTop: 32,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    viewPostFilterN:{
        marginTop: 32,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 50,
    },
    viewPesqShowPost:{
        backgroundColor:"#F4F5F5",
        flexDirection:"row",
        width: width*0.7,
        borderRadius: 100,
        padding: 10,
        alignSelf:"baseline",
        
    },
    imgPesqShowPost:{
        width: 30,
        height: 30,
    },
    inputShowPost:{
        flex: 1,
    },
    imgfilterShowPost:{
        width: 40,
        height: 40,
        marginRight: 3.5,
    },
    viewShowPost:{
        borderTopColor: "#rgba(0, 0, 0, 0.2)",
        borderTopWidth: 1,
        flex: 1,
    },
})

export default styles