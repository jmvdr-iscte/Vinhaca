import * as React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useState, useEffect} from "react";
import { FlatList, TouchableOpacity } from "react-native";
import ProductionModal from "./ProductionModal";
import axios from 'axios';



interface SugestionsProps{
  navigation: any;
  route: any;
}

const API_URL="http://10.92.16.48:5000"

module.exports= Sugestions=(props: SugestionsProps) =>{

  const [data, setData] = useState([]);

  useEffect(() => {
    const { data } = props.route.params;
    setData(data);
    console.log(data);
  }, [props.route.params]);

  const[modalVisible,setModalVisible] = useState(false)
  const [favorites, setFavorites] = useState([]);

  const handleOnSubmit =(prodName) =>{
    Nome = prodName
    console.log(Nome)
    }

    const handleOrderClick = (ev,item) => {
   
   
   
      item ={ ...item,NomeProducao: Nome}
     console.log(item)
  
      axios.post(`${API_URL}/inserirProducao`,{item})
      .then((response) => {
         // console.log(response);
      })
  
  }

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

  const oneWine = ( {item} ) => (
    <TouchableOpacity
    onPress={() => {
      
      handleWinePageClick(item);
    }}
      >
    <ImageBackground
          style={styles.cartaVinhosIcon}
          resizeMode="cover"
          source={require("../assets/cartavinhos1.png")}
        >
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

          
          <TouchableOpacity  style={styles.buttonContainer}
          onPress={() =>setModalVisible(true)} >
          <Text>Produzir</Text>
          <ProductionModal visible={modalVisible} 
          onClose={()=> setModalVisible(false)} 
          onSubmit={(ev)=>{
            handleOnSubmit(ev)
          handleOrderClick(ev,item)
          }}
          
          /> 
          </TouchableOpacity>

        </ImageBackground>
        </TouchableOpacity>
  )


  return (
    
    <View style={styles.eMPRODUCAOView}>
      
      <View style={styles.frameView}>
      <FlatList
             data={data}
             renderItem={oneWine}
             keyExtractor={item => item.IDVinho.toString()}
            />
      </View>

      

      <View style={styles.frameView2}>
      <TouchableOpacity style={styles.frameView} onPress={() => props.navigation.navigate("UseWineyard")}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
        </TouchableOpacity>
        <View style={styles.frameView1}>
          <Text style={styles.minhaProduoText}>Sugestões de Vinhos</Text>
        </View>
      </View>

      
      <View style={styles.barraNavegacaoView}>
        <Pressable
          style={styles.homePressable}
          onPress={() => props.navigation.navigate("Home")}
        >
          <Image
            style={styles.iconlyBoldHome}
            resizeMode="cover"
            source={require("../assets/iconlyboldhome.png")}
          />
          <Text style={[styles.homeText, styles.mt4]}>Home</Text>
        </Pressable>
        <Pressable
          style={[styles.sensoresPressable, styles.ml58]}
          onPress={() => navigation.navigate("Graph")}
        >
          <Image
            style={styles.iconlyBoldChart}
            resizeMode="cover"
            source={require("../assets/iconlyboldchart.png")}
          />
          <Text style={[styles.sensoresText, styles.mt4]}>Sensores</Text>
        </Pressable>
        <Pressable
          style={[styles.sensoresPressable, styles.ml58]}
          onPress={() => navigation.navigate("Production")}
        >
          <Image
            style={styles.iconQuestionMarkCircle}
            resizeMode="cover"
            source={require("../assets/-icon-question-mark-circle.png")}
          />
          <Text style={[styles.suporteText, styles.mt4]}>Suporte</Text>
        </Pressable>
        <Pressable
          style={[styles.sensoresPressable, styles.ml58]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={styles.iconlyBoldProfile}
            resizeMode="cover"
            source={require("../assets/iconlyboldprofile1.png")}
          />
          <Text style={[styles.perfilText, styles.mt3]}>Perfil</Text>
        </Pressable>
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
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
    width: 128,
  },
  cartaVinhosIcon: {
    alignSelf: "stretch",
    borderRadius: 10,
    height: 83.83,
    flexShrink: 0,
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  vinhoTintoEncorpado: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
    width: 125,
  },
  usaVinhaIcon: {
    alignSelf: "stretch",
    borderRadius: 10,
    height: 83.83,
    flexShrink: 0,
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  vinhoBrancoText: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
    width: 123,
  },
  minhaProducaoIcon: {
    alignSelf: "stretch",
    borderRadius: 10,
    height: 83.83,
    flexShrink: 0,
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  vinhoBrancoText1: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
    width: 123,
  },
  minhaProducaoIcon1: {
    alignSelf: "stretch",
    borderRadius: 10,
    height: 83.83,
    flexShrink: 0,
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  vinhoBrancoText2: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
    width: 123,
  },
  minhaProducaoIcon2: {
    alignSelf: "stretch",
    borderRadius: 10,
    height: 83.83,
    flexShrink: 0,
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  vinhoBrancoText3: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
    width: 123,
  },
  minhaProducaoIcon3: {
    alignSelf: "stretch",
    borderRadius: 10,
    height: 83.83,
    flexShrink: 0,
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  frameView: {
    position: "absolute",
    height: "75.5%",
    width: "89.17%",
    top: "17.13%",
    right: "5.56%",
    bottom: "7.38%",
    left: "5.28%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  minhaProduoText: {
    position: "relative",
    fontSize: 28,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
    width: 136,
  },
  frameView1: {
    marginTop: 13,
    alignSelf: "stretch",
    height: 96,
    flexShrink: 0,
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frameView2: {
    position: "absolute",
    width: "100%",
    top: 0,
    right: "0%",
    left: "0%",
    backgroundColor: "#56132a",
    height: 115,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 13,
    paddingBottom: 5,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  iconlyBoldHome: {
    position: "relative",
    width: 18.45,
    height: 19.35,
    flexShrink: 0,
  },
  homeText: {
    position: "relative",
    fontSize: 9,
    letterSpacing: 0.9,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "left",
    width: 31,
    height: 13.54,
  },
  homePressable: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconlyBoldChart: {
    position: "relative",
    width: 19.42,
    height: 19.35,
    flexShrink: 0,
  },
  sensoresText: {
    position: "relative",
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "left",
  },
  sensoresPressable: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconQuestionMarkCircle: {
    position: "relative",
    width: 19.42,
    height: 19.35,
    flexShrink: 0,
  },
  suporteText: {
    position: "relative",
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "left",
    width: 41,
    height: 13.54,
  },
  suporteView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconlyBoldProfile: {
    position: "relative",
    width: 15.54,
    height: 19.35,
    flexShrink: 0,
  },
  perfilText: {
    position: "relative",
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
  },
  perfilView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  barraNavegacaoView: {
    position: "absolute",
    width: "100%",
    right: "0%",
    bottom: 0,
    left: "0%",
    backgroundColor: "#56132a",
    height: 57,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    boxSizing: "border-box",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  eMPRODUCAOView: {
    position: "relative",
    backgroundColor: "#56132a",
    flex: 1,
    width: "100%",
    height: 800,
  },

  cartaVinhosIcon: {
    alignSelf: "stretch",
    marginVertical: 5,
    borderRadius: 11,
    overflow: "hidden",
    height: 83.8,
    flexShrink: 0,
    flexDirection: "row",
    padding: 15,
    boxSizing: "border-box",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
    
  },
  


});

export default Sugestions;
