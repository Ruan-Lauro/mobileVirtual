import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    allLogin: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        
    },
    imgLogin: {
        width: width * 0.8, 
        height: height * 0.065,
        resizeMode: 'contain',
    },
    inputView: {
        width: width * 0.80, 
        marginTop: height * 0.07, 
        marginBottom: height * 0.10,
    },
    inputViewText: {
        opacity: 0.5,
        marginTop: 10,
        textAlign: "right",
    },
    TextButtonBottom: {
        opacity: 0.5,
        marginTop: height * 0.025, 
    },
    textReject: {
        color: "#C91E2D",
        marginTop: 25,
        textAlign: "center",
    },
});

export default styles;
