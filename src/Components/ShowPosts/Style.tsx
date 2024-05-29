import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allShowPost:{
        flexDirection:"row",
        borderBottomColor: "#rgba(0, 0, 0, 0.2)",
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20,
        position:"relative",
    },
    ShowPostImg:{
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 10,
        marginLeft: 25,
    },
    viewInforShowPost:{
        width:"65%",
        
    },
    viewTextDate:{
        flexDirection:"row",
        justifyContent:"space-between",
       
    },
    textNameShowPost:{
        fontWeight:"500",
        fontSize:16,
        marginBottom: -4,
    },
    textCategoryShowPost:{
        fontSize:14,
        opacity: 0.6,
    },
    textDateShowPost:{
        fontSize:14,
        opacity: 0.6,
    },
    textInforShowPost:{
        marginTop: 8,
    },
    viewEdit:{
        flexDirection:"row",
    },
    imageOptionShowPost:{
        width: 15,
        height: 15,
        marginLeft: 20,
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