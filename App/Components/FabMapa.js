import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const FabMapa = ({data}) => {
    const navigation = useNavigation();

    const _goTo = routeName => () => {
        navigation.navigate(routeName, {
          data: data
        });
    };
  return (<FAB
    style={styles.fab}
    icon="map"
    onPress={_goTo('Mapa', {
      data
    })}
  />
  );
};

const styles = StyleSheet.create({
  fab: {
      backgroundColor: '#ffffbf',
    position: 'absolute',
    margin: 16,
    marginBottom: 330,
    right: 10,
    bottom: 0,
  },
})

export default FabMapa;