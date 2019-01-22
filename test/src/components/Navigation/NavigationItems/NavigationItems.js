import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>nav 2</NavigationItem> 
      <NavigationItem link="/orders">nav 1</NavigationItem> 
    </ul>
  );
};

export default NavigationItems;