import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";


interface FilterScreenProps{
  navigation: any;
}

module.exports=  Filter =  (props: FilterScreenProps) => {
  return (
    <View style={styles.fILTRO}>
      <View style={styles.barraNavegacao}>
        <Pressable style={styles.home1} onPress={() => props.navigation.navigate("Home")}>
          <Image
            style={styles.iconlyBoldHome}
            resizeMode="cover"
            source={require("../assets/iconlyboldhome2.png")}
          />
          <Text style={[styles.home, styles.mt4]}>Home</Text>
        </Pressable>
        <Pressable style={[styles.sensores1, styles.ml58]} onPress={() => props.navigation.navigate("Graph")}>
          <Image
            style={styles.iconlyBoldChart}
            resizeMode="cover"
            source={require("../assets/iconlyboldchart2.png")}
          />
          <Text style={[styles.sensores, styles.mt4]}>Sensores</Text>
        </Pressable>
        <View style={[styles.suporte1, styles.ml58]}>
          <Image
            style={styles.iconQuestionMarkCircle}
            resizeMode="cover"
            source={require("../assets/-icon-question-mark-circle2.png")}
          />
          <Text style={[styles.suporte, styles.mt4]}>Suporte</Text>
        </View>
        <Pressable style={[styles.perfil1, styles.ml58]} onPress={() => props.navigation.navigate("Profile")}>
          <Image
            style={styles.iconlyBoldProfile}
            resizeMode="cover"
            source={require("../assets/iconlyboldprofile3.png")}
          />
          <Text style={[styles.perfil, styles.mt3]}>Perfil</Text>
        </Pressable>
      </View>
      <View style={styles.frameView6}>
        <View style={styles.frameView1}>
          <Text style={styles.ordenarPor}>Ordenar por</Text>
          <View style={[styles.frameView, styles.mt18]}>
            <View style={styles.oBFormsClassificao}>
              <Text style={styles.name}>A-Z</Text>
            </View>
            <View style={[styles.oBFormsClassificao1, styles.ml30]}>
              <Text style={styles.name1}>Acidez</Text>
            </View>
            <View style={[styles.oBFormsClassificao2, styles.ml30]}>
              <Text style={styles.name2}>Rating</Text>
            </View>
          </View>
        </View>
        <View style={[styles.frameView3, styles.mt87]}>
          <Text style={styles.tipoDeVinho}>Tipo de Vinho</Text>
          <View style={[styles.frameView2, styles.mt18]}>
            <View style={styles.oBFormsClassificao3}>
              <Text style={styles.name3}>Tinto</Text>
            </View>
            <View style={[styles.oBFormsClassificao4, styles.ml30]}>
              <Text style={styles.name4}>Branco</Text>
            </View>
            <View style={[styles.oBFormsClassificao5, styles.ml30]}>
              <Text style={styles.name5}>Rosé</Text>
            </View>
            <View style={[styles.oBFormsClassificao6, styles.ml30]}>
              <Text style={styles.name6}>Verde</Text>
            </View>
          </View>
        </View>
        <View style={[styles.frameView5, styles.mt87]}>
          <View style={styles.frameView4}>
            <Text style={styles.escolhaARegio}>Escolha a Região</Text>
          </View>
        </View>
      </View>
      <View style={styles.frameView7}>
        <Image
          style={styles.vectorIcon}
          resizeMode="cover"
          source={require("../assets/vector1.png")}
        />
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
  ml30: {
    marginLeft: 30,
  },
  mt18: {
    marginTop: 18,
  },
  mt87: {
    marginTop: 87,
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
    right: "-1.64%",
    bottom: 0,
    left: "-0.7%",
    backgroundColor: "#56132a",
    height: 57,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  ordenarPor: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "800",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
    height: 31,
  },
  name: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  oBFormsClassificao: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#460b20",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    height: 41,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
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
  oBFormsClassificao1: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#460b20",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    height: 41,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
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
  oBFormsClassificao2: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#460b20",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    height: 41,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  frameView: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frameView1: {
    flex: 1,
    width: 322,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tipoDeVinho: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "800",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
    height: 31,
  },
  name3: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  oBFormsClassificao3: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#460b20",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    height: 41,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
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
  oBFormsClassificao4: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#460b20",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    height: 41,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  name5: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  oBFormsClassificao5: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#460b20",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    height: 41,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  name6: {
    position: "relative",
    fontSize: 14,
    lineHeight: 28,
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  oBFormsClassificao6: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#460b20",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    height: 41,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  frameView2: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frameView3: {
    flex: 1,
    width: 322,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  escolhaARegio: {
    position: "relative",
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#56132a",
    textAlign: "center",
  },
  frameView4: {
    borderRadius: 10,
    backgroundColor: "#d9d9d9",
    width: 291,
    height: 52,
    flexShrink: 0,
    flexDirection: "column",
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  frameView5: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frameView6: {
    position: "absolute",
    height: "56%",
    marginLeft: -160.81,
    top: "9.5%",
    bottom: "34.5%",
    left: "50%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  vectorIcon: {
    position: "relative",
    width: 17,
    height: 17,
    flexShrink: 0,
  },
  frameView7: {
    position: "absolute",
    top: 5,
    left: 20,
    width: 320,
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  fILTRO: {
    position: "relative",
    backgroundColor: "#56132a",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Filter;
