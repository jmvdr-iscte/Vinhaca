import * as Native from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Component} from 'react';
import {useState, useEffect, useRef} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Pressable, TouchableOpacity, Image} from 'react-native';
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
import {Modal} from './ModalAlerts';


const API_URL = 'http://192.168.1.109';

interface GraphProps {
  navigation: any;
}
//let value = null;

/*const getProductionId = () => {
  const [productionID, setProductionID] = useState('');
  useEffect(() => {
    async function fetchTemperature() {
      try {
        value = await AsyncStorage.getItem('IDproducao');
        setProductionID(value);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTemperature();
  }, []);
};
*/
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
  //getProductionId();
  /* if (value != null) {
    console.log(value);
    onWineTransfer().then(() => {});
    value = null;
  }
  */

  const Navegate = () => props.navigation.navigate('Home');

  const liquidLevelInterval = useRef(null);
  const densityInterval = useRef(null);
  const temperatureInterval = useRef(null);

  const [temperature, setTemperature] = useState([]);
  const [density, setDensity] = useState([]);
  const [liquidLevel, setliquidLevel] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogBodyText, setDialogBodyText] = useState('');
  const [dialogImage, setDialogImage] = useState(
    require('../assets/select.png'),
  );

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  useEffect(() => {
    const socket = socketIO(`${API_URL}:5001`, {
      transports: ['websocket'],
    });
    socket.on('connection', () => {
      console.log('connected');
    });

    try {
      socket.on('message', temperature => {
        const parsedData = JSON.parse(temperature);
        console.log(temperature);
        setTemperature(parsedData);
        if (parsedData.length > 0) {
          if (!temperatureInterval.current) {
            temperatureInterval.current = setInterval(() => {
              checkTemperature(parsedData[parsedData.length - 1].y);
            }, 1000);
          }
        }
      });
    } catch (error) {
      console.log('Error:', error.message);
    }

    const socket2 = socketIO(`${API_URL}:5002`, {
      transports: ['websocket'],
    });

    socket2.on('connection', () => {
      console.log('connected');
    });

    try {
      socket2.on('message', density => {
        const parsedData2 = JSON.parse(density);
        setDensity(parsedData2);
        if (parsedData2.length > 0) {
          if (!densityInterval.current) {
            densityInterval.current = setInterval(() => {
              checkDensity(parsedData2[parsedData2.length - 1].y);
            }, 1000);
          }
        }
      });
    } catch (error) {
      console.log('Error:', error.message);
    }

    const socket3 = socketIO(`${API_URL}:5003`, {
      transports: ['websocket'],
    });

    try {
      socket3.on('message', liquidLevel => {
        const parsedData3 = JSON.parse(liquidLevel);
        setliquidLevel(parsedData3);
        if (parsedData3.length > 0) {
          if (!liquidLevelInterval.current) {
            liquidLevelInterval.current = setInterval(() => {
              checkLiquidLevel(parsedData3[parsedData3.length - 1].y);
            }, 1000);
          }
        }
      });
    } catch (error) {
      console.log('Error:', error.message);
    }

    return () => {
      if (temperatureInterval.current) {
        clearInterval(temperatureInterval.current);
      }
      if (densityInterval.current) {
        clearInterval(densityInterval.current);
      }
      if (liquidLevelInterval.current) {
        clearInterval(liquidLevelInterval.current);
      }

      socket.disconnect();
      socket2.disconnect();
      socket3.disconnect();
    };
  }, []);

  const checkTemperature = temperatureAlert => {
    if (temperatureAlert > 30) {
      console.log(temperatureAlert);
      setDialogTitle('Way too hot');
      setDialogBodyText('Please get some fucking water');
      setDialogImage(require('../assets/high_temperature.png'));
      handleModal();
    } else if (temperatureAlert < 20) {
      setDialogTitle('Way too cold');
      setDialogBodyText('Please heat that shit up');
      setDialogImage(require('../assets/low_temperature.png'));
      handleModal();
    }
  };

  const checkLiquidLevel = liquidLevelAlert => {
    if (liquidLevelAlert > 20) {
      console.log(liquidLevelAlert);
      setDialogTitle('Way too high');
      setDialogBodyText('Please get something i dont know');
      setDialogImage(require('../assets/high_LiquidLevel.png'));
      handleModal();
    } else if (liquidLevelAlert < 2) {
      setDialogTitle('Way too low');
      setDialogBodyText('Please make it make it higher');
      setDialogImage(require('../assets/low_LiquidLevel.png'));
      handleModal();
    }
  };

  const checkDensity = densityAlert => {
    if (densityAlert > 20) {
      console.log(densityAlert);
      setDialogTitle('Way too dense');
      setDialogBodyText('Please get something i dont know');
      setDialogImage(require('../assets/high_density.png'));
      handleModal();
    } else if (densityAlert < 10) {
      setDialogTitle('Way too not dense');
      setDialogBodyText('Please make it more dense');
      setDialogImage(require('../assets/low_density.png'));
      handleModal();

    }
  };

  return (
    <View style={styles.container}>
      <VictoryChart
        width={400}
        theme={VictoryTheme.material}
        height={400}
        domain={{x: [0, 60], y: [0, 120]}}>
        <VictoryLine
          key={JSON.stringify(temperature)}
          style={{
            data: {stroke: '#c43a32'},
          }}
          data={temperature}
          x="x"
          y="y"
        />

        <VictoryLine
          key={JSON.stringify(density)}
          style={{
            data: {stroke: '#FFA500'},
          }}
          data={density}
          x="x"
          y="y"
        />
        <VictoryLine
          key={JSON.stringify(liquidLevel)}
          style={{
            data: {stroke: '#3346FF'},
          }}
          data={liquidLevel}
          x="x"
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
            {name: 'Turbity', symbol: {fill: '#FFA500'}},
          ]}
        />
      </VictoryChart>
      <TouchableOpacity onPress={Navegate}>
        <Text>{'back'}</Text>
      </TouchableOpacity>
      <Button onPress={() => props.navigation.navigate('StarRatingModal')}>
        <Text>{'How good was the wine?'}</Text>
      </Button>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title={dialogTitle} />
          <Modal.Body>
            <Image source={dialogImage} style={styles.image} />
            <Text style={styles.text}>{dialogBodyText}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button style={styles.button} onPress={handleModal}>
              <Text>{'OK'}</Text>
            </Button>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
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
  button: {
    backgroundColor: '#2f4f4f',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
