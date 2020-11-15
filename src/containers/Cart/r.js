 // <TableRow key={id}>
            //   <TableCell component="th" scope="row">
            //   <img alt="item" src={item.photo} style={{height:"5em", width:"8.5em", borderRadius: "10px"}}/>
            //   </TableCell>
            //   <TableCell align="center">{item.name}</TableCell>
            //   <TableCell align="center">{items[id]}</TableCell>
            //   <TableCell align="center">{"Rs. " + (item.price * items[id])}</TableCell>
            //   <TableCell align="center">{totalPrice}</TableCell>

            //   <TableCell align="center">
                {/* <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                    > */}
                      {/* <Button>
                        <EditIcon />
                    </Button>*/}
                      {/* <Button>
                        <AddIcon onClick={e => utilFuncs.handleAddCartItem(id)} />
                      </Button>
                      <Button>
                        <RemoveIcon onClick={e => utilFuncs.handleRemoveCartItem(id)} />
                      </Button>
                      <Button>
                        <CrossIcon onClick={e => utilFuncs.handleDiscardCartItem(id)} />
                      </Button>
                    </ButtonGroup> */}




                //     <Button.Group basic size="mini">
                //     <Button
                //       icon="plus"
                //       onClick={e => utilFuncs.handleAddCartItem(id)}
                //     />
                //     <Button
                //       icon="minus"
                //       onClick={e => utilFuncs.handleRemoveCartItem(id)}
                //     />
                //     <Button
                //       icon="close"
                //       onClick={e => utilFuncs.handleDiscardCartItem(id)}
                //     />
                //   </Button.Group>
                //   </TableCell>
                // </TableRow>


                // ----------------------------------------------------



                import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import * as api from '../../api/orderAPI';
// import AddIcon from "@material-ui/icons/Add";
// import RemoveIcon from "@material-ui/icons/Remove";
// import CrossIcon from "@material-ui/icons/Clear";
import './style.css'
import cookie from 'js-cookie';
import Swal from "sweetalert2"
import Navbar from '../../containers/Navbar';
import { Button, Table } from "semantic-ui-react";




import {
  // ButtonGroup,
  // Button,
} from "@material-ui/core";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function SimpleTable() {
  const classes = useStyles();
  const history = useHistory();
  const [items, setItems] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const [utilFuncs, setUtilFuncs] = useState(null);
  let totalPrice = 0;
  useEffect(() => {
    console.log("history", history)
    const { items, allItems, utilFuncs } = history.location.props ? history.location.props : {};
    setItems(items);
    setAllItems(allItems);
    setUtilFuncs(utilFuncs);
  });

  const placeOrder = () => {
    console.log("cartItems", items);
    const data = {
      "price": totalPrice,
      "isCashOnDelivery": true,
      "isPaymentReceived": false,
      "isDelivered": false,
      "noOfSeatsRequested": parseInt(cookie.get("seatNumber")),
      "userName": cookie.get("username"),
      "orders": items,
      "orderType": cookie.get("type"),
      "instruction": cookie.get("specialInstrctions"),
      "userId": cookie.get("userId")
    }
    console.log("data", data);
    api.createOrder(data).then((res) => {
      console.log("create order resp:", res);
      Swal.fire(
        'Success',
        'Order placed Successfully',
        'success',
      ).then(
        history.goBack()
      )
    })
  }

  const getItemFromAllItems = (id) => {
    return allItems.find(item => item._id === id);
  }
  console.log("This is All items", allItems);
  return (
     <div> 
       <Navbar/>
       <Table striped>
    {/* <TableContainer component={Paper}> */}
      {/* <Table className={classes.table} aria-label="simple table" striped bordered hover> */}


        {/* <TableHead>
          <TableRow>
            <TableCell align="center">Item</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Number Of Item</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Total Price</TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead> */}


 {/* s */}
 <Table.Header>
      <Table.Row>
      <Table.HeaderCell textAlign='center'>Item</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Number Of Item</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Price</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Total Price</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Price</Table.HeaderCell>

      </Table.Row>
    </Table.Header>

          {/* se */}





        {/* <TableBody> */}
        <Table.Body>
         

          {items && Object.keys(items).map((id, index) => {
             const  item = getItemFromAllItems(id);
             totalPrice += item.price * items[id];
             return  (


              <Table.Row key={id}>
              <Table.Cell textAlign='center'>
              <img alt="item" src={item.photo} style={{height:"5em", width:"8.5em", borderRadius: "10px"}}/>

              </Table.Cell >
              <Table.Cell textAlign='center'>{item.name}</Table.Cell>
              <Table.Cell textAlign='center'>{items[id]}</Table.Cell>
              <Table.Cell textAlign='center'>{"Rs. " + (item.price * items[id])}</Table.Cell>
              <Table.Cell textAlign='center'>{totalPrice}</Table.Cell>
              <Table.Cell textAlign='center'>
              <Button.Group basic size="mini">
                    <Button
                      icon="plus"
                      onClick={e => utilFuncs.handleAddCartItem(id)}
                    />
                    <Button
                      icon="minus"
                      onClick={e => utilFuncs.handleRemoveCartItem(id)}
                    />
                    <Button
                      icon="close"
                      onClick={e => utilFuncs.handleDiscardCartItem(id)}
                    />
                  </Button.Group>

              </Table.Cell>


            </Table.Row>


           

              );
            })}
          {/* </TableBody> */}
          </Table.Body>
          </Table>
        {/* </Table> */}
      {/* </TableContainer> */}
      <h4>Total Price: {totalPrice}</h4>
      <div className="order-summary-link">
        <button
          onClick={placeOrder}
          className="next-button order-summary-button">
          Submit Order
          <i className="fa fa-check fa-lg" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}