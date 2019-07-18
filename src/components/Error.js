
import React from "react";

const style = {
    fontSize:'2rem',
    background:'red',
    maxWidth:"500px",
    textAlign:'center',
    padding:'.5rem 1rem',
    margin:"1rem auto",
    color:'white'
}

const Error = ({error}) => {

    if(error.message){
        return <p style={style}>{error.message.replace('GraphQL error:','')}</p>
    }
    return <p style={style}>{error}</p>
};

export default Error;