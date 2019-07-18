import React, { Fragment,  useState } from "react";
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import '../../styles/search.css';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { Query } from 'react-apollo';
import {SEARCH_EVENT} from '../../queries/index';
import { Debounce } from 'react-throttle';
import { navigateTo } from '../../Helpers/helpers';
import GoEvent from '../../components/go_event';
import WithSession from '../../components/withSession';
import Loading from '../../components/loading';
import Error from '../../components/Error';

const initialState = {
    searchQuery:'',
    city:'',
    country:'',
    currentSearch:false
}

const Search = ({getCurrentUser}) => {

const [state , setState ] = useState(initialState);

const setCountry = val => {
    setState({...state, currentSearch:true, country:val})
   };

const setCity = val => {
    setState({...state, currentSearch:true, city:val})
   };

const onChange = val => {
    const { value } = val.target
    setState({...state , currentSearch:true, searchQuery:value})
};


const {searchQuery,  country , city , currentSearch } = state;

const searchTerm = `${searchQuery} ${country} ${city}`;


if(!currentSearch){
    return (
        <Layout>
        <SEO title="search" />
        <Query query = {SEARCH_EVENT} variables ={{searchTerm}}>
            {({data , loading , error}) => {
             if(loading) return ( <Loading /> )
             if(error) return <Error error={error} />
         return (
             <Fragment>
        <div className="search_wrapper">
        <Debounce time="1000" handler="onChange">
        <input onChange={val => onChange(val)} type="search" placeholder="search"></input>
        </Debounce>
            <CountryDropdown
              id="country"
              value={country}
              onChange={val => setCountry(val)} />
            <RegionDropdown
              id="city"
              country={country}
              value={city}
              onChange={val => setCity(val)} />
           </div>
           <ul className="allHangouts">
              { data.searchEvent.map(event => (
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
              <p  className="people_go">People go to this event:{" "}{event.joinPeople.length}</p>
              {getCurrentUser && <GoEvent  eventId={event._id}  userId={getCurrentUser._id} />}
              <button onClick = {() => navigateTo(`/event?_id=${event._id}`)}>Event Chat</button>
                  </li>
              ))}
            </ul>
           </Fragment>
           )}}
       </Query>
        </Layout>
    )
}


return(
    <Layout>
    <SEO title="sign-in" />
    <Query query = {SEARCH_EVENT} variables ={{searchTerm}}>
        {({data , loading , error}) => {
         if(loading) return ( <Loading /> )
         if(error) return <Error error={error} />
     return (
         <Fragment>
    <div className="search_wrapper">
    <Debounce time="1000" handler="onChange">
    <input onChange={val => onChange(val)} type="search" placeholder="search"></input>
    </Debounce>
        <CountryDropdown
          id="country"
          value={country}
          onChange={val => setCountry(val)} />
        <RegionDropdown
          id="city"
          country={country}
          value={city}
          onChange={val => setCity(val)} />
       </div>
       { !data.searchEvent.length && <Error error = "ничего не найдено" /> }
       <ul className="allHangouts">
          {data.searchEvent.length !== 0 && data.searchEvent.map(event => (
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
          <p  className="people_go">People go to this event:{" "}{event.joinPeople.length}</p>
          {getCurrentUser && <GoEvent  eventId={event._id}  userId={getCurrentUser._id} />}
          <button onClick = {() => navigateTo(`/event?_id=${event._id}`)}>Event Chat</button>
              </li>
          ))}
        </ul>
       </Fragment>
       )}}
   </Query>
    </Layout>
)};

export default WithSession(Search);