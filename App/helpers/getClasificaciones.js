import axios from 'axios';

export const getClasificaciones = async() => {

    const url = `http://10.0.2.2:3000/clasificaciones`;
    // const url = `http://192.168.0.4:3000/clasificaciones`;
    const resp = await axios.get(url);
    // const data = await resp.json();
    const {data} = resp;

    const clasificaciones = data.map( cla => {
        return {
            id: cla.id,
            nombre: cla.nombre,
        }
    })

    return clasificaciones;

}