import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
} from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Icon } from 'react-native-elements'

import AlojamientosScreen from './AlojamientosScreen';
import GastronomicosScreen from './GastronomicosScreen';
import FavoritosScreen from './FavoritosScreen';
import { FavoritosProvider } from './Components/FavoritosContext';



const Tab = createMaterialBottomTabNavigator();


const App = () => {
  return (
    
    <FavoritosProvider>
      <NavigationContainer>
        
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            inactiveTintColor: "#1A8E1E"
          }}
          barStyle={{ backgroundColor: '#D9EFBB' }}
        >
          <Tab.Screen name="Alojamientos" component={AlojamientosScreen} 
            
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name='hotel'
                  color= '#40E9A4' />
              ),
            }}
          />
          <Tab.Screen name="Gastronomicos" component={GastronomicosScreen} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name='restaurant'
                  color='#FFD427' />
              ),
            }}
          />
          <Tab.Screen 
            name="Favoritos" 
            component={FavoritosScreen} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name='favorite'
                  color='#EC378C' />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritosProvider>
  );
};


export default App;
