/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  NativeModules,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIKEY} from '../API/Constants';

const {RNTwitterSignIn} = NativeModules;

const TwitterLogin = ({navigation}) => {

  const twitterLogin = () => {
    RNTwitterSignIn.init(APIKEY.API_KEY, APIKEY.API_SECRET_KEY);
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log('loginData:', loginData);
        // Save login data to AsyncStorage
        saveLoginData(loginData);
      })
      .catch(error => {
        console.log('Error logging in with Twitter: ', error);
      });
  };

  const saveLoginData = async loginData => {
    try {
      await AsyncStorage.setItem('twitterLoginData', JSON.stringify(loginData));
      console.log('Login data saved successfully!');
      navigation.navigate('PostProduct');
    } catch (error) {
      console.log('Error saving login data: ', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Product Hunt </Text>
            <Text style={styles.headerText}>Login to Proceed </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={twitterLogin}>
            <Text style={styles.buttonText}>Twitter Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginVertical: wp('20%'),
  },
  headerText: {
    color: '#1DA1F2',
    fontSize: wp('6%'),
  },
  button: {
    backgroundColor: '#1DA1F2',
    borderRadius: 10,
    marginVertical: wp('10%'),
    width: wp('60%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: wp('3%'),
  },
});

export default TwitterLogin;
