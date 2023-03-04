import React from 'react';
import { explorerMapping, network } from '../constants/consts';
function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={props.closePopup}>
          X
        </button>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <p>
          {props.txId && (
            <a href={explorerMapping[network](props.txId)} target="_blank">
              here
            </a>
          )}
        </p>
      </div>
    </div>
  );
}

export default Popup;
