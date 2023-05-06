import React, { useState, useEffect } from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.1.44:5000/reviews";

interface starRatingProps {
  navigation: any;
}




const StarRatingModal = (props: starRatingProps) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [idWine, setIDWine] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('IDVinhos');
        const jsnoValue = JSON.parse(value)
        const idWine = jsnoValue.IDVinho
        setIDWine(idWine);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);


  sendReview = async (params) => {

    await axios.post(API_URL, { params })
      .then((response) => {
        console.log(response);
      })

  }
  handleSubmit = async () => {
    var payload = {
      rating,
      review,
      idWine
    }
    console.log(payload)
    setModalVisible(false);
    props.navigation.navigate("Production");
    await sendReview(payload)
  }




  return (
    <View>
      <Modal animationType='slide' transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Please rate your wine</Text>

          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(i => {
              return (
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                  {i <= rating ? <Text style={styles.star1}>★</Text> : <Text style={styles.star}>☆</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          <TextInput
            style={styles.reviewInput}
            placeholder='Write your review here...'
            onChangeText={text => setReview(text)}
            value={review}
            multiline={true}
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    marginRight: 10,
  },
  star1: {
    fontSize: 30,
    marginRight: 10,
    color: "#FFFF00"
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
    height: 100,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,

  }
})
export default StarRatingModal;