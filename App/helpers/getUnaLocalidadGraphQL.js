import ApolloClient from 'apollo-boost';
import {gql} from 'apollo-boost';

export const getUnaLocalidadGraphQL = async(id) => {

    const client = new ApolloClient({
        uri: 'http://10.0.2.2:8080/v1/graphql',
      });

    const resp = await client.query({
        query: gql`
        query MyQuery {
            localidades(where: {id: {_eq: ${id}}}) {
              id
              nombre
            }
          }          
        `
    });

    const {data} = resp;

    return data.localidades[0];

}