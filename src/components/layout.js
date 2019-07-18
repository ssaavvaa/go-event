
import React from "react";
import PropTypes from "prop-types";

import '../styles/body.css';

import Header from "./header"
 





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
        {children}
        </main>
        <footer style={{
             background:'black',
             display:'flex',
             justifyContent:'center',
             alignItems:'center',
             fontSize:'2rem',
             borderTop:"1px solid white",
             height:'80px',
             color:'white'}}>
        <p>Footer</p>
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
