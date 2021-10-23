import React, { useState, useEffect } from "react";

import "./editItem.style.scss";

import Button from "../button/button.component";

const EditItem = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(props.name)
  }, [])

  const handleChange = event => {
    const { value } = event.target;
    setName(value);
  };

  const { title, closePopup, submitChange } = props;

  return (
    <div className="deleteContent">
      <h2>{title}</h2>
      <input
        className="input-category-name"
        type="text"
        name="category"
        value={name}
        onChange={handleChange}
      />
      <div className="action">
        <Button
          additionalClasses="submit margin-right"
          onClick={() => submitChange(name)}
        >
          Ok
          </Button>
        <Button additionalClasses="cancel" onClick={closePopup}>
          Cancel
          </Button>
      </div>
    </div>
  );
}

export default EditItem;
