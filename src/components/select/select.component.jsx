import React from "react";

import "./select.style.scss";

const Select = props => {
  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.labelText}
      </label>

      <select
        className={`${props.additionalClasses} custom-select`}
        name={props.name}
        id={props.selectId}
        value={props.value}
        onChange={props.handleSelect}
      >
        {props.options.map(option => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
