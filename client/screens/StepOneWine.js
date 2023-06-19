import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { LOCAL_IP } from '@env';

const API_URL = `http://${LOCAL_IP}:5000`;

interface StepOneProps {
  navigation: any;
  onNextStep: any;
  onChangeWineType: any;
  route: any;
}


module.exports = StepOneWine = (props: StepOneProps) => {
  const [wineType, setWineType] = useState('');
  const [wineQuantity, setWineQuantity] = useState('');
  const [ingredientQuantities, setIngredientQuantities] = useState({});
  const [displayRecipeButton, setDisplayRecipeButton] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step

  const handleNextStep = () => {
    onChangeWineType(wineType, wineQuantity);
    onNextStep();
  };

  const handleDisplayQuantity = () => {
    if (dataVinho.vinhocastaItems) {
      const ingredientQuantities = {};

      // Calculate the quantity of ingredients needed
      const castas = dataVinho.vinhocastaItems;

      // Iterate through the castas and update the ingredient quantities
      castas.forEach(casta => {
        ingredientQuantities[casta.NomeCasta] = (
          parseFloat(wineQuantity) *
          (casta.Percentagem / 100)
        ).toFixed(2);
      });

      ingredientQuantities['Água'] = (parseFloat(wineQuantity) * 0.075).toFixed(
        2,
      );
      ingredientQuantities['Leveduras'] = (
        parseFloat(wineQuantity) *
        0.00075 *
        1000
      ).toFixed(2);
      ingredientQuantities['Tanino'] = (
        parseFloat(wineQuantity) *
        0.02 *
        1000
      ).toFixed(2);

      setIngredientQuantities(ingredientQuantities);
      setDisplayRecipeButton(true); // Show the "Prosseguir com a Receita" button
    }
  };

  const {item} = props.route.params;
  const [dataProcessProd, setDataProcessProd] = useState({});

  const handleProceed = () => {
    const {item} = props.route.params;
    const postData = {
      Info: JSON.stringify(ingredientQuantities),
      Step: 2, // Set the current step
      IDProducao: item.item.IDproducao, // Add the IDProducao to postData
      WineQuantity: wineQuantity,
      Mosto: 0,
      IDVinho: item.item.IDVinho
    };

    // Send the postData to the server
    axios
      .post(`${API_URL}/InfoProd`, postData)
      .then(response => {
        console.log("mamaki")
        // Handle the response if needed
        setDataProcessProd(response.data);
        console.log('Post successful:', response.data);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });

    // Move to the next step

    props.navigation.navigate('StepTwoWine', {dataProcessProd: postData});
  };

  // Ingredient data for the wine
  const wineIngredients = [
    'Casta Espadeiro',
    'Casta Touriga Nacional',
    'Leveduras',
    'Água',
    // Add more ingredients as needed
  ];

  const [dataVinho, setdataVinho] = useState({});

  useEffect(() => {
    if (item) {
      console.log(item.item.IDVinho);
      console.log(item.item.IDproducao);

      // Send a GET request to retrieve the Vinho item by IDVinho
      axios
        .get(`${API_URL}/vinhoProd/${item.item.IDVinho}`)
        .then(response => {
          const fetchedData = response.data;
          console.log(fetchedData);

          setdataVinho(fetchedData);

          // Save the fetched Vinho item in a variable
        })
        .catch(error => {
          console.error('Error retrieving Vinho:', error);
        });
    }
  }, [item.item.IDVinho]);

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

      <Text style={styles.heading}>
        {dataVinho.wine && dataVinho.wine.NomeVinho}
      </Text>

      <View style={styles.quantityContainer}>
        <Text style={styles.subHeading}>Quantos litros queres produzir?</Text>
        <TextInput
          style={styles.input}
          placeholder="Wine Quantity"
          value={wineQuantity}
          onChangeText={setWineQuantity}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => {
            handleDisplayQuantity();
            // Move to the next step
          }}>
          <Text style={styles.generateButtonText}>Gerar Quantidades</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ingredientQuantitiesContainer}>
        {Object.keys(ingredientQuantities).map((ingredient, index) => (
          <View style={styles.displayedQuantity} key={index}>
            <Text style={styles.quantity}>
              {ingredientQuantities[ingredient]}{' '}
              {ingredient === 'Água'
                ? 'L'
                : ingredient === 'Leveduras'
                ? 'g'
                : ingredient === 'Tanino'
                ? 'g'
                : 'Kg'}
            </Text>
            <Text style={styles.ingredientName}>{ingredient}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        {displayRecipeButton && (
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => {
              handleProceed();
              // Move to the next step
            }}>
            <Text style={styles.proceedButtonText}>
              Prosseguir com a Receita
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56132A',
    padding: 20,
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
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  ingredientsContainer: {
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  quantityContainer: {},
  input: {
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#56132A',
  },
  generateButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  proceedButton: {
    backgroundColor: '#B3385B',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientQuantitiesContainer: {
    flex: 1,
    marginTop: 10,
  },
  displayedQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    
  },
  ingredientName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 7,
  },
  quantity: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    backgroundColor: '#B3385B',
    paddingHorizontal: 10,
    borderRadius: 5,
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

export default StepOneWine;
