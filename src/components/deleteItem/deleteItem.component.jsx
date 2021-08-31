import React from "react";

import "./deleteItem.style.scss";

import Button from "../button/button.component";

const DeleteItem = (props) => {
  const { title, closePopup, submitChange } = props;
  return (
    <div className="deleteContent">
      <h2>{title}</h2>
      <div className="action">
        <Button
          additionalClasses="submit margin-right"
          onClick={submitChange}
        >
          Yes
          </Button>
        <Button additionalClasses="cancel" onClick={closePopup}>
          No
          </Button>
      </div>
    </div>
  );
}

export default DeleteItem;
