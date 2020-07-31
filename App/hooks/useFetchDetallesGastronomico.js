import { useState, useEffect } from "react"
import { getUnaLocalidadGraphQL } from "../helpers/getUnaLocalidadGraphQL";

export const useFetchDetallesGastronomico = (detalles) => {


    const [state, setState] = useState({
        data: {
            localidad: "",
        },
        loading: true,
    });

    const getDetalles = async() => {
        let newData = {
            localidad: "",
        };

        await getUnaLocalidadGraphQL(detalles.localidad)
            .then(loc => {

                newData.localidad = loc.nombre;

            });

            return newData;
    }

    useEffect(() => {
        getDetalles()
            .then(newData => {

            setState({
                data: newData,
                loading: false
            });
        });

    }, []);


    return state;

}
