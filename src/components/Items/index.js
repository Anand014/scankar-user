import React from "react";
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
} from "@material-ui/core";
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
  const [dense] = React.useState(false);
  const { items } = props;
  const history = useHistory();
  console.log("this is items", { items });
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
      <Grid >
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
                    secondary={
                      "Rs." +
                      item.price}
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

                          <Button className="total_items"
                          // secondary=
                            // onClick={(e) => handleAddCartItem(id)}
                >{ (props.cartItems[item._id]
                  ? `${props.cartItems[item._id]}`
                  : "")}</Button>
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
          <Fab
            style={{ color: "#ffffff", background: "#c5a51f" }}
            aria-label={fabs.label}
            className={fabs.className}
            color={fabs.color}
          >
            {/* {fabs.copyWithinicon} */}
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
            />
          </Fab>
        </div>
      </Grid>
      {/* </Grid> */}
    </div>
  );
}
