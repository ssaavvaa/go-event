import React , { useState, Fragment } from "react";
import WithSession from '../components/withSession'
import { Mutation } from 'react-apollo';
import { POST_MESSAGE} from '../queries/index';


const PostMessage = (props) => {

    const [state , setState] = useState({
        message:''
    })

    const setMessage = val => {
        const message = val.target.value
        setState({message})
    }

    const sendMessage = (postMessage) => {
        postMessage().then(async({data}) => {
         setState({message:""})
         props.refetch();
        })
    }

    const { eventId } = props;
    const { username } = props.getCurrentUser || "";
    const { message } = state;





if(props.getCurrentUser !== null){
    return (
        <Fragment>
          <Mutation  mutation ={POST_MESSAGE} variables = {{username , eventId, message }} >
          {postMessage => {
          return (
            <Fragment>
                  <div className="bottom_messages">
                     <input value={message} onChange={val => setMessage(val)} type="text" placeholder="type your message"></input>

                     <button onClick={() => sendMessage(postMessage)} type="submit"> send message</button>
                  </div>
             </Fragment>
          )}}
        </Mutation>
        </Fragment>
    )
}

return(<div className="bottom_unAuth">LogIn to send messages</div>)
}

export default WithSession(PostMessage);