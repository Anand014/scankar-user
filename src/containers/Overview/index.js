import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { useHistory } from "react-router-dom";
// import ListSubheader from '@material-ui/core/ListSubheader';
import Navbar from "../Navbar";
import * as api from '../../api/orderAPI';
import cookie from 'js-cookie';
import './style.css'



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    // height: 950,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));


const Overview = (props) => {

  // const {categories, items, id} = props;
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = useState(null);
  const [items, setItems] = useState({});
  const [data, setData] = useState(null);
  const [user, setUser] = useState(cookie.get("userId"));


  useEffect(() => {

    const temp = [];
    api.getMenu(user).then((res) => {
      res.data.user.menu.map((res) => {
        temp.push(res.category);
        console.log("exectued getMenu");
      });
      let categories = temp.filter((v, i, a) => a.indexOf(v) === i);

      const newItems = {};
      res.data.user.menu.forEach((item, index) => {
        const {category, ...restData} = item;
        if(restData.status !== "Available")
        {
          return; 
        }
        if(newItems[category])
        {
          newItems[category].push({...restData})
        }
        else{
          newItems[category] = [{...restData}];
        }
      });
      setItems(newItems);
      setCategories(categories);
      setData(res.data.user.menu);
    })
    // document.title = `You clicked ${Id} times`;
  }, []);


  const handleGoToMenu = (value, clicked) => {
    history.push({ pathname: `/menu/${user}`, props: { categories, items, value, data, clicked } });
  }


  return (
    <>
      <Navbar active="Choose Category"/>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>

          {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
          {categories && categories.map((category, index) => {

            return (
              <GridListTile key={index}
                onClick={e => handleGoToMenu(index, category)}
              >
                <img src={items[category][0] ? items[category][0].photo : ""} alt={category} />
                <GridListTileBar
                  title={category}
                  // subtitle={<span>by: {tile.author}</span>}
                  actionIcon={
                    <IconButton
                    // style={{background: "#c5a51f"}}
                      aria-label={`info about ${category}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            )
          })}
        </GridList>
      </div>
    </>
  );
}
export default Overview;