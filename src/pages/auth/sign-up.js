import React , { Fragment, useState }  from "react";
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries/index';
import '../../styles/sign-up.css';
import Error from '../../components/Error';
import Loading from'../../components/loading';
import { navigateTo } from '../../Helpers/helpers';

const initialState = {
    username:'',
    email:'',
    password:'',
    passwordConfirmation:''
}


const SignUp = () => {

    const [state, setState] = useState(initialState)

    const handleChange = event => {
      const { name , value } = event.target;
      setState({...state, [name]:value})
    }

    const validateForm = () => {
        const { username , email, password , passwordConfirmation } = state;

       const isInvalid = !username || !email || !password || password !== passwordConfirmation;
       return isInvalid
    }

    const onSubmit = (event,signupUser) => {
        event.preventDefault()
        signupUser().then(({data}) => {
        localStorage.setItem('token' , data.signupUser.token);
        setState(initialState);
        navigateTo('/');
 })
    }

    const { username , email, password , passwordConfirmation } = state;

    return(
        <Layout>
        <SEO title="sign-up" />
        <h2 className="sign_header" >sign up</h2>
        <Mutation mutation ={SIGNUP_USER} variables = {{username , email, password}}>
            {(signupUser , {data , loading , error}) => {
                if(loading) { return <Loading />}
                if(error) { return <Error error={error} />}
                return (
                    <Fragment>
                    <form className="formStyles" onSubmit = {event => onSubmit(event,signupUser)}>
                    <input value = {username} 
                           onChange = {handleChange} 
                           type="text" 
                           name = "username" 
                           placeholder="username" />
                    <input value = {email} 
                           onChange = {handleChange} 
                           type="email" 
                           name = "email" 
                           placeholder="email" />
                    <input value = {password} 
                           onChange = {handleChange} 
                           type="password" 
                           name = "password" 
                           placeholder="password" />
                    <input value = {passwordConfirmation} onChange = {handleChange} 
                           type="password" name = "passwordConfirmation" 
                           placeholder="confirm password"/>
                    <button disabled={loading || validateForm()} className="button-primary" type ="submit">Submit</button>
                    {error && <Error error ={error} />}
                </form>
                </Fragment>
                )
            }}
        </Mutation>
        </Layout>
    )
}

export default SignUp;