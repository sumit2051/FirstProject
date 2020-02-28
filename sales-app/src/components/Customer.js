import React, {Component} from 'react';
import { Table ,Form, TableCell } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react'

export class Customer extends Component {

    constructor(props){
        super(props)
        this.state = {cus:[], addopen:false, editopen: false, deleteopen: false, cusid: null, cusname:null, cusaddress:null }
        this.addclose=this.addclose.bind(this);
        this.editclose=this.editclose.bind(this);
        this.deleteclose=this.deleteclose.bind(this);
        
    }
    
    addcloseConfigShow = (addcloseOnEscape) => () => {
        this.setState({ addcloseOnEscape, addopen: true })
      } 
    
    editcloseConfigShow = (editcloseOnEscape,cusid,cusname,cusaddress) => () => {
        this.setState({ editcloseOnEscape, editopen: true, cusid: cusid, cusname:cusname, cusaddress:cusaddress })
      } 
    
      deletecloseConfigShow = (deletecloseOnEscape, cusdeleteid) => () => {
        this.setState({ deletecloseOnEscape, deleteopen: true, cusdeleteid: cusdeleteid })
      }    
      
    componentDidMount(){
        this.refreshList();
        
    }

    componentDidUpdate(){
        this.refreshList();
    }

    refreshList(){
             
        fetch('https://localhost:44357/api/Customer')
        .then(response => response.json())
        .then(data => {
            this.setState({cus:data});
         } );
    }  
      
    handleSubmitAdd(event){
        event.preventDefault();
        
        fetch('https://localhost:44357/api/Customer',{
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
       
        fetch('https://localhost:44357/api/Customer',{
            method : 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: event.target.cusid.value,
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
       
        fetch('https://localhost:44357/api/Customer',{
            method : 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: event.target.cusdeleteid.value,
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
        const {cus} = this.state;
        const { addopen, addcloseOnEscape } = this.state
        const { editopen, editcloseOnEscape, cusid, cusname, cusaddress } = this.state
        const { deleteopen, deletecloseOnEscape, cusdeleteid } = this.state

        
        return(
            <div>               
                <h3> This is the Customer page. </h3>

                <Button primary onClick={this.addcloseConfigShow(false, true)}>
                    Add New Customer
                </Button>

                
                
                <Modal
                open={addopen}
                closeOnEscape={addcloseOnEscape}
                onClose={this.addclose}
                >
                <Modal.Header>Create New Customer</Modal.Header>
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
                   
                </Form>
                </Modal.Content>
                </Modal>



                <Modal
                cusid={cusid}
                cusname = {cusname}
                cusaddress = {cusaddress}
                open={editopen}
                closeOnEscape={editcloseOnEscape}
                onClose={this.editclose}
                >
                <Modal.Header>Edit Customer</Modal.Header>
                <Modal.Content>               
                 
                <Form onSubmit= {this.handleSubmitEdit}>
                   
                    <Form.Field >
                        <label>Id</label>
                        <input 
                        name = 'cusid' 
                        defaultValue = {cusid}
                        required
                        disabled/>
                    </Form.Field>
                    <Form.Field >
                        <label>Name</label>
                        <input
                         name = 'fullname' 
                         defaultValue = {cusname}
                         required />
                    </Form.Field>
                    <Form.Field id = "Address">
                        <label>Address</label>
                        <input 
                        name ='address'
                        defaultValue = {cusaddress} 
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
                cusdeleteid={cusdeleteid}
                open={deleteopen}
                closeOnEscape={deletecloseOnEscape}
                onClose={this.deleteclose}
                >
                <Modal.Header>Delete Customer</Modal.Header>
                <Modal.Content>               
                 
                <Form onSubmit= {this.handleSubmitDelete}>
                   
                    <Form.Field >
                        <h3>Are you sure ?</h3>
                    </Form.Field>
                    <Form.Field hidden >
                        <label>Id</label>
                        <input 
                        name = 'cusdeleteid' 
                        defaultValue = {cusdeleteid}
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
            {cus.map(cu =>
                <Table.Row  key = {cu.Id}>
                   
                    <Table.Cell>{cu.Name}</Table.Cell>
                    <Table.Cell>{cu.Address}</Table.Cell>
                    <Table.Cell>
                        <Button 
                            color = 'yellow'
                            labelPosition='left'
                            icon='edit'
                            content='EDIT'
                            onClick={this.editcloseConfigShow(false, cu.Id, cu.Name, cu.Address)}
                        
                        />
                     </Table.Cell>
                     <TableCell>
                        <Button 
                            color = 'red'
                            labelPosition='left'
                            icon='trash'
                            content='DELETE'
                            onClick={this.deletecloseConfigShow(false, cu.Id)}
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

