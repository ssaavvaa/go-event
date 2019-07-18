
import React from "react";
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries/index';
import Loading from './loading';
import Error from './Error';

const withSession = Component => props =>  (
    <Query query ={GET_CURRENT_USER}>
    {({data , loading , error, refetch,  client }) => {
       if(loading)  {return <Loading /> }; 
       if(error)  { return <Error error = {error} />}
        return (
            <Component refetch = {refetch} { ...client} {...props} {...data}  />
        )
    }}

    </Query>
)

export default withSession;