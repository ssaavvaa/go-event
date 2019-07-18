import React  from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { GET_ALL_EVENTS } from '../queries/index';
import { Query } from 'react-apollo';
import WithSession from '../components/withSession';
import '../styles/main.css';
import { navigateTo } from '../Helpers/helpers';
import GoEvent from '../components/go_event';
import Loading from '../components/loading';
import Error from '../components/Error';


const IndexPage = ({ getCurrentUser }) => {


  return(
  <Layout>
    <SEO title="Home" />
    <h1 className="main_heading">All Events</h1>
    <Query query ={GET_ALL_EVENTS}>
      {({data, loading , error}) => {
        if( loading ){ return <Loading /> }
        if( error ) { return  <Error error={error} /> }

      return (
        <ul className="allHangouts">
          {data.getAllEvents.map(event => (
            <li key = {event._id}>
            <h3><strong>{event.heading}</strong></h3>
            <p className="description">{event.description}</p>
            <div className="sub_info">
          <p><strong>country:</strong> {event.country} </p>
          <p><strong>city:</strong> {event.city}</p>
          <p><strong>address:</strong> {event.address}</p>
          <p><strong>created by:</strong> {event.username}</p>
          <p><strong>date:</strong>{" "}
              {new Date(Number(event.createDate)).toDateString()}
              __
              {new Date(Number(event.createDate)).getHours().toString().padStart(2, "0")}
             :{new Date(Number(event.createDate)).getMinutes().toString().padStart(2, "0")}
             :{new Date(Number(event.createDate)).getSeconds().toString().padStart(2, "0")}
             </p>
        </div>
        <p className="people_go">People go to this event:{" "}{event.joinPeople.length}</p>
        {getCurrentUser && <GoEvent  eventId={event._id}  userId={getCurrentUser._id} />}
        <button onClick = {() => navigateTo(`/event?_id=${event._id}`)}>Event Chat</button>
            </li>
          ))}
        </ul>
      )

      }}
    </Query>

  </Layout>
  )
  }

export default WithSession(IndexPage);
