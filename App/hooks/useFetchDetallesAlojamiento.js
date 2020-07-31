import { useState, useEffect } from "react"
import { getUnaCategoria } from "../helpers/getUnaCategoria";
import { getUnaClasificacion } from "../helpers/getUnaClasificacion";
import { getUnaLocalidad } from "../helpers/getUnaLocalidad";

export const useFetchDetallesAlojamiento = (detalles) => {


    const [state, setState] = useState({
        data: {
            categoria: "",
            clasificacion: "",
            localidad: "",
        },
        loading: true,
    });

    const getDetalles = async() => {
        let newData = {
            categoria: "",
            clasificacion: "",
            localidad: "",
        };

        await getUnaCategoria(detalles.categoria)
            .then(cat => {

                newData.categoria = cat.estrellas;

            });

        await getUnaLocalidad(detalles.localidad)
            .then(loc => {

                newData.localidad = loc.nombre;

            });

        await getUnaClasificacion(detalles.clasificacion)
            .then(cla => {

                newData.clasificacion = cla.nombre;

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
