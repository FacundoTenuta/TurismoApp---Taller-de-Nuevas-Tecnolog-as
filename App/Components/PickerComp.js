import React, { useState } from 'react'
import {Picker} from '@react-native-community/picker';
import { View, Text, StyleSheet } from 'react-native';

export const PickerComp = ({data, loading, setSelectedValue, value, label }) => {

    const [valor, setValor] = useState(value);

    const picker = () => {



        return data.map( item => (
                <Picker.Item key={item.id} label={item.nombre} value={item.id}/>
            ));
    };


    return (
        <View>
            <Text style={{fontSize:14}}>{label}</Text>

            <Picker

                selectedValue={valor}
                onValueChange={(itemValue, itemIndex) => (setValor(itemValue),
                    setSelectedValue(itemValue)
                    )}
                >
                    <Picker.Item label={" --- "} value="0"></Picker.Item>
                    {loading ? 
                            null
                            :
                            picker()
                    }
            </Picker>

                    
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
      padding: 10,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      marginBottom: 120,
      bottom: 0,
    },
});
