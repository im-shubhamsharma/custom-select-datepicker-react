import Dropdown from "./components/Dropdown/Dropdown";
import DatePicker from "./components/DatePicker/DatePicker";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <div className="dropdown-container">
        <h2>Select Employee Dropdown</h2>
        <Dropdown />
      </div>
      <div className="datepicker-container">
        <h2>DATE PICKER</h2>
        <DatePicker />
      </div>
    </div>
  );
};

export default App;
