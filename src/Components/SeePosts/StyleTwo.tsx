import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
const markdownStyles = StyleSheet.create({
    body: {
      fontSize: width*0.043,
      width: "100%",
      textAlign: "justify",
      lineHeight: (width*0.043) * 1.6,
    },
    heading1: {
      fontSize: 24,
      marginVertical: 10,
    },
    strong: {
      fontWeight: 'bold',
    },
    link: {
      color: '#0066cc',
    },
});

export default markdownStyles;