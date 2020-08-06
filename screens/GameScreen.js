import React ,{useState, useRef, useEffect} from 'react'
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native'
import Card from '../components/card/Card';

const getRangedNumber = (start, end)=>{
    let random = Math.floor(Math.random() * (end-start) ) + start;
    return random;
}

const historyRenderer = (length , itemData)=>{
    console.log("itemdata ", itemData)
return <View style={styles.historyItemContainer}><Text style={styles.historyItemIndex}>#{itemData.index+1}</Text><Text style={styles.historyItemValue}>{itemData.item}</Text></View>
}

const GameScreen = ({selectedNumber, gameOver}) => {
    console.log("Gamescreen rendered");
    const [guessedNumber, setguessedNumber] = useState(getRangedNumber(0,100));
    const [numberFound, setNumberFound ] = useState(guessedNumber===selectedNumber);
    const lowLimit = useRef(1);
    const hightLimit = useRef(100);
    const rounds = useRef([guessedNumber])

    useEffect(() => {
        if(guessedNumber=== selectedNumber){
            gameOver(rounds.current.length)
        }
    }, [guessedNumber, selectedNumber, gameOver])

    const higherOrLower = (high)=>{
        console.log("button pressed")
        let nextGuess;
        if((high && guessedNumber> selectedNumber) || (!high && guessedNumber<selectedNumber) ){
            Alert.alert(`Dont't cheat!`, `Play fairly`, [{text:"Clear"}])
            return;
        }
        if(high){
            nextGuess = getRangedNumber(guessedNumber+1, hightLimit.current);
            lowLimit.current = guessedNumber+1;
        }
        else{
            nextGuess = getRangedNumber(lowLimit.current, guessedNumber);
            hightLimit.current= guessedNumber-1
        }
        console.log("nextGuess is ", nextGuess)
        if(nextGuess==selectedNumber){
            setNumberFound(true);
        }
        rounds.current.push(nextGuess);
        setguessedNumber(nextGuess);
    }

    return (
        <View style={styles.container}>
            <Card style={styles.gameCard}>
                <Card style={styles.currentGuess}>
            <Text style={styles.guessedNumber}>{guessedNumber}</Text>
            </Card>
            <View style={styles.actions}>
            <Button title="Higher" style={{...styles.button}} onPress={()=>{higherOrLower(true)} }></Button>
            <Button title="Lower" style={{...styles.button}} onPress={()=>{higherOrLower(false)}}></Button>

            </View>
            </Card>
            <View style={styles.previousGuessConstainer}>
                <FlatList data = {rounds.current} keyExtractor={item=> item} renderItem={historyRenderer.bind(this, rounds.current.length)} 
                contentContainerStyle={styles.historyList}
></FlatList>
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        // justifyContent:"center"
    },
    currentGuess:{
        width:"50%",
        height:"50%",
        elevation:8,
        backgroundColor:"#56E1D7",
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    },
    guessedNumber:{
        // fontWeight:"bold",
        fontSize:25,
        fontFamily:"Lobster-Regular"
    },
    gameCard:{
        width:"80%",
        height:200,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
    },
    actions:{
        marginVertical:20,
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-evenly"
    },
    historyItemContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        height:50,
        width:200,
        elevation:2,
        borderRadius:5,
        // borderWidth:1,
        
    },
    historyItemIndex:{
        
    },
    historyItemValue:{},
    previousGuessConstainer:{
        // flexDirection:"row-reverse",
        // flexGrow:1,
        // alignItems:"center",
        // justifyContent:"flex-end",
        flex:1,
        // borderWidth:4,
        // alignItems:"flex-end",
        // justifyContent:"flex-end"

    },
    historyList:{
        // flexDirection:"row-reverse"
        // justifyContent:"flex-end"
        flexGrow:1,
        justifyContent:"flex-end"
    },
})
