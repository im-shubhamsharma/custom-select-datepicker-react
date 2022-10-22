import React from "react";
import "./DropdownOption.scss";

const DropdownOption = (props) => {
  const { avatar, name, id, checked, type, favorite } = props.employee;
  const { handleChange, setData, setSearchResult } = props.operations;

  if (type.toLowerCase() === "all") {
    return (
      <div className="dropdown-option-wrapper">
        <label className="label" htmlFor={id.individual}>
          <div className="avatar-stack">
            <span>{props.totalEmpCount}</span>
            <img src={props.data[5].avatar} />
            <img src={props.data[6].avatar} />
          </div>
          <p>All employees</p>
        </label>
        <input
          type="checkbox"
          id={id.individual}
          checked={checked}
          onChange={(e) => handleChange(e, setData)}
        />
      </div>
    );
  }

  if (type.toLowerCase() === "group") {
    return (
      <div className="dropdown-option-wrapper group-margin">
        <label className="label" htmlFor={id.individual}>
          <h5>{`All ${name}`}</h5>
        </label>
        <input
          value={name}
          className="checkbox"
          type="checkbox"
          id={id.individual}
          checked={checked}
          onChange={(e) => handleChange(e, setData)}
        />
      </div>
    );
  }

  return (
    <div className="dropdown-option-wrapper">
      <label className="label" htmlFor={id.individual}>
        <img src={avatar} />
        <p>{name}</p>
      </label>
      <input
        type="checkbox"
        id={id.individual}
        groupid={id.group}
        checked={checked}
        onChange={(e) =>  {
            handleChange(e, setData);
            if(setSearchResult) handleChange(e, setSearchResult);
        }}
      />
    </div>
  );
};

export default DropdownOption;
