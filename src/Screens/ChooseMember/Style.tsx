import { StyleSheet } from "react-native";

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
        marginBottom: 40,
    },
    viewPesqShowPost:{
        backgroundColor:"#F4F5F5",
        flexDirection:"row",
        width: 280,
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