import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allChooseGroup:{
        flex: 1,
        alignItems: "center",
        backgroundColor:"white",
        position: "relative",
    },
    viewMuraisChooseGroup:{
        width: "100%",
        marginTop: 40,
        flex: 1,
    },
    textMuraisChooseGroup:{
        textAlign: "center",
        fontSize: 22,
        marginBottom: 30,
    },
    viewShowMuraisChooseGroup:{
        borderTopWidth: 1,
        borderTopColor: "#rgba(0, 0, 0, 0.2)",
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