import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}   
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card:{
        width:"80%",
        height:200,
        elevation: 5,
        borderRadius:10
    }
})
