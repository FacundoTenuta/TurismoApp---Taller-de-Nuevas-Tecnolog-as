import React, {useEffect, useState} from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import { FAB } from 'react-native-paper';
import FabMapa from './Components/FabMapa';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

import { FiltrosModalAlojamientos } from './Components/FiltrosModalAlojamientos';
import { SearchBarAlojamientos } from './Components/SearchBarAlojamientos';

const useDataApi = (initialUrl, initialData, setRealData) => {
  const [data, setData] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsFetching(true);

      try {
        const response = await axios.get(url);
        setData(response.data);
        setRealData(response.data);
      } catch (error) {
        console.warn(error);
        setIsError(true);
      }
      setIsFetching(false);
    };

    fetchData();
  }, [url]);

  return [{data, isFetching, isError}, setUrl];
};


const AlojamientosListaScreen = ({navigation}) => {

  const [realData, setRealData] = useState([]);

  const [showFilter, setFilter] = useState(false);

  const [isFiltered, setIsFiltered] = useState(false);

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

  const [{data, isFetching, isError}, doFetch] = useDataApi(
    'http://10.0.2.2:3000/alojamientos?order=nombre.asc',
    [],
    setRealData
  );

  const _renderAlojamiento = ({item}) => (

    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Detalle', {item})}>
      <View  style={{flexDirection: 'row', margin: 10, alignItems:"center"}} >
        { item.foto === null ?

          <Image source={ require("./images/image-not-found.png") }
          style={{width: 56, height: 56, borderRadius: 5, marginRight: 5}} />
          :
          <Image source={{
            uri: item.foto,
          }}
          style={{width: 56, height: 56, borderRadius: 5, marginRight: 5}} />
        }
        <Text style={{marginHorizontal:10, marginVertical:10, flex: 1, flexWrap: 'wrap'}}>{item.nombre}</Text>
      </View>
    </TouchableOpacity>
    
  );

  useEffect(() => {
    doFetch('http://10.0.2.2:3000/alojamientos?order=nombre.asc');
    // doFetch('http://192.168.0.4:3000/alojamientos?order=nombre.asc');
  }, [doFetch]);

  
  

  return (  
    <View style={{ backgroundColor: "#E5F6E5", flex:1}}>

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
        {isFetching ? (
          <View style={{flexDirection:"row", justifyContent:"center"}}>
            <Text style={{fontSize: 20, fontStyle: "italic", color: "#000000", marginTop: 60}}>Cargando...</Text>
          </View>
        ) : isError ? (
          <View style={{flexDirection:"row", justifyContent:"center"}}>
              <Text style={{fontSize: 20, fontStyle: "italic", color: "#000000", marginTop: 60}}>Error</Text>
          </View>
        ) : (
          <FlatList
            initialNumToRender={25}
            windowSize={10}
            data={realData}
            ListEmptyComponent={<Text style={{marginTop: 50, alignSelf:"center", fontSize: 20, fontStyle: "italic", color: "#828899" }}>Lista vacía</Text>}
            renderItem={_renderAlojamiento}
            keyExtractor={alojamiento => alojamiento.id.toString()}
          />
        )}
      <FabMapa data={data}/>
      <FAB
        style={styles.fab}
        icon="filter"
        onPress={_changeFilter}
      />
    
      <FiltrosModalAlojamientos showFilter={showFilter} changeFilter={_changeFilter} setRealData={setRealData} data={data} setIsFiltered={setIsFiltered}/>
    </View>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    marginBottom: 250,
    bottom: 0,
  },
});

export default AlojamientosListaScreen;