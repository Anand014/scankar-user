import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import * as api from "../../api/orderAPI";
import "./style.css";
import cookie from "js-cookie";
import Swal from "sweetalert2";
import Navbar from "../../containers/Navbar";
import { Button, Form, TextArea, List } from "semantic-ui-react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CrossIcon from "@material-ui/icons/Clear";
// import {
//   ButtonGroup,
//   // Button,
// } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function SimpleTable() {
  const classes = useStyles();
  const history = useHistory();
  const [items, setItems] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const [special, setSpecial] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [checkDisable, setDisable] = useState(false);
  let totalPrice = 0;

  const setCartItemsInCookies = () => {
    const existingCartItems = cookie.get("cart-items");
    if (existingCartItems) {
      setCartItems(JSON.parse(existingCartItems));
      return;
    }
    cookie.set("cart-items", {});
    setCartItems(JSON.parse(cookie.get("cart-items")));
  };

  useEffect(() => {
    const { allItems } = history.location.props ? history.location.props : {};
    setAllItems(allItems);
    setCartItemsInCookies();
  }, []);

  const specialIns = (e) => {
    console.log("event ki value:", e.target.value);
    setSpecial(e.target.value);
  };

  const handleAddCartItem = (itemId) => {
    const newCartItems = JSON.parse(cookie.get("cart-items"));
    console.log("Cart items", newCartItems);
    if (newCartItems[itemId]) {
      newCartItems[itemId] = ++newCartItems[itemId];
      cookie.set("cart-items", newCartItems);
      setCartItems(newCartItems);
      return;
    }
    newCartItems[itemId] = 1;
    cookie.set("cart-items", newCartItems);
    setCartItems(newCartItems);
  };

  const handleRemoveCartItem = (itemId) => {
    const newCartItems = JSON.parse(cookie.get("cart-items"));
    // console.log("this is item id", itemId);
    // console.log("Cart items", newCartItems);
    if (newCartItems[itemId]) {
      // console.log("newCartItems[itemId]::::", newCartItems[itemId])
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] = --newCartItems[itemId];
        cookie.set("cart-items", newCartItems);
        setCartItems(newCartItems);
        return;
      } else {
        console.log("Else case::",newCartItems[itemId])
        delete newCartItems[itemId];
        cookie.set("cart-items", newCartItems);
        setCartItems(newCartItems);
      }
    }
  };

  const handleDiscardCartItem = (itemId) => {
    const newCartItems = JSON.parse(cookie.get("cart-items"));
    console.log("Cart items", newCartItems);
    if (newCartItems[itemId]) {
      delete newCartItems[itemId];
      cookie.set("cart-items", newCartItems);
      setCartItems(newCartItems);
      return;
    }
  };

  const placeOrder = () => {
    setDisable(true);
    console.log("cartItems", items);
    const data = {
      price: totalPrice + (totalPrice * 5) / 100,
      isCashOnDelivery: true,
      isPaymentReceived: false,
      isDelivered: false,
      noOfSeatsRequested: parseInt(cookie.get("seatNumber")),
      userName: cookie.get("username"),
      orders: cartItems,
      orderType: cookie.get("type"),
      instruction: special,
      userId: cookie.get("userId"),
    };
    console.log("data", data);
    api.createOrder(data).then((res) => {
      console.log("create order resp:", res);
      Swal.fire("Success", "Order placed Successfully", "success").then(() => {
        cookie.set("cart-items", {});
        history.push("/exit/exit");
      });
    });
  };

  // console.log("THIS IS THE VALUE OF ALL IN CART", allItems);
  const getItemFromAllItems = (id) => {
    return allItems ? allItems.find(((item) => item._id === id) || {}) : history.goBack();
  };

  // console.log("This is All items", allItems);
  return (
    <>
      <Navbar active="Order Summary" />
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Item Image</TableCell>
                {/* <TableCell align="center">Price</TableCell> */}

                {/* <TableCell align="center">Name</TableCell> */}
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Modify</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(cartItems).length !== 0 &&
                Object.keys(cartItems).map((id, index) => {
                  const item = getItemFromAllItems(id) ? getItemFromAllItems(id) : [] ;
                  totalPrice += item.price * cartItems[id];
                  return (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        <img
                          alt="item"
                          src={item.photo}
                          style={{
                            height: "4em",
                            width: "7em",
                            borderRadius: "6px",
                          }}
                        />
                        <br />
                        <p className="item_name">{item.name}</p>
                      </TableCell>
                      {/* <TableCell align="center">{item.name}</TableCell> */}
                      {/* <TableCell align="center">{"Rs. " + (item.price * cartItems[id])}</TableCell> */}

                      <TableCell align="center">
                        {/* {cartItems[id]} */}
                        {"Rs." +
                          item.price +
                          (cartItems[item._id]
                            ? ` x ${cartItems[item._id]}`
                            : "")}
                      </TableCell>
                      {/* <TableCell align="center">{"Rs. " + (item.price * cartItems[id])}</TableCell> */}
                      <TableCell align="center">
                        {/* <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      > */}
                        {/* <Button>
                        <EditIcon />
                    </Button>*/}
                        {/* <Button onClick={e => handleAddCartItem(id)}>
                          <AddIcon />
                        </Button>
                        <Button onClick={e => handleRemoveCartItem(id)}>
                          <RemoveIcon />
                        </Button>
                        <Button onClick={e => handleDiscardCartItem(id)}>
                          <CrossIcon />
                        </Button> */}

                        <Button.Group basic size="mini">
                          <Button
                            icon="plus"
                            onClick={(e) => handleAddCartItem(id)}
                          />

                          <Button
                            icon="minus"
                            onClick={(e) => handleRemoveCartItem(id)}
                          />
                          <Button
                            icon="trash"
                            onClick={(e) => handleDiscardCartItem(id)}
                          />
                        </Button.Group>
                        {/* </ButtonGroup> */}
                      </TableCell>
                    </TableRow>
                    //
                  );
                })}
            </TableBody>

            {/* <TableRow>
              <TableCell align="left" colSpan={2}>
                <h4>Item Price</h4>
              </TableCell>

              <TableCell align="right">
                <h4>₹ value</h4>
              </TableCell>
            </TableRow> */}

            <TableRow>
              <TableCell align="left" colSpan={2}>
                <h4>Item Total</h4>
              </TableCell>

              <TableCell align="right">
                <h4>₹ {totalPrice}</h4>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" colSpan={2}>
                CGST
              </TableCell>

              <TableCell align="right">₹ {(totalPrice * 2.5) / 100}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" colSpan={2}>
                SGST
              </TableCell>

              <TableCell align="right">₹ {(totalPrice * 2.5) / 100}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" colSpan={2}>
                <h4>To Pay</h4>
              </TableCell>

              <TableCell align="right">
                <h4>₹ {totalPrice + (totalPrice * 5) / 100}</h4>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        <Form style={{ padding: "1em" }}>
          <TextArea
            rows={2}
            placeholder="Special Instructions..."
            onChange={(e) => specialIns(e)}
            value={special}
          />
        </Form>
        {/* <div className="totalprice_gst">
    <h4>Total Price before GST: Rs. {totalPrice}</h4>
    <h4>Total Price after 5% GST Rs. {totalPrice + (totalPrice * 5 / 100)}</h4>

    </div> */}
        <div className="order-summary-link">
          <center>
            <Button
              variant="contained"
              color="secondary"
              onClick={placeOrder}
              className="next-button order-summary-button "
              disabled={checkDisable}
            >
              Submit Order
              <i className="fa fa-check fa-lg" aria-hidden="true"></i>
            </Button>
          </center>
        </div>
      </div>
    </>
  );
}
