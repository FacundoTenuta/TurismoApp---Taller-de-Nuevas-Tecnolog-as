import axios from 'axios';

export const getUnaCategoria = async(id) => {


    const url = `http://10.0.2.2:3000/categorias?id=eq.${id}`;
    // const url = `http://192.168.0.4:3000/categorias`;
    const resp = await axios.get(url);
    const {data} = resp;


    return data[0];


}