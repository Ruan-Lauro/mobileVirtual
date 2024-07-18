import { View, StyleSheet, Text, TouchableOpacity, Linking, ScrollView, TextInput, Modal } from 'react-native';
import { Image } from 'expo-image';

type seePost = {
    image: string,
    authentication: ()=>void,
}

export default function SeeImage ({image, authentication}:seePost){
    console.log(image)
    return(
        <View style={{position:"absolute", width: "100%", marginTop:0, height:"100%", backgroundColor:"#1a1a1a", zIndex:1000}}>
             <View style={{width:"100%", height:"100%"}}>
             <TouchableOpacity onPress={authentication}>
                <Image style={{  width: 40, height: 30, transform: [{ scaleX: -1 }], marginTop:40, marginLeft:25}} source={require('../../../assets/seta-direitab.png')}/>
             </TouchableOpacity>
            <Image source={{uri:image}} style={{width:"90%", height:"80%", alignSelf:"center"}} contentFit='contain'></Image>
             </View>
        </View>
    )
}