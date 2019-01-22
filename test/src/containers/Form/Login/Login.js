import React, { Component } from 'react';
import classes from './Login.module.css';
// import axios from '../../../axios-register';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Login extends Component {
  state={
    loginForm: {            
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'یوزرنیم خود را وارد کنید'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,        
        touched: false
      },    
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'پسورد خود را وارد کنید'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,        
        touched: false
      },                                                                             
    },
    formIsValid: false,
    loading: false,
    generalError: []
  }
  
  onSubmitHandler = (e) => {
    e.preventDefault();        
    // data to send
    const formData = {};
    for (const formElementIdentifire in this.state.loginForm) {
      formData[formElementIdentifire] = this.state.loginForm[formElementIdentifire].value;
    }
    console.log('formData', formData);
    // setting a config for sending custom headers
    const config = {
      headers: {
        'content-type': 'application/json',
        // 'Authorization': 'Bearer'
      }
    }           
    // set loading to true
    this.setState({loading:true});

    axios.post('http://192.168.20.102:8000/api/user/login',formData,config)
    .then(responce=>{
      console.log('inside login form then!');        
      // set loading to false
      this.setState({loading:false});
      this.props.history.push('/Dashboard');
    })
    .catch(error=>{            
      // console.log(error.response.response);  
      console.log(error.response.data.response);
      let generalErrors = [];
      for (const key in error.response.data.response) {
        generalErrors.push(error.response.data.response[key]);
      }
      // set the state
      this.setState({generalError: generalErrors, loading:false});
    })    
  }

  // funtion that checks form validation --- rules argument is the validation object inside orderForm object in state, we use this function is changeInputHandler method
  // this function returns either true or false
  checkValidity(value, rules){
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }    
    return isValid;
  }

  changeInputHandler = (event, inputIdentifire) => {    
    const updatedContactForm = {
      ...this.state.loginForm
    }    
    const updatedFormElement = {
      ...this.state.loginForm[inputIdentifire]
    }    
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedContactForm[inputIdentifire] = updatedFormElement;    

    // check the validity of the form
    let formIsValid = true;
    for (const inputIdentifire in updatedContactForm) {      
      formIsValid = updatedContactForm[inputIdentifire].valid && formIsValid;
    }    

    // Updating the state
    this.setState({
      loginForm : updatedContactForm,
      formIsValid: formIsValid
    })

  }

  render() {  
    
    const formElementArray = [];
    for (const key in this.state.loginForm) {
      formElementArray.push({
        id: key,
        config: this.state.loginForm[key]
      })
    }

    let form = (
      <form onSubmit={this.onSubmitHandler}>
        {
          formElementArray.map(el=>{
            return <Input 
                      key={el.id}
                      elementType={el.config.elementType}
                      elementConfig={el.config.elementConfig}
                      value={el.config.value}
                      invalid={!el.config.valid}
                      shouldValidate={el.config.validation}
                      touched={el.config.touched}
                      changed={(event)=>this.changeInputHandler(event,el.id)}
                      valueType={el.id}
                      // label='label!'
                    />
          })
        } 
        <Button btnType="Success" disabled={!this.state.formIsValid}>ورود</Button>       
      </form>
    )

    if(this.state.loading){
      form = <Spinner />
    }
    
    return (
      <div className={classes.Login}>
        <h4>ورود</h4>
        {form}
        {this.state.generalError.length > 0 ? 
        this.state.generalError.map((el,i)=>(
          <p key={i}>{el}</p> 
        ))
        : null}
      </div>
    );
  }
}

export default Login;