import React, { useState } from 'react';

import { SearchBar } from 'react-native-elements';

export const SearchBarFavoritos = ({data, setRealData}) => {


    const [search, setSearch] = useState("");

  const searchFilterFunction = text => { 
    const newData = data.filter(item => {      
      const itemData = `${item.item.nombre.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    setSearch(text);
    setRealData(newData);
  };



    return (
        <SearchBar      
        inputStyle={{backgroundColor: '#E5F6E5', borderRadius: 10}}
        containerStyle={{backgroundColor: '#7DE799'}}
        inputContainerStyle={{backgroundColor: '#7DE799' }}
        placeholder="Busca un alojamiento"        
        // lightTheme        
        round        
        onChangeText={text => searchFilterFunction(text)}
        autoCorrect={false}   
        value={search}          
      />   
    )
}
