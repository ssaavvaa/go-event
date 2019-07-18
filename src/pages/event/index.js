import React , { Fragment , useEffect } from "react";
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Query , Subscription } from 'react-apollo';
import { GET_EVENT , NEW_MESSAGE } from '../../queries/index';
import Loading from '../../components/loading'
import '../../styles/event.css';
import PostMessage from '../../components/postMessage';
import WithSession from '../../components/withSession';
import Error from '../../components/Error';

let allMessages = []

const Event = (props) => {

useEffect(() => {
    allMessages = []
    console.log(props)
    props.reFetchObservableQueries()
},[])

const _id = props.location.search.split('?_id=')[1]


    return(
        <Layout>
        <SEO title="sign-in" />
        <Query    query ={GET_EVENT} variables={{_id}} >
        {({data , loading , error}) => {
            if(loading){ return <Loading /> }
            if( error ) { return <Error error={error} /> }
            if(data === undefined){ return <div className="deleted_page">
                <p>THIS EVENT WAS DELETED BY CREATOR!</p>
            </div>}
            const { messages , heading } = data.getEvent;
            console.log(data)
         return (
            <Fragment>
              <h2 className="main_heading_chat">{heading}</h2>
              <p className="event_chat">Event Chat</p>
              <div className="chat_window">
              {!messages.length && <p className="no_message">No message was created yet</p>}
                  {messages.map(message => (
                      <div key={message._id} className="message">
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
                  ))}
                   <Subscription 
                    subscription ={NEW_MESSAGE} variables={{eventId:_id}} >
                     {({data , loading , error}) => {
                         if(data !== undefined){
                             allMessages.push(data.comment)
                             return (
                                 allMessages.map( message => (
                                    <div key={message._id} className="message">
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
                                 ))
                            )
                         }
                         return( <span className="display_none"></span>)
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


