import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    ShowMural: {
      flexDirection:"row",
      alignItems:"center",
      borderBottomColor: "#rgba(0, 0, 0, 0.2)",
      borderBottomWidth: 1,
      paddingBottom: 20,
      paddingTop: 20,
      justifyContent:"space-between",
      
    },
    ShowMuralInfor:{
        flexDirection:"row",
        alignItems:"center",
    },
    ShowMuralImg:{
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 10,
        marginLeft: 25,
    },
    ShowMuralViewText:{

    },
    ShowMuralText:{
        fontWeight:"500",
        fontSize:16,
        marginBottom: -3,
    },
    ShowMuralTextSecond:{
        fontSize:14,
        opacity: 0.6,
    }
})

export default styles