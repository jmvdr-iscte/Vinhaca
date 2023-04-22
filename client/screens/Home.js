import * as React from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { red100 } from "react-native-paper/lib/typescript/styles/colors";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
interface HomeScreenProps {
  navigation: any;
}

module.exports = Home = (props: HomeScreenProps) => {


  const getUsername = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
      async function fetchData() {
        try {
          const value = await AsyncStorage.getItem('username');
          setUsername(value);
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    }, []);


    return <Text style={styles.josAguiarText}> {username}</Text>
  }



  return (
    <View style={styles.hOMEView}>
      <View style={styles.frameView}>

        <Image
          style={styles.wineyourselfLogo1Icon}
          resizeMode="cover"
          source={require("../assets/wineyourselflogo-1.png")}
        />

        <Text style={styles.escolheOTeuVinho}>Escolhe o teu vinho</Text>
      </View>
      <View style={styles.frameView2}>
        <View style={styles.frameView1}>
          <Text style={styles.olJosAguiar}>
            <Text style={styles.olText}>Olá,</Text>
            {getUsername()}
          </Text>
        </View>
        <TouchableOpacity style={styles.frameView} onPress={() => props.navigation.navigate("Home")}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
        </TouchableOpacity>
        <View style={[styles.perfilView, styles.ml63]}>
          <Pressable
            onPress={() => props.navigation.navigate("Profile")}
          >
            <Image
              style={styles.iconlyBoldProfile}
              resizeMode="cover"
              source={require("../assets/iconlyboldprofile.png")}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.frameView3}>

        <ImageBackground
          style={styles.usaVinhaIcon}
          resizeMode="cover"
          source={require("../assets/cartavinhos.png")}
        >
          <Pressable style={styles.botao}
            onPress={() => props.navigation.navigate("RecipeScreen")}
          >
            <Text style={styles.usaATuaVinha}>
              <Text style={styles.usaText}>Carta de Vinhos</Text>
            </Text>
          </Pressable>



        </ImageBackground>


        <ImageBackground
          style={[styles.usaVinhaIcon, styles.mt17]}
          resizeMode="cover"
          source={require("../assets/usavinha.png")}
        >
          <Pressable style={styles.botao}
            onPress={() => props.navigation.navigate("UseWineyard")}
          >
            <Text style={styles.usaATuaVinha}>
              <Text style={styles.usaText}>Usa a tua Vinha</Text>
            </Text>
          </Pressable>
        </ImageBackground>

        <ImageBackground
          style={[styles.minhaProducaoIcon, styles.mt17]}
          resizeMode="cover"
          source={require("../assets/minhaproducao.png")}
        >


          <Pressable style={styles.botao}
            onPress={() => props.navigation.navigate("Production")}
          >

            <Text style={styles.minhaProduoText}>
              <Text style={styles.minhaText}>Minha Produção</Text>
            </Text>
          </Pressable>

        </ImageBackground>
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
          onPress={() => props.navigation.navigate("Graph")}
        >
          <Image
            style={styles.iconlyBoldChart}
            resizeMode="cover"
            source={require("../assets/iconlyboldchart.png")}
          />
          <Text style={[styles.sensoresText, styles.mt4]}>Sensores</Text>
        </Pressable>
        <Pressable
          onPress={() => props.navigation.navigate("ContactUs")}>
          <View style={[styles.suporteView, styles.ml58]}>
            <Image
              style={styles.iconQuestionMarkCircle}
              resizeMode="cover"
              source={require("../assets/-icon-question-mark-circle.png")}
            />
            <Text style={[styles.suporteText, styles.mt4]}>Suporte</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => props.navigation.navigate("Profile")}
        >
          <View style={[styles.perfilView1, styles.ml58]}>

            <Image
              style={styles.iconlyBoldProfile1}
              resizeMode="cover"
              source={require("../assets/iconlyboldprofile1.png")}
            />
            <Text style={[styles.perfilText, styles.mt3]}>Perfil</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ml63: {
    marginLeft: 63,
  },
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
  wineyourselfLogo1Icon: {
    position: "relative",
    width: 83,
    height: 75,
    flexShrink: 0,
  },
  escolheOTeuVinho: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
    width: 226,
    height: 29,
  },
  frameView: {
    position: "absolute",
    height: "17.88%",
    marginLeft: -113.46,
    top: "12.2%",
    bottom: "69.91%",
    left: "50%",
    width: 226,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

  },
  olText: {
    fontSize: 28,
  },
  josAguiarText: {
    fontSize: 32,
  },
  olJosAguiar: {
    position: "relative",
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",

  },
  frameView1: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 15,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconlyBoldProfile: {
    position: "relative",
    width: 32,
    height: 40,
    flexShrink: 0,
  },
  perfilView: {
    width: 32,
    height: 58,
    flexShrink: 0,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  frameView2: {
    position: "absolute",
    height: "9.88%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "90.13%",
    left: "0%",
    backgroundColor: "#56132a",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
  },
  cartaText: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  deVinhosText: {
    margin: 0,
  },
  cartaDeVinhos: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
  },
  cartaVinhosIcon: {
    alignSelf: "stretch",
    flex: 1,
    borderRadius: 11,
    overflow: "hidden",
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  usaText: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  aTuaVinha: {
    margin: 0,
  },
  usaATuaVinha: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
  },
  usaVinhaIcon: {
    alignSelf: "stretch",
    flex: 1,
    borderRadius: 11,
    overflow: "hidden",
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  minhaText: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  produoText: {
    margin: 0,
  },
  minhaProduoText: {
    position: "relative",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "left",
  },
  minhaProducaoIcon: {
    alignSelf: "stretch",
    flex: 1,
    borderRadius: 11,
    overflow: "hidden",
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  frameView3: {
    position: "absolute",
    height: "58.23%",
    width: "89.28%",
    top: "32.44%",
    right: "5.36%",
    bottom: "9.33%",
    left: "5.36%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
  iconlyBoldProfile1: {
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
  perfilView1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  barraNavegacaoView: {
    position: "absolute",
    width: "97.83%",
    right: "0%",
    bottom: 0,
    left: "2.17%",
    backgroundColor: "#56132a",
    height: 57,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    boxSizing: "border-box",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  hOMEView: {
    position: "relative",
    backgroundColor: "#56132a",
    flex: 1,
    width: "100%",
    height: 800,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },

  botao: {

    flex: 1,
    alignSelf: 'stretch',
    justifyContent: "flex-end",
  },
});


