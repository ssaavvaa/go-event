

import React  from "react";
import { REMOVE_MESSAGE } from '../queries/index';
import { Mutation } from 'react-apollo';
import '../styles/event.css';

export const RemoveMessage = ({ _id , eventId}) => {

const deleteMessages = (deleteMessage) => {
   return deleteMessage()
}


    return (
        <Mutation  mutation ={REMOVE_MESSAGE} variables = {{ _id, eventId }} >
          {deleteMessage => {
          return (
            <img alt="remove_icon"
             style={{
                width:"26px",
                position:"absolute",
                top:6,
                right:6,
                height:"26px"
            }} className="delete_message" onClick = {() => deleteMessages(deleteMessage)} src = {require('../images/delete.png')} />
          )}}
        </Mutation>

    )
}

export default RemoveMessage;