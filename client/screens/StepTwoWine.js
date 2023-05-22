import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { post } from '../../server/routes/routes';

interface StepTwoProps {
  route: any;
}


const API_URL="http://192.168.1.87:5000"

module.exports = StepTwoWine = (props: StepTwoProps) => {
  const { dataProcessProd } = props.route.params;
  const [showInfo, setShowInfo] = useState(false);
  const [mostoRealizado, setMostoRealizado] = useState('');
  const [mostrarReacaoSim, setMostrarReacaoSim] = useState(false);
  const [mostrarReacaoNao, setMostrarReacaoNao] = useState(false);
  const [mostoProduzido, setMostoProduzido] = useState('12');
  const [showInput, setShowInput] = useState(true);
  const [showEstacorreto, setShowEstacorreto] = useState(true);
  const [showProximoPasso, setShowProximoPasso] = useState(false);

  const handleButtonClick = () => {
    setMostoProduzido(dataProcessProd.WineQuantity * 0.6);
    setShowInfo(true);
  };

  const [dataProcessProd2, setDataProcessProd2] = useState({});

  const handleProceed = () => {
    
    
    console.log("dataProcessProd");
    console.log(dataProcessProd);
    const postData = {
      Info: dataProcessProd.Info,
      Step: 3, // Set the current step
      IDProducao: dataProcessProd.IDProducao, // Add the IDProducao to postData
      WineQuantity: dataProcessProd.WineQuantity,
      Mosto: mostoProduzido,
    };
  
    // Send the postData to the server
    axios.post(`${API_URL}/InfoProd`, postData)
      .then(response => {
        // Handle the response if needed
        setDataProcessProd2(response.data);
        console.log('Post successful:', response.data);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  
    // Move to the next step
    console.log({ dataProcessProd: postData })
     props.navigation.navigate('StepThreeWine', { dataProcessProd: postData });
  };

  const handleSimButtonClick = () => {

    
    setMostoProduzido(mostoProduzido);
    

    setMostrarReacaoSim(true);
    setMostrarReacaoNao(false);
    setShowEstacorreto(false);
  };

  const handleNaoButtonClick = () => {
    setMostrarReacaoNao(true);
    setMostrarReacaoSim(false);
  };

  

  const handleNextButtonClick = () => {
    if (mostoRealizado !== '') {
      setMostoProduzido(`${mostoRealizado}`);
    } else {
      setMostoProduzido(mostoProduzido);
    }
    setShowInput(false);
    setShowEstacorreto(false);
    setShowProximoPasso(true);
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
      
      <Text style={styles.heading}>Step Two</Text>
      <Text style={styles.heading}>Realização do Mosto</Text>

      <View style={styles.firstText}>
      <Text style={styles.subHeading}>
        Esmague as uvas de cada casta separadamente para extrair o suco...
      </Text>
      <Text style={styles.subHeading}>
        Combine os sucos de ambas as castas numa cuba grande o suficiente para ocupar{' '}
        {dataProcessProd.WineQuantity} L.
      </Text>

      </View>

      
      
      <View>
          <TouchableOpacity style={styles.proceedButtonGray} onPress={handleButtonClick}>
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>
        </View>

      {showInfo && (
        <View style={styles.screeny}>
          <View style={styles.mostoProduzido}>

          <View style={styles.mostoCorreto}>
          <Text style={[styles.subHeading, styles.quantity]}>{mostoProduzido} L</Text>
          <Text style={styles.ingredientName}>Mosto Produzido</Text>
          
          </View>
          {showEstacorreto && (
            <Text style={styles.subHeading}>Está correto?</Text>
          )}

          </View>

          {!mostrarReacaoSim && !mostrarReacaoNao && !showProximoPasso && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.proceedButtonGraysimnao} onPress={handleSimButtonClick}>
            <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.proceedButtonGraysimnao} onPress={handleNaoButtonClick}>
            <Text style={styles.buttonText}>Não</Text>
          </TouchableOpacity>
             
            </View>
          )}

          {mostrarReacaoNao && showInput && !showProximoPasso && (
            <View style={styles.inputContainer}>
              <Text style={styles.subHeading}>Qual foi a quantidade de mosto realizado?</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setMostoRealizado(text)}
                value={mostoRealizado}
              />
              <TouchableOpacity style={styles.proceedButtonGray} onPress={handleNextButtonClick}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
              
            </View>
          )}
        </View>
      )}

      {showProximoPasso && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.buttonText}>Próximo Passo</Text>
          </TouchableOpacity>
        </View>
      )}

      {(mostrarReacaoSim || mostrarReacaoNao) && !showProximoPasso && (
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
  },
  buttonContainer: {
    flexDirection: 'row',
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
  screeny: {},

  firstText: {
    marginTop: 20,
    marginBottom: 20,
  },
  mostoCorreto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  quantity: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: '#B3385B',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  ingredientName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 7,
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



export default StepTwoWine;
