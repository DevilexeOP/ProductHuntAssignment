/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import TwitterLogin from './src/Components/TwitterLogin';
import PostProduct from './src/Components/PostProduct';
import ViewProducts from './src/Components/ViewProducts';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedCredentials = await AsyncStorage.getItem('twitterLoginData');
      if (storedCredentials !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Error retrieving stored credentials: ', error);
    }
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="PostProduct"
              component={PostProduct}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={TwitterLogin}
              options={{headerShown: false}}
            />
          )}
          <Stack.Screen
            name="ViewProducts"
            component={ViewProducts}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
