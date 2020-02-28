import React, {Component} from 'react';
import { Table, Form, TableCell } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react'

export class Store extends Component {

    constructor(props){
        super(props)
        this.state = {store:[], addopen:false, editopen: false, deleteopen: false, storeid: null, storename:null, storeaddress:null }
        this.addclose=this.addclose.bind(this);
        this.editclose=this.editclose.bind(this);
        this.deleteclose=this.deleteclose.bind(this);
     
    }
    
    addcloseConfigShow = (addcloseOnEscape) => () => {
        this.setState({ addcloseOnEscape, addopen: true })
      } 
    
    editcloseConfigShow = (editcloseOnEscape,storeid,storename,storeaddress) => () => {
        this.setState({ editcloseOnEscape, editopen: true, storeid: storeid, storename:storename, storeaddress:storeaddress })
      } 
    
      deletecloseConfigShow = (deletecloseOnEscape, storedeleteid) => () => {
        this.setState({ deletecloseOnEscape, deleteopen: true, storedeleteid: storedeleteid })
      } 


    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    refreshList(){
        fetch('https://localhost:44357/api/Store')
        .then(response => response.json())
        .then(data => {
            this.setState({store:data});
         } );
    }
    
    handleSubmitAdd(event){
        event.preventDefault();
        fetch('https://localhost:44357/api/Store',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: null,
                Name : event.target.fullname.value,
                Address : event.target.address.value
            })
        })
        .then(res => res.json())
        .then((result)=>
        {
            alert(result);
        },
        (error) =>{
            alert('failed')
        }
        )      
        
    }

    handleSubmitEdit(event){
        event.preventDefault();
        fetch('https://localhost:44357/api/Store',{
            method : 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: event.target.storeid.value,
                Name : event.target.fullname.value,
                Address : event.target.address.value
            })
        })
        .then(res => res.json())
        .then((result)=>
        {
            alert(result);
        },
        (error) =>{
            alert('failed')
        }
        )
       
    }

    handleSubmitDelete(event){  
        event.preventDefault();
        fetch('https://localhost:44357/api/Store',{
            method : 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: event.target.storedeleteid.value,
          })
        })
        .then(res => res.json())
        .then((result)=>
        {
            alert(result);
        },
        (error) =>{
            alert('failed')
        }
        )
        
    }    

    addclose = () => this.setState({ addopen: false })
    editclose = () => this.setState({ editopen: false })
    deleteclose = () => this.setState({ deleteopen: false })

    render(){
        const {store} = this.state;
        const { addopen, addcloseOnEscape } = this.state
        const { editopen, editcloseOnEscape, storeid, storename, storeaddress } = this.state
        const { deleteopen, deletecloseOnEscape, storedeleteid } = this.state

        return(
            <div>               
                <h3> This is the Store page. </h3>

                <Button primary onClick={this.addcloseConfigShow(false, true)}>
                    Add New Store
                </Button>


                <Modal
                open={addopen}
                closeOnEscape={addcloseOnEscape}
                onClose={this.addclose}
                >
                <Modal.Header>Create New Store</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitAdd}>
                   
                    <Form.Field >
                        <label>Name</label>
                        <input 
                        name = 'fullname' 
                        placeholder='Enter Name'
                        required />
                    </Form.Field>
                    <Form.Field id = "Address">
                        <label>Address</label>
                        <input 
                        name ='address' 
                        placeholder='Enter Address'
                        required />
                    </Form.Field>
                    
                    <Form.Group position='right'>
                    <Form.Field>
                        <Button onClick={this.addclose} secondary >
                        Cancel
                        </Button>
                    </Form.Field>
                    <Form.Field>
                        <Button type="submit"
                        positive
                        labelPosition='right'
                        icon='checkmark'
                        content='Create'
                        />
                    </Form.Field>
                    </Form.Group>
                </Form>
                </Modal.Content>
                </Modal>



                <Modal
                storeid={storeid}
                storename = {storename}
                storeaddress = {storeaddress}
                open={editopen}
                closeOnEscape={editcloseOnEscape}
                onClose={this.editclose}
                >
                <Modal.Header>Edit Store</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitEdit}>
                   
                    <Form.Field >
                        <label>Id</label>
                        <input 
                        name = 'storeid' 
                        defaultValue = {storeid}
                        required
                        disabled/>
                    </Form.Field>
                    <Form.Field >
                        <label>Name</label>
                        <input
                         name = 'fullname' 
                         defaultValue = {storename}
                         required />
                    </Form.Field>
                    <Form.Field id = "Address">
                        <label>Address</label>
                        <input 
                        name ='address'
                        defaultValue = {storeaddress} 
                        required/>
                    </Form.Field>
                    <Form.Field>
                        <Button onClick={this.editclose} secondary >
                        Cancel
                        </Button>
                    </Form.Field>
                    <Form.Field>
                        <Button type="submit"
                        positive
                        labelPosition='right'
                        icon='checkmark'
                        content='Create'
                        />
                    </Form.Field>
                   
                </Form>
                </Modal.Content>
                </Modal>


                <Modal
                storedeleteid={storedeleteid}
                open={deleteopen}
                closeOnEscape={deletecloseOnEscape}
                onClose={this.deleteclose}
                >
                <Modal.Header>Delete Store</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitDelete}>
                   
                    <Form.Field >
                        <h3>Are you sure ?</h3>
                    </Form.Field>
                    <Form.Field hidden >
                        <label>Id</label>
                        <input 
                        name = 'storedeleteid' 
                        defaultValue = {storedeleteid}
                        disabled/>
                    </Form.Field>
                    <Form.Field>
                        <Button onClick={this.deleteclose} secondary >
                        Cancel
                        </Button>
                    </Form.Field>
                    <Form.Field>
                        <Button type="submit"
                        color = 'red'
                        labelPosition='right'
                        icon='delete'
                        content='Delete'
                        />
                    </Form.Field>
                   
                </Form>
                </Modal.Content>
                </Modal>

                                    

            <Table celled>
            <Table.Header>
                <Table.Row>
                
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
            {store.map(sto =>
                <Table.Row  key = {sto.Id}>
                   
                    <Table.Cell>{sto.Name}</Table.Cell>
                    <Table.Cell>{sto.Address}</Table.Cell>
                    <Table.Cell>
                    <Button 
                    color = 'yellow'
                    labelPosition='left'
                    icon='edit'
                    content='EDIT'
                    onClick={this.editcloseConfigShow(false, sto.Id, sto.Name, sto.Address)}
                      
                     />
                     </Table.Cell>
                     <TableCell>
                     <Button 
                     color = 'red'
                     labelPosition='left'
                     icon='trash'
                     content='DELETE'
                     onClick={this.deletecloseConfigShow(false, sto.Id)}
                       />
                     </TableCell>
                </Table.Row>
            )}
            </Table.Body>          
         </Table>    

          </div> 
       )
    }
}

