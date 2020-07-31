import React, {useEffect, useState} from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import { FAB } from 'react-native-paper';
import FabMapa from './Components/FabMapa';
import Icon from 'react-native-vector-icons/FontAwesome';
import ApolloClient from 'apollo-boost';
import {gql} from 'apollo-boost';

import { FiltrosModalGastronomicos } from './Components/FiltrosModalGastronomicos';
import { SearchBarAlojamientos } from './Components/SearchBarAlojamientos';

const GastronomicoListaScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchGastronomicos = async () => {
    setIsFetching(true);
    setIsError(false);

    const client = new ApolloClient({
      uri: 'http://10.0.2.2:8080/v1/graphql',
    });

    let data;
    try {
      const response = await client.query({
        query: gql`
          query MyQuery {
            gastronomicos {
              id
              actividad_gastronomicos {
                actividade {
                  nombre
                  id
                }
              }
              domicilio
              foto
              lng
              lat
              nombre
              localidad_id
              especialidad_gastronomicos {
                especialidade {
                  id
                  nombre
                }
              }
            }
          }
        
        `
      });
      data = response.data.gastronomicos;
      setData(response.data.gastronomicos);
    } catch (error) {
      console.warn(error);
      setIsError(true);
    }
    setIsFetching(false);
    return data;
  };

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

  const _renderGastronomico = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalle', {item})}>
      <View key={item.id} style={{flexDirection: 'row', margin: 10, alignItems:"center"}}>
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
    fetchGastronomicos().then(data => setRealData(data));
  }, []);

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
              <Text style={{fontSize: 20, fontStyle: "italic", color: "#000000", marginTop: 60}}>Cargando...</Text>
          </View>
        ) : (
          <FlatList
              initialNumToRender={25}
              windowSize={10}
              data={realData}
              ListEmptyComponent={<Text>Lista vacía</Text>}
              renderItem={_renderGastronomico}
              keyExtractor={gastronomico => gastronomico.id.toString()}
            />
        )}
      <FabMapa data={data}/>
      <FAB
        style={styles.fab}
        icon="filter"
        onPress={_changeFilter}
      />
    
      <FiltrosModalGastronomicos showFilter={showFilter} changeFilter={_changeFilter} setRealData={setRealData} data={data} setIsFiltered={setIsFiltered}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F6E5"
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

export default GastronomicoListaScreen;