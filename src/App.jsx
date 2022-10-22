import { useState } from "react";
import Dropdown from "./components/Dropdown/Dropdown";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <div className="dropdown-container">
        <Dropdown />
      </div>
      <div className="datepicker-container">
          <h2>DATE</h2>
      </div>
    </div>
  );
};

export default App;
