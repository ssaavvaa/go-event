import React, {  useState , useEffect } from "react";
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import '../../styles/main.css';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import '../../styles/create_event.css';
import withSession from '../../components/withSession';
import { Mutation } from 'react-apollo';
import { ADD_EVENT, GET_ALL_EVENTS , GET_PROFILE_INFO  } from '../../queries/index';
import Error from '../../components/Error';
import Loading from '../../components/loading';
import { navigateTo } from '../../Helpers/helpers';


const initialState = {
    country:'',
    city:'',
    heading:'',
    description:'',
    address:'',
    username:''
}


const CreateEvent = (props) => {

const [state , setState] = useState(initialState)

useEffect(() => {
    if(!props.getCurrentUser){
       return navigateTo('auth/sign-in');
    }

    const { username } = props.getCurrentUser;
    setState({...state,username})
},[])

const onChangeState = (event) => {
 const { name , value } = event.target;
 setState({...state,[name]:value})
}

const setCountry = (val) => {
    setState({...state,country:val})
   }

const setCity = (val) => {
    setState({...state,city:val})
   }



const handleSubmit = ( event , addEvent ) => {
  event.preventDefault();
  addEvent().then(async({data}) => {
    navigateTo('/');
})
}

const { username , address, city , country , heading , description } = state;


if(!props.getCurrentUser){
    navigateTo('auth/sign-in');
    return (<p></p>)
}

const { _id } = props.getCurrentUser;

 return(
 <Layout>
    <SEO title="create" />
    <Mutation mutation = {ADD_EVENT} 
              variables={{ _id ,username , address, city , country , heading , description}}
              refetchQueries={[{ query: GET_PROFILE_INFO, variables:{ _id } }, { query: GET_ALL_EVENTS}]} 
              >
        {(addEvent, {data , loading , error}) => {
            if( loading ) { return <Loading />}
            if( error ) { return (
                <form className="create_event_form" onSubmit = {event => handleSubmit(event,addEvent)} >
                {loading && <Loading />}
                <label htmlFor="heading">Heading</label>
                <input type="text" onChange={val => onChangeState(val)} maxLength="15" name='heading' id="heading" placeholder="heading" value={heading} />
                <label htmlFor="decription">Description</label>
                <textarea type="text" onChange={val => onChangeState(val)} name="description" id="description" placeholder="description" value={description} />
                <label name="country" htmlFor="country">Country</label>
                <CountryDropdown
                  id="country"
                  value={country}
                  onChange={val => setCountry(val)} />
                  <label htmlFor="city">City</label>
                <RegionDropdown
                  id="city"
                  country={country}
                  value={city}
                  onChange={val => setCity(val)} />
                    <label htmlFor="address">Address</label>
                 <textarea style={{ padding:"20px"}} maxLength="30" type="text" onChange={val => onChangeState(val)} name="address" id="address" placeholder="address" value={address} />
                 <button disabled = { loading } type="submit">SUBMIT</button>
                 <Error error={error} />
            </form>
            )}

            return(
    <form className="create_event_form" onSubmit = {event => handleSubmit(event,addEvent)} >
        {loading && <Loading />}
        <label htmlFor="heading">Heading</label>
        <input type="text" onChange={val => onChangeState(val)} maxLength="15" name='heading' id="heading" placeholder="heading" value={heading} />
        <label htmlFor="decription">Description</label>
        <textarea type="text" onChange={val => onChangeState(val)} name="description" id="description" placeholder="description" value={description} />
        <label name="country" htmlFor="country">Country</label>
        <CountryDropdown
          id="country"
          value={country}
          onChange={val => setCountry(val)} />
          <label htmlFor="city">City</label>
        <RegionDropdown
          id="city"
          country={country}
          value={city}
          onChange={val => setCity(val)} />
            <label htmlFor="address">Address</label>
         <textarea style={{ padding:"20px"}} maxLength="30" type="text" onChange={val => onChangeState(val)} name="address" id="address" placeholder="address" value={address} />
         {error && <Error error = {error} />}
         <button disabled = {loading} type="submit">SUBMIT</button>
         {error && <Error error = {error} />}
    </form>

        )}}
    </Mutation>
    </Layout>
 )
};

export default withSession(CreateEvent);