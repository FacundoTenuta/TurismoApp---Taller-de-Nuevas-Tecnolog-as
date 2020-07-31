import React from 'react';
import AlojamientosListaScreen from './AlojamientosListaScreen';

import {createStackNavigator} from '@react-navigation/stack';
import AlojamientoDetalleScreen from './AlojamientoDetalleScreen';
import AlojamientosMapaScreen from './AlojamientosMapaScreen';


const HomeStack = createStackNavigator();

const AlojamientosScreen = () => {

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <HomeStack.Screen name="Lista" component={AlojamientosListaScreen} />             
        <HomeStack.Screen name="Detalle" component={AlojamientoDetalleScreen} />
        <HomeStack.Screen name="Mapa" component={AlojamientosMapaScreen} />
    </HomeStack.Navigator>
  );
};


export default AlojamientosScreen;