import { ScrollView, Text, View } from "react-native"
import { TouchableOpacity } from "react-native"
import { wall} from '../../hooks/useGetWallsGroup'
import { useState } from "react"

type select = {
    listElement: wall[],
    selected: (value: string)=>void,

}

export default  function Select ({listElement, selected}: select){
    const [showCategory, setShowCategory] = useState(false)
    const [showCategoryN, setShowCategoryN] = useState(true)
    const [select, setSelect] = useState("Selecione um")
    return(
        <ScrollView style={{borderColor:"rgba(1,1,1,0.5)", borderWidth: 1, borderRadius: 2, marginBottom: 20, marginTop: 20, borderTopWidth: 0, width: "90%", alignSelf:"center", maxHeight: 200}}>
            {showCategoryN?(
                <View style={{borderColor:"rgba(1,1,1,0.5)", borderTopWidth:1, padding:3, width:"100%", alignSelf:"center"}}>
                    <Text style={{fontSize: 18, marginLeft:10, opacity:0.7}} onPress={()=>{
                    setShowCategory(true)
                    setShowCategoryN(false)
                }}>{select}</Text>
                </View>
            ):null}
            {showCategory !== false?(
                <>
                    {listElement.map !== undefined?(
                        listElement.map(value=>(
                            <TouchableOpacity style={{borderColor:"rgba(1,1,1,0.5)",  borderTopWidth:1, padding: 3}} onPress={()=>{
                                selected(value.id+"")
                                setShowCategory(false)
                                setShowCategoryN(true)
                                setSelect(value.name)
                            }}>
                                <Text style={{fontSize: 18, marginLeft: 10, opacity:0.7,}}>{value.name}</Text>
                            </TouchableOpacity>
                        ))
                    ):null}
                </>
            ):null}
        </ScrollView>
    )
    
    
    
}