import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';
import cookie from "js-cookie";
import './style.css'

const Exit = () => {
  const history = useHistory();

  const newOrder = () => {
    history.push('/overview/id')
  }

  const exitHandler = () => {
    cookie.set("cart-items", {});
    cookie.set("username",);
    cookie.set("userId",);
    history.push('/overview/id')
  }
  return (
    <div className="main_conatainer_wrapper">
      <div className="button_group">

        <Button className="another_button" onClick={newOrder} inverted color="olive" fluid>
          Place Another order
        </Button>
        <Button className="exit_button" onClick={exitHandler} inverted color="red" fluid>
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Exit;
