import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allSeePosts:{
        position: "absolute",
        width: "100%",
        height:"100%",
        backgroundColor:"white",
        zIndex:999,
        paddingTop: 40,
        alignItems:"center",
    },
    imgArrow:{
        width: 40,
        height: 30,
        transform: [{ scaleX: -1 }],
    },
    viewPostSeePost:{
        flexDirection:"row",
        marginTop:30,
    },
    SeePostImg:{
        width: 45,
        height: 45,
        borderRadius: 100,
        marginRight: 10,
    },
    textDoPosts:{
        fontSize: 16,
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
        fontSize:16,
        marginBottom: -4,
    },
    dateSeePost:{
        fontSize:14,
        opacity: 0.6,
    },
    categorySeePost:{
        fontSize:14,
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