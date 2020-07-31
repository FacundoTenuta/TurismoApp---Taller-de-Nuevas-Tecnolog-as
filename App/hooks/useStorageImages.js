import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';

export const useStorageImages = () => {

    const [state, setState] = useState({
        data: [],
        loading: true,
    });

    const seteadoFavs = async() => {
        return await AsyncStorage.getItem("imagenes").then(favs => {
                favs = JSON.parse(favs);

                return favs;

        }); 

    }

    // const borrarImgs = async() => {
    //     await AsyncStorage.removeItem("imagenes");
    // }


    useEffect(() => {
        // bottatImgs();
        seteadoFavs()
            .then(imgs => {

                setState({
                    data: !!imgs ? imgs : [],
                    loading: false
                });

            }
            );
    }, []);

    return state;

}
