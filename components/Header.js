import React from 'react'
import { View ,StyleSheet, Text} from 'react-native'

function Header({title}) {
    return (
        <View style= {styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        alignSelf:"flex-start",
        width:"100%",
        paddingTop:50,
        paddingBottom:10,
        textAlign:"center",
        backgroundColor:"#56cfe1",
        alignContent:"center",
        justifyContent:"center",
        borderBottomColor:"#72EFDD",
        borderBottomWidth:1
    },
    title:{
        color:"black",
        textAlign:"center"
    }
})
export default Header
