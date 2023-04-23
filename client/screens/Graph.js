import * as Native from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Component} from 'react';
import {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import socketIO from 'socket.io-client';
import {LineChart, Grid, contentInset} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLegend,
} from 'victory-native';
import {Button} from 'react-native-paper';
import {MyEnum} from '../enums/Enums.js';
import Alerts from './Alerts';

const API_URL = 'http://192.168.1.109';

interface GraphProps {
  navigation: any;
}
let value = null;

const getProductionId = () => {
  const [productionID, setProductionID] = useState('');
  useEffect(() => {
    async function fetchData() {
      try {
        value = await AsyncStorage.getItem('IDproducao');
        setProductionID(value);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
};

onWineTransfer = async () => {
  try {
    let wineID = value;
    await AsyncStorage.setItem('IDVinhos', wineID);
    const idVinho = await AsyncStorage.getItem('IDVinhos');
    console.log(idVinho);
  } catch (error) {
    console.log(error);
  }
};

function Graph(props: GraphProps) {
  
  getProductionId();
  if (value != null) {
    console.log(value);
    onWineTransfer().then(() => {});
    value = null;
  }
  const Navegate = () => props.navigation.navigate('Home');
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = socketIO(`${API_URL}:5001`, {
      transports: ['websocket'],
    });
    socket.on('connection', () => {
      console.log('connected');
    });

    socket.on('message', data => {
      setData(data);
      console.log(data.length);
    });
  }, []);

  const [density, setDensity] = useState([]);
  useEffect(() => {
    const socket2 = socketIO(`${API_URL}:5002`, {
      transports: ['websocket'],
    });
    socket2.on('connection', () => {
      console.log('connected');
    });

    socket2.on('message', density => {
      setDensity(density);
    });
  }, []);

  const [liquidLevel, setliquidLevel] = useState([]);

  useEffect(() => {
    const socket3 = socketIO(`${API_URL}:5003`, {
      transports: ['websocket'],
    });

    socket3.on('message', liquidLevel => {
      setliquidLevel(liquidLevel);
      console.log(liquidLevel.length);
    });
  }, []);

  return (
  
   <View style={styles.container}>
      <VictoryChart width={500} theme={VictoryTheme.material} height={400}>
        <VictoryLine
          style={{
            data: {stroke: '#c43a32'},
          }}
          data={data}
          x="x"
          y="y"
        />

        <VictoryLine
          style={{
            data: {stroke: '#FFA500'},
          }}
          data={density}
          x="x"
          y="y"
        />
        <VictoryLine
          style={{
            data: {stroke: '#3346FF'},
          }}
          data={liquidLevel}
          y="y"
        />

        <VictoryLegend
          x={50}
          y={10}
          orientation="horizontal"
          symbolSpacer={5}
          gutter={30}
          data={[
            {name: 'Temperature', symbol: {fill: '#c43a32'}},
            {name: 'LiquidLevel', symbol: {fill: '#3346FF'}},
            {name: 'Density', symbol: {fill: '#FFA500'}},
          ]}
        />
      </VictoryChart>
      <TouchableOpacity onPress={Navegate}>
        <Text>{'back'}</Text>
      </TouchableOpacity>
      <Button onPress={() => props.navigation.navigate('StarRatingModal')}>
        <Text>{'How good was the wine?'}</Text>
      </Button>
      <Button onPress={() => setShowAlerts(true)}>
        <Text>{'Press for alert'}</Text>
      </Button>


    </View>
  );
}
module.exports.Graph = Graph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  button: {},
});