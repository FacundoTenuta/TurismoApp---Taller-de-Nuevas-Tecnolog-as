import React, {useEffect, useState, useContext} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import { FavoritosContext } from './Components/FavoritosContext';
import FabMapa from './Components/FabMapa';
import { useStorage } from './hooks/useStorage';
import { SearchBarFavoritos } from './Components/SearchBarFavoritos';


const FavoritosListaScreen = ({navigation}) => {

  const {favoritos, setFavoritos} = useContext(FavoritosContext);

  const {data:favs, loading} = useStorage();

  useEffect(() => {
    
    setFavoritos(favs);

  },[favs]);

  useEffect(() => {

    setRealData(favoritos);
    
  }, [favoritos]);

  const _renderFavorito = ({item}) => (

    <TouchableOpacity key={item.item.id} onPress={() => navigation.navigate('Detalle', {item})}>
      <View  style={{flexDirection: 'row', margin: 10, alignItems:"center"}} >
        { item.item.foto === null ?

          <Image source={ require("./images/image-not-found.png") }
          style={{width: 56, height: 56, borderRadius: 5, marginRight: 5}} />
          :
          <Image source={{
            uri: item.item.foto,
          }}
          style={{width: 56, height: 56, borderRadius: 5, marginRight: 5}} />
        }
        <Text style={{marginHorizontal:10, marginVertical:10, flex: 1, flexWrap: 'wrap'}}>{item.item.nombre}</Text>
      </View>
    </TouchableOpacity>
    
  );


  const [realData, setRealData] = useState([]);


  return (
      <View style={{ backgroundColor: "#E5F6E5", flex:1}}>

        {
          loading ? (
            <View style={{flexDirection:"row", justifyContent:"center"}}>
                <Text style={{fontSize: 20, fontStyle: "italic", color: "#000000", marginTop: 60}}>Cargando...</Text>
            </View>
          ) : (
            <View>
              <SearchBarFavoritos data={favoritos} setRealData={setRealData}/>
      
      
                <FlatList
                  initialNumToRender={25}
                  windowSize={10}
                  data={realData}
                  ListEmptyComponent={<Text>Lista vacía</Text>}
                  renderItem={_renderFavorito}
                  keyExtractor={favorito => favorito.item.id.toString()}
                />

            </View>

          )
        }

        <FabMapa data={favoritos}/>
      
      </View>
  );
};

export default FavoritosListaScreen;