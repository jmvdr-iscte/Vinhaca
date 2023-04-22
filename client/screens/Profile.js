import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

interface ProfileScreenProps {
  navigation: any;
}

module.exports = Profile = (props: ProfileScreenProps) => {

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


  const onPressContactUs = () => {
    props.navigation.navigate("ContactUs")
  }


  return (
    <View style={styles.pERFIL}>
      <View style={styles.frameView3}>

        <View style={styles.frameView}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector4.png")}
          />
          <Text style={[styles.drPessanha, styles.mt32]}>{getUsername()}</Text>
        </View>

        <View style={[styles.frameView2, styles.mt62]}>
          <TouchableOpacity style={styles.oBFormsDefinies}>
            <Text style={styles.name}>Definições</Text>
          </TouchableOpacity >
          <TouchableOpacity style={[styles.oBFormsDefinies1, styles.mt1]}>
            <Text style={styles.name1}>Alertas</Text>
          </TouchableOpacity >
          <TouchableOpacity style={[styles.oBFormsDefinies2, styles.mt1]}>
            <Text style={styles.name2}>Histórico</Text>
          </TouchableOpacity >
          <TouchableOpacity 
            style={[styles.oBFormsDefinies3, styles.mt1]}
            onPress={() => props.navigation.navigate('SavedScreenProps')}
        >
            <Text style={styles.name3}>Favoritos</Text>
          </TouchableOpacity>
          < TouchableOpacity style={[styles.oBFormsDefinies3, styles.mt1]} onPress={onPressContactUs}>
            <Text style={styles.name4}>Contactos</Text>
          </TouchableOpacity >
        </View>
      </View>
      <View style={styles.barraNavegacao}>
        <Pressable style={styles.home1} onPress={() => props.navigation.navigate("Home")}>
          <Image
            style={styles.iconlyBoldHome}
            resizeMode="cover"
            source={require("../assets/iconlyboldhome4.png")}
          />
          <Text style={[styles.home, styles.mt4]}>Home</Text>
        </Pressable>
        <Pressable style={[styles.sensores1, styles.ml58]} onPress={() => props.navigation.navigate("Graph")}>
          <Image
            style={styles.iconlyBoldChart}
            resizeMode="cover"
            source={require("../assets/iconlyboldchart4.png")}
          />
          <Text style={[styles.sensores, styles.mt4]}>Sensores</Text>
        </Pressable>
       <Pressable
       onPress={() => props.navigation.navigate("ContactUs")}>
        <View style={[styles.suporte1, styles.ml58]}>
          <Image
            style={styles.iconQuestionMarkCircle}
            resizeMode="cover"
            source={require("../assets/-icon-question-mark-circle4.png")}
          />
          <Text style={[styles.suporte, styles.mt4]}>Suporte</Text>
        </View>
        </Pressable>
        <Pressable style={[styles.perfil1, styles.ml58]} onPress={() => props.navigation.navigate("Profile")}>
          <Image
            style={styles.iconlyBoldProfile}
            resizeMode="cover"
            source={require("../assets/iconlyboldprofile5.png")}
          />
          <Text style={[styles.perfil, styles.mt3]}>Perfil</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mt32: {
    marginTop: 32,
  },
  mt1: {
    marginTop: 1,
  },
  mt62: {
    marginTop: 62,
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
  vectorIcon: {
    position: "relative",
    width: 90,
    height: 90,
    flexShrink: 0,
  },
  drPessanha: {
    position: "relative",
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  frameView: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  oBFormsDefinies: {

    borderRadius: 5,
    backgroundColor: "#56132a",
    borderStyle: "solid",
    borderColor: "#56132a",
    borderWidth: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name1: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  oBFormsDefinies1: {

    borderRadius: 5,
    backgroundColor: "#56132a",
    borderStyle: "solid",
    borderColor: "#56132a",
    borderWidth: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name2: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  oBFormsDefinies2: {

    borderRadius: 5,
    backgroundColor: "#56132a",
    borderStyle: "solid",
    borderColor: "#56132a",
    borderWidth: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name3: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  oBFormsDefinies3: {

    borderRadius: 5,
    backgroundColor: "#56132a",
    borderStyle: "solid",
    borderColor: "#56132a",
    borderWidth: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name4: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  frameView1: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frameView2: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameView3: {
    position: "absolute",
    height: "63.1%",
    width: "100%",
    top: "11.25%",
    right: "0%",
    bottom: "25.65%",
    left: "0%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconlyBoldHome: {
    position: "relative",
    width: 18,
    height: 19,
    flexShrink: 0,
  },
  home: {
    position: "relative",
    fontSize: 9,
    letterSpacing: 0.9,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "left",
    width: 31,
    height: 14,
  },
  home1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconlyBoldChart: {
    position: "relative",
    width: 19,
    height: 19,
    flexShrink: 0,
  },
  sensores: {
    position: "relative",
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "left",
  },
  sensores1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconQuestionMarkCircle: {
    position: "relative",
    width: 19,
    height: 19,
    flexShrink: 0,
  },
  suporte: {
    position: "relative",
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "left",
    width: 41,
    height: 14,
  },
  suporte1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconlyBoldProfile: {
    position: "relative",
    width: 16,
    height: 19,
    flexShrink: 0,
  },
  perfil: {
    position: "relative",
    fontSize: 9,
    letterSpacing: 0.9,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
  },
  perfil1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  barraNavegacao: {
    position: "absolute",
    width: "102.34%",
    right: "0%",
    bottom: 0,
    left: "-2.34%",
    backgroundColor: "#56132a",
    height: 57,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  pERFIL: {
    position: "relative",
    backgroundColor: "#56132a",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Profile;
