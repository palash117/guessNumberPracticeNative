import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'

const GameOverScreen = ({rounds, restart, selectedNumber}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source ={{uri:"https://www.roughguides.com/wp-content/uploads/2016/02/annapurna-shutterstock_127312733-840x560.jpg"}} style={styles.image} onError={(err)=>{console.log("error with loading image",err)}} onLoad={()=>{console.log("image loaded")}} resizeMode="cover"></Image>
            </View>
            <Text style={styles.mainMessage}>{`Game Over!\n\nGame was won in ${rounds} rounds\n\nThe number was ${selectedNumber}`}</Text>
            <Button title="Resart" onPress={restart}></Button>
        </View>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    mainMessage:{
        textAlign:"center"
    },
    imageContainer:{
        height:200,
        width:200,
        borderRadius:100,
        borderWidth:2,
        overflow:"hidden"
    },
    image:{
        height:300,
        width:300,
        resizeMode: "stretch",
        
    },

})
