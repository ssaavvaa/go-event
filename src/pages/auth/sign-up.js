import React , {  useState }  from "react";
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries/index';
import '../../styles/sign-up.css';
import Error from '../../components/Error';
import Loading from'../../components/loading';
import Success from '../../components/Success';

const initialState = {
    username:'',
    email:'',
    password:'',
    passwordConfirm:'',
    successSignUp:false
}


const SignUp = () => {

    const [state, setState] = useState(initialState)

    const handleChange = event => {
      const { name , value } = event.target;
      setState({...state, [name]:value})
    }

    const onSubmit = ( event , signupUser ) => {
        event.preventDefault()
        signupUser().then(({data}) => {
        localStorage.setItem('token' , data.signupUser.token);

 })
    }

const success = () => {
    setState({...initialState, successSignUp:true});
}

    const { successSignUp, username , email, password , passwordConfirm } = state;

    return(
        <Layout>
        <SEO title="sign-up" />
        <h2 className="sign_header" >sign up</h2>
        <Mutation onCompleted={success} mutation ={SIGNUP_USER} 
                  variables = {{username , email, password , passwordConfirm}}>
            {(signupUser , {data , loading , error}) => {
                if(loading) { return <Loading />}
                if(error) { return (
                    <form className="formStyles" >
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
                    <input value = {passwordConfirm} onChange = {handleChange} 
                           type="password" name = "passwordConfirm" 
                           placeholder="confirm password"/>
                    <button onClick ={event => onSubmit(event,signupUser)} className="button-primary" type ="submit">Submit</button>
                    <Error error={error} />
                </form>
                )
                    }
                return (
                    <>
                    <form className="formStyles">
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
                    <input value = {passwordConfirm} onChange = {handleChange} 
                           type="password" name = "passwordConfirm" 
                           placeholder="confirm password"/>
                    <button onClick ={event => onSubmit(event,signupUser)}  className="button-primary" type ="submit">Submit</button>
                </form>
                {successSignUp && <Success success="SUCCESS!" />}
                </>
                )
            }}
        </Mutation>
        </Layout>
    )
}

export default SignUp;