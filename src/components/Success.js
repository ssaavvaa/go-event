import React from "react";

const style = {
    fontSize:'2rem',
    background:'rgb(60, 60, 156)',
    maxWidth:"500px",
    textAlign:'center',
    padding:'.5rem 1rem',
    margin:"1rem auto",
    color:'white'
}

const Success = ({success}) => {

    return <p style={style}>{success}</p>
};

export default Success;