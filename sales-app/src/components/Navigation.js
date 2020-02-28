import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

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


  export class Navigation extends Component{
      render(){
      return(
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
            Project Name
          </Menu.Item>
          <Menu.Item as='a'>Home</Menu.Item>
  
          <Dropdown item simple text='Dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className='dropdown icon' />
                <span className='text'>Submenu</span>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
  
      <Container text style={{ marginTop: '7em' }}>
        <Header as='h1'>Semantic UI React Fixed Template</Header>
        <p>This is a basic fixed menu template using fixed size containers.</p>
        <p>
          A text container is used for the main container, which is useful for single column layouts.
        </p>
  
        <Image src='/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />
        <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
        <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
        <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
        <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
        <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
        <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      </Container>
  
      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
         <h2> Created By Sumit Shrestha </h2>
  
          
        </Container>
      </Segment>
    </div>
  )
  
      }}
