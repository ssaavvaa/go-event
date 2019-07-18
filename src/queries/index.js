import { gql } from 'apollo-boost';



//SUBSCRIPTION SUBSCRIPTION SUBSCRIPTION SUBSCRIPTION SUBSCRIPTION


export const NEW_MESSAGE = gql`
subscription($eventId:ID!){
  comment(eventId:$eventId){
    _id
  message
  username
  createDate
  }
}
`



//QUERIES  QUERIES  QUERIES  QUERIES  QUERIES  QUERIES 

export const GET_ALL_EVENTS = gql`
query{
    getAllEvents{
        _id
        username
        heading
        description
        country
        city
        address
        createDate
        likes
        joinPeople{
            _id
        }
    }
}
`

export const GET_EVENT = gql`
 query($_id:ID!){
    getEvent(_id:$_id){
        _id
        username
        heading
        description
        country
        city
        address
        createDate
        messages{
            message
            username
            eventId
            createDate
            _id
        }
        likes
    }
 }
`

export const GET_PROFILE_INFO = gql`
query($_id:ID!){
    getProfileInfo(_id:$_id){
        username
        email
        joinDate

        userEvents{
            _id
            heading
        }
        createdEvents{
            _id
            heading
        }

    }
}
`

export const GET_CURRENT_USER = gql`
query {
    getCurrentUser{
        _id
        username
        joinDate
    }
}
`

export const SEARCH_EVENT = gql`
 query($searchTerm:String){
    searchEvent(searchTerm:$searchTerm){
        _id
        username
        heading
        description
        country
        city
        address
        createDate
        likes
        joinPeople{
            _id
}
    }
 }
`


//MUTATION MUTATION MUTATION MUTATION MUTATION MUTATION MUTATION



export const GO_EVENT = gql`
mutation($userId:String!, $eventId:String!){
    goEvent(userId:$userId, eventId:$eventId){
            _id
}
}
`

export const POST_MESSAGE = gql`
mutation($eventId:String! , $username:String! , $message:String!){
    postMessage( eventId:$eventId , username:$username , message:$message){

            _id
    }
}
`

export const DELETE_CREATED_EVENT = gql`
mutation($_id:ID!, $userId:ID!){
    deleteCreatedEvent(_id:$_id , userId:$userId){
       _id
    }
}
`

export const DELETE_ATTENDING_EVENT = gql`
mutation($userId:ID!, $eventId:ID!){
    deleteAttendingEvent(userId:$userId , eventId:$eventId){
        _id
    }
}
`

export const ADD_EVENT = gql`
mutation( $_id:ID!
          $heading:String!,
          $description:String!,
          $country:String!,
          $city:String!,
          $address:String!,
          $username:String!){
        addEvent(_id:$_id,
                 heading:$heading,
                 description:$description,
                 country:$country ,
                 city:$city ,
                 address:$address,
                 username:$username){
        _id
        username

    }
}
`

export const SIGNUP_USER = gql`
mutation($username:String!, $email:String!, $password:String!){
    signupUser(username:$username, email:$email, password:$password){
        token
    }
}
`

export const SIGNIN_USER = gql`
mutation($username:String!, $password:String!){
    signinUser(username:$username, password:$password){
      token
    }
  }
`
