import React, { Component } from 'react';
import classes from './Dashboard.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import Layout from '../../containers/Layout/Layout';

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <Toolbar />
        <div className={classes.Dashboard}>
          <h1>this is dashboard</h1>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;