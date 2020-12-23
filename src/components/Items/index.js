import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ButtonGroup,
  // Button,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItem,
  List,
  Avatar,
  Grid,
  Box,
} from "@material-ui/core";
import cookie from "js-cookie";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FolderIcon from "@material-ui/icons/Folder";
import "./style.css";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CrossIcon from "@material-ui/icons/Clear";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import * as api from "../../api/orderAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // maxWidth: 752,
    // padding: 0,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

/*function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}*/

export default function InteractiveList(props) {
  const classes = useStyles(); //    useStyles()---> this is style function
  const [yourItems, setYourItems] = useState(0);
  const [price, setPrice] = useState(0);
  const [ClearToggleButton, setClearToggleButton] = useState(false);
  const [dense] = React.useState(false);
  const { items, data } = props;
  const history = useHistory();
  console.log("this is data", data);
  const username = cookie.get("username");

  useEffect(() => {
    if (window.location.href.split("/").length === 6) {
      let existingCartItems = cookie.get("cart-items");
      existingCartItems = JSON.parse(existingCartItems);
      let totalItemCount = 0;
      let totalPrice = 0;
      let filterCartItem = {};
      Object.keys(existingCartItems).map((id) => {
        if (existingCartItems[id] !== 0) {
          filterCartItem[id] = existingCartItems[id];
          totalItemCount += existingCartItems[id];
          let allItems = data
            ? data.find(((data) => data._id === id) || "")
            : [];
          if (allItems) {
            totalPrice += allItems.price * filterCartItem[id];
          }
        }
      });
      setPrice(totalPrice);
      setYourItems(totalItemCount);
      if (totalPrice > 0) {
        setClearToggleButton(true);
      } else {
        setClearToggleButton(false);
      }
    }
  });

  const handleClearCart = () => {
    props.setCartItems({});
    cookie.set("cart-items", {});
    setYourItems(0);
    setPrice(0);
    if (window.location.href.split("/").length === 6) {
      const dummyOrderId = window.location.href.split("/")[5];
      let foodinfo = {};
      try {
        api
          .adduserDummyOrder(dummyOrderId, foodinfo, username)
          .then((res) => {
            console.log(res, "clear cart");
            props.putRequestHandler(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      className: classes.fab,
      icon: <EditIcon />,
      label: "Edit",
    },
    // {
    //   color: 'inherit',
    //   className: clsx(classes.fab, classes.fabGreen),
    //   icon: <UpIcon />,
    //   label: 'Expand',
    // },
  ];
  return (
    <div>
      {/* <Grid container spacing={2}> */}
      <Grid>
        {/* <Typography variant="h6" className={classes.title}>
            Avatar with text and icon
          </Typography> */}
        <div>
          <List dense={dense}>
            {items.map((item) => {
              return (
                <ListItem key={item._id}>
                  <ListItemAvatar>
                    <Avatar>
                      {/* <div className="item-img" style={{backgroundImage:`url(${item.photo})`}}/> */}
                      <img
                        alt="ge-title"
                        className="image_style"
                        style={{ width: " 200px" }}
                        src={item.photo}
                        style={{ height: "3em", width: "6em" }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={"Rs." + item.price}
                    // (props.cartItems[item._id]
                    //   ? ` x${props.cartItems[item._id]}`
                    //   : "")
                    // }
                  />
                  {/* <ListItemSecondaryAction> */}
                  {/* <ButtonGroup
                  className="buttons_style"
                    size="small"
                    aria-label="small outlined button group"
                  > */}
                  {/* <Button>
                      <EditIcon />
                   </Button>*/}
                  {/* <Button className="button_style">
                      <AddIcon className="icon_style" onClick={e => props.handleAddCartItem(item._id)}/>
                    </Button>
                    <Button>
                        <RemoveIcon onClick={e => props.handleRemoveCartItem(item._id)} />
                    </Button>
                    <Button>
                        <CrossIcon onClick={e => props.handleDiscardCartItem(item._id)} />
                    </Button>
                  </ButtonGroup> */}
                  <Button.Group basic size="mini">
                    <Button
                      icon="plus"
                      onClick={(e) => props.handleAddCartItem(item._id)}
                    />

                    <Button
                      className="total_items"
                      // secondary=
                      // onClick={(e) => handleAddCartItem(id)}
                    >
                      {props.cartItems[item._id]
                        ? `${props.cartItems[item._id]}`
                        : ""}
                    </Button>
                    <Button
                      icon="minus"
                      onClick={(e) => props.handleRemoveCartItem(item._id)}
                    />
                    {/* <Button
                      icon="trash"
                      onClick={(e) => props.handleDiscardCartItem(item._id)}
                    /> */}
                  </Button.Group>
                  {/* </ListItemSecondaryAction> */}
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className="addcard_wrapper">
          <Grid
            style={{ paddingTop: "1.5rem" }}
            container
            direction="row"
            justify="center"
            alignItems="center"
            className="wrapperItems"
          >
            <Grid item>
              <h2>
                <ArrowForwardIosIcon fontSize="small" /> Your Items ({yourItems}
                )
              </h2>
            </Grid>
            <Grid
              item
              style={{
                marginLeft: "2rem",
                marginRight: "2rem",
              }}
            >
              <h2>Subtotal: ₹{price}</h2>
            </Grid>
            {ClearToggleButton ? (
              <Grid item style={{ marginRight: "2rem" }}>
                <Button onClick={handleClearCart}>Clear Cart</Button>
              </Grid>
            ) : (
              ""
            )}
            <Grid item>
              <Button
                variant="contained"
                size="medium"
                style={{
                  color: "#ffffff",
                  background: "#c5a51f",
                }}
                onClick={(e) =>
                  history.push({
                    pathname: "/cart/cart",
                    props: {
                      items: props.cartItems,
                      allItems: props.data,
                      utilFuncs: {
                        handleAddCartItem: props.handleAddCartItem,
                        handleRemoveCartItem: props.handleRemoveCartItem,
                        handleDIscardCartItem: props.handleDIscardCartItem,
                      },
                    },
                  })
                }
              >
                {" "}
                Go to Cart
              </Button>
            </Grid>
          </Grid>
          {/* <Fab
            style={{ color: "#ffffff", background: "#c5a51f" }}
            aria-label={fabs.label}
            className={fabs.className}
            color={fabs.color}
          >
            {fabs.copyWithinicon}
            <AddShoppingCartIcon
              onClick={(e) =>
                history.push({
                  pathname: "/cart/cart",
                  props: {
                    items: props.cartItems,
                    allItems: props.data,
                    utilFuncs: {
                      handleAddCartItem: props.handleAddCartItem,
                      handleRemoveCartItem: props.handleRemoveCartItem,
                      handleDIscardCartItem: props.handleDIscardCartItem,
                    },
                  },
                })
              }
            /> */}
          {/* </Fab> */}
        </div>
      </Grid>
      {/* </Grid> */}
    </div>
  );
}
