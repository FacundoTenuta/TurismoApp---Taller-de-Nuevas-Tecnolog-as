import React, { useState } from 'react';
import { PickerComp } from './PickerComp';
import { View, Text, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFetchItems } from '../hooks/useFetchItems';
import { getCategorias } from "../helpers/getCategorias";
import { getClasificaciones } from "../helpers/getClasificaciones";
import { getLocalidades } from "../helpers/getLocalidades";


export const FiltrosModalAlojamientos = ({showFilter, changeFilter, setRealData, data, setIsFiltered}) => {

    const {data:localidades, loadingLoc} = useFetchItems(getLocalidades);

    const [localidad, setLocalidad] = useState(0);

    const {data:clasificaciones, loadingCla} = useFetchItems(getClasificaciones);

    const [clasificacion, setClasificacion] = useState(0);

    const {data:categorias, loadingCat} = useFetchItems(getCategorias);

    const [categoria, setCategoria] = useState(0);

    const aplicarFiltro = () => {

        let items = data;

        if (localidad != 0) {
            items = items.filter((item) => {
                return (item.localidad_id == localidad);
            })
            
        }
        if (clasificacion != 0) {
            items = items.filter((item) => {
                return (item.clasificacion_id == clasificacion);
            })
        }
        if (categoria != 0) {
            items = items.filter((item) => {
                return (item.categoria_id == categoria);
            });
        }

        if ((localidad != 0) || (clasificacion != 0) || (categoria != 0)) {
            setRealData(items);
            setIsFiltered(true);
        }
        changeFilter();
    }

    return (
    
        <Modal transparent={true} visible={showFilter} onDismiss={() => changeFilter()} onRequestClose={() => changeFilter()}>
            <View style={{backgroundColor:"#000000aa", flex:1}}>
            
                <View style={{backgroundColor:"#E5F6E5", margin:50, marginVertical:150 ,padding:20, flex:1}}>

                    <TouchableWithoutFeedback onPress={() => changeFilter()} style={{flexDirection:"row-reverse"}}>

                        <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 50, width: 43, height: 43, alignSelf:"flex-end"}}>
                            <Icon name="close" size={22} color="black" />
                        </View>

                    </TouchableWithoutFeedback>

                    <View style={{marginHorizontal:20}}>
                        <Text style={{fontSize:20, fontStyle: 'italic', fontWeight: 'bold', textAlign:"center", marginBottom:20}}>Filtro</Text>

                        <View style={{marginTop:5}}>
                            <PickerComp data={localidades} loading={loadingLoc} setSelectedValue={setLocalidad} value={localidad} label={"Localidad"}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <PickerComp data={clasificaciones} loading={loadingCla} setSelectedValue={setClasificacion} value={clasificacion} label={"Clasificación"}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <PickerComp data={categorias} loading={loadingCat} setSelectedValue={setCategoria} value={categoria} label={"Categoría"}/>
                        </View>

                        <View style={{marginTop:30}}>
                            <Button color="#1AB0B5" title="Aplicar" onPress={aplicarFiltro}></Button>
                        </View>
                    </View>

                </View>
            

            </View>
        </Modal>
    )
}
