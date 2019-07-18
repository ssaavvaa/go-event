
import React from "react";

const style = {
    fontSize:'2rem',
    background:'red',
    textAlign:'center',
    padding:'.5rem 1rem',
    color:'white'
}

const Error = ({error}) => (
    <p style={style}>{error.message}</p>
);

export default Error;