import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';

export const useStorage = () => {

    const [state, setState] = useState({
        data: [],
        loading: true,
    });

    const seteadoFavs = async() => {
        return await AsyncStorage.getItem("favoritos").then(favs => {
                favs = JSON.parse(favs);

                return favs;

        }); 

    }

    // const borrarFavs = async() => {
    //     await AsyncStorage.removeItem("favoritos");
    // }

    useEffect(() => {
        // bottatFavs();
        seteadoFavs()
            .then(favs => {

                setState({
                    data: !!favs ? favs : [],
                    loading: false
                });

            }
            );
    }, []);

    return state;

}
