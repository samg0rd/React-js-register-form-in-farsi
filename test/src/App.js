import React, { Component } from 'react';
import Form from './containers/Form/Form';
import Dashboard from './containers/Dashboard/Dashboard';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Layout from './containers/Layout/Layout';

class App extends Component {
  render(props) {
    return (
      <div className="App">
        <Layout>    
          <Switch>
            <Route path="/" exact render={(props)=>{
              return <Form {...props}/>
            }} />
            <Route path="/Dashboard" component={Dashboard}/>          
          </Switch>      
        </Layout>
      </div>
    );
  }
}

export default App;
