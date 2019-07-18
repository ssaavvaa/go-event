import React from "react";
import { ApolloConsumer } from 'react-apollo';
import { navigateTo } from '../Helpers/helpers';

const SignOut = () => {


const handleLogOut = client => {
localStorage.setItem('token','');
client.resetStore();
navigateTo('/')
}

return(
    <ApolloConsumer>
        {client => {
         return (
            <span onClick = {() => handleLogOut(client)}>LogOut</span>
             )
         }}

  </ApolloConsumer>
)};

export default SignOut;