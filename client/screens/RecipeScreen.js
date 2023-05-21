import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useState, useEffect } from "react";

import Icon from 'react-native-vector-icons/FontAwesome';


import {Image, StyleSheet, ImageBackground, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput as RNPTextInput} from 'react-native-paper';
import {FlatList} from 'react-native';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import axios from 'axios';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import ProductionModal from './ProductionModal';


interface RecipeScreenProps {
  navigation: any;
}
const API_URL = "http://192.168.1.109:5000"

module.exports = RecipeScreen = (props: RecipeScreenProps) => {

  const [color, setColor] = useState(true);
  const [data, setData] = useState([])
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);
  const [itemvinho, setItemvinho] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/vinho`)
      .then((res) => res.json())
      .then((resp) => {
        setData(resp);
        if (searchText === '') {
          setList(resp);
        }
      });
  }, []);


  useEffect(() => {
    setList(
      data.filter((item) => {
        if (
          item.NomeVinho.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [data, searchText]);
  
  var Nome = '';
  var selectedWineItem = null;
  
  const handleOnSubmit = (prodName, wineItem) => {
    Nome = prodName;
    selectedWineItem = wineItem;
  };
  
  const handleOrderClick = () => {
    
    const item = { ...selectedWineItem, NomeProducao: Nome };
    axios.post(`${API_URL}/inserirProducao`, { item })
      .then((response) => {
        // handle response here
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleFavoriteClick = item => {
    console.log(item.NomeVinho)
    axios
      .post(`${API_URL}/inserirFavorito`, {item})
      .then(res => {
        // handle response here
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleWinePageClick = item => {

    props.navigation.navigate('WinePage', { item });
    
  };


  
  const oneWine = ({item}) => (
    <TouchableOpacity
    onPress={() => {
      
      handleWinePageClick(item);
    }}
      >
    <ImageBackground
      style={styles.cartaVinhosIcon}
      resizeMode="cover"
      source={require('../assets/cartavinhos1.png')}>
      <Text style={styles.vinhoTintoDoce}>
        <Text style={styles.vinhoText}>{item.NomeVinho}</Text>
      </Text>
  

      <TouchableOpacity
        onPress={() => {
          setFavorites(prev => [...prev]);
          handleFavoriteClick(item);
        }}>
        <Image
source={require('../assets/favorite.png')}
style={{tintColor: 'white', width: 25, height: 25, marginLeft: 110}}
/>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          setModalVisible(true);
          setItemvinho(item)
          }}>
        <Text>Produzir</Text>
        <ProductionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false) }
          onSubmit={ev => {
            console.log(itemvinho);
            handleOnSubmit(ev, itemvinho);
            handleOrderClick();
          }}
        />
      </TouchableOpacity>
  
      
    </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mENURECEITASView}>
      <View style={styles.frameView3}>
        <FlatList data={list} renderItem={oneWine} />
      </View>

      <View style={styles.frameView2}>
        <View style={styles.frameView}>
          <Text style={styles.cartaText}>Carta</Text>
        </View>

        <View style={[styles.frameView1, styles.mt4]}>
          <RNPTextInput
            style={styles.frameRNPTextInput}
            placeholder="Pesquisar Vinho"
            mode="flat"
            value={searchText}
            onChangeText={value => setSearchText(value)}
            right={<RNPTextInput.Icon style={{marginTop: '50%'}} />}
            theme={{colors: {background: '#fff'}}}
          />
          <Pressable onPress={() => props.navigation.navigate('Filter')}>
            <View
              
              style={[styles.iconsaxLinearfilterView, styles.ml17]}>
              <Image
                style={styles.vectorIcon}
                resizeMode="contain"
                source={require('../assets/vector.png')}
              />
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.barraNavegacaoView}>
        <Pressable
          style={styles.homePressable}
          onPress={() => props.navigation.navigate('Home')}>
          <Image
            style={styles.iconlyBoldHome}
            resizeMode="cover"
            source={require('../assets/iconlyboldhome.png')}
          />
          <Text style={[styles.homeText, styles.mt4]}>Home</Text>
        </Pressable>
        <Pressable
          style={[styles.sensoresPressable, styles.ml58]}
          onPress={() => props.navigation.navigate('Graph')}>
          <Image
            style={styles.iconlyBoldChart}
            resizeMode="cover"
            source={require('../assets/iconlyboldchart.png')}
          />
          <Text style={[styles.sensoresText, styles.mt4]}>Sensores</Text>
        </Pressable>
        <Pressable style={[styles.sensoresPressable, styles.ml58]}>
          <Image
            style={styles.iconQuestionMarkCircle}
            resizeMode="cover"
            source={require('../assets/-icon-question-mark-circle.png')}
          />
          <Text style={[styles.suporteText, styles.mt4]}>Suporte</Text>
        </Pressable>
        <Pressable
          style={[styles.sensoresPressable, styles.ml58]}
          onPress={() => props.navigation.navigate('Profile')}>
          <Image
            style={styles.iconlyBoldProfile}
            resizeMode="cover"
            source={require('../assets/iconlyboldprofile2.png')}
          />
          <Text style={[styles.perfilText, styles.mt3]}>Perfil</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mt4: {
    marginTop: 4,
  },
  mt3: {
    marginTop: 3,
  },
  ml58: {
    marginLeft: 58,
  },
  ml17: {
    marginLeft: 17,
  },
  mt17: {
    marginTop: 17,
  },
  iconlyBoldHome: {
    position: 'relative',
    width: 18.45,
    height: 19.35,
    flexShrink: 0,
  },
  homeText: {
    position: 'relative',
    fontSize: 9,
    letterSpacing: 0.9,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#fff',
    textAlign: 'left',
    width: 31,
    height: 13.54,
  },
  homePressable: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconlyBoldChart: {
    position: 'relative',
    width: 19.42,
    height: 19.35,
    flexShrink: 0,
  },
  sensoresText: {
    position: 'relative',
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: 'Poppins',
    color: '#fff',
    textAlign: 'left',
  },

  favoriteImage: {
    position: 'relative',
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: 'Poppins',
    color: '#fff',
  },

  sensoresPressable: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconQuestionMarkCircle: {
    position: 'relative',
    width: 19.42,
    height: 19.35,
    flexShrink: 0,
  },
  suporteText: {
    position: 'relative',
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: 'Poppins',
    color: '#fff',
    textAlign: 'left',
    width: 41,
    height: 13.54,
  },
  suporteView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconlyBoldProfile: {
    position: 'relative',
    width: 15.54,
    height: 19.35,
    flexShrink: 0,
  },
  perfilText: {
    position: 'relative',
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: 'Poppins',
    color: '#fff',
    textAlign: 'center',
  },
  perfilView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barraNavegacaoView: {
    position: 'absolute',
    width: '100%',
    right: '0%',
    bottom: 0,
    left: '0%',
    backgroundColor: '#56132a',
    height: 57,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    boxSizing: 'border-box',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cartaText: {
    position: 'relative',
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'left',
  },
  frameView: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  frameRNPTextInput: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 48,
    justifyContent: 'flex-start',
  },
  vectorIcon: {
    position: 'relative',
    width: 28.02,
    height: 31.19,
    flexShrink: 0,
  },
  iconsaxLinearfilterView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 3,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  frameView1: {
    alignSelf: 'stretch',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameView2: {
    position: 'absolute',
    width: '100%',
    top: 0,
    right: '0%',
    left: '0%',
    backgroundColor: '#56132a',
    height: 128,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 5,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  vinhoText: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  tintoDoce: {
    margin: 0,
  },
  vinhoTintoDoce: {
    position: 'relative',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'left',
    width: 128,
  },
  cartaVinhosIcon: {
    alignSelf: 'stretch',
    marginVertical: 5,
    borderRadius: 11,
    overflow: 'hidden',
    height: 83.8,
    flexShrink: 0,
    flexDirection: 'row',
    padding: 15,
    boxSizing: 'border-box',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  vinhoTintoEncorpado: {
    position: 'relative',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'left',
    width: 125,
  },
  usaVinhaIcon: {
    alignSelf: 'stretch',
    borderRadius: 10,
    height: 83.8,
    flexShrink: 0,
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  vinhoBrancoText: {
    position: 'relative',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'left',
    width: 123,
  },
  minhaProducaoIcon: {
    alignSelf: 'stretch',
    borderRadius: 10,
    height: 83.8,
    flexShrink: 0,
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  vinhoBrancoText1: {
    position: 'relative',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'left',
    width: 123,
  },
  minhaProducaoIcon1: {
    alignSelf: 'stretch',
    borderRadius: 10,
    height: 83.8,
    flexShrink: 0,
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  vinhoBrancoText2: {
    position: 'relative',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'left',
    width: 123,
  },
  minhaProducaoIcon2: {
    alignSelf: 'stretch',
    borderRadius: 10,
    height: 83.8,
    flexShrink: 0,
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  frameView3: {
    position: 'absolute',
    height: '74%',
    width: '89.17%',
    top: '17.5%',
    right: '5.56%',
    bottom: '8.5%',
    left: '5.28%',
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  mENURECEITASView: {
    position: 'relative',
    backgroundColor: '#56132a',
    flex: 1,
  },

  buttonContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
});
