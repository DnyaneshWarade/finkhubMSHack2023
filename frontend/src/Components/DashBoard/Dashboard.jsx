import React, { useState } from "react";
import "./Dashboard.css";
import Companies from "../../Resources/Companies";
import "./Dashboard.css";
import ProfileIcon from "./../../Images/ProfileIcon.png";

export default function Dashboard() {
  const [userType, setUserType] = useState("");
  const [action, setAction] = useState("");
  const [stock, setStock] = useState("");
  const [amount, setAmount] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [exProfit, setExpectedProfit] = useState("");
  const [exLoss, setExpectedLoss] = useState("");
  const preview = `I am a StockFink user of ${userType} and I decided to ${action} ${stock}  at ${amount} USD. The  calculated  expected profit is ${exProfit} and expected risk is ${exLoss}. `;

  // const [searchInput, setSearchInput] = useState("");
  // const [filteredResults, setFilteredResults] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);

  const companies = Companies;

  const companyList = Object.keys(companies).map((key) => {
    return `${key} - ${companies[key]}`;
  });

  return (
    <div className="DashBoard">
      I am a StockFink user of
      <div className="RadioSwitch">
        <input
          type="radio"
          value="PulseTradeAI"
          name="userType"
          id="PulseTradeAI"
          onChange={(e) => setUserType(e.target.value)}
        />
        <label htmlFor="PulseTradeAI">PulseTradeAI</label>
        <input
          type="radio"
          value="FinkAIBeta"
          name="userType"
          id="FinkAIBeta"
          onChange={(e) => setUserType(e.target.value)}
        />{" "}
        <label htmlFor="FinkAIBeta">FinkAIBeta</label>
      </div>
      <br />
      And I have decided to
      <div className="RadioSwitch">
        <input
          type="radio"
          value="Buy"
          name="action"
          id="buy"
          onChange={(e) => setUserType(e.target.value)}
        />
        <label htmlFor="buy">Buy</label>

        <input
          type="radio"
          value="Sell"
          name="action"
          id="sell"
          onChange={(e) => setUserType(e.target.value)}
        />
        <label htmlFor="sell">Sell</label>
      </div>
      <span className="StockSelect">
        <input
          type="text"
          list="CompanyList"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="StockSelectInput"
          placeholder="Write a stock name"
        />
        <datalist id="CompanyList">
          {Object.keys(companies).map((key) => (
            <option value={companies[key]}>
              {key}-{companies[key]}
            </option>
          ))}
        </datalist>
      </span>
      <br />
      {/* <select name="Stock" id="stock"
      onChange={(e) => setStock(companies[e.target.value])}>
        <option value="">----Select Stock----</option>
        {Object.keys(companies).map((key) => <option value={key}>{key}-{companies[key]}</option>)}
      </select> <br /> */}
      at{" "}
      <span className="PriceInput">
        <input
          type="number"
          id="amount"
          max="100000"
          onChange={(e) => setAmount(e.target.value)}
        />
        <span className="Currency">USD</span>
      </span>
      <br />
      <div className="PriceRange">
        min price
        <input
          type="number"
          id="minprice"
          onChange={(e) => setMinPrice(e.target.value)}
        />{" "}
        <span className="Currency">USD</span>
        <br />
        max price
        <input
          type="number"
          id="maxprice"
          onChange={(e) => setMaxPrice(e.target.value)}
        />{" "}
        <span className="Currency">USD</span>
      </div>
      <br />
      <div className="Preview">
        <p className="PreviewHeading">Preview</p>
        <div className="PreviewDescription">
          <img src={ProfileIcon} alt="icon" />
          <p>{preview}</p>
        </div>
        <div className="PostButton">
          <p>Post</p>
        </div>
      </div>
    </div>
  );
}
