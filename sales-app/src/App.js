import React from 'react';
import logo from './logo.svg';
import {NavLink} from 'react-router-dom';
import './App.css';

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

import {Home} from './components/Home'
import {Customer} from './components/Customer'
import {Product} from './components/Product'
import {Store} from './components/Store'
import {Sales} from './components/Sales'



import { Button } from 'semantic-ui-react'

import {BrowserRouter, Route, Switch} from 'react-router-dom'


function App() {
  return (
    
    <BrowserRouter>
     <div className="container">     
      <Menu fixed='top' inverted>
        <Container>
          
          <Menu.Item as={NavLink} to='/home'>Home</Menu.Item>
          <Menu.Item as={NavLink} to='/customer'>Customer</Menu.Item>
          <Menu.Item as={NavLink} to='/product'>Product</Menu.Item>
          <Menu.Item as={NavLink} to='/store'>Store</Menu.Item>
          <Menu.Item as={NavLink} to='/sales'>Sales</Menu.Item>
        </Container>
      </Menu>
  
      <Container text style={{ marginTop: '7em' }}>
        <Header as='h1'>First onboarding Project</Header>              
            <Switch>
              <Route path = '/home' component = {Home} exact />
              <Route path = '/customer' component = {Customer} />
              <Route path = '/product' component = {Product}  />
              <Route path = '/store' component = {Store}  />
              <Route path = '/sales' component = {Sales}  />
            </Switch>
      </Container>
    </div>     
    </BrowserRouter>


   
  );
}

export default App;
