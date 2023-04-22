import { View, ImageBackground, Pressable, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


interface WinePageScreenProps {
    navigation: any;
    route: any;
  }

  const API_URL = "http://10.92.16.48:5000"
  
  module.exports = WinePage = (props: WinePageScreenProps) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [itemvinho, setItemvinho] = useState([])

    const { item } = props.route.params;

    const [favorites, setFavorites] = useState([])

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

    const styles = StyleSheet.create({
      cartaVinhosIcon: {
        width: '100%',
        height: 200,
      },

      container: {
        flex: 1,
        backgroundColor: '#56132a',
        
        
      },

      info: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      

        
        
      },
      
      box: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        
        
      },

      box2: {
        width: '66%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        

        
      },

      box3: {
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',

        
        
      },

      box4: {
        alignItems: 'center',
        width: '33%',

      },

      box5: {
        width: '66%',

      },

      winetitle: {
        fontSize: 26,
        color:'white',
      },

      stats: {
        flex: 1,
        width: '100%',
        padding: 15,
        flexDirection: 'row',
      },

      buttonContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 4,
      },

        frameView: {
    position: "absolute",
    top: "17.13%",
    left: "5.28%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
    });


  return (
    
    <View style={styles.container}>
      
    <ImageBackground
      style={styles.cartaVinhosIcon}
      resizeMode="cover"
      source={require('../assets/cartavinhos1.png')}>
      {/* Your other components here */}

      <TouchableOpacity style={styles.frameView} onPress={() => props.navigation.goBack()}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
        </TouchableOpacity>
    </ImageBackground>

    <View style={styles.info}> 
        <View style={styles.box}>

          <Text style={styles.winetitle}>
            {item.NomeVinho}
          </Text>
        </View>
        <View style={[styles.stats]}>

        <View style={styles.box2}>


          <View style={styles.box4}>
          <Text style={{fontSize:40, color: 'gray',}}>★</Text>
          </View>

          

          <View style={styles.box5}>
            <Text style={{fontSize:22, color: 'white',}}>{item.Rating}</Text>
            <Text style={{color: 'white',}} >avaliação dos clientes</Text>
          </View>

          </View>


        <View style={styles.box3}>
          
          <TouchableOpacity
          onPress={() => {
            setFavorites(prev => [...prev]);
            handleFavoriteClick(item);
          }}
          
          >
          <Image
            source={require('../assets/favorite.png')}
            style={{
              tintColor: 'white',
              width: 35, height: 35,
            }}
          />
          
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
        <Text style={{fontWeight: 'bold', color:'white'}}>Descrição:</Text>
        <Text style={{ textAlign: 'center', color:'white'}}>
            
            
            {item.DescricaoVinho}
          </Text>
        </View>


        <View style={styles.box}>

        <TouchableOpacity
        style={styles.buttonContainer}
        
        >
       
        <Text style={{fontSize:16,}}>Produzir</Text>
        


      </TouchableOpacity>
        </View>
        </View>
    </View>

    
    

    
  );

  
};

export default WinePage;






