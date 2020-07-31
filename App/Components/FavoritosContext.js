import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';


const getFavs = async () => {
    try {
      const favs = await AsyncStorage.getItem('favoritos')
      return favs ? JSON.parse(favs) : [];
    } catch (e) {
      console.warn('Failed to fetch the data from storage');
    }
  }


export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
    
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        async function fetchFavs() {
            const favs = await getFavs();
            setFavoritos(favs)
        }
        fetchFavs();
    }, [])

    useEffect(() => {
        if(favoritos) {
            AsyncStorage.setItem('favoritos', JSON.stringify(favoritos))
        }
    }, [favoritos]);

    return (
        <FavoritosContext.Provider value={{favoritos, setFavoritos}}>
        {children}
        </FavoritosContext.Provider>
    );
}