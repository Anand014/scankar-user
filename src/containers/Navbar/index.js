import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  // Box,
  Fab,
  Zoom,
  IconButton,
  // Drawer,
  SwipeableDrawer,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Container from '@material-ui/core/Container';
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Overview from "../Overview";
import {useHistory, Link} from "react-router-dom";
import * as api from '../../api/orderAPI';
import cookie from "js-cookie";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  menuIcon: {
    marginLeft: "auto",
  },
}));

const cusomeStyle = {
  drawerMenuName: {
    fontSize: "0.8rem",
    margin: "0px",
  },
  drawerMenuNameWrapper: {
    width: "100%",
    padding: "0 1.5em 0 1.5em ",
    marginTop: "1em",
    marginBottom: "1em",
    textAlign: "center",
    lineHeight: "2.5",
    color: "rgb(197 165 31)",
  },
  appbar:{
    background: "#c5a51f"
  }
};

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const params = useParams();
  const handleDrawer = () => {
    setOpen(true);
  };

  
  const handleSignOut = async () => {
    setOpen(false);
    const {isConfirmed} = await Swal.fire({
      title: '<strong>Do you want to sign off?</strong>',
      icon: 'info',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:'Yes',
      cancelButtonText:'No'
    })
   if(!isConfirmed)
    {
      return;
    }
    cookie.remove("userId");
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your have been signed off',
      showConfirmButton: false,
      timer: 1500
    })
    history.push(`/${params.id}`)
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="sticky" style={cusomeStyle.appbar}>
        <Toolbar id="back-to-top-anchor">
          <Typography variant="h6">
            {/* <Link to="/"> */}
            <IconButton style={{color: "#ffffff"}}>
              <ArrowBackIcon onClick={e => history.goBack()} />
            </IconButton>
            {/* </Link> */}
            {props.active}
          </Typography>
          <IconButton
            style={{ marginLeft: "auto" }}
            color="inherit"
            aria-label="open drawer"
            edge="end"
           // onClick={handleDrawer}
            // className={clsx(open && classes.hide)}
          >
            <MenuIcon onClick={handleDrawer}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Toolbar id="back-to-top-anchor" /> */}

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={cusomeStyle.drawerMenuNameWrapper}>
          <h6 style={cusomeStyle.drawerMenuName}>Home</h6>
          <h6 style={cusomeStyle.drawerMenuName}>Menu</h6>
          <h6 style={cusomeStyle.drawerMenuName}>Dashboard</h6>
          <h6 style={cusomeStyle.drawerMenuName} onClick={handleSignOut}>SignOut</h6>
        </div>
      </SwipeableDrawer>

      {/* <Container> */}
      {/* <Box my={3}> */}
      {/* </Box> */}
      {/* </Container> */}

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default Navbar;
