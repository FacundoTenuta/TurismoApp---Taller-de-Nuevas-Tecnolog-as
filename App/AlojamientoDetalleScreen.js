import React, {useState, useContext, useEffect} from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity, Dimensions, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { useFetchDetallesAlojamiento } from './hooks/useFetchDetallesAlojamiento';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FavoritosContext } from './Components/FavoritosContext';
import AsyncStorage from '@react-native-community/async-storage';

import ImagePicker from 'react-native-image-crop-picker';

import BottomSheet from 'reanimated-bottom-sheet';

import { useStorage } from './hooks/useStorage';
import { useStorageImages } from './hooks/useStorageImages';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

const AlojamientoDetalleScreen = ({route, navigation}) => {
    const item = route.params.item;

    const {data:detalles, loading} = useFetchDetallesAlojamiento({categoria:item.categoria_id, localidad:item.localidad_id,clasificacion:item.clasificacion_id,});


    const {favoritos, setFavoritos} = useContext(FavoritosContext);

    const [corazon, setCorazon] = useState(false);

    const {data:favs} = useStorage();

    const {data:imgs} = useStorageImages();

    const [imagenes, setImagenes] = useState([])

    useEffect(() => {

      setCorazon(favoritos.some(element => element.item.id == item.id))
  
    });

    useEffect(() => {

      if (favs != []) {
        setCorazon(favs.some(element => element.item.id == item.id))
      }
    
    }, [favs]);

    useEffect(() => {

      if (imgs != []) {
        let aux = imgs.find(element => element.id == item.id);

        if (!!aux) {
        
          setImagenes(aux.imgs)
  
        }

      }

    }, [imgs])
  

    const agregarFavorito = async() => {

        await AsyncStorage.setItem("favoritos", JSON.stringify([{item, tipo: "alojamiento"}, ...favs])).then(() => {
          setFavoritos(favs => [{item, tipo: "alojamiento"}, ...favs]);
          setCorazon(true);
        })

    }

    const quitarFavorito = async() => {

        setFavoritos(favoritos.filter(fav => fav.item.id != item.id))
        
        await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos)).then(() => {
          setCorazon(false);
        })

    }

    const takePhotoFromCamera = () => {
      ImagePicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        guardarImagen(image.path);
        laRef().current.snapTo(1);
      });
    }

    const guardarImagen = async(path) => {

      let aux = imgs.find(element => element.id == item.id);
        
      await AsyncStorage.setItem("imagenes", JSON.stringify([{id: item.id, imgs: [path, ...aux.imgs]}, ...imgs])).then(() => {
          setImagenes([path, ...imagenes])
      })

      
    }

    const generarImagenes = () => {

      return (
        imagenes.map(img => <View key={img} style={{flexBasis: "32%", height:140, marginLeft:2, marginBottom:2}}>
                                <Image source={{
                                  uri: img,
                                }}
                                style={{width:"100%", height: "100%"}} />
                            </View>
        )
      );

    }
  
    const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        guardarImagen(image.path);
        laRef().current.snapTo(1);
      });
    }

    renderInner = () => (
      <View style={styles.panel}>
        <TouchableOpacity style={styles.botonCamara} onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonGaleria} onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Galería</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonCancelar}
          onPress={() => laRef().current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );

    renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );

    const bs = React.createRef();

    const laRef = () => {
      return bs;
    }

  return (    

    <View style={{backgroundColor: "#E5F6E5", flex:1}}>

      {
        corazon && (

          <BottomSheet
            ref={laRef()}
            snapPoints={[225, 0]}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
            initialSnap={1}
            callbackNode={this.fall}
            enabledGestureInteraction={true}
          />

        )
      }

      <ScrollView style={{ backgroundColor: "#E5F6E5"}}>


        <View style={styles.container}>
            <View style={{height: 250}}>
            { item.foto === null ?

              <Image source={ require("./images/image-not-found.png") }
              style={{width: imageWidth, height: 250, position: 'absolute'}} />
              :
              <Image source={{
                uri: item.foto,
              }}
              style={{width: imageWidth, height: 250, position: 'absolute'}} />
              }

              

              <Text style={{fontSize: 30, marginLeft: 15, textAlignVertical: "bottom", color: "white", height:"100%", paddingBottom:5}}>{item.nombre}</Text>


            </View>

            


            <Text style={styles.titulos}>Domicilio</Text>
            <Text style={styles.detalle}>{item.domicilio}</Text>

            {
              loading ? (
                <View style={{flexDirection:"row", justifyContent:"center"}}>
                  <Text style={{fontSize: 20, fontStyle: "italic", color: "#000000", marginTop: 60}}>Cargando...</Text>
                </View>
                
                ) : (
                  <View style={{alignSelf:"center"}}>

                    <Text style={styles.titulos}>Categoría</Text>
                    <Text style={styles.detalle}>{detalles.categoria}</Text>
                    <Text style={styles.titulos}>Localidad</Text>
                    <Text style={styles.detalle}>{detalles.localidad}</Text>
                    <Text style={styles.titulos}>Clasificación</Text>
                    <Text style={styles.detalle}>{detalles.clasificacion}</Text>
                  </View>
                  
              )
            }


            {
              corazon && (
              
                <View>

                  <Text style={styles.titulos}>Recuerdos</Text>

                  <View style={{flexDirection:"row", flexWrap:"wrap", margin:20, justifyContent:"flex-start"}}>

                      <TouchableOpacity onPress={() => laRef().current.snapTo(0)} style={{flexBasis: "32%", backgroundColor:"#rgba(256,256,256,0.5)", height:140, borderRadius:10, flexDirection:"column", justifyContent:"space-around", marginLeft:2, marginBottom:2}}>

                          <View style={{alignSelf:"center", justifyContent: 'center', backgroundColor: "#rgba(256,256,256,0.9)", borderRadius:50, height:50, width:50 }}  onPress={
                            null
                          }>
                              <Icon style={{alignSelf:"center"}} name="image-plus" size={30} color="#7DE799"/>
                          </View>      

                      </TouchableOpacity>
                      
                      {generarImagenes()}

                  </View>  

                </View>

              )
            }


            
        </View>

      </ScrollView>

      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>

        <View style={{ backgroundColor: '#rgba(212,212,212,0.3)', padding: 10, borderRadius: 50, width: 43, height: 43, position:"absolute", margin: 20}}>
            <Icon name="arrow-left" size={22} color="white" />
        </View>

      </TouchableWithoutFeedback>

      {
        corazon ? (

          <TouchableWithoutFeedback onPress={quitarFavorito}>

            <View style={{ backgroundColor: '#rgba(212,212,212,0.3)', padding: 10, borderRadius: 50, width: 43, height: 43, position:"absolute", margin:20, right:0}}>
                <Icon style={{alignSelf:"center"}} name="heart" size={22} color="#EC378C" />
            </View>

          </TouchableWithoutFeedback>

        ) : (

        <TouchableWithoutFeedback onPress={agregarFavorito}>

            <View style={{ backgroundColor: '#rgba(212,212,212,0.3)', padding: 10, borderRadius: 50, width: 43, height: 43, position:"absolute", margin:20, right:0}}>
                <Icon style={{alignSelf:"center"}} name="heart-outline" size={22} color="white" />
            </View>

        </TouchableWithoutFeedback>

        )
      }

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5F6E5'
  },
  line: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  titulos: {
    marginTop: 30,
    alignSelf:"center",
    fontSize: 20,
    fontStyle: "italic",
    color: "#828899"
  },
  detalle: {
    fontSize: 15,
    alignSelf:"center",
    marginTop: 10
  },
  panel: {
    padding: 20,
    backgroundColor: '#rgba(256,256,256,0.5)',
    paddingTop: 5,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    marginBottom: 20,
    fontStyle:"italic"
  },
  botonCamara: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#7DE799',
    alignItems: 'center',
    marginVertical: 7,
  },
  botonGaleria: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#7DE799',
    alignItems: 'center',
    marginVertical: 7,
  },
  botonCancelar: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    backgroundColor: '#rgba(256,256,256,0.5)',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
  },
});

export default AlojamientoDetalleScreen;