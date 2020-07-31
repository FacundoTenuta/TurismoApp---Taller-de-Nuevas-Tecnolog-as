import axios from 'axios';

export const getLocalidades = async() => {

    const url = `http://10.0.2.2:3000/localidades`;
    // const url = `http://192.168.0.4:3000/localidades`;
    const resp = await axios.get(url);
    // const data = await resp.json();
    const {data} = resp;

    const localidades = data.map( loc => {
        return {
            id: loc.id,
            nombre: loc.nombre,
        }
    })

    return localidades;

}