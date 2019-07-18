import React , { useState, Fragment } from "react";
import WithSession from '../components/withSession'
import { Mutation } from 'react-apollo';
import { POST_MESSAGE} from '../queries/index';
import Error from '../components/Error'

const PostMessage = (props) => {

    const [state , setState] = useState({
        message:''
    })

    const setMessage = val => {
        const message = val.target.value
        setState({message})
    }

const sendMessageEnter = (event,postMessage) => {
    if(event.keyCode === 13){
        postMessage().then(async({data}) => {
            setState({message:""})
            props.refetch();
           })
    }

}

    const sendMessage = (postMessage) => {
        postMessage().then(async({data}) => {
         setState({message:""})
         props.refetch();
        })
    }

    const { eventId } = props || "";
    const { username , _id  } = props.getCurrentUser || ""
    const { message } = state;


if(props.getCurrentUser !== null){
    return (
        <Fragment>
          <Mutation  mutation ={POST_MESSAGE} variables = {{ userId:_id, username , eventId, message }} >
          {postMessage => {
          return (
            <Fragment>
                  <div className="bottom_messages">
                     <input onKeyUp={(event) => sendMessageEnter(event,postMessage)} value={message} onChange={val => setMessage(val)} type="text" placeholder="type your message"></input>

                     <button   onClick={() => sendMessage(postMessage)} type="submit"> send message</button>
                  </div>
             </Fragment>
          )}}
        </Mutation>
        </Fragment>
    )
}

return(<Error error ="Log in to send Messages" />)
}

export default WithSession(PostMessage);