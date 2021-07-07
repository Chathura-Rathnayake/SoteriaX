import React from "react";
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };
 
  export default function Footer() {
  return (
    <List style={flexContainer}>
      <ListItem
        primaryText="foo1"
        secondaryText="bar1"/>
      <ListItem
        primaryText="foo2"
        secondaryText="bar2"/>
    </List>
  );
  }