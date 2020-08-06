import React,{useState} from 'react'
import { StyleSheet, Text, View , TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import Card from '../components/card/Card'

const Home = ({startGame}) => {
    const [inputText
        , setinputText
    ] = useState("")
    const [confirmed, setconfirmed] = useState(false)
    const [selectedNumber, setselectedNumber] = useState(null)
    const updateSelectedNumber = (param) =>{
        let valid = param.match(/^\d+$/gm)
        if(valid){
            let value = parseInt(param);
            setinputText(""+value)
            console.log("input text updated to ", value)
        }
    }
    const resetNumber = ()=>{
        setinputText("")
    }
    const confirmNumber = ()=>{
        if( !isNaN(inputText) && inputText!="0" && inputText!=="" && parseInt(inputText)<=99){
            setconfirmed(true);
            setselectedNumber(parseInt(inputText))
        }
        else{
            Alert.alert('Invlid number','Please iput a valid number between 1 to 99', [{text:"Okay", style:'destructive', onPress:resetNumber}])
        }
    }
    const confirmStartGame = ()=>{
        startGame(selectedNumber);
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
            <Text  style={styles.message}>Start a new game</Text>
            <Card style={styles.card}>
                <View style={styles.cardView}>  
                    <Text style={styles.selectNumberMessage}>Select a number</Text>
                    <TextInput style={styles.selectNumberInput} keyboardType="number-pad" maxLength={2} onChangeText={updateSelectedNumber} value={inputText}></TextInput>
                    <View style={styles.actions}>
                        <Button title={"RESET"} style={styles.button} onPress = {resetNumber}></Button>
                        <Button title={"CONFIRM"}  style={styles.button} onPress={confirmNumber}></Button>
                    </View>
                </View>
            </Card>
    {confirmed && <View style={styles.startGameContainer}><Card style={styles.startGameCard}><Text style={styles.numberMessage}>Your have selected </Text><Text style={styles.selectedNumber}>{selectedNumber}</Text>
            <Button title={"Start game"} style={styles.startGameButton} onPress={confirmStartGame}></Button></Card></View>}
        </View>
        </TouchableWithoutFeedback>
    )
}

export default Home

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",

        // justifyContent:"center",

    },
    selectedNumber:{
        fontWeight:"bold",
        margin:10
    },
    startGameContainer:{
        marginTop:10,
        width:"80%",
        height:300,
    },
    startGameCard:{
        height:300,
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    numberMessage:{},
    startGameButton:{},
    message:{
       fontSize:19,
       marginVertical:10,
       fontFamily:"Lobster-Regular"
    },
    cardView:{
        margin:10,
        padding:10,
        alignItems:"center"
    },
    selectNumberMessage:{
        textAlign:"center"
    },
    actions:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around"
        
    },
    button:{
        width:100
    },
    card:{
        height:150,
        width:"80%"
    },
    selectNumberInput:{
        textAlign:"center",
        borderBottomWidth:1,
        margin:10,
        padding:2,
        width:20
    },
    centered:{
        textAlign:"center"
    }
})
