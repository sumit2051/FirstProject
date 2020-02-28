import React, {Component} from 'react';
import { Table, Form, TableCell } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react'

export class Sales extends Component {
            
    constructor(props){
        super(props)
        this.state = {sales:[],pro:[],cus:[],store:[] ,addopen:false, editopen: false, deleteopen : false, salesid:null , salesproductid : null, salescustomerid:null, salesstoreid:null,salesdatesold:null, salesproductname :null, salescustomername :null, salesstorename :null }
        this.addclose=this.addclose.bind(this);
        this.editclose=this.editclose.bind(this);        
        this.deleteclose=this.deleteclose.bind(this);
        this._selectproduct = this._selectproduct.bind(this);
        this._selectcustomer = this._selectcustomer.bind(this);
        this._selectstore = this._selectstore.bind(this);     
    }

    addcloseConfigShow = (addcloseOnEscape) => () => {
        this.setState({ addcloseOnEscape, addopen: true  })
      } 
    
    editcloseConfigShow = (editcloseOnEscape,salesid, salesproductname,salescustomername,salesstorename,salesdatesold) => () => {
        this.setState({ editcloseOnEscape, editopen: true, salesid : salesid, salesproductname : salesproductname, salescustomername : salescustomername, salesstorename: salesstorename,salesdatesold:salesdatesold })
      }

    deletecloseConfigShow = (deletecloseOnEscape, salesdeleteid) => () => {
        this.setState({ deletecloseOnEscape, deleteopen: true, salesdeleteid: salesdeleteid })
      }      
        
    componentDidMount(){
        this.refreshList();

        fetch('https://localhost:44357/api/Customer')
        .then(response => response.json())
        .then(data => {
            this.setState({cus:data});
         } );

         fetch('https://localhost:44357/api/Product')
        .then(response => response.json())
        .then(data => {
            this.setState({pro:data});
         } );

         fetch('https://localhost:44357/api/Store')
        .then(response => response.json())
        .then(data => {
            this.setState({store:data});
         } );

       }

    componentDidUpdate(){
        this.refreshList();
    }

    refreshList(){
       
        fetch('https://localhost:44357/api/Sales')
        .then(response => response.json())
        .then(data => {
            this.setState({sales:data});
         } );

        
    }
    _selectproduct = (event,val) => {
         event.preventDefault();
         console.log(">>", val.value)
         this.setState({salesproductid: val.value}, () => 
         { console.log('updated state in callback fun', this.state) })
    } 
    _selectcustomer = (event,val) => {
        event.preventDefault();
        console.log(">>", val.value)
        this.setState({salescustomerid: val.value}, () => 
        { console.log('updated state in callback fun', this.state) })
   }        

   _selectstore = (event,val) => {
        event.preventDefault();
        console.log(">>", val.value)
        this.setState({salesstoreid: val.value}, () => 
        { console.log('updated state in callback fun', this.state) })
    } 

