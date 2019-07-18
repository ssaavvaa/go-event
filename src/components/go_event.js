import React, {Fragment}  from "react";
import { Mutation } from 'react-apollo';
import { GO_EVENT , GET_ALL_EVENTS} from '../queries/index';
import WithSession from '../components/withSession';

const GoEvent = ({ userId , refetch, refresh,  eventId }) => {



const followEvent = goEvent => {
   return  goEvent()
}

    return (
        <Mutation  refetchQueries={[{ query: GET_ALL_EVENTS }]}  mutation ={ GO_EVENT } variables = {{userId , eventId}}>
        {(goEvent , {data , loading , error}) => {
            return (
                <Fragment>
                <button onClick = {() => followEvent(goEvent)} className="go_event" >Go Event!</button>
                </Fragment>
            )
        }}
    </Mutation>

    )
}

export default WithSession(GoEvent);