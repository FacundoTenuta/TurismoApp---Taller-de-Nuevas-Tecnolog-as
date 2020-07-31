import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Icon from 'react-native-vector-icons/FontAwesome';

import { SearchBarAlojamientos } from './Components/SearchBarAlojamientos';

import { FAB } from 'react-native-paper';
import { FiltrosModalAlojamientos } from './Components/FiltrosModalAlojamientos';


const MapaScreen = ({route, navigation}) => {
  
  const { data } = route.params;

  const [showFilter, setFilter] = useState(false);

  const [isFiltered, setIsFiltered] = useState(false);
  
  const [realData, setRealData] = useState(data);

  
  const [currentPosition, setCurrentPosition] = useState(null)


  const _changeFilter = () => {
    if (showFilter == false){
      setFilter(true)
    }else{
      setFilter(false)
    }
  }

  const resetFilters = () => {
    setRealData(data);
    setIsFiltered(false);
  }


  useEffect(() => {

    Geolocation.getCurrentPosition(position => {

      setCurrentPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })

    })


  }, [])


  const [activeMarker, setActiveMarker] = useState(null);

  const [miniDatos, setMiniDatos] = useState({});

  const mapMarkers = () => {
    return realData.map(alojamiento => <Marker
      key={alojamiento.id}
      coordinate={{
        latitude: alojamiento.lat,
        longitude: alojamiento.lng,
      }}
      title={alojamiento.nombre}
      description={alojamiento.domicilio}
      anchor={{ x: 0.5, y: 0.5 }}
      onPress={(event) => {
        event.stopPropagation();
        setActiveMarker(true);
        setMiniDatos(alojamiento);
      }}
    >
      {/* <View style={{ backgroundColor: '#40E9A4', padding: 10, borderRadius: 8}}>
        <Icon name="hotel" size={20} color="white" />
      </View> */}
    </Marker>)
  }

  return (
    <SafeAreaView style={styles.container}>
      

          <SearchBarAlojamientos data={data} setRealData={setRealData}/>

          {
            isFiltered && (
              <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <Icon.Button name="times-circle" color="#ED5346" backgroundColor="#E5F6E5" onPress={resetFilters}>
                </Icon.Button>
                <Text>Quitar filtros</Text>
              </View>
            )
          }

          <View style={styles.map}>
            {
              !!currentPosition && (<MapView
                                      provider={PROVIDER_GOOGLE}
                                      showsUserLocation
                                      style={styles.map}
                                      initialRegion={{
                                          latitude: currentPosition.lat,
                                          longitude: currentPosition.lon,
                                          latitudeDelta: 0.015,
                                          longitudeDelta: 0.0121,
                                        }}
                                      
                                      onPress={()=>{setActiveMarker(false)}}
                                    >
                        
                                        {mapMarkers()}
                        
                                    </MapView>)
            }
            
            <FAB
              style={styles.fab}
              icon="format-list-bulleted"
              onPress={() => navigation.goBack()}
            />

            <FAB
              style={styles.fab2}
              icon="filter"
              onPress={_changeFilter}
            />

            <FiltrosModalAlojamientos showFilter={showFilter} changeFilter={_changeFilter} setRealData={setRealData} data={data} setIsFiltered={setIsFiltered}/>
            {activeMarker ?
              (<View style={{ position: 'absolute', bottom: 20, left: 20, height: 180, width: 365, backgroundColor: 'white' }}>
                { miniDatos.foto === null ? (

                  <Image source={ require("./images/image-not-found.png") }
                  style={{width: 365, height: 180, borderRadius: 5, marginRight: 5}} />

                                ) : (

                  <Image source={{
                    uri: miniDatos.foto,
                  }}
                  style={{width: 365, height: 180, borderRadius: 5, marginRight: 5}} />
                  )
                }
                <Text style={{color:"white",fontWeight:"bold",backgroundColor:"#rgba(0,0,0,0.3)",fontSize:15, position:"absolute", marginTop:80, alignSelf:"center"}}>{miniDatos.nombre}</Text>
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