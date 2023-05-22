import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { post } from '../../server/routes/routes';

interface StepSevenProps {
  route: any;
}

const API_URL = "http://192.168.1.48:5000";

module.exports = StepSevenWine = (props: StepSevenProps) => {
  const { dataProcessProd } = props.route.params;
  const [showInfo, setShowInfo] = useState(true);
  const [mostoRealizado, setMostoRealizado] = useState('');
  const [mostrarReacaoSim, setMostrarReacaoSim] = useState(false);
  const [mostrarReacaoNao, setMostrarReacaoNao] = useState(false);
  const [mostoProduzido, setMostoProduzido] = useState('12');
  const [showInput, setShowInput] = useState(true);
  const [showEstacorreto, setShowEstacorreto] = useState(true);
  const [showProximoPasso, setShowProximoPasso] = useState(false);

  const [ultimaLeitura, setUltimaLeitura] = useState('');
  const [intervalId, setIntervalId] = useState(null);

  const [dataa, setData] = useState({});

  const [showProceedButton, setShowProceedButton] = useState(false);
  const [temperatureColor, setTemperatureColor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/ultimaLeituraData`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Erro ao buscar a última leitura:', error);
      }
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Check if dataa is empty
    const isDataEmpty = Object.keys(dataa).length === 0;

    if (!isDataEmpty) {
      // Dataa object is not empty, proceed with processing the data

      // Verificar se a temperatura está entre 32 e 38 graus
      const temperature = dataa.temperature ? dataa.temperature.Leitura : 0;
      const density = dataa.density ? dataa.density.Leitura : 0;
      const isTemperatureInRange = temperature >= 20 && temperature <= 38;
      const isDensityEqualTo1000 = density < 1000;
      setShowProceedButton(isTemperatureInRange && isDensityEqualTo1000);

      // Definir a cor do background com base no intervalo
      setTemperatureColor(isTemperatureInRange && isDensityEqualTo1000 ? '#77b066' : '#B3385B');

      // Set other measures if available
     /* console.log(dataa);
      console.log(dataa.temperature ? dataa.temperature.Leitura : null);
      console.log(dataa.density ? dataa.density.Leitura : null);
      console.log(Object.keys(dataa).length);
      */
    }
  }, [dataa]);

  const handleButtonClick = () => {};

  const [dataProcessProd2, setDataProcessProd2] = useState({});

  const handleProceed = () => {
    console.log("dataProcessProd");
    console.log(dataProcessProd);
    const postData = {
      Info: dataProcessProd.Info,
      Step: 8, // Set the current step
      IDProducao: dataProcessProd.IDProducao, // Add the IDProducao to postData
      WineQuantity: dataProcessProd.WineQuantity,
      Mosto: mostoProduzido,
      IDVinho: dataProcessProd.IDVinho
    };

    // Send the postData to the server
    axios
      .post(`${API_URL}/InfoProd`, postData)
      .then(response => {
        // Handle the response if needed
        setDataProcessProd2(response.data);
        console.log('Post successful:', response.data);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });

    // Move to the next step
    props.navigation.navigate('StepEightWine', { dataProcessProd: postData });
  };

  const handleSimButtonClick = () => {
    setMostrarReacaoSim(true);
  };

  const handleNaoButtonClick = () => {
    setMostrarReacaoNao(true);
    setMostrarReacaoSim(false);
  };

  const handleNextButtonClick = () => {
    if (mostoRealizado !== '') {
      setMostoProduzido(`${mostoRealizado} Litros`);
    } else {
      setMostoProduzido('12');
    }
    setShowInput(false);
    setShowEstacorreto(false);
    setShowProximoPasso(true);
  };

  const handleGrafico = () => {
    props.navigation.navigate('Graph');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.frameView} onPress={() => props.navigation.navigate("Production")}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
        </TouchableOpacity>
      <Text style={styles.heading}>Step Seven</Text>
      <Text style={styles.heading}>Fermentação</Text>
      <View style={[styles.firstText, styles.centerView]}>
        <Text style={[styles.subHeading, styles.firstTextCuba]}>
          Mexer todos os dias o mosto com a pá de fermentação
        </Text>
        <Text style={[styles.subHeading, styles.firstTextCuba]}>Serás avisado quando a fermentação terminar</Text>
      </View>

      {showInfo && (
        <View style={styles.screeny}>
          <View style={styles.mostoProduzido}>
            <View style={styles.mostoCorreto}>
              <Text style={[styles.subHeading, styles.firstTextCuba]}>Controla a Cuba</Text>
              <View style={styles.measures}>
                <Text style={[styles.subHeading, styles.quantity, { backgroundColor: temperatureColor }]}>
                  {Object.keys(dataa).length > 0 ? dataa.temperature.Leitura : 'N/A'}
                  °C
                </Text>
                <Text style={[styles.subHeading, styles.quantity, { backgroundColor: temperatureColor }]}>
                  {Object.keys(dataa).length > 0 ? dataa.density.Leitura : 'N/A'}
                  p
                </Text>
                <Text style={[styles.subHeading, styles.quantity, { backgroundColor: temperatureColor }]}>
                  {Object.keys(dataa).length > 0 ? dataa.liquidLevel.Leitura : 'N/A'}
                  cm
                </Text>
              </View>
              <TouchableOpacity style={styles.proceedButtonGraysimnao} onPress={handleGrafico}>
                <Text style={styles.buttonText}>Ver o Gráfico</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!mostrarReacaoSim && !mostrarReacaoNao && !showProximoPasso && showProceedButton && (
            <View style={styles.buttonContainer}>
              <Text style={styles.subHeading}>Parabéns!</Text>
              <Text style={styles.subHeading}>Fermentação Concluída ✔</Text>
              
              <TouchableOpacity style={styles.proceedButtonGraysimnao} onPress={handleSimButtonClick}>
                <Text style={styles.buttonText}>Prosseguir</Text>
              </TouchableOpacity>
            </View>
          )}

          {mostrarReacaoNao && showInput && !showProximoPasso && (
            <View style={styles.inputContainer}>
              <Text style={styles.subHeading}>Qual foi a quantidade de mosto realizado?</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setMostoRealizado(text)}
                value={mostoRealizado}
              />
              <TouchableOpacity style={styles.proceedButtonGray} onPress={handleNextButtonClick}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {(showProximoPasso || mostrarReacaoSim) && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.buttonText}>Próximo Passo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56132A',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    marginBottom: 10,
    width: '30%',
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: '#B3385B',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  proceedButtonGray: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  proceedButtonGraysimnao: {
    
    backgroundColor: 'gray',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    
  },

  bottomContainer: {
    marginTop: 'auto',
    justifyContent: 'flex-end',
  },
  firstTextCuba: {
    fontSize: 20,
  },

  firstText: {
    marginTop: 20,
    marginBottom: 20,
  },
  mostoCorreto: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  quantity: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#B3385B',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  ingredientName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 7,
  },
  centerView: {
    alignItems: 'center',
  },
  screeny: {
    flex: 1,
  },
  measures: {
    flexDirection: 'row',
    marginTop: 20,
  },
  mostoProduzido: {
    
  },
  frameView: {
    alignSelf: "stretch",
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});