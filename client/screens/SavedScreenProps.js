import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import axios from 'axios';

interface SavedScreenProps {
  navigation: any;
}

const API_URL = 'http://192.168.1.109:5000';

module.exports = SavedScreen = (props: SavedScreenProps) => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log('Fetching favorites...');
    fetch(`${API_URL}/favorito`)
      .then(res => res.json())
      .then(resp => {
        console.log('Favorites fetched:', resp);
        setFavorites(resp);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderFavorite = ({item}) => (
    <TouchableOpacity
      style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
      <ImageBackground
        style={styles.cartaVinhosIcon}
        resizeMode="cover"
        source={require('../assets/cartavinhos1.png')}>
        <Text style={{color: 'white', fontSize: 14, alignSelf: 'flex-start'}}>
          {item.NomeVinho &&
            item.NomeVinho.replace(/(^undefined - | - undefined$)/g, '')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Removing favorite:', item.IDfavorito);
            axios
              .delete(`${API_URL}/favorito/${item.IDfavorito}`)
              .then(resp => {
                console.log('Favorite removed:', resp);
                setFavorites(
                  favorites.filter(
                    favorite => favorite.IDfavorito !== item.IDfavorito,
                  ),
                );
              })
              .catch(error => {
                console.error(error);
              });
          }}>
          <Image
            source={require('../assets/deleteFavorite.png')}
            style={{tintColor: 'white', width: 25, height: 25}}
          />
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
  );

  const FavoritesScreen = () => (
    <ScrollView>
      {favorites.map(favorite => (
        <RenderFavorite key={favorite.IDfavorito} item={favorite} />
      ))}
    </ScrollView>
  );

  console.log('Favorites:', favorites);

  return (
    <View style={styles.eMPRODUCAOView}>
      <View style={{flex: 1}}>
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={item => item.IDfavorito.toString()}
          style={{marginTop: 120}}
          ItemSeparatorComponent={() => <View style={{height: 0}} />}
        />

        <View style={styles.frameView2}>
          <View style={styles.frameView1}>
            <Text style={styles.minhaProduoText}>Meus Favoritos</Text>
          </View>
        </View>
        <View style={styles.barraNavegacaoView}>
          <Pressable
            style={styles.homePressable}
            onPress={() => navigation.navigate('Home')}>
            <Image
              style={styles.iconlyBoldHome}
              resizeMode="cover"
              source={require('../assets/iconlyboldhome.png')}
            />
            <Text style={[styles.homeText, styles.mt4]}>Home</Text>
          </Pressable>
          <Pressable
            style={[styles.sensoresPressable, styles.ml58]}
            onPress={() => navigation.navigate('Graph')}>
            <Image
              style={styles.iconlyBoldChart}
              resizeMode="cover"
              source={require('../assets/iconlyboldchart.png')}
            />
            <Text style={[styles.sensoresText, styles.mt4]}>Sensores</Text>
          </Pressable>
          <Pressable
            style={[styles.sensoresPressable, styles.ml58]}
            onPress={() => navigation.navigate('Production')}>
            <Image
              style={styles.iconQuestionMarkCircle}
              resizeMode="cover"
              source={require('../assets/-icon-question-mark-circle.png')}
            />
            <Text style={[styles.suporteText, styles.mt4]}>Suporte</Text>
          </Pressable>
          <Pressable
            style={[styles.sensoresPressable, styles.ml58]}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.iconlyBoldProfile}
              resizeMode="cover"
              source={require('../assets/iconlyboldprofile1.png')}
            />
            <Text style={[styles.perfilText, styles.mt3]}>Perfil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mt17: {
    marginTop: 17,
  },
  mt4: {
    marginTop: 4,
  },
  mt3: {
    marginTop: 3,
  },
  ml58: {
    marginLeft: 58,
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
    borderRadius: 10,
    height: 83.83,
    flexShrink: 0,
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
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
    height: 83.83,
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
    height: 83.83,
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
    height: 83.83,
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
    height: 83.83,
    flexShrink: 0,
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  vinhoBrancoText3: {
    position: 'relative',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'left',
    width: 123,
  },
  minhaProducaoIcon3: {
    alignSelf: 'stretch',
    borderRadius: 10,
    height: 83.83,
    flexShrink: 0,
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  frameView: {
    position: 'absolute',
    height: '75.5%',
    width: '89.17%',
    top: '17.13%',
    right: '5.56%',
    bottom: '7.38%',
    left: '5.28%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  minhaProduoText: {
    position: 'relative',
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'left',
    width: 136,
  },
  frameView1: {
    alignSelf: 'stretch',
    height: 96,
    flexShrink: 0,
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  frameView2: {
    position: 'absolute',
    width: '100%',
    top: 0,
    right: '0%',
    left: '0%',
    backgroundColor: '#56132a',
    height: 115,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 13,
    paddingBottom: 5,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  eMPRODUCAOView: {
    position: 'relative',
    backgroundColor: '#56132a',
    flex: 1,
    width: '100%',
    height: 800,
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
  buttonContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
});

export default SavedScreen = (props: SavedScreenProps) => {};
