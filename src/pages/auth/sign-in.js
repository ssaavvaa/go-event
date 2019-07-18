import React , { Fragment, useState }  from "react";
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries/index';
import '../../styles/sign-up.css';
import Error from '../../components/Error';
import Loading from'../../components/loading';
import { navigateTo } from '../../Helpers/helpers';
import  withSession from '../../components/withSession';

const initialState = {
    username:'',
    email:'',
    password:'',
    passwordConfirmation:''
}


const SignIn = (props) => {

    const [state, setState] = useState(initialState)


    const handleChange = event => {
      const { name , value } = event.target;
      setState({...state, [name]:value})
    }

    const validateForm = () => {
        const { username ,  password } = state;

       const isInvalid = !username ||  !password 
       return isInvalid
    }

    const onSubmit = (event,signinUser) => {
        event.preventDefault()
        signinUser().then(async({data}) => {
        localStorage.setItem('token' , data.signinUser.token);
        await props.refetch();
        setState(initialState)
        navigateTo('/');
 })
    }

    const { username ,  password } = state;

    return(
        <Layout>
        <SEO title="sign-in" />
        <h2 className="sign_header" >sign in</h2>
        <Mutation mutation ={SIGNIN_USER} variables = {{username , password}}>
            {(signinUser , {data , loading , error}) => {
                if (loading) { return <Loading /> }
                if (error) { return <Error error={error} />}
                return (
                    <Fragment>
                    <form className="formStyles" onSubmit = {event => onSubmit(event,signinUser)}>
                    <input value = {username} 
                           onChange = {handleChange} 
                           type="text" 
                           name = "username" 
                           placeholder="username" />
                    <input value = {password} 
                           onChange = {handleChange} 
                           type="password" 
                           name = "password" 
                           placeholder="password" />
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

export default withSession(SignIn);