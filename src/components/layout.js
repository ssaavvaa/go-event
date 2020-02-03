
import React from "react";
import PropTypes from "prop-types";
import '../styles/body.css';
import Header from "./header"
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

const Layout = ({ children }) => {

  return (
    <>
      <Header />
        <main style={{
                margin: `0 auto`,
                maxWidth: 1200,
                padding: `0px 1.0875rem`,
                minHeight:'100vh'
        }}>
          <ScrollUpButton />
        {children}
        </main>
        <footer style={{
             background:'black',
             display:'flex',
             justifyContent:'center',
             alignItems:'center',
             fontSize:'2rem',
             flexDirection:"column",
             borderTop:"1px solid white",
             color:'white'}}>
  
        <div style={{background:"rgb(250, 246, 246)",
                     maxWidth:"100%",
                     color:"black",
                     textAlign:"center",
                     padding:"10px 30px",
                     borderRadius:"5px",
                     borderTop:"10px solid black"
                     }}>
                       made by:  <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/uajumpers" style={{cursor:"pointer", color:"darkblue",textDecoration:"underline"}}>Anton Savytskyi</a>
                       </div>
                       <p style={{
                         color:"rgb(250, 246, 246)",
                         margin:0,
                         padding:5
                       }}>2019</p>
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
