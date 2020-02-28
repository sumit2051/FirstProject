import React, {Component} from 'react';
import { Table, Form, TableCell } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react'

export class Product extends Component {

    constructor(props){
        super(props)
        this.state = {pro:[], addopen:false, editopen: false, deleteopen: false, proid: null, proname:null, proprice:null }
        this.addclose=this.addclose.bind(this);
        this.editclose=this.editclose.bind(this);
        this.deleteclose=this.deleteclose.bind(this);
     
    }
    
    addcloseConfigShow = (addcloseOnEscape) => () => {
        this.setState({ addcloseOnEscape, addopen: true })
      } 
    
    editcloseConfigShow = (editcloseOnEscape,proid,proname,proprice) => () => {
        this.setState({ editcloseOnEscape, editopen: true, proid: proid, proname:proname, proprice:proprice })
      } 
    
      deletecloseConfigShow = (deletecloseOnEscape, prodeleteid) => () => {
        this.setState({ deletecloseOnEscape, deleteopen: true, prodeleteid: prodeleteid })
      } 


    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    refreshList(){
       
        fetch('https://localhost:44357/api/Product')
        .then(response => response.json())
        .then(data => {
            this.setState({pro:data});
         } );
    }

    handleSubmitAdd(event){
        event.preventDefault();
        fetch('https://localhost:44357/api/Product',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: null,
                Name : event.target.fullname.value,
                Price : event.target.price.value
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
        fetch('https://localhost:44357/api/Product',{
            method : 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: event.target.proid.value,
                Name : event.target.fullname.value,
                Price : event.target.price.value
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
        fetch('https://localhost:44357/api/Product',{
            method : 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: event.target.prodeleteid.value,
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
        const {pro} = this.state;
        const { addopen, addcloseOnEscape } = this.state
        const { editopen, editcloseOnEscape, proid, proname, proprice } = this.state
        const { deleteopen, deletecloseOnEscape, prodeleteid } = this.state

        return(
            <div>               
                <h3> This is the Product page. </h3>

                <Button primary onClick={this.addcloseConfigShow(false, true)}>
                    Add New Product
                </Button>


                <Modal
                open={addopen}
                closeOnEscape={addcloseOnEscape}
                onClose={this.addclose}
                >
                <Modal.Header>Create New Product</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitAdd}>
                   
                    <Form.Field >
                        <label>Name</label>
                        <input 
                        name = 'fullname' 
                        placeholder='Enter Name'
                        required />
                    </Form.Field>
                    <Form.Field id = "Price">
                        <label>Price</label>
                        <input 
                        name ='price' 
                        placeholder='Enter Price'
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
                proid={proid}
                proname = {proname}
                proprice = {proprice}
                open={editopen}
                closeOnEscape={editcloseOnEscape}
                onClose={this.editclose}
                >
                <Modal.Header>Edit Address</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitEdit}>
                   
                    <Form.Field >
                        <label>Id</label>
                        <input 
                        name = 'proid' 
                        defaultValue = {proid}
                        required
                        disabled/>
                    </Form.Field>
                    <Form.Field >
                        <label>Name</label>
                        <input
                         name = 'fullname' 
                         defaultValue = {proname}
                         required />
                    </Form.Field>
                    <Form.Field id = "price">
                        <label>price</label>
                        <input 
                        name ='price'
                        defaultValue = {proprice} 
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
                prodeleteid={prodeleteid}
                open={deleteopen}
                closeOnEscape={deletecloseOnEscape}
                onClose={this.deleteclose}
                >
                <Modal.Header>Delete Address</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitDelete}>
                   
                    <Form.Field >
                        <h3>Are you sure ?</h3>
                    </Form.Field>
                    <Form.Field hidden >
                        <label>Id</label>
                        <input 
                        name = 'prodeleteid' 
                        defaultValue = {prodeleteid}
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
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
            {pro.map(po =>
                <Table.Row  key = {po.Id}>
                   
                    <Table.Cell>{po.Name}</Table.Cell>
                    <Table.Cell>{po.Price}</Table.Cell>
                    <Table.Cell>
                    <Button 
                    color = 'yellow'
                    labelPosition='left'
                    icon='edit'
                    content='EDIT'
                    onClick={this.editcloseConfigShow(false, po.Id, po.Name, po.Price)}
                      
                     />
                     </Table.Cell>
                     <TableCell>
                     <Button 
                     color = 'red'
                     labelPosition='left'
                     icon='trash'
                     content='DELETE'
                     onClick={this.deletecloseConfigShow(false, po.Id)}
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

