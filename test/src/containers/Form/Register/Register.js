import React, { Component } from 'react';
import classes from './Register.module.css';
// import axios from '../../../axios-register';
import axios from 'axios';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Register extends Component {
  state={
    registerForm: {      
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'نام خود را وارد کنید'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,        
        touched: false
      },
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
          type: 'password',
          placeholder: 'پسورد خود را وارد کنید'
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,        
        touched: false
      },
      passwordConfirmation: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'پسورد خود را تکرار کنید'
        },
        value: "",
        validation: {
          required: true,
          isPassTheSame: true
        },
        valid: false,        
        touched: false
      },                                  
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: "ایمیل خود را وارد کنید"
        },
        value: "",
        validation: {
          required: true,
          isEmailValid: true    
        },
        valid: false,
        touched: false
      },
      emailConfirmation: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: "ایمیل خود را تکرار کنید"
        },
        value: "",
        validation: {
          required: true,    
          isEmailTheSame: true      
        },
        valid: false,
        touched: false
      },
      mobile: {
        elementType: 'input',
        elementConfig: {
          type: 'tel',
          placeholder: "شماره موبایل خود را وارد کنید"
        },
        value: "",
        validation: {
          required: true,  
          isMobileValid: true   
        },
        valid: false,
        touched: false
      },    
      nationalCode : {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'کد ملی خود را وارد کنید'
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      ip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'خود را وارد کنید! IP'
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      referralCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'کد ارسال شده را وارد کنید'
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      }
    },
    formIsValid: false,
    loading: false,
    generalError: ''
  }  

  onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('register submitted');    
    
    // data to send
    const formData = {};
    for (const formElementIdentifire in this.state.registerForm) {
      formData[formElementIdentifire] = this.state.registerForm[formElementIdentifire].value;
    }

    console.log('formData', formData);
    

    // setting a config for sending custom headers
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer'
      }
    }
    
    // set loading to true
    this.setState({loading:true});

    // sending the data 
    axios.post('http://192.168.20.102:8000/api/user/register',formData,config)
      .then(responce=>{
        console.log('responce : ',responce);     
        // set loading to false
        this.setState({loading:false});   
        this.props.history.push('/');
      })
      .catch(error=>{
        // set loading to false
        // this.setState({loading:false});   
        // console.log(error.response.data.response);
        // for (const key in error.response.data.response) {
        //   this.setState({generalError: error.response.data.response[key]});
        // }     
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
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.isPassTheSame){      
      isValid = value === this.state.registerForm.password.value && isValid;
    }
    if(rules.isEmailValid){
      var emailValidation = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      isValid = emailValidation.test(value) && isValid;
    }
    if(rules.isEmailTheSame){
      isValid = value === this.state.registerForm.email.value && isValid;
    }
    if(rules.isMobileValid){
      var mobileNumberValidation = /^(\+98|0)\d{10}$/;
      isValid = mobileNumberValidation.test(value) && isValid;
    }
    // if(rules.maxLength){
    //   isValid = value.length <= rules.maxLength && isValid;
    // }
    return isValid;
  }
  
  changeInputHandler = (event, inputIdentifire) => {
    // console.log(event.target.value,inputIdentifire);
    const updatedContactForm = {
      ...this.state.registerForm
    }
    // console.log('updatedContactForm ',updatedContactForm);
    const updatedFormElement = {
      ...this.state.registerForm[inputIdentifire]
    }
    // console.log('updatedFormElement ',updatedFormElement);
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedContactForm[inputIdentifire] = updatedFormElement;

    // console.log(updatedFormElement);

    // check the validity of the form
    let formIsValid = true;
    for (const inputIdentifire in updatedContactForm) {
      // we add this && formIsValid becuz it might only get the last valid property value and that might be true and not false, so in this way we can override that problem
      formIsValid = updatedContactForm[inputIdentifire].valid && formIsValid;
    }    

    // Updating the state
    this.setState({
      registerForm : updatedContactForm,
      formIsValid: formIsValid
    })

  }  

  render() {  
    
    const formElementArray = [];
    for (const key in this.state.registerForm) {
      formElementArray.push({
        id: key,
        config: this.state.registerForm[key]
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
        <Button btnType="Success" disabled={!this.state.formIsValid}>ثبت نام</Button>       
      </form>
    )

    if(this.state.loading){
      form = <Spinner />
    }

    return (
      <div className={classes.Register}>
        <h4>ثبت نام</h4>
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

export default Register;