import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import Home from './screens/Home';
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as Font from 'expo-font'
import { AppLoading } from 'expo';

const loadFonts = ()=>{
  console.log("loading fonts")
   return (()=>{
     try {
      Font.loadAsync({//\assets\fonts\Yanone_Kaffeesatz
        // "YanoneKaffeesatz-Regular":require('./assets/fonts/Yanone_Kaffeesatz/static/YanoneKaffeesatz-Regular.ttf'),
        // "YanoneKaffeesatz-Bold":require('./assets/fonts/Yanone_Kaffeesatz/static/YanoneKaffeesatz-Bold.ttf'),
        "Lobster-Regular":require('./assets/fonts/Lobster/Lobster-Regular.ttf')
        })
     } catch (err) {
       console.log("error faced")
       console.error("err is ", err)
     }
   })()
}

export default function App() {
  const [isFontLoaded, setisFontLoaded] = useState(false)
  const [gameStarted, setgameStarted] = useState(false)
  const [targetNumber , setTargetNumber] = useState(null)
  const [rounds, setrounds] = useState(0)
  const [isGameOver, setisGameOver] = useState(false)

  // useEffect(() => {
  //   loadFonts()
  // }, [loadFonts])

  if(!isFontLoaded){
    return <AppLoading startAsync={loadFonts} onFinish={()=>{setTimeout(()=>{setisFontLoaded(true)}, 300)}}/> 
  }

  const startGame = (num)=>{
    setgameStarted(true)
    setTargetNumber(num)
  }
  const gameOver = (gameRounds)=>{
    setrounds(gameRounds);
    setisGameOver(true)
  }
  const restart = ()=>{
    setgameStarted(false)
    setTargetNumber(null);
    setrounds(0);
    setisGameOver(false)
  }
  return (
    <View style={styles.container}>
      <Header title={"GUESS THE NUMBER"}/>
      {!gameStarted && (<Home startGame = {startGame} ></Home>)}
      {gameStarted && !isGameOver && (<GameScreen selectedNumber={targetNumber} gameOver={gameOver}></GameScreen>)}
      {isGameOver && <GameOverScreen  selectedNumber={targetNumber}  rounds = {rounds} restart={restart}></GameOverScreen>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
