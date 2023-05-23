import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import {post} from '../../server/routes/routes';

interface StepEightProps {
  route: any;
}

const API_URL = 'http://192.168.1.49:5000';

module.exports = StepEightWine = (props: StepEightProps) => {
  const {dataProcessProd} = props.route.params;
  const [showInfo, setShowInfo] = useState(false);
  const [mostoRealizado, setMostoRealizado] = useState('');
  const [mostrarReacaoSim, setMostrarReacaoSim] = useState(false);
  const [mostrarReacaoNao, setMostrarReacaoNao] = useState(false);
  const [mostoProduzido, setMostoProduzido] = useState('12');
  const [showInput, setShowInput] = useState(true);
  const [showEstacorreto, setShowEstacorreto] = useState(true);
  const [showProximoPasso, setShowProximoPasso] = useState(false);

  const handleButtonClick = () => {
    setShowInfo(true);
    setShowProximoPasso(true);
  };

  const [dataProcessProd2, setDataProcessProd2] = useState({});

  const handleProceed = () => {
    const postData = {
      Info: dataProcessProd.Info,
      IDProducao: dataProcessProd.IDProducao, // Add the IDProducao to postData
      WineQuantity: dataProcessProd.WineQuantity,
      IDVinho: dataProcessProd.IDVinho
    };

    props.navigation.navigate('StarRatingModal', { dataProcessProd: postData });
    console.log(dataProcessProd.IDVinho);
  };

  const handleSimButtonClick = () => {
    setMostoProduzido('12');

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
      <TouchableOpacity
        style={styles.frameView}
        onPress={() => props.navigation.navigate('Production')}>
        <Image
          style={styles.vectorIcon}
          resizeMode="cover"
          source={require('../assets/vector1.png')}
        />
      </TouchableOpacity>

      <Text style={styles.heading}>Passo Final</Text>
      <Text style={styles.heading}>Conclusão do Vinho</Text>

      <View style={styles.firstText}>
        <Text style={styles.subHeading}>
          A receita foi concluída com sucesso!
        </Text>
        <View style={styles.mostoCorreto}>
          <Text style={[styles.subHeading, styles.quantity]}>
            {dataProcessProd.WineQuantity} L
          </Text>
          <Text style={styles.ingredientName}>Vinho Produzido</Text>
        </View>
        <Text style={styles.subHeading}>
          Deves agora procurar um enólogo para fazer as correções finais.
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.proceedButtonGray}
          onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>

      {showInfo && (
        <View style={styles.screeny}>
          <Text style={styles.subHeading}>
            Após a correção do enólogo, o vinho está pronto para ser
            engarrafado.
          </Text>

          <Text style={styles.subHeading}>Desfrute do seu vinho!</Text>

          <Text style={styles.subHeading}>
            Não se esqueça de partilhar a sua experiência com os seus amigos!
          </Text>
        </View>
      )}

      {showProximoPasso && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}>
            <Text style={styles.buttonText}>Avalie o Vinho</Text>
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
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default StepEightWine;
