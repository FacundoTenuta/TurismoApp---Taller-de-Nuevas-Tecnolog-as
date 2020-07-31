import axios from 'axios';

export const getCategorias = async() => {

    const url = `http://10.0.2.2:3000/categorias`;
    // const url = `http://192.168.0.4:3000/categorias`;
    const resp = await axios.get(url);
    const {data} = resp;

    const categorias = data.map( cat => {
        return {
            id: cat.id,
            nombre: cat.estrellas
        }
    })

    return categorias;

}