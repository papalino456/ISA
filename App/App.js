import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

let level;

class App extends Component {
  intervalID;
  state = {
    hum:0,
    temp:0.0,
    lvl:"",
  }
  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getData = () => {
    fetch('https://sb-isa.herokuapp.com/data')
    .then(response => response.json())
    .then(data => {
      this.setState({ data: data });
      this.setState({ hum: data.hum });
      this.setState({ temp: data.temp });
      this.setState({ lvl: data.lvl })
      if(this.state.lvl < 10) {
        level = <Text>Low</Text>
      }
      else {
        level = <Text>{this.state.lvl} %</Text>
      }
      this.intervalID = setTimeout(this.getData.bind(this), 1000);
    })
  }
//---------------->>>>>>>>>>>>{ this.state.temp } para mostrar temperatura <<<<<<<<<<<<<<--------------

  render(){
    return (
      <ImageBackground  source={require('./IMG_0534.png')} style={styles.container}>
        <View style={styles.border}>
        <View style={styles.gauge}>
          <AnimatedCircularProgress
            size={250}
            width={10}
            fill={parseInt(this.state.hum)}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
            rotation={225}
            arcSweepAngle={270}
            lineCap="round"
            >
            {
              (fill) => (
                <AnimatedCircularProgress
                size={220}
                width={10}
                fill={29
                }//parseInt(this.state.temp)
                tintColor="#00FF8B"
                backgroundColor="#3d5875"
                rotation={225}
                arcSweepAngle={270}
                lineCap="round"
                >
                {
                  (fill) => (
                    <View>
                    <Text style={styles.text}> { this.state.hum*1 } % </Text>
                    <Text style={styles.text1}>27.00°</Text> 
                    </View>
                  )
                }
              </AnimatedCircularProgress>
              )
            }
            
          </AnimatedCircularProgress>
          <Icon style={styles.text2} name={"tint"}> {level}</Icon>
          </View>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffff00',
    justifyContent: "center",
    alignItems:"center",
  },
  text:{
    borderRadius:10,
    backgroundColor:"#ffffff",
    fontSize: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems:"center",
    color:"#00e0ff",
  },
  text1:{
    borderRadius:10,
    backgroundColor:"#ffffff",
    fontSize: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems:"center",
    color:"#00FF8B",
  },
  text2:{
    position: "absolute",
    bottom: 20,
    borderRadius:10,
    backgroundColor:"#ffffff",
    fontSize: 25,
    flex:1,
    textAlign: "center",
    justifyContent: "center",
    alignItems:"center",
    color:"#0051FF",
  },
  border:{
    borderRadius:10,
    backgroundColor:"#ffffff",
    fontSize: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems:"center",
    height:700,
    width:400,
  },
  title:{
    flex:0,
    fontSize: 70,
  },
  button:{
    position:"absolute",
    color:"#CCD1D1",
    
  },
  gauge:{
    borderRadius:10,
    backgroundColor:"#ffffff",
    fontSize: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems:"center",
    width:400,
  },
});
