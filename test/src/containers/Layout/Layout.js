import React, { Component } from 'react';
import classes from './Layout.module.css';

// import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
// import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

  constructor(props){
    super(props);
    this.state = {
      
    }
  }  

  render(){
    return (
      <React.Fragment>                
        <main className={classes.Content}>
          {
            // in here we want to output the component we wrap with this Layout component
            this.props.children
          }
        </main>
      </React.Fragment>
    );
  }  
};

export default Layout;