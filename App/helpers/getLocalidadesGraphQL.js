import ApolloClient from 'apollo-boost';
import {gql} from 'apollo-boost';

export const getLocalidadesGraphQL = async() => {


    const client = new ApolloClient({
        uri: 'http://10.0.2.2:8080/v1/graphql',
      });

    const resp = await client.query({
        query: gql`
          query MyQuery {
            localidades(order_by: {nombre: asc}) {
              nombre
              id
            }
          }               
        `
    });

    const {data} = resp;

    return data.localidades;

}