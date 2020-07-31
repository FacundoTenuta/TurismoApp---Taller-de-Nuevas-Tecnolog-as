import React, {useEffect, useState} from 'react';
import {ScrollView, Text, Image, StyleSheet, View, TouchableOpacity, NavigationContainer} from 'react-native';
import FavoritosListaScreen from './FavoritosListaScreen';

import {createStackNavigator} from '@react-navigation/stack';
import FavoritoDetalleScreen from './FavoritoDetalleScreen';
import FavoritosMapaScreen from './FavoritosMapaScreen';

const Stack = createStackNavigator();

const screenOptions = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

const detalle = () => {
  navigation.navigate()
}

const HomeStack = createStackNavigator();

const FavoritosScreen = () => {

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <HomeStack.Screen name="Lista" component={FavoritosListaScreen} />             
        <HomeStack.Screen name="Detalle" component={FavoritoDetalleScreen} />
        <HomeStack.Screen name="Mapa" component={FavoritosMapaScreen} />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default FavoritosScreen;