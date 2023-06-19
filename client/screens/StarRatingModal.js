import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_IP } from '@env';

const API_URL = `http://${LOCAL_IP}:5000/reviews`;

interface starRatingProps {
  navigation: any;
}

const StarRatingModal = (props: starRatingProps) => {
  const {dataProcessProd} = props.route.params;
  const [modalVisible, setModalVisible] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [idWine, setIDWine] = useState(0);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    async function fetchData() {
      try {
       let wineIdentification = dataProcessProd.IDVinho;
        setIDWine(wineIdentification);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  sendReview = async params => {
    await axios.post(API_URL, {params}).then(response => {
      console.log(response);
    });
  };
  handleSubmit = async () => {
    var payload = {
      rating,
      review,
      idWine,
    };
    console.log(payload);
    setModalVisible(false);
    props.navigation.navigate('Home');
    await sendReview(payload);
  };

  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Please Rate Your Wine</Text>

          <Image
            source={require('../assets/rating_image.png')}
            style={styles.image}
          />

          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(i => {
              return (
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                  {i <= rating ? (
                    <Text style={styles.starFilled}>★</Text>
                  ) : (
                    <Text style={styles.starEmpty}>☆</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[styles.textInputContainer, {width: windowWidth - 40}]}>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write your review here..."
              placeholderTextColor="#ffffff"
              onChangeText={text => setReview(text)}
              value={review}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#56132a',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 60,
    marginTop: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 70,
  },
  starEmpty: {
    fontSize: 50,
    marginRight: 10,
    color: '#ffffff',
  },
  starFilled: {
    fontSize: 50,
    marginRight: 10,
    color: '#FFFF00',
  },
  textInputContainer: {
    marginBottom: 20,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 10,
    height: 100,
    color: '#ffffff',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 5,
    marginTop: 40,
    width: 150,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 15,
    color: '#56132a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

export default StarRatingModal;
