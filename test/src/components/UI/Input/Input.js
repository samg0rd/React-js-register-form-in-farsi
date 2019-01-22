import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  // check if an input has invalid value
  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.invalid);
  }

  // whatever the inputType props value be, the type of input we need will be rendered by the switch statement below
  // we can also add more cases like dropdown or whatever input we might wanna have too ;)
  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>     
      break;       
    default:
      inputElement = <input {...props.elementConfig} value={props.value} onchange={props.changed}/>
      break;
  }

  let errorMessage = null;
  
  if(props.touched && props.invalid){        

    switch (props.valueType) {
      case 'name':
        errorMessage = <p className={classes.ValidationError}>لطفا نام خود را وارد کنید</p>;
        break;
      case 'username':
        errorMessage = <p className={classes.ValidationError}>لطفا یوزرنیم مورد نظر خود را وارد کنید</p>;
        break;
      case 'password':
        errorMessage = <p className={classes.ValidationError}>پسورد باید حداقل ۶ کاراکتر باشد</p>;
        break;
      case 'passwordConfirmation':
        errorMessage = <p className={classes.ValidationError}>عدم مطابقت پسورد وارد شده</p>;
        break;
      case 'email':
        errorMessage = <p className={classes.ValidationError}>ایمیل وارد شده صحیح نمی باشد</p>;
        break;
      case 'emailConfirmation':
        errorMessage = <p className={classes.ValidationError}>عدم مطابقت ایمیل وارد شده</p>;
        break;
      case 'mobile':
        errorMessage = <p className={classes.ValidationError}>شماره موبایل وارد شده صحیح نمی باشد</p>;
        break;
      case 'nationalCode':
        errorMessage  = <p className={classes.ValidationError}>لطفا کد ملی خود را وارد کنید</p>;
        break;
      case 'ip':
        errorMessage  = <p className={classes.ValidationError}>لطفا ip خود را وارد کنید</p>;
        break;
      case 'referralCode':
        errorMessage = <p className={classes.ValidationError}>کد ارسال شده را وارد نمایید</p>
        break;
      default:
        break;
    }
  }

  return (    
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default Input;