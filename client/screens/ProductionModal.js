import { View, Text, Modal} from 'react-native'
import { TextInput as RNPTextInput } from "react-native-paper";
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { Colors, Button , IconButton} from 'react-native-paper'
import {
    Image,
    StyleSheet,
    ImageBackground,
    Alert,
    Pressable,
  } from "react-native";

const ProductionModal =({visible, onClose, onSubmit}) =>{
   const [prodName, setProdName] = useState('')

   
    const handleOnChangeText = (text) => {
        setProdName(text);
       // console.log(text)
    }

const handleSubmit=() =>{
    if(!prodName.trim()) return onClose()
onSubmit(prodName)
    setProdName('')
    onClose()
}
    const closeModal =()=>{
        setProdName('');
        onClose()
    }


    return (
    <>
    <Modal style={styles.modal} visible={visible} animationType='slide'>
       <View style={styles.container}>
        
        <RNPTextInput 
            style={styles.frameRNPTextInput}
            placeholder="Dá o nome à Produção"
            mode="flat"
            onChangeText={(text)=> handleOnChangeText(text)}
            right={
              <RNPTextInput.Icon
                style={{ marginTop: "50%" }}
                
              />
            }
            theme={{ colors: { background: "#fff" } }}
          />
       <View style ={styles.btnContainer}>
        <Pressable
          onPress={handleSubmit}
        >
          <View style={styles.buttons}>
          
            <Image
              style={styles.vectorIcon2}
              resizeMode="contain"
              source={require("../assets/select.png")}
            />
            
          </View>
          </Pressable>
        {prodName.trim() ? (
        <Pressable
        onPress={closeModal}
      >
        <View style={styles.buttons} >
        
          <Image
            style={styles.vectorIcon2}
            resizeMode="contain"
            source={require("../assets/remove.png")}
          />
          
        </View>
        </Pressable>
        ) :null}
        </View>
    </View>

    </Modal>
    </>
    );
};
  const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal : 20,
        backgroundColor: "#56132a",
        fontSize :20
    },
    
    input: {
        borderBottomWidth:2,
        borderBottomColor : Colors.PRIMARY

    },
    btnContainer:{
        flexDirection:  'row',
        justifyContent: 'center',
        paddingVertical: 15,
        
    },
    vectorIcon: {
        position: "relative",
        width: 24.02,
        height: 27.19,
        flexShrink: 0,
      },
      vectorIcon2: {
        position: "relative",
        width: 28.02,
        height: 31.19,
        flexShrink: 0,
        
      },

    buttons:{
      marginHorizontal: 10,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 3,
      overflow: 'hidden',
    },

    modal: {
      backgroundColor: "#56132a",
    },

    frameRNPTextInput: {
      marginTop: 10,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: "#fff",
      height: 48,
      justifyContent: "flex-start",
    },
  });

  export default ProductionModal;