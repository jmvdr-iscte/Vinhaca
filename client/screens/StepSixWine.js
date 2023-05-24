import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { post } from '../../server/routes/routes';
import CountDownTimer from 'react-native-countdown-timer-hooks';

interface StepSixProps {
  route: any;
}


const API_URL="http://192.168.1.87:5000"

module.exports = StepSixWine = (props: StepFiveProps) => {
  const { dataProcessProd } = props.route.params;
  const [showInfo, setShowInfo] = useState(false);
  const [mostoRealizado, setMostoRealizado] = useState('');
  const [mostrarReacaoSim, setMostrarReacaoSim] = useState(false);
  const [mostrarReacaoNao, setMostrarReacaoNao] = useState(false);
  const [mostoProduzido, setMostoProduzido] = useState('12');
  const [showInput, setShowInput] = useState(true);
  const [showEstacorreto, setShowEstacorreto] = useState(true);
  const [showProximoPasso, setShowProximoPasso] = useState(false);
  const [currentStep, setCurrentStep] = useState(6);



  const [ultimaLeitura, setUltimaLeitura] = useState('');
  const [intervalId, setIntervalId] = useState(null);

  const [dataa, setData] = useState({});

  const [showProceedButton, setShowProceedButton] = useState(false);
  const [temperatureColor, setTemperatureColor] = useState('');

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/ultimaLeituraTemp`);
        const data = await response.json();
        setData(data);

        // Verificar se a temperatura está entre 32 e 38 graus
      const temperature = data.length > 0 ? data[0].Leitura : 0;
      const isTemperatureInRange = temperature >= 22 && temperature <= 28;
      setShowProceedButton(isTemperatureInRange);

       // Definir a cor do background com base no intervalo
       setTemperatureColor(isTemperatureInRange ? '#77b066' : '#B3385B');

        
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
    
  }, [dataa]);
  
  const [timerActive, setTimerActive] = useState(false);
  const countdownRef = useRef(null);

  const [timerFinished, setTimerFinished] = useState(false);

  const handleTimerPress = () => {
    setTimerActive(!timerActive);
    if (!timerActive) {
      countdownRef.current && countdownRef.current.start();
    } 
  };

  const handleButtonClick = () => {
    setShowInfo(true);
    handleTimerPress();
    
  };

  const handleCountdownFinish = () => {
    console.log('Timer finished');
    setTimerActive(false);
    setTimerFinished(true);
  };

  const [dataProcessProd2, setDataProcessProd2] = useState({});

  const handleProceed = () => {
    
    
    console.log("dataProcessProd");
    console.log(dataProcessProd);
    const postData = {
      Info: dataProcessProd.Info,
      Step: 7, // Set the current step
      IDProducao: dataProcessProd.IDProducao, // Add the IDProducao to postData
      WineQuantity: dataProcessProd.WineQuantity,
      Mosto: dataProcessProd.Mosto,
      IDVinho: dataProcessProd.IDVinho
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
    console.log("dataProcessProd: postData ihihihihi");
      
     props.navigation.navigate('StepSevenWine', { dataProcessProd: postData });
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.frameView} onPress={() => props.navigation.navigate("Production")}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
        </TouchableOpacity>
      
        <View style={styles.statusBar}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressStep, currentStep >= 1 && styles.activeStep]}
          />
          <View
            style={[styles.progressStep, currentStep >= 2 && styles.activeStep]}
          />
          <View
            style={[styles.progressStep, currentStep >= 3 && styles.activeStep]}
          />
          <View	
            style={[styles.progressStep, currentStep >= 4 && styles.activeStep]}
          />
          <View
            style={[styles.progressStep, currentStep >= 5 && styles.activeStep]}
          />
          <View
            style={[styles.progressStep, currentStep >= 6 && styles.activeStep]}
          />
          <View
            style={[styles.progressStep, currentStep >= 7 && styles.activeStep]}
          />
          <View
            style={[styles.progressStep, currentStep >= 8 && styles.activeStep]}
          />
        </View>
      </View>
      <Text style={styles.heading}>Juntar o Tanino</Text>

      <View style={[styles.firstText , styles.centerView]}>
      <Text style={[styles.subHeading,styles.firstTextCuba]}>
        Junta as {JSON.parse(dataProcessProd.Info).Tanino}g de Tanino
      </Text>
      

      </View>

      
      <TouchableOpacity style={styles.proceedButtonGraysimnao} onPress={handleButtonClick}>
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>
      

      {showInfo && (
        <View style={styles.screeny}>
          <View style={styles.mostoProduzido}>

          <View style={styles.mostoCorreto}>
          <View style={[styles.subHeading ,{display: timerFinished ? 'none' : 'flex'} ]}>
          <CountDownTimer
           ref={countdownRef}
           timestamp={5}
           timerCallback={handleCountdownFinish}
           
           containerStyle={{
             height: 56,
             width: 120,
             justifyContent: 'center',
             alignItems: 'center',
             backgroundColor: '#B3385B',
             paddingHorizontal: 10,
             borderRadius: 5,
             
           }}
           textStyle={{
             fontSize: 30,
             color: '#FFFFFF',
             fontWeight: '500',
             letterSpacing: 0.25,
           }}
        />
          </View>
           
        
      
          {!timerFinished && (
          <Text style={styles.ingredientName}>Descansando...</Text>
          )
}

{timerFinished && (
          <Image
          style={[{ width: 30, height: 30, marginTop: 25, marginBottom:8}, styles.centerView]}
          source={require("../assets/certo.png")}
        />
          )
}
          
          </View>
          

          </View>

          {timerFinished && (



            <View style={styles.centerView} >
                
                <Text style={[styles.subHeading, styles.centerView, styles.centerText]}>Aviso: Certifica-te que a temperatura está entre 22° e os 28°</Text>

                <Text style={[styles.subHeading, styles.quantity, { backgroundColor: temperatureColor }]}>{dataa.length > 0 ? dataa[0].Leitura : 'N/A'}°C</Text>
                <View style={styles.buttonContainer}>
                
                {showProceedButton && (
              <TouchableOpacity style={styles.proceedButtonGraysimnao} onPress={handleSimButtonClick}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
          )}
          </View>
          
             
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

      {mostrarReacaoSim && (
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
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
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
  },
  ingredientName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 7,
  },
    centerView: {
    alignItems: 'center',
    marginTop: 30,
    },

    frameView: {
      alignSelf: "stretch",
      flexDirection: "row",
      paddingHorizontal: 0,
      paddingVertical: 10,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    statusBar: {
    
      backgroundColor: '#56132A',
      borderRadius: 8,
      marginBottom: 20,
      marginTop: 10,
    },
    progressBar: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      backgroundColor: '#56132A',
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 10,
      
    },
    progressStep: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'gray',
      
    },
    activeStep: {
      backgroundColor: 'white',
    },

    centerText: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      
    },
  
    

  
});



export default StepSixWine;
