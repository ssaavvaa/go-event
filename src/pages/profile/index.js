import React from "react";
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { GET_PROFILE_INFO } from '../../queries/index';
import { Query , Mutation } from 'react-apollo';
import { DELETE_CREATED_EVENT , DELETE_ATTENDING_EVENT , GET_ALL_EVENTS } from '../../queries/index';
import WithSession from '../../components/withSession';
import Loading from '../../components/loading';
import Error from '../../components/Error';
import '../../styles/profile.css';
import {navigateTo} from '../../Helpers/helpers';




const Profile = ({getCurrentUser}) => {

const handleDelete = deleteCreatedEvent => {
    const confirmDelete = window.confirm("are you sure ?");
    if(confirmDelete){
       deleteCreatedEvent().then(({data}) => {
           console.log(data)
       })
    }
}

const handleDelete_2 = deleteAttendingEvent => {
    const confirmDelete = window.confirm("are you sure ?");
    if(confirmDelete){
        deleteAttendingEvent().then(({data}) => {
           console.log(data)
       })
    }
}

if(!getCurrentUser ){
    navigateTo('/auth/sign-in')
    return ( <p> </p>)
 }


const { _id } = getCurrentUser;

    return (
    <Layout>
    <SEO title="sign-in" />
    <Query query ={GET_PROFILE_INFO} variables={{_id}} >
    {({data, loading , error}) => {
              console.log(data)
       if( loading ) { return <Loading /> }
       if ( error ) { return <Error error={error} />}

       const {createdEvents , userEvents , username , email , joinDate } =  data.getProfileInfo;
        return(
            <div className="profile_wrapper">
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Join Date :</strong>{" "}
              {new Date(Number(joinDate)).toDateString()}
              __
              {new Date(Number(joinDate)).getHours().toString().padStart(2, "0")}
             :{new Date(Number(joinDate)).getMinutes().toString().padStart(2, "0")}
             :{new Date(Number(joinDate)).getSeconds().toString().padStart(2, "0")}
             </p>
             <h4 style={{textDecoration:"underline"}}>{username}'s created events:</h4>
             {!createdEvents.length && <p>no events created yet</p>}
             {createdEvents.length > 0 && 
             <ul>
                {createdEvents.map(event => (
                    <li key = {event._id}>
                    <span style={{marginRight:'5px'}}>{event.heading}</span>
                    <div>
                    <button onClick = {() => navigateTo(`/event?_id=${event._id}`)}>event</button>
                    <Mutation refetchQueries={[{ query: GET_PROFILE_INFO, variables:{ _id } } , { query: GET_ALL_EVENTS}]}  mutation={DELETE_CREATED_EVENT} variables={{ _id:event._id , userId:_id}} >
                        {deleteCreatedEvent => (
                                <button onClick={() => handleDelete(deleteCreatedEvent)}>
                                 delete
                                 </button>
                            )
                        }
                    </Mutation>
                    </div>
                    </li>
                ))}
             </ul>
            }
            <h4 style={{textDecoration:"underline"}}>{username}'s attending events:</h4>
            {userEvents.length > 0 &&
             <ul>
                {userEvents.map(event => (
                    <li key = {event._id}>
                    <span style={{marginRight:'5px'}}>{event.heading}</span>
                    <div>
                    <button onClick = {() => navigateTo(`/event?_id=${event._id}`)}>event</button>
                    <Mutation refetchQueries={[{ query: GET_PROFILE_INFO, variables:{ _id } }, { query: GET_ALL_EVENTS}]}  mutation={DELETE_ATTENDING_EVENT} variables={{ userId:_id, eventId:event._id}} >
                        {deleteAttendingEvent => (
                                <button onClick={() => handleDelete_2(deleteAttendingEvent)}>
                                 delete
                                 </button>
                            )
                        }
                    </Mutation>
                    </div>
                    </li>
                ))}
             </ul>
            }

            </div>
        )}}
    </Query>

    </Layout>
    )
    };

export default WithSession(Profile);