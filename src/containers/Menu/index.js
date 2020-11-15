import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import * as api from "../../api/orderAPI";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import cookie from "js-cookie";
import "./style.css";

import Items from "../../components/Items";
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
  const [categories, setCategories] = useState(0);
  const [items, setItems] = useState({});
  const [cartItems, setCartItems] = useState({});
  const history = useHistory();
  const [clicked, clickedCategory] = useState(0);
  const [clickedCat, setclickedCategory] = useState({});
  const [user, setUser] = useState(cookie.get("userId"));
  const [data, setData] = useState(null);

  useEffect(() => {
    const { categories, items, value, data, clicked } = history.location.props
      ? history.location.props
      : {};
    console.log("value:", value);
    console.log("categories", categories);
    console.log("items", items);
    console.log("data", data);
    console.log("clicked", clicked);

    if (items && categories) {
      setCategories(categories);
      setItems(items);
      setValue(value);
      setData(data);
      setCartItemsInCookies();
      return;
    }

    let temp = [];

    api.getMenu(user).then((res) => {
      res.data.user.menu.map((res) => {
        temp.push(res.category);
      });

      let categories = temp.filter((v, i, a) => a.indexOf(v) === i);

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
      console.log("newItemsF:", newItems);
      setItems(newItems);
      setCategories(categories);
      setData(res.data.user.menu);
      setCartItemsInCookies();
    });
  }, []);
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
    console.log("this is item id", itemId);
    console.log("Cart items", newCartItems);
    if (newCartItems[itemId]) {
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] = --newCartItems[itemId];
        cookie.set("cart-items", newCartItems);
        setCartItems(newCartItems);
        return;
      }
      delete --newCartItems[itemId];
      cookie.set("cart-items", newCartItems);
      setCartItems(newCartItems);
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
      cookie.set("cart-items", newCartItems);
      setCartItems(newCartItems);
      return;
    }
  };

  const setCartItemsInCookies = () => {
    const existingCartItems = cookie.get("cart-items");
    if (existingCartItems) {
      setCartItems(JSON.parse(existingCartItems));
      return;
    }
    cookie.set("cart-items", {});
    setCartItems(JSON.parse(cookie.get("cart-items")));
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
  console.log("this is cart items", cartItems);
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
          </AppBar>
          {categories &&
            categories.map((category, index) => {
              // console.log("clicked", clickedCat)
              return (
                <TabPanel value={value} index={index} key={index}>
                  {items[category] && (
                    <Items
                      className="remove_padding"
                      style={{ padding: "5px" }}
                      value={value}
                      items={items[category]}
                      allItems={items}
                      cartItems={JSON.parse(cookie.get("cart-items"))}
                      handleAddCartItem={handleAddCartItem}
                      handleRemoveCartItem={handleRemoveCartItem}
                      handleDiscardCartItem={handleDiscardCartItem}
                      data={data}
                    />
                  )}
                </TabPanel>
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
