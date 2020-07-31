import React from 'react';

import AlojamientoDetalleScreen from './AlojamientoDetalleScreen';
import GastronomicoDetalleScreen from './GastronomicoDetalleScreen';


const FavoritoDetalleScreen = ({route, navigation}) => {
    const {item} = route.params;  

  return item.tipo == "alojamiento" ? <AlojamientoDetalleScreen route={{
      params: {item:item.item, tipo:item.tipo}
    }} navigation={navigation} key={item.item.id}/> : <GastronomicoDetalleScreen route={{
      params: {item:item.item, tipo:item.tipo}
    }} navigation={navigation} key={item.item.id}/>

};


export default FavoritoDetalleScreen;