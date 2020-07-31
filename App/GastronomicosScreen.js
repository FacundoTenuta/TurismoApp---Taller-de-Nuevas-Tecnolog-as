import React from 'react';
import GastronomicosListaScreen from './GastronomicosListaScreen';

import {createStackNavigator} from '@react-navigation/stack';
import GastronomicoDetalleScreen from './GastronomicoDetalleScreen';
import GastronomicosMapaScreen from './GastronomicosMapaScreen';


const HomeStack = createStackNavigator();

const GastronomicosScreen = () => {

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <HomeStack.Screen name="Lista" component={GastronomicosListaScreen} />             
        <HomeStack.Screen name="Detalle" component={GastronomicoDetalleScreen} />
        <HomeStack.Screen name="Mapa" component={GastronomicosMapaScreen} />
    </HomeStack.Navigator>
  );
};

export default GastronomicosScreen;