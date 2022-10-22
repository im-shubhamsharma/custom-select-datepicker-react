import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { IoIosArrowDown } from "react-icons/io";
import { demoData } from "../../utils/data";
import searchIcon from "../../assets/searchIcon.svg";
import DropdownOption from "../DropdownOption/DropdownOption";
import { selectAll, selectGroup, selectIndividual } from "./DropdownOperations";
import { debounce } from "../../utils/debouncer";
import "./Dropdown.scss";

const Dropdown = () => {
  /* Getting groups from our data and mapping for it our dropdown*/
  const groups = demoData
    .reduce((group, curr) => {
      return group.includes(curr.group) ? group : [...group, curr.group];
    }, [])
    .map((group) => {
      let id = nanoid();
      return {
        type: "group",
        name: group,
        id: {
          individual: id,
          group: id,
        },
        checked: false,
      };
    });

  /* Getting individuals data and mapping for it our dropdown*/
  const individuals = demoData.map((employee) => ({
    ...employee,
    type: "individual",
    id: {
      individual: nanoid(),
      group:
        groups[
          groups.findIndex(
            (group) => group.name.toLowerCase() === employee.group.toLowerCase()
          )
        ].id.group,
    },

    checked: false,
  }));

  /* All Employess */
  let allId = nanoid();
  const allEmployees = {
    id: {
      individual: allId,
      group: allId,
    },
    name: "All Employees",
    type: "all",
    checked: false,
  };
  const [data, setData] = useState([allEmployees, ...groups, ...individuals]);
  const [active, setActive] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [totalEmpCount, setTotalEmpCount] = useState(0);

  /* Use Effect to update our selected count and total emp cound*/
  useEffect(() => {
    setSelectedCount(
      data.reduce((total, curr) => {
        return curr.type.toLowerCase() === "individual"
          ? curr.checked
            ? ++total
            : total
          : total;
      }, 0)
    );

    setTotalEmpCount(
      data.reduce((total, curr) => {
        return curr.type.toLowerCase() === "individual" ? ++total : total;
      }, 0)
    );
  }, [data]);

  const toggleSelect = (e) => {
    setActive((prev) => !prev);
  };

  /* Search Functionality */
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    setSearchResult(
      data.filter(
        (employee) =>
          employee.type.toLowerCase() === "individual" &&
          employee.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    if (!searchInput) {
      setSearchResult([]);
    }
  }, [searchInput]);
  /* Search Functionality Ends*/

  return (
    <div>
      <div className={`dropdown ${active ? "active" : ""}`}>
        {/* Custom select header */}
        <div onClick={toggleSelect} className="select">
          <div className="select-avatar-stack">
            <span>{active ? selectedCount : totalEmpCount}</span>
            <img src={data[5].avatar} />
            <img src={data[6].avatar} />
          </div>
          <p>{active ? "All practitioners" : "Select Employee"}</p>

          <span className="custom-arrow">
            <IoIosArrowDown />
          </span>
        </div>

        {/* Custom options */}
        <div className="options">
          <div className="search-bar">
            <img src={searchIcon} />
            <input
              type="text"
              placeholder="Search employee..."
              // value={searchInput}
              onChange={debounce(handleSearch)}
            />
          </div>

          <div className="option-list">
            {searchInput.length > 0 ? (
              searchResult.length > 0 ? (
                <>
                  {searchResult.map((employee) => (
                    <div className="dropdown-option-container">
                      <DropdownOption
                        key={employee.id.individual}
                        employee={employee}
                        operations={{
                          handleChange: selectIndividual,
                          setData: setData,
                          setSearchResult: setSearchResult,
                        }}
                      />
                      <hr />
                    </div>
                  ))}
                </>
              ) : (
                <p className="not-found">Not Found</p>
              )
            ) : (
              <div>
                {/* all employeees */}
                <div className="dropdown-option-container">
                  {data
                    .filter((employee) => employee.type.toLowerCase() === "all")
                    .map((item) => (
                      <DropdownOption
                        key={item.id}
                        data={data}
                        employee={item}
                        totalEmpCount={totalEmpCount}
                        operations={{ handleChange: selectAll, setData }}
                      />
                    ))}
                </div>
                <hr />
                {/* favorite */}
                <div className="dropdown-option-container">
                  {data
                    .filter(
                      (employee) =>
                        employee.type.toLowerCase() === "individual" &&
                        employee.favorite
                    )
                    .map((item) => (
                      <DropdownOption
                        key={item.id.individual}
                        employee={item}
                        operations={{ handleChange: selectIndividual, setData }}
                      />
                    ))}
                </div>
                <hr />

                {/* all practitioners */}
                <div className="dropdown-option-container">
                  {data
                    .filter(
                      (employee) =>
                        employee.type.toLowerCase() === "group" &&
                        employee.name.toLowerCase() === "practitioner"
                    )
                    .map((item) => (
                      <DropdownOption
                        key={item.id.group}
                        employee={item}
                        operations={{ handleChange: selectGroup, setData }}
                      />
                    ))}
                  {data
                    .filter(
                      (employee) =>
                        employee.type.toLowerCase() === "individual" &&
                        employee.group.toLowerCase() === "practitioner"
                    )
                    .map((item) => (
                      <DropdownOption
                        key={item.id.individual}
                        employee={item}
                        operations={{ handleChange: selectIndividual, setData }}
                      />
                    ))}
                </div>

                <hr />

                {/* all assistants */}
                <div className="dropdown-option-container">
                  {data
                    .filter(
                      (employee) =>
                        employee.type.toLowerCase() === "group" &&
                        employee.name.toLowerCase() === "assistant"
                    )
                    .map((item) => (
                      <DropdownOption
                        key={item.id.group}
                        employee={item}
                        operations={{ handleChange: selectGroup, setData }}
                      />
                    ))}
                  {data
                    .filter(
                      (employee) =>
                        employee.type.toLowerCase() === "individual" &&
                        employee.group.toLowerCase() === "assistant"
                    )
                    .map((item) => (
                      <DropdownOption
                        key={item.id.individual}
                        employee={item}
                        operations={{ handleChange: selectIndividual, setData }}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
