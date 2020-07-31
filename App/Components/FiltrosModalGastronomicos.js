import React, { useState } from 'react';
import { PickerComp } from './PickerComp';
import { View, Text, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import { getLocalidadesGraphQL } from '../helpers/getLocalidadesGraphQL';
import { getEspecialidades } from '../helpers/getEspecialidades';
import { getActividades } from '../helpers/getActividades';
import { useFetchItems } from '../hooks/useFetchItems';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export const FiltrosModalGastronomicos = ({showFilter, changeFilter, setRealData, data, setIsFiltered}) => {

    const {data:localidades, loadingLoc} = useFetchItems(getLocalidadesGraphQL);

    const [localidad, setLocalidad] = useState(0);

    const {data:actividades, loadingAct} = useFetchItems(getActividades);

    const [actividad, setActividad] = useState(0);

    const {data:especialidades, loadingEsp} = useFetchItems(getEspecialidades);

    const [especialidad, setEspecialidad] = useState(0);

    const aplicarFiltro = () => {

        let items = data;

        if (localidad != 0) {
            items = items.filter((item) => {
                return (item.localidad_id == localidad);
            })
            
        }

        if (actividad != 0) {
            items = items.filter((item) => {
                let aux = item.actividad_gastronomicos.filter((act) => {
                    return act.actividade.id == actividad;
                });
                return aux.length > 0;
                });
        }
        if (especialidad != 0) {
            items = items.filter((item) => {
                let aux = item.especialidad_gastronomicos.filter((esp) => {
                    return esp.especialidade.id == especialidad;
                })
                return aux.length > 0;
                });
        }

        if ((localidad != 0) || (actividad != 0) || (especialidad != 0)) {
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
                            <PickerComp data={localidades} loading={loadingLoc} setSelectedValue={setLocalidad} value={localidad} label={"Localidad"} />
                        </View>

                        <View style={{marginTop:5}}>    
                            <PickerComp data={actividades} loading={loadingAct} setSelectedValue={setActividad} value={actividad} label={"Actividad"} />
                        </View>

                        <View style={{marginTop:5}}>
                            <PickerComp data={especialidades} loading={loadingEsp} setSelectedValue={setEspecialidad} value={especialidad} label={"Especialidad"} />
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