    handleSubmitAdd = (event) => {
        event.preventDefault();
        console.log(this.state.salesproductid)
        console.log(this.state.salescustomerid)
        console.log(this.state.salesstoreid)
        
        fetch('https://localhost:44357/api/Sales',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: null,
                ProductId : this.state.salesproductid,
                CustomerId : this.state.salescustomerid,
                StoreId : this.state.salesstoreid,
                DateSold : event.target.datesold.value
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

    handleSubmitEdit = (event) => {
        event.preventDefault();

        console.log(this.state.salesproductid)
        console.log(this.state.salescustomerid)
        console.log(this.state.salesstoreid)
        console.log(event.target.datesold.value)

        fetch('https://localhost:44357/api/Sales',{
            method : 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: event.target.salesid.value,
                ProductId : this.state.salesproductid,
                CustomerId : this.state.salescustomerid,
                StoreId : this.state.salesstoreid,
                DateSold : event.target.datesold.value
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
       
        fetch('https://localhost:44357/api/Sales',{
            method : 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                Id: event.target.salesdeleteid.value,
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
        const {sales,pro,cus,store} = this.state;
        const { addopen, addcloseOnEscape, salesproductid } = this.state
        const { editopen, editcloseOnEscape, salesid, salescustomerid, salesstoreid,salesdatesold } = this.state
        const { deleteopen, deletecloseOnEscape, salesdeleteid } = this.state
        const { salesproductname, salescustomername, salesstorename } = this.state
        
       
        return(
            <div>               
                <h3> This is the Sales page. </h3>

                <Button primary onClick={this.addcloseConfigShow(false, true)}>
                    Add New Sales Record
                </Button>

                <Modal
                salesid={salesid}
                salesproductid = {salesproductid}
                salesstoreid = {salesstoreid}
                salescustomerid = {salescustomerid}
                salesdatesold = {salesdatesold}
                open={addopen}
                closeOnEscape={addcloseOnEscape}
                onClose={this.addclose}
                >
                <Modal.Header>Create New Sales Record</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitAdd}>
                <Form.Field>
                <Form.Select
                        fluid
                        label="Product"
                        name = 'salesproductid'
                        options={this.state.pro.map(pr => ({                                
                            
                            key: pr.Id,
                            value: pr.Id, 
                            text: pr.Name
                         }))} 
                        placeholder="Product"
                        
                        onChange={this._selectproduct}
                    />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        fluid
                        label="Customer"
                        name = 'salescustomerid'
                        options={this.state.cus.map(cu => ({                                
                            name: cu.Id,
                            key: cu.Id,
                            value: cu.Id, 
                            text: cu.Name
                         }))} 
                        placeholder="Customer"
                        onChange={this._selectcustomer}
                    />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        fluid
                        label="Store"
                        name ='salesstoreid'
                        options={this.state.store.map(stor => ({                                
                            name: stor.Id,
                            key: stor.Id,
                            value: stor.Id, 
                            text: stor.Name
                         }))} 
                        placeholder="Gender"
                        onChange={this._selectstore}
                    />                 
                    </Form.Field>
                                  
                    <Form.Field id = "Date Sold">
                        <label>Date Sold</label>
                        <input                         
                        name ='datesold' 
                        type = 'date'
                        placeholder='Enter Date Sold'
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
                salesid={salesid}
                salesproductid = {salesproductid}
                salesstoreid = {salesstoreid}
                salescustomerid = {salescustomerid}
                salesdatesold = {salesdatesold}
                salescustomername = {salescustomername}
                salesproductname = {salesproductname}
                salesstorename = {salesstorename}
                open={editopen}
                closeOnEscape={editcloseOnEscape}
                onClose={this.editclose}
                >
                <Modal.Header>Edit Sales Record</Modal.Header>
                <Modal.Content>
                <Form onSubmit= {this.handleSubmitEdit}>
                   
                    <Form.Field >
                        <label>Id</label>
                        <input 
                        name = 'salesid' 
                        defaultValue = {salesid}
                        required
                        disabled/>
                    </Form.Field>
                    <Form.Field>
                <Form.Select
                        fluid
                        label="Product"
                        name = 'salesproductid'
                        options={this.state.pro.map(pr => ({                                
                            
                            key: pr.Id,
                            value: pr.Id, 
                            text: pr.Name
                         }))} 
                       
                        //value = {salesproductid}
                        defaultValue = {salesproductname}
                        onChange={this._selectproduct}
                    />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        fluid
                        label="Customer"
                        name = 'salescustomerid'
                        options={this.state.cus.map(cu => ({                                
                            name: cu.Id,
                            key: cu.Id,
                            value: cu.Id, 
                            text: cu.Name
                         }))} 
                         //value = {salescustomerid}
                        defaultValue = {salescustomername}
                        onChange={this._selectcustomer}
                    />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        fluid
                        label="Store"
                        name ='salesstoreid'
                        options={this.state.store.map(stor => ({                                
                            name: stor.Id,
                            key: stor.Id,
                            value: stor.Id, 
                            text: stor.Name
                         }))} 
                         //value = {salesstoreid}
                        defaultValue = {salesstorename}
                        onChange={this._selectstore}
                    />                 
                    </Form.Field>
                    <Form.Field >
                        <label>Date Sold</label>
                        <input 
                        name ='datesold'
                        type = 'date'
                        defaultValue = {salesdatesold} 
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
                salesdeleteid={salesdeleteid}
                open={deleteopen}
                closeOnEscape={deletecloseOnEscape}
                onClose={this.deleteclose}
                >
                <Modal.Header>Delete Sales Record</Modal.Header>
                <Modal.Content>               
                 
                <Form onSubmit= {this.handleSubmitDelete}>
                   
                    <Form.Field >
                        <h3>Are you sure ?</h3>
                    </Form.Field>
                    <Form.Field hidden >
                        <label>Id</label>
                        <input 
                        name = 'salesdeleteid' 
                        defaultValue = {salesdeleteid}
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
                
                    <Table.HeaderCell>Product Id</Table.HeaderCell>
                    <Table.HeaderCell>Customer Id</Table.HeaderCell>
                    <Table.HeaderCell>Store Id</Table.HeaderCell>
                    <Table.HeaderCell>Date Sold of Sale</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
            {sales.map(sale =>
                <Table.Row  key = {sale.Id}>
                  
                  <Table.Cell>{sale.ProductName}</Table.Cell>
                    <Table.Cell>{sale.CustomerName}</Table.Cell>
                    <Table.Cell>{sale.StoreName}</Table.Cell>
                    <Table.Cell>{sale.DateSold}</Table.Cell>
                    <Table.Cell>
                    <Button 
                    color = 'yellow'
                    labelPosition='left'
                    icon='edit'
                    content='EDIT'
                    onClick={this.editcloseConfigShow(false, sale.Id, sale.ProductName, sale.CustomerName, sale.StoreName, sale.DateSold)}
                      
                     />
                     </Table.Cell>
                     <TableCell>
                     <Button 
                     color = 'red'
                     labelPosition='left'
                     icon='trash'
                     content='DELETE'
                     onClick={this.deletecloseConfigShow(false, sale.Id)}
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


