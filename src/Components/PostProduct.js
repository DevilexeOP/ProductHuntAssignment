/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  NativeModules,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {db} from '../Firebase/firebase-config';
import {collection, addDoc} from 'firebase/firestore/lite';
import {debounce} from 'lodash.debounce';
import Toast from 'react-native-toast-message';
import Share from 'react-native-share';

const PostProduct = ({navigation}) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productLink, setProductLink] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const productNameHandler = text => {
    setProductName(text);
  };
  const productDescriptionHandler = text => {
    setProductDescription(text);
  };
  const productLinkHandler = text => {
    setProductLink(text);
  };
  const isButtonDisabled = () => {
    return !(productName && productDescription && productLink);
  };

  const saveDataToFirestore = async (
    productName,
    productDescription,
    productLink,
  ) => {
    try {
      const validProductName = productName ? productName.toString() : '';
      const validProductDescription = productDescription
        ? productDescription.toString()
        : '';
      const validProductLink = productLink ? productLink.toString() : '';

      // Check if any of the required fields are empty
      if (
        validProductName.trim() === '' ||
        validProductDescription.trim() === '' ||
        validProductLink.trim() === ''
      ) {
        console.log('Please fill in all fields');
        return; // Exit the function without saving data
      }

      const productsCollection = collection(db, 'products');
      await addDoc(productsCollection, {
        name: validProductName,
        description: validProductDescription,
        link: validProductLink,
      });
      console.log('Data saved to Firestore successfully!');
      successToast();
    } catch (error) {
      console.log('Error saving data to Firestore:', error);
      errorToast();
    }
  };

  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Data Saved !',
    });
  };
  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Saving Data !',
    });
  };

  const handleShare = () => {
    const message = `Check out this product: ${productName} - ${productDescription} ${productLink}`;
    const options = {
      message: shareMessage ? `${shareMessage} ${message}` : message,
    };

    Share.open(options)
      .then(res => {
        console.log('Share successful:', res);
      })
      .catch(error => {
        console.log('Share error:', error);
      });
  };

  const viewAllProducts = () => {
    navigation.navigate('ViewProducts');
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Post a Product !</Text>
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                backgroundColor: '#bbbcbd',
                marginVertical: wp('5%'),
              }}>
              <TextInput
                placeholder="Product Name"
                placeholderTextColor={'#000000'}
                value={productName}
                onChangeText={productNameHandler}
                style={styles.input}
              />
            </View>
            <View
              style={{
                backgroundColor: '#bbbcbd',
                marginVertical: wp('2%'),
                height: hp('20%'),
              }}>
              <TextInput
                placeholder="Product Description"
                keyboardType="default"
                placeholderTextColor={'#000000'}
                multiline={true}
                value={productDescription}
                onChangeText={productDescriptionHandler}
                style={styles.input}
              />
            </View>
            <View
              style={{
                backgroundColor: '#bbbcbd',
                marginVertical: wp('2%'),
                height: hp('10%'),
              }}>
              <TextInput
                placeholder="Product URL"
                placeholderTextColor={'#000000'}
                value={productLink}
                onChangeText={productLinkHandler}
                style={styles.input}
              />
            </View>
            <View>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    backgroundColor: isButtonDisabled() ? '#bbbcbd' : '#1DA1F2',
                  },
                ]}
                disabled={isButtonDisabled()}
                onPress={() => {
                  if (productName && productDescription && productLink) {
                    saveDataToFirestore(
                      productName,
                      productDescription,
                      productLink,
                    );
                    setProductName('');
                    setProductDescription('');
                    setProductLink('');
                  } else {
                    console.log('Please fill in all fields');
                  }
                }}>
                <Text style={styles.submitButtonText}>Post Product</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[
                  styles.shareButton,
                  {
                    backgroundColor: isButtonDisabled() ? '#bbbcbd' : '#0a588a',
                  },
                ]}>
                <Text style={styles.shareText} onPress={handleShare}>
                  Share Product
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText} onPress={viewAllProducts}>
                View all Products
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: wp('10%'),
    marginHorizontal: wp('10%'),
  },
  headerText: {
    color: '#1DA1F2',
    fontSize: wp('5%'),
  },
  inputContainer: {
    backgroundColor: '#e1e2e3',
    height: hp('70%'),
    width: wp('80%'),
    marginHorizontal: wp('10%'),
  },
  input: {
    fontSize: wp('3%'),
    marginVertical: wp('4%'),
    marginHorizontal: wp('5%'),
  },
  submitButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 10,
    marginVertical: wp('3%'),
    marginHorizontal: wp('10%'),
    width: wp('60%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: wp('3%'),
  },
  shareButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 10,
    marginVertical: wp('2%'),
    marginHorizontal: wp('10%'),
    width: wp('60%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    color: 'white',
    fontSize: wp('3%'),
  },
  viewButton: {
    backgroundColor: '#0974b5',
    borderRadius: 10,
    marginVertical: wp('6%'),
    marginHorizontal: wp('20%'),
    width: wp('60%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontSize: wp('3%'),
  },
});

export default PostProduct;
