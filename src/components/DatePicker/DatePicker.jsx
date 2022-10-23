import React, { useRef, useState } from "react";
import calendarIcon from "../../assets/calendar.svg";
import datepickerarrowsIcon from "../../assets/datepickerarrows.svg";
import { getDatePickerData } from "./DateContructor";
import { nanoid } from "nanoid";
import "./DatePicker.scss";

const DatePicker = () => {
  const [active, setActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  let datePickerData = getDatePickerData();

  //-------------------------------------------------------------
  /* Some Random Dates which is disabled by default */

  datePickerData = datePickerData.map((date) =>
    date.date === 15 || date.date === 21 || date.date === 26
      ? { ...date, active: false }
      : date
  );

  //-------------------------------------------------------------

  const totalCalendarRows = Math.ceil(datePickerData.length / 7);

  let dataRowWise = [];
  for (let i = 0; i < totalCalendarRows; i++) {
    let stIdx = 7 * i;
    let endIdx = stIdx + 7;
    let tempArr = datePickerData.slice(stIdx, endIdx);
    dataRowWise.push(tempArr);
  }

  //-------------------------------------------------------------
  const toggleSelect = () => {
    setActive((prev) => !prev);
  };

  const selectDate = (e) => {
    setSelectedDate(e.target.id);
    setActive((prev) => !prev);
  };
  const catMenu = useRef(null);

  const closeOpenMenus = (e) => {
    if (catMenu.current && active && !catMenu.current.contains(e.target)) {
      setActive(false);
    }
  };
  document.addEventListener("mousedown", closeOpenMenus);

  //-------------------------------------------------------------

  /* Render Element for our calendar */
  const dateCalendarElem = dataRowWise.map((row) => {
    return (
      <div key={nanoid()} className="datepicker-options-rows">
        {row.map((date) => {
          return (
            <span
              key={date.dateToBeShown}
              className={`${date.active === false ? "disabled" : ""} 
                 ${date.date === 1 ? "first-date" : ""}
                 ${date.date < 8 ? "first-seven" : ""}
                 ${date.todaysDate ? "current-date" : ""}`}
              id={date.dateToBeShown}
              onClick={date.active ? selectDate : null}
            >
              <p id={date.dateToBeShown} className="month">
                {date.date === 1 && date.monthShort}
              </p>
              <p id={date.dateToBeShown}>
                {date.date < 10 ? `0${date.date}` : date.date}
              </p>
            </span>
          );
        })}
      </div>
    );
  });

  return (
    <div ref={catMenu} className={`datepicker ${active ? "active" : ""}`}>
      <div onClick={toggleSelect} className="datepicker-select">
        <div className="datepicker-select-title">
          <img src={calendarIcon} />
          <p className={selectedDate ? "active" : ""}>
            {selectedDate ? selectedDate : "Pick Date"}
          </p>
        </div>
        <img src={datepickerarrowsIcon} />
      </div>

      <div className="datepicker-options">
        {/* border="1px solid #556E9A" */}
        <div className="datepicker-options-header">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>
        <div className="datepicker-options-body">{dateCalendarElem}</div>
      </div>
    </div>
  );
};

export default DatePicker;
