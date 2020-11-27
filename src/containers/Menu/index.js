import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Grid,
  Button,
  Input,
  LinearProgress,
  Chip,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import RefreshIcon from "@material-ui/icons/Refresh";
import * as api from "../../api/orderAPI";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import cookie from "js-cookie";
import _ from "lodash";
import "./style.css";

import Items from "../../components/Items";
import { ControlLabel } from "rsuite";
import { Form } from "semantic-ui-react";
import Swal from "sweetalert2";
import Axios from "axios";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}
// const useStyles = makeStyles((theme) => ({
// root: {
//   padding: 0,
//   flexGrow: 1,
//   width: '100%',
//   backgroundColor: theme.palette.background.paper,
// },
//   exampleWrapper: {
//     position: 'relative',
//     marginTop: theme.spacing(3),
//     height: 380,
//   },
// }));
export default function Menu(props) {
  // const classes = useStyles();
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState({});
  const [cartItems, setCartItems] = useState({});
  const history = useHistory();
  const [clicked, clickedCategory] = useState(0);
  const [clickedCat, setclickedCategory] = useState({});
  const [user, setUser] = useState(cookie.get("userId"));
  const [data, setData] = useState(null);
  const [lockByToggle, setLockByToggle] = useState(false);
  const [LockByName, setLockByName] = useState("");
  const [dummyOrder, setDummyOrder] = useState({});
  const [putToggle, setPutToggle] = useState(false);
  const [NoDummyOrder, setNoDummyOrder] = useState(false);

  const username = cookie.get("username");

  useEffect(() => {
    console.log("window.location", window.location.href.split("/"));
    // try {
    //   Axios.get(
    //     `http://localhost:5000/api/v1/ordershare/5fbc27d3b269175710d7f126`
    //   )
    //     .then((res) => {
    //       console.log(res.data.data.product.foodinfo, "this is dummyfoodinfo");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    if (window.location.href.split("/").length === 6) {
      const id = window.location.href.split("/")[5];
      refreshDummyOrder(id);
    }

    if (window.location.href.split("/").length !== 6) {
      setNoDummyOrder(true);
    }

    const { categories, items, value, data, clicked } = history.location.props
      ? history.location.props
      : {};

    if (items) {
      setCategories(categories);
      setItems(items);
      setValue(value);
      setData(data);
      // setCartItemsInCookies();
      return;
    }

    let temp = [];

    api
      .getMenu(user)
      .then((res) => {
        res.data.user.menu.map((res) => {
          temp.push(res.category);
        });

        let tempcategories = temp.filter((v, i, a) => a.indexOf(v) === i);

        const newItems = {};
        res.data.user.menu.forEach((item, index) => {
          const { category, ...restData } = item;
          if (restData.status !== "Available") {
            return;
          }
          if (newItems[category]) {
            newItems[category].push({ ...restData });
          } else {
            newItems[category] = [{ ...restData }];
          }
        });
        // console.log("newItemsF:", categories);
        setItems(newItems);

        setData(res.data.user.menu);
        setCategories(tempcategories);
        // setCartItemsInCookies();
      })
      .catch((err) => {
        debugger;
        console.log(err, "err on login");
        window.location.assign(window.location.href.replace("/menu", "/login"));
      });
  }, []);

  const refreshDummyOrder = (id) => {
    api.getDummyOrder(id).then((res) => {
      setDummyOrder(res.data.product);
      setCartItems({ ...res.data.product.foodinfo[0] });

      setCartItemsInCookies({ ...res.data.product.foodinfo[0] });

      if (username.toUpperCase() === res.data.product.lockBy.toUpperCase()) {
        setLockByName(res.data.product.lockBy);
        setLockByToggle(false);
      } else {
        setLockByName(res.data.product.lockBy);
        setLockByToggle(true);
      }
      setPutToggle(false);
    });
  };

  const putRequestHandler = (res) => {
    setCartItems({ ...res.foodinfo[0] });
    setDummyOrder({ ...res });
    setCartItemsInCookies({ ...res.foodinfo[0] });
    setPutToggle(false);
  };

  const handleChange = (event, newValue) => {
    // const clicked = cookie.get("clicked")
    // console.log("handlechange", newValue, user, clicked, );
    // if (clicked) {
    //   getCategoryItems(user, clicked)
    // }
    // else {
    getCategoryItems(user, categories[newValue]);

    // }
    setValue(newValue);
  };

  const getCategoryItems = async (Id, value) => {
    console.log("Id:", Id, "Clicked:", value);
    await api.categoryItem(Id, value).then((res) => {
      console.log("clicked", res.data.cat, "items", value);
      // setItems(res.data.cat)
      // let arr = []
      // arr = items
      console.log("array", items);
      setclickedCategory((items[value] = res.data.cat));
    });
  };

  const handleAddCartItem = (itemId) => {
    /* const newCartItems = { ...cartItems };
    if (newCartItems[itemId]) {
      newCartItems[itemId] = ++newCartItems[itemId];
      setCartItems(newCartItems);
      return;
    }

    newCartItems[itemId] = 1;
    setCartItems(newCartItems);*/
    const newCartItems = cartItems;

    if (newCartItems[itemId]) {
      newCartItems[itemId] = ++newCartItems[itemId];
      cookie.set("cart-items", newCartItems);
      console.log(newCartItems, "newcartItems");
    } else {
      newCartItems[itemId] = 1;
      cookie.set("cart-items", newCartItems);
      console.log(newCartItems, "newcartItems outside");
      if (window.location.href.split("/").length === 5) {
        let hotelId = window.location.href.split("/")[4];
        hotelId = hotelId.replace("take", "");
        hotelId = hotelId.replace("dinein", "");

        api
          .createDummyOrder({
            username: username,
            foodinfo: newCartItems,
            HotelId: hotelId,
          })
          .then((res) => {
            window.location.assign(`${window.location.href}/${res._id}`);
          });
      }
    }
    try {
      setPutToggle(true);
      api
        .adduserDummyOrder(dummyOrder._id, newCartItems)
        .then((res) => {
          putRequestHandler(res);
        })
        .catch((err) => {
          setPutToggle(true);
          console.log(err, "error report");
          Swal.fire({
            title: "Network Error",
            icon: "error",
          }).then(() => {
            setPutToggle(false);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCartItem = (itemId) => {
    /*  const newCartItems = { ...cartItems };

    if (newCartItems[itemId]) {
      if (newCartItems[itemId] > 1) {
        newCartItems[items] = --newCartItems[itemId];
        setCartItems(newCartItems);
        return;
      }
      delete --newCartItems[itemId];
      setCartItems(newCartItems);
    }*/
    const newCartItems = JSON.parse(cookie.get("cart-items"));
    if (newCartItems[itemId]) {
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] = --newCartItems[itemId];
      } else {
        delete --newCartItems[itemId];
      }
    }
    try {
      setPutToggle(true);
      api
        .adduserDummyOrder(dummyOrder._id, newCartItems)
        .then((res) => {
          putRequestHandler(res);
        })
        .catch((err) => {
          setPutToggle(true);
          console.log(err, "error report");
          Swal.fire({
            title: "Network Error",
            icon: "error",
          }).then(() => {
            setPutToggle(false);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscardCartItem = (itemId) => {
    /*  const newCartItems = { ...cartItems };
    if (newCartItems[itemId]) {
      delete newCartItems[itemId];
      setCartItems(newCartItems);
      return;
    }*/

    const newCartItems = JSON.parse(cookie.get("cart-items"));
    console.log("Cart items", newCartItems);
    if (newCartItems[itemId]) {
      delete newCartItems[itemId];
    }
    try {
      setPutToggle(true);
      api
        .adduserDummyOrder(dummyOrder._id, newCartItems)
        .then((res) => {
          putRequestHandler(res);
        })
        .catch((err) => {
          console.log(err, "error report");
          Swal.fire({
            title: "Network Error",
            icon: "error",
          }).then(() => {
            setPutToggle(false);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const setCartItemsInCookies = (data) => {
    if (Object.keys(data).length > 0) {
      cookie.set("cart-items", JSON.stringify({ ...data }));
      return;
    }
  };

  const handleGetItems = async (category, index) => {
    try {
      const id = items[category]._id;
      const items = await api.getItems(id);
      setItems({ ...items, [category]: items });
    } catch (err) {
      console.log(err);
    }
  };
  const handleLockBy = () => {
    if (LockByName.split("").length != 0) {
      if (username.toUpperCase() === LockByName.toUpperCase()) {
        Swal.fire({
          title: "Enter Different Name",
          icon: "info",
        }).then(() => {});
      } else {
        if (window.location.href.split("/").length === 6) {
          const id = window.location.href.split("/")[5];
          let hotelId = window.location.href.split("/")[4];
          hotelId = hotelId.replace("take", "");
          hotelId = hotelId.replace("dinein", "");
          api
            .changeLockByName(id, LockByName, hotelId)
            .then((res) => {
              if (username === res.lockBy) {
                setLockByName(res.lockBy);
              } else {
                setLockByName(res.lockBy);
                setLockByToggle(true);
              }
            })
            .catch((err) => {
              console.log(err, "lockby err");
            });
        }
      }
    } else {
      Swal.fire({
        title: "Please Enter a Valid Name",
        icon: "error",
      }).then(() => {});
    }
  };
  const refreshHandle = () => {
    if (window.location.href.split("/").length !== 6) {
    } else {
      setPutToggle(true);
      refreshDummyOrder(dummyOrder._id);
    }
  };

  const callWaiterHandle = () => {
    console.log("call waiter");
  };
  // console.log("this is cart items", cartItems);
  return (
    <>
      <Navbar active="Choose Menu" />
      <div>
        <div>
          <AppBar position="static" color="default">
            <Tabs
              style={{ color: "rgb(197 165 31)" }}
              value={value}
              onChange={handleChange}
              variant="scrollable"
              //   scrollButtons="on"
              // indicatorColor="primary"
              // textColor="primary"
              indicatorColor="primary"
              // textColor="red"
              aria-label="scrollable force tabs example"
            >
              {categories &&
                categories.map((category, index) => {
                  return (
                    <Tab
                      key={index}
                      label={category}
                      icon={
                        <img
                          alt="ge-title"
                          className="image_style"
                          style={{ width: " 200px" }}
                          src={items[category] && items[category][0].photo}
                          style={{ height: "140px", width: "140px" }}
                        />
                      }
                      {...a11yProps(0)}
                    />
                  );
                })}
              {/* <Tab label="Item Two" icon={<img alt="ge-title" className="image_style" style={{ width: " 200px" }} src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg" />} {...a11yProps(1)} />
            <Tab label="Item Three" icon={<img alt="ge-title" className="image_style" style={{ width: " 200px" }} src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg" />} {...a11yProps(2)} />
            <Tab label="Item Four" icon={<img alt="ge-title" className="image_style" style={{ width: " 200px" }} src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg" />} {...a11yProps(3)} />
            <Tab label="Item Five" icon={<img alt="ge-title" className="image_style" style={{ width: " 200px" }} src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg" />} {...a11yProps(4)} />
            <Tab label="Item Six" icon={<img alt="ge-title" className="image_style" style={{ width: " 200px" }} src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg" />} {...a11yProps(5)} />
            <Tab label="Item Seven" icon={<img alt="ge-title" className="image_style" style={{ width: " 200px" }} src="https://ak.picdn.net/shutterstock/videos/12756518/thumb/9.jpg" />} {...a11yProps(6)} /> */}
            </Tabs>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Chip
                icon={<FaceIcon />}
                label="Call Waiter"
                variant="outlined"
                clickable
                style={{ marginRight: "1rem" }}
                onClick={callWaiterHandle}
              />
              <RefreshIcon
                fontSize="large"
                style={{ marginRight: "1rem", cursor: "pointer" }}
                onClick={refreshHandle}
              />
              {NoDummyOrder ? (
                <Form
                  onSubmit={handleLockBy}
                  style={{ pointerEvents: "none", opacity: "0.7" }}
                >
                  <Input
                    disabled={lockByToggle}
                    type="text"
                    placeholder="Enter name"
                    value={LockByName}
                    onChange={(e) => setLockByName(e.target.value)}
                  />
                  <Button
                    type="submit"
                    disabled={lockByToggle}
                    style={{ fontSize: "1rem", marginRight: "1.5rem" }}
                  >
                    LockBy
                  </Button>
                </Form>
              ) : (
                <Form onSubmit={handleLockBy}>
                  <Input
                    disabled={lockByToggle}
                    type="text"
                    placeholder="Enter name"
                    value={LockByName}
                    onChange={(e) => setLockByName(e.target.value)}
                  />
                  <Button
                    type="submit"
                    disabled={lockByToggle}
                    style={{ fontSize: "1rem", marginRight: "1.5rem" }}
                  >
                    LockBy
                  </Button>
                </Form>
              )}
            </Grid>
          </AppBar>
          {putToggle ? <LinearProgress /> : ""}
          {categories &&
            categories.map((category, index) => {
              // console.log("clicked", clickedCat)
              return (
                <div>
                  {lockByToggle || putToggle ? (
                    <div style={{ pointerEvents: "none", opacity: "0.7" }}>
                      <TabPanel value={value} index={index} key={index}>
                        {items[category] && (
                          <Items
                            className="remove_padding"
                            style={{ padding: "5px" }}
                            value={value}
                            items={items[category]}
                            allItems={items}
                            cartItems={cartItems}
                            handleAddCartItem={handleAddCartItem}
                            handleRemoveCartItem={handleRemoveCartItem}
                            handleDiscardCartItem={handleDiscardCartItem}
                            data={data}
                          />
                        )}
                      </TabPanel>
                    </div>
                  ) : (
                    <div>
                      <TabPanel value={value} index={index} key={index}>
                        {items[category] && (
                          <Items
                            className="remove_padding"
                            style={{ padding: "5px" }}
                            value={value}
                            items={items[category]}
                            allItems={items}
                            cartItems={cartItems}
                            handleAddCartItem={handleAddCartItem}
                            handleRemoveCartItem={handleRemoveCartItem}
                            handleDiscardCartItem={handleDiscardCartItem}
                            data={data}
                          />
                        )}
                      </TabPanel>
                    </div>
                  )}
                </div>
              );
            })}
          {/* <TabPanel value={value} index={1}>
          <Items value="12345678"/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Items />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Items />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Items />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Items />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Items />
        </TabPanel> */}
        </div>
      </div>
    </>
  );
}
