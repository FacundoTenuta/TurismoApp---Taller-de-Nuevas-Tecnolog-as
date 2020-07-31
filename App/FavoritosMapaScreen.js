import React, {useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Button, SafeAreaView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/FontAwesome';

import { SearchBarFavoritos } from './Components/SearchBarFavoritos';

import { FAB } from 'react-native-paper';



const MapaScreen = ({route, navigation}) => {
  
  const { data } = route.params;
  
  const [realData, setRealData] = useState(data);

  const [coords, setCoords] = useState({
        lat: -54.808224,
        lon: -68.321953,
  });


  const [activeMarker, setActiveMarker] = useState(null);

  const [miniDatos, setMiniDatos] = useState({});

  const mapMarkers = () => {
    return realData.map(alojamiento => <Marker
      key={alojamiento.item.id}
      coordinate={{
        latitude: alojamiento.item.lat,
        longitude: alojamiento.item.lng,
      }}
      title={alojamiento.item.nombre}
      description={alojamiento.item.domicilio}
      anchor={{ x: 0.5, y: 0.5 }}
      onPress={(event) => {
        event.stopPropagation();
        setActiveMarker(true);
        setMiniDatos(alojamiento);
        setCoords({
          lat: alojamiento.item.lat,
          lon: alojamiento.item.lng,
        })
      }}
    >
      {/* <View style={{ backgroundColor: '#40E9A4', padding: 10, borderRadius: 8}}>
        <Icon name="hotel" size={20} color="white" />
      </View> */}
    </Marker>)
  }

  return (
    <SafeAreaView style={styles.container}>

          <SearchBarFavoritos data={data} setRealData={setRealData}/>

          <View style={styles.map}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: coords.lat,
                longitude: coords.lon,
                latitudeDelta: 0.055,
                longitudeDelta: 0.0121,
              }}
              
              onPress={()=>{setActiveMarker(false)}}
            >
                {mapMarkers()}

            </MapView>
            <FAB
              style={styles.fab}
              icon="format-list-bulleted"
              onPress={() => navigation.goBack()}
            />

            {activeMarker ?
              (<View style={{ position: 'absolute', bottom: 20, left: 20, height: 180, width: 365, backgroundColor: 'white' }}>
                { miniDatos.item.foto === null ? (

                  <Image source={ require("./images/image-not-found.png") }
                  style={{width: 365, height: 180, borderRadius: 5, marginRight: 5}} />

                                ) : (

                  <Image source={{
                    uri: miniDatos.item.foto,
                  }}
                  style={{width: 365, height: 180, borderRadius: 5, marginRight: 5}} />
                  )
                }
                <Text style={{color:"white",fontWeight:"bold",backgroundColor:"#rgba(0,0,0,0.3)",fontSize:15, position:"absolute", marginTop:80, alignSelf:"center"}}>{miniDatos.item.nombre}</Text>
                <View style={{width:170, alignItems:"center", alignSelf:"center", position:"absolute", marginTop:135}}>
                  <Button
                    onPress={() => navigation.navigate('Detalle', {item:miniDatos})}
                    title="Ver detalles"
                    color="#EC378C"
                  />
                </View>
              </View>)
              : null}
          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#E5F6E5",
    flex: 1,
  },
  map: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#ffffbf',
    position: 'absolute',
    margin: 16,
    right: 10,
    marginBottom: 330,
    bottom: 0,
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 10,
    marginBottom: 250,
    bottom: 0,
  },
});

export default MapaScreen;