import React, { useState, useRef, useEffect } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { SearchRouteData } from "./SearchRouteData";
import BASE_URL from "../../Pages/config/config";
import axios from "axios";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track the selected index
  const inputRef = useRef(null);
  const [employeeData, setEmployeeData] = useState({});
  const id = localStorage.getItem("_id");
  const history = useHistory();

  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/particularEmployee/${id}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSelectedIndex(-1); // Reset selection when typing
  };

  const handleIconClick = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    setSearchTerm("");
    setExpanded(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredRoutes.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      // Prevent default behavior (form submission)
      event.preventDefault();
      // Navigate to the selected route
      history.push(filteredRoutes[selectedIndex].path);
      setSearchTerm("");
      setExpanded(false);
    }
  };

  const filteredRoutes = searchTerm
    ? SearchRouteData.filter((route) => {
        const isNameMatch = route.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const isUserTypeMatch = (() => {
          switch (employeeData.Account) {
            case 1: // Admin
              return route.control === "admin";
            case 2: // HR
              return route.control === "hr";
            case 3: // Employee
              return route.control === "employee";
            case 4: // Manager
              return route.control === "manager";
            default:
              return false;
          }
        })();
        return isNameMatch && isUserTypeMatch;
      }).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchTerm("");
        setExpanded(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        width: "210px",
        height: "2.2rem",
        position: "relative",
      }}
      ref={inputRef}
    >
      <Form.Control
        className="rounded-0 border-0"
        placeholder="Search"
        style={{ height: "2.3rem" }}
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />

      {filteredRoutes.length > 0 ? (
        <ListGroup
          className="p-2"
          style={{
            position: "absolute",
            width: "90%",
            borderRadius: "0",
            zIndex: "2000",
            background: "#ebe8e8ea",
          }}
        >
          {filteredRoutes.map((route, index) => (
            <Link
              style={{ textDecorationLine: "none", width: "100%" }}
              to={route.path}
              key={index}
              onClick={handleLinkClick}
            >
              <div
                style={{
                  textDecorationLine: "none",
                  backgroundColor:
                    index === selectedIndex ? "#abcdf56f" : "transparent",
                  padding: "5px",
                }}
                className="text-dark search-hoverable-text"
              >
                {route.name}
              </div>
            </Link>
          ))}
        </ListGroup>
      ) : (
        <div>
          {searchTerm && expanded && (
            <span
              style={{
                position: "absolute",
                width: "210px",
                textAlign: "start",
              }}
              className="bg-white shadow-sm border rounded-0 py-1 px-3"
            >
              No result found
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
