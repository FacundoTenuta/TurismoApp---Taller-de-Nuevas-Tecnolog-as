import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const FabFiltro = () => {
  const navigation = useNavigation();

    const _goTo = routeName => () => {
        navigation.navigate(routeName);
    };
  return (
  <FAB
    style={styles.fab}
    icon="filter"
    onPress={_goTo('Filtros')}
  />);
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    marginBottom: 120,
    bottom: 0,
  },
})

export default FabFiltro;