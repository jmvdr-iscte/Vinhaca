import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, TouchableOpacity, Modal, Button, FlatList, TextInput, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from 'react';
import { white } from "react-native-paper/lib/typescript/styles/colors";
import axios from 'axios';



interface UseWineyardScreenProps {
  navigation: any;
}

const API_URL="http://192.168.1.87:5000"

module.exports = UseWineyard = (props: UseWineyardScreenProps) => {

  const [data, setData] = useState([])

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedNomeCasta, setSelectedNomeCasta] = useState(null);




  const handlePress = () => {
    setModalVisible(true);
  };

  const handleItemPress = (value) => {
    setSelectedValue(value.IDCasta);
    setSelectedNomeCasta(value.NomeCasta);
    setModalVisible(false);
  };

  const renderListItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleItemPress(item)}>
      <View style={{ padding: 10 }}>
      
        <Text>{item.NomeCasta}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    fetch(`${API_URL}/castas`)
      .then((res) => res.json())
      .then((resp) => {
        setData(resp)
      })
  });



  const [listItems, setListItems] = useState([]);




  const handleAddItem = () => {
    if (selectedValue !== '') {
      setListItems([...listItems, { id: selectedValue, name: selectedNomeCasta }]);

    }
  };


  const handleClearList = () => {
    setListItems([]);
  };


  const renderItem = ({ item }) => {
    return (
      <View style = {styles.castinhas}>
        <Text style={styles.textclear}>{item.name}</Text>
      </View>
    );
  };

  const [suggestions, setSuggestions] = useState([]);

  const handlePostList = () => {
    axios.post(`${API_URL}/castasSugestions`, { data: listItems })
      .then(response => {
        console.log('List data posted successfully');
        props.navigation.navigate('Sugestions', { data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  };




  return (
    <View style={styles.mENURECEITAS}>
      <View style={styles.barraNavegacao}>

        <Pressable
          style={styles.homePressable}
          onPress={() => props.navigation.navigate("Home")}
        >
          <Image
            style={styles.iconlyBoldHome}
            resizeMode="cover"
            source={require("../assets/iconlyboldhome1.png")}
          />
          <Text style={[styles.home, styles.mt4]}>Home</Text>
        </Pressable>

        <Pressable style={[styles.sensores1, styles.ml58]} onPress={() => props.navigation.navigate("Graph")}>
          <Image
            style={styles.iconlyBoldChart}
            resizeMode="cover"
            source={require("../assets/iconlyboldchart1.png")}
          />
          <Text style={[styles.sensores, styles.mt4]}>Sensores</Text>
        </Pressable>
        <View style={[styles.suporte1, styles.ml58]}>

          <Image
            style={styles.iconQuestionMarkCircle}
            resizeMode="cover"
            source={require("../assets/-icon-question-mark-circle3.png")}
          />
          <Text style={[styles.suporte, styles.mt4]}>Suporte</Text>
        </View>
        <Pressable style={[styles.perfil1, styles.ml58]} onPress={() => props.navigation.navigate("Profile")}>
          <Image
            style={styles.iconlyBoldProfile}
            resizeMode="cover"
            source={require("../assets/iconlyboldprofile4.png")}
          />
          <Text style={[styles.perfil, styles.mt3]}>Perfil</Text>
        </Pressable>
      </View>


      <View style={styles.frameView3}>

        <TouchableOpacity style={styles.frameView} onPress={() => props.navigation.navigate("Home")}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
        </TouchableOpacity>



        <View style={[styles.frameView2, styles.mt4]}>

          <TouchableOpacity style={styles.frameView1} onPress={handlePress} >
            <View >
              <View style={{ padding: 10 }}>
                <Text style={styles.textDropdown}>{selectedValue ? data.find((item) => item.IDCasta === selectedValue).NomeCasta : 'Selecione uma casta'}</Text>
              </View>
            </View>
            <Modal visible={modalVisible} animationType="slide">
              <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                </TouchableWithoutFeedback>
                <View style={{ backgroundColor: '#fff' }}>
                  <FlatList
                    data={data}
                    renderItem={renderListItem}
                    keyExtractor={(item) => item.IDCasta.toString()}
                  />
                </View>
              </View>
            </Modal>
          </TouchableOpacity>


          <View style={{ marginLeft: 10 }}>
            <Button color="gray" title="  +  " onPress={handleAddItem}>
            </Button>
          </View>



        </View>
      </View>
      <Image
        style={styles.iconPlus}
        resizeMode="cover"
        source={require("../assets/-icon-plus.png")}
      />
      <View style={styles.frameView8}>
        <View style={styles.frameView4}>
          <Text style={styles.listaDeIngredientesAdiciona}>
            Lista de ingredientes adicionados
          </Text>
        </View>


        <View style={[styles.frameView6, styles.mt14]}>
          <View style={styles.frameView5}>
            <View>
              <FlatList
                data={listItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.IDCasta}
              />
            </View>

            <TouchableOpacity style={styles.bottomRight} onPress={handleClearList}>

              <Text style={styles.textclear}>
                Limpar
              </Text>
            </TouchableOpacity>


          </View>
        </View>


        <TouchableOpacity style={[styles.frameView7, styles.mt14]} onPress={handlePostList} >
          <View style={styles.oBFormsAdicionar}>
            <Text style={styles.textclear}>Criar Vinho</Text>
          </View>
        </TouchableOpacity>
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
  mt14: {
    marginTop: 14,
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
    width: "100%",
    right: "0%",
    bottom: 0,
    left: "0%",
    backgroundColor: "#56132a",
    height: 57,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  vectorIcon: {
    position: "relative",
    width: 17,
    height: 17,
    flexShrink: 0,
  },
  frameView: {
    alignSelf: "stretch",
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frameView1: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 48,
    justifyContent: "center",
    alignItems: "flex-start",
    
  },
  vectorIcon1: {
    position: "relative",
    width: 19,
    height: 19,
    flexShrink: 0,
  },
  iconsaxLinearfilter: {
    borderRadius: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 3,
    paddingVertical: 2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frameView2: {
    alignSelf: "stretch",
    height: 48,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  frameView3: {
    position: "absolute",
    width: "100%",
    top: 0,
    right: "0%",
    left: "0%",
    backgroundColor: "#56132a",
    height: 159,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  iconPlus: {
    position: "absolute",
    height: "13.72%",
    width: "30.49%",
    top: "21.25%",
    right: "8.95%",
    bottom: "65.03%",
    left: "60.56%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  listaDeIngredientesAdiciona: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#fff",
    textAlign: "center",
  },
  frameView4: {
    alignSelf: "stretch",
    height: 80,
    flexShrink: 0,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingTop: 30,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  frameView5: {
    alignSelf: "stretch",
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  frameView6: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  name: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 13,
    lineHeight: 28,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#56132a",
    textAlign: "center",
  },
  oBFormsAdicionar: {
    alignSelf: "stretch",
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    height: 40,
    flexShrink: 0,
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  frameView7: {
    width: 128,
    height: 61,
    flexShrink: 0,
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",

  },
  frameView8: {
    position: "absolute",
    height: "52.88%",
    width: "89.17%",
    top: "24.5%",
    right: "5.56%",
    bottom: "22.63%",
    left: "5.28%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mENURECEITAS: {
    position: "relative",
    backgroundColor: "#56132a",
    flex: 1,
    width: "100%",
    height: 800,
  },
  homePressable: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomRight: {
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: "#fff",
    borderStyle: "solid",
    padding: 4,
    bottom: 10,
    right: 10,
    backgroundColor: "#56132a",
  },

  textclear: {
    color: 'white',
  },

  castinhas: {
    marginTop: 5,
    marginLeft: 5,
    borderWidth:1,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    padding: 3,
    backgroundColor: 'gray',
  },

  textDropdown: {
    fontSize: 16,
  },
});

export default UseWineyard;
