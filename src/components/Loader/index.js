import React from 'react';
import { Dimmer, Loader} from 'semantic-ui-react'


// import './index.scss';

export default function Loade(props) {
  return (
    <div className="loader">
      {/* <div className="loader__figure"></div> */}
      <Dimmer active>
        <Loader size='small'>Loading</Loader>
      </Dimmer>
      {!props.label ? null : <Loader size='medium'>Loading...</Loader>}
    </div>
  );
}