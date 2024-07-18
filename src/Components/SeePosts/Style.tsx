import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    allSeePosts:{
        position: "absolute",
        width: "100%",
        height:"100%",
        backgroundColor:"white",
        zIndex:999,
        alignItems:"center",
    },
    imgArrow:{
        width: 40,
        height: 30,
        transform: [{ scaleX: -1 }],
        marginTop:40
    },
    viewPostSeePost:{
        flexDirection:"row",
        marginTop:30,
        width:"100%",
    },
    SeePostImg:{
        width: 45,
        height: 45,
        borderRadius: 100,
        marginRight: 10,
    },
    textDoPosts:{
        fontSize:width*0.043,
        width:"100%",
        textAlign:"justify",
    },
    viewMedia:{
        marginTop:10,
        
    },
    viewPdf:{
        alignSelf: "center",
        alignItems:"center",
        justifyContent: 'center',
        width: 319, 
        height: 300,
    },
    viewNameSeePost:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"90%",
    },
    userNameSeePost:{
        fontWeight:"500",
        fontSize:width*0.043,
        marginBottom: -4,
    },
    dateSeePost:{
        fontSize:width*0.035,
        opacity: 0.6,
    },
    categorySeePost:{
        fontSize:width*0.035,
        opacity: 0.6,
    },
    modalShowPost: {
        
    },
    modalContentShowPost: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingTop: 30,
        paddingBottom: 60,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 7,
        position:"absolute",
        bottom:0,
        width:"100%",
    },
    modalItemShowPost: {
        fontSize: 18,
        padding: 10,
        
    },
    viewModalItem:{
        flexDirection:"row",
        alignItems:"center",

    },
    imgViewModalItem:{
        width: 20, 
        height: 20,
        marginLeft: 25,
    },

    
})

export default styles