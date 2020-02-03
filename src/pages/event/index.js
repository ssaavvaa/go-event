import React , { Fragment } from "react";
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Query , Subscription } from 'react-apollo';
import { GET_EVENT , NEW_MESSAGE } from '../../queries/index';
import Loading from '../../components/loading'
import '../../styles/event.css';
import PostMessage from '../../components/postMessage';
import WithSession from '../../components/withSession';
import Error from '../../components/Error';
import RemoveMessage from '../../components/RemoveMessage';


const Event = (props) => {


const _id = props.location.search.split('?_id=')[1]

const updateMessages = () => {
        props.reFetchObservableQueries()
}

let user_id;

if(props.getCurrentUser){
     user_id  = props.getCurrentUser._id 
}


    return(
        <Layout>
        <SEO title="event" />
        <Query query ={GET_EVENT} variables={{_id}} >
        {({data , loading , error}) => {
            if(loading){ return <Loading /> }
            if( error ) { return <Error error={error} /> }
            if(data === undefined){ return <div className="deleted_page">
                <p>THIS EVENT WAS DELETED BY CREATOR!</p>
            </div>}
            const { messages , heading } = data.getEvent;
         return (
            <Fragment>
              <h2 className="main_heading_chat">{heading}</h2>
              <p className="event_chat">Event Chat</p>
              <div className="chat_window">
              {!messages.length && <p className="no_message">No message was created yet</p>}
                  {messages.map(message => {
                      return(
                        message.userId === user_id?
                        <div style={{ position:"relative",textAlign:"right",background:"rgb(220,250,250)"}} key={message._id} className="message">
                        <span><small>{message.username}</small></span>:{" "}
                        <span><small>
                {new Date(Number(message.createDate)).toDateString()}
                __
                {new Date(Number(message.createDate)).getHours().toString().padStart(2, "0")}{" "}
               :{new Date(Number(message.createDate)).getMinutes().toString().padStart(2, "0")}{" "}
               :{new Date(Number(message.createDate)).getSeconds().toString().padStart(2, "0")}{" "}
               </small></span>
                        <p><strong>{message.message}</strong></p>
                        <RemoveMessage _id = {message._id} eventId={_id} />
                        </div>
                        :<div style={{textAlign:"left"}} key={message._id} className="message">
                        <span><small>{message.username}</small></span>:{" "}
                        <span><small>
                {new Date(Number(message.createDate)).toDateString()}
                __
                {new Date(Number(message.createDate)).getHours().toString().padStart(2, "0")}{" "}
               :{new Date(Number(message.createDate)).getMinutes().toString().padStart(2, "0")}{" "}
               :{new Date(Number(message.createDate)).getSeconds().toString().padStart(2, "0")}{" "}
               </small></span>
                        <p><strong>{message.message}</strong></p>
                        </div>

                      )
                  }

                  )}
                   <Subscription
                    subscription ={NEW_MESSAGE} variables={{eventId:_id}}
                    onSubscriptionData={(data) => {updateMessages()}} >
                     {({data , loading , error}) => {
                     return( <span></span>)
                     }}
                     </Subscription>
                     </div>
                     <PostMessage eventId ={_id} />
             </Fragment>
         )
        }}
        </Query>
        </Layout>
    )
}

export default WithSession(Event);


