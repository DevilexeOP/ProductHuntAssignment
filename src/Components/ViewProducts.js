/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
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
import {collection, getDocs} from 'firebase/firestore/lite';
import Toast from 'react-native-toast-message';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollection);
      const productsData = [];
      querySnapshot.forEach(doc => {
        const product = doc.data();
        productsData.push(product);
      });
      setProducts(productsData);
      successToast();
    } catch (error) {
      console.log('Error fetching products:', error);
      errorToast();
    }
  };
  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Data Fetched !',
    });
  };
  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Fetching Data !',
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>View Products !</Text>
        </View>
        {products.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <Text style={styles.name}>Name: {product.name}</Text>
            <Text style={styles.description}>
              Description: {product.description}
            </Text>
            <Text style={styles.url}>URL: {product.link}</Text>
            {index !== products.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: wp('5%'),
    marginHorizontal: wp('5%'),
  },
  headerText: {
    color: '#1DA1F2',
    fontSize: wp('6%'),
  },
  name: {
    color: 'black',
    marginVertical: wp('2%'),
    marginHorizontal: wp('5%'),
    fontSize: wp('3%'),
  },
  description: {
    color: 'black',
    marginVertical: wp('2%'),
    marginHorizontal: wp('5%'),
    fontSize: wp('3%'),
  },
  url: {
    color: 'black',
    marginVertical: wp('2%'),
    marginHorizontal: wp('5%'),
    fontSize: wp('3%'),
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default ViewProducts;
