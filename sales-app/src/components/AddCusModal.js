import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

export class AddCusModal extends Component {

  constructor(props){
    super(props);
    this.state={
      open:false
    }
  }



  close = () => this.setState({ open: false })

  componentDidMount(){
    console.log(this.props,'rop');
    alert('ok')
  }

  render() {
    const { open } = this.state

    return (
      <div>

        <Modal
          open={open}

          onClose={this.close}
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account sundar</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.close}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}