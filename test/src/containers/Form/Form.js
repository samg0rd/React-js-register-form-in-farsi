import React from 'react';
import classes from './Form.module.css';
import Register from './Register/Register';
import Login from './Login/Login';

const Form = (props) =>{    
  return (
    <div className={classes.Form}>
      <Register {...props}/>
      <Login {...props}/>
    </div>
  );  
}

export default Form;